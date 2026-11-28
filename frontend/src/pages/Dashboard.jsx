import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

import {
  Brain,
  LayoutDashboard,
  Database,
  MessageSquare,
  Network,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  FileText,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { useAuth } from "../context/useAuth";


function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [memories, setMemories] = useState([]);
  const [loadingMemories, setLoadingMemories] = useState(true);
  const [memoryError, setMemoryError] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      name: "My Memories",
      icon: Database,
    },
    {
      name: "AI Chat",
      icon: MessageSquare,
    },
    {
      name: "Knowledge Graph",
      icon: Network,
    },
  ];


  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoadingMemories(true);
        setMemoryError("");

        const response = await api.get("/memories");

        setMemories(response.data.data || []);

      } catch (error) {
        console.error("Fetch memories error:", error);

        setMemoryError(
          error.response?.data?.message ||
          "Failed to load memories."
        );

      } finally {
        setLoadingMemories(false);
      }
    };

    fetchMemories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-5 hidden md:flex flex-col">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center">
            <Brain size={20} />
          </div>

          <h1 className="text-xl font-semibold">
            Recall-it
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex-1">

          <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">
            Workspace
          </p>

          <nav className="space-y-2">

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition ${item.active
                    ? "bg-indigo-600/15 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  <Icon size={18} />
                  {item.name}
                </div>
              );
            })}

          </nav>

          <p className="text-xs text-slate-500 uppercase tracking-wider mt-10 mb-4">
            Preferences
          </p>

          <div className="flex items-center gap-3 px-3 py-2.5 text-slate-400 text-sm">
            <Settings size={18} />
            Settings
          </div>

        </div>

        {/* User Profile */}
        <div className="border-t border-slate-800 pt-5">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-500 truncate">
                {user?.email}
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">

        {/* TOPBAR */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 md:px-10">

          <div>
            <p className="text-sm text-slate-400">
              Workspace / Overview
            </p>
          </div>

          <div className="flex items-center gap-5">

            <button className="text-slate-400 hover:text-white">
              <Search size={19} />
            </button>

            <button className="text-slate-400 hover:text-white">
              <Bell size={19} />
            </button>

            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

          </div>

        </header>


        {/* DASHBOARD CONTENT */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto">

          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Welcome back, {user?.name}!
              </h2>

              <p className="text-slate-400 text-sm mt-2">
                Your knowledge, ideas and discoveries,
                all in one place.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg text-sm font-medium transition">
              <Plus size={17} />
              Add Memory
            </button>

          </div>


          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

              <div className="flex justify-between items-center">
                <FileText className="text-indigo-400" size={21} />
                <ArrowUpRight className="text-slate-600" size={18} />
              </div>

              <h3 className="text-3xl font-semibold mt-5">
                {memories.length}
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Total Memories
              </p>

            </div>


            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

              <div className="flex justify-between items-center">
                <Network className="text-purple-400" size={21} />
                <ArrowUpRight className="text-slate-600" size={18} />
              </div>

              <h3 className="text-3xl font-semibold mt-5">
                0
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Connected Topics
              </p>

            </div>


            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

              <div className="flex justify-between items-center">
                <Clock className="text-emerald-400" size={21} />
                <ArrowUpRight className="text-slate-600" size={18} />
              </div>

              <h3 className="text-3xl font-semibold mt-5">
                0
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Recent Activities
              </p>

            </div>

          </div>


          {/* AI Assistant Section */}
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/10 border border-indigo-500/20 rounded-xl p-6 md:p-8 mb-10">

            <div className="flex items-center gap-2 text-indigo-400 mb-3">
              <Sparkles size={19} />
              <span className="text-sm font-medium">
                RecallIt AI
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Your second brain is ready.
            </h3>

            <p className="text-sm text-slate-400 max-w-xl">
              Save what you learn and ask questions later.
              RecallIt will help you retrieve information
              and connect your knowledge.
            </p>

          </div>


          {/* Recent Memories */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h3 className="font-semibold text-lg">
                  Recent Memories
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Your recently saved knowledge
                </p>
              </div>

              <button className="text-sm text-indigo-400 hover:text-indigo-300">
                View all
              </button>

            </div>

            {/* Recent Memories Content */}

            {loadingMemories ? (

              <div className="text-center py-12 text-slate-400">
                Loading your memories...
              </div>

            ) : memoryError ? (

              <div className="text-center py-12 text-red-400">
                {memoryError}
              </div>

            ) : memories.length === 0 ? (

              <div className="flex flex-col items-center justify-center py-12 text-center">

                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
                  <Database size={25} className="text-slate-500" />
                </div>

                <h4 className="font-medium">
                  No memories yet
                </h4>

                <p className="text-sm text-slate-500 mt-2 max-w-sm">
                  Your saved notes, documents and ideas will appear here.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {memories.slice(0, 5).map((memory) => (

                  <div
                    key={memory._id}
                    className="border border-slate-800 rounded-lg p-4 hover:bg-slate-800/50 transition"
                  >

                    <div className="flex justify-between items-start gap-4">

                      <div className="min-w-0">

                        <h4 className="font-medium text-sm">
                          {memory.topic || "General"}
                        </h4>

                        <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                          {memory.text}
                        </p>

                      </div>

                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {new Date(memory.createdAt).toLocaleDateString()}
                      </span>

                    </div>

                    <p className="text-xs text-indigo-400 mt-3 capitalize">
                      {memory.sourceType}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
