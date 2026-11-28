
import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Clock, Search } from "lucide-react";
import { useNavigate } from "react-router";
import api from "../services/api";

function Memories() {
    const navigate = useNavigate();

    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/memories");

                setMemories(response.data.data || []);
            } catch (error) {
                console.error("Fetch memories error:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load memories."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMemories();
    }, []);

    const filteredMemories = memories.filter((memory) => {
        const searchText = search.toLowerCase();

        return (
            memory.text?.toLowerCase().includes(searchText) ||
            memory.topic?.toLowerCase().includes(searchText)
        );
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

            {/* Header */}
            <div className="max-w-6xl mx-auto">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            My Memories
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Everything you've saved in RecallIt.
                        </p>
                    </div>

                    <div className="text-sm text-slate-400">
                        {memories.length} memories saved
                    </div>

                </div>

                {/* Search */}
                <div className="relative mb-8">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        type="text"
                        placeholder="Search memories by text or topic..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-500"
                    />

                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-slate-400 text-center py-12">
                        Loading your memories...
                    </p>
                )}

                {/* Error */}
                {!loading && error && (
                    <p className="text-red-400 text-center py-12">
                        {error}
                    </p>
                )}

                {/* Empty */}
                {!loading && !error && filteredMemories.length === 0 && (
                    <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">

                        <FileText
                            size={35}
                            className="mx-auto text-slate-500 mb-4"
                        />

                        <h2 className="text-xl font-semibold">
                            {search ? "No matching memories" : "No memories yet"}
                        </h2>

                        <p className="text-slate-400 mt-2">
                            {search
                                ? "Try searching with another word or topic."
                                : "Start saving your knowledge to RecallIt."}
                        </p>

                    </div>
                )}

                {/* Memories List */}
                {!loading && !error && filteredMemories.length > 0 && (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {filteredMemories.map((memory) => (

                            <div
                                key={memory._id}
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition"
                            >

                                <div className="flex items-center justify-between mb-4">

                                    <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full">
                                        {memory.topic || "General"}
                                    </span>

                                    <span className="text-xs text-slate-500 capitalize">
                                        {memory.sourceType}
                                    </span>

                                </div>

                                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                                    {memory.text}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-5 pt-4 border-t border-slate-800">
                                    <Clock size={14} />

                                    {new Date(memory.createdAt).toLocaleDateString()}
                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </div>
    );
}

export default Memories;
