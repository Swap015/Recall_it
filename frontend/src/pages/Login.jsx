
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    Brain,
    Search,
    Clock,
    Sparkles,
    Mail,
    Lock,
    ArrowRight,
    Eye,
    EyeOff,
} from "lucide-react";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const response = await api.post("/auth/login", {
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            });

            console.log(response.data);

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">

            <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden border border-slate-800">

                {/* Left Panel */}
                <div className="hidden md:flex flex-col justify-between flex-1 bg-slate-900 p-10">

                    {/* Branding */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <Brain size={18} className="text-white" />
                        </div>

                        <span className="text-white font-medium text-lg">
                            RecallIt
                        </span>
                    </div>

                    {/* Main Content */}
                    <div>

                        <h2 className="text-2xl font-medium text-white leading-snug mb-3">
                            Welcome back to your
                            <span className="text-indigo-400"> second brain.</span>
                        </h2>

                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your knowledge, ideas, and discoveries are
                            waiting for you. Pick up where you left off
                            and keep learning.
                        </p>

                        {/* Features */}
                        <div className="mt-8 flex flex-col gap-5">

                            {[
                                {
                                    icon: Search,
                                    title: "Semantic search",
                                    desc: "Find anything you've ever learned",
                                },
                                {
                                    icon: Clock,
                                    title: "Knowledge timeline",
                                    desc: "Track how your learning evolves",
                                },
                                {
                                    icon: Sparkles,
                                    title: "AI-powered recall",
                                    desc: "Connect concepts across topics",
                                },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                                        <Icon
                                            size={15}
                                            className="text-indigo-400"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-slate-200 text-sm font-medium">
                                            {title}
                                        </p>

                                        <p className="text-slate-500 text-xs">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>


                </div>

                {/* Right Panel */}
                <div className="flex-1 bg-white dark:bg-slate-950 p-8 flex flex-col justify-center">

                    {/* Mobile Branding */}
                    <div className="flex md:hidden items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <Brain size={18} className="text-white" />
                        </div>

                        <span className="text-slate-900 dark:text-white font-medium text-lg">
                            RecallIt
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">
                            Welcome back!
                        </h1>

                        <p className="text-slate-500 text-sm">
                            Login to continue using RecallIt.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                            >
                                Email
                            </label>

                            <div className="relative">
                                <Mail
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500"
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium disabled:opacity-50 transition-colors"
                        >
                            <ArrowRight size={16} />
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />

                        <span className="text-xs text-slate-400">
                            or
                        </span>

                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    );
}

export default Login;
