
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import { Brain, Search, Clock, Sparkles, User, Mail, Lock, ArrowRight } from "lucide-react";


function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle registration
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            setLoading(true);

            const response = await api.post("/auth/register", {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
            });

            setSuccess(response.data.message);

            setFormData({
                name: "",
                email: "",
                password: "",
            });

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
            <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden border border-slate-800">

                {/* Left Panel */}
                <div className="hidden md:flex flex-col justify-between flex-1 bg-slate-900 p-12">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <Brain size={18} className="text-white" />
                        </div>
                        <span className="text-white font-medium text-lg">RecallIt</span>
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium text-white leading-snug mb-3">
                            Your second brain,<br />powered by AI
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Store everything you learn. Retrieve it instantly when you need it most.
                        </p>

                        <div className="mt-8 flex flex-col gap-5">
                            {[
                                { icon: Search, title: "Semantic search", desc: "Find anything you've ever learned" },
                                { icon: Clock, title: "Knowledge timeline", desc: "Track how your learning evolves" },
                                { icon: Sparkles, title: "AI-powered recall", desc: "Connect concepts across topics" },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                                        <Icon size={15} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-200 text-sm font-medium">{title}</p>
                                        <p className="text-slate-500 text-xs">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-slate-600 text-xs">© 2026 RecallIt</p>
                </div>

                {/* Right Panel */}
                <div className="flex-1 bg-white dark:bg-slate-950 p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h1 className="text-2xl font-medium text-slate-900 dark:text-white mb-1">Create your account</h1>
                        <p className="text-slate-500 text-sm">Start building your personal knowledge base</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {[
                            { label: "Full name", name: "name", type: "text", icon: User, placeholder: "Shahrukh Khan" },
                            { label: "Email", name: "email", type: "email", icon: Mail, placeholder: "you@example.com" },
                            { label: "Password", name: "password", type: "password", icon: Lock, placeholder: "Min. 8 characters" },
                        ].map(({ label, name, type, icon: Icon, placeholder }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">{label}</label>
                                <div className="relative">
                                    <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type={type} name={name}
                                        value={formData[name]} onChange={handleChange}
                                        placeholder={placeholder} required
                                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                </div>
                            </div>
                        ))}

                        {error && <p className="text-sm text-red-500">{error}</p>}
                        {success && <p className="text-sm text-green-500">{success}</p>}

                        <button type="submit" disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium disabled:opacity-50 transition-colors">
                            <ArrowRight size={16} />
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                        <span className="text-xs text-slate-400">or</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    </div>

                    <p className="text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 font-medium hover:underline">Log in</Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Register;
