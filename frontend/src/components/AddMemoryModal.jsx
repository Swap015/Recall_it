
import { useState } from "react";
import {
    X,
    Sparkles,
    FileText,
    Tag,
    AlignLeft,
    LoaderCircle,
    Plus,
} from "lucide-react";

import api from "../services/api";

function AddMemoryModal({ isOpen, onClose, onMemoryCreated }) {
    const [formData, setFormData] = useState({
        text: "",
        topic: "",
        sourceType: "note",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClose = () => {
        if (loading) return;

        setFormData({
            text: "",
            topic: "",
            sourceType: "note",
        });

        setError("");
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.text.trim()) {
            setError("Please enter some memory content.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.post("/memories", {
                text: formData.text.trim(),
                topic: formData.topic.trim() || "General",
                sourceType: formData.sourceType,
            });

            // Send the newly created memory to Dashboard
            onMemoryCreated(response.data.data);

            setFormData({
                text: "",
                topic: "",
                sourceType: "note",
            });

            onClose();

        } catch (error) {
            console.error("Create memory error:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                            <Sparkles className="text-indigo-400" size={22} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Create a memory
                            </h2>

                            <p className="text-xs text-slate-400 mt-1">
                                Save something worth remembering.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-40"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <div className="p-6 space-y-5">

                        {/* Memory Content */}
                        <div>

                            <label
                                htmlFor="memory-text"
                                className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2"
                            >
                                <AlignLeft size={16} className="text-indigo-400" />
                                Memory content
                            </label>

                            <textarea
                                id="memory-text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                placeholder="Write down something you learned, an idea, or an important thought..."
                                rows={5}
                                maxLength={10000}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                            />

                            <div className="flex justify-end mt-1">
                                <span className="text-xs text-slate-500">
                                    {formData.text.length}/10000
                                </span>
                            </div>

                        </div>


                        {/* Topic and Source Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div>

                                <label
                                    htmlFor="memory-topic"
                                    className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2"
                                >
                                    <Tag size={16} className="text-indigo-400" />
                                    Topic
                                </label>

                                <input
                                    id="memory-topic"
                                    type="text"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    placeholder="e.g. React, JavaScript"
                                    maxLength={80}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                                />

                                <p className="text-xs text-slate-500 mt-2">
                                    Leave empty to use General.
                                </p>

                            </div>


                            <div>

                                <label
                                    htmlFor="memory-source"
                                    className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2"
                                >
                                    <FileText size={16} className="text-indigo-400" />
                                    Source type
                                </label>

                                <select
                                    id="memory-source"
                                    name="sourceType"
                                    value={formData.sourceType}
                                    onChange={handleChange}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                                >
                                    <option value="note">Note</option>
                                    <option value="text">Text</option>
                                </select>

                                <p className="text-xs text-slate-500 mt-2">
                                    More sources coming later.
                                </p>

                            </div>

                        </div>


                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                <p className="text-sm text-red-400">
                                    {error}
                                </p>
                            </div>
                        )}

                    </div>


                    {/* Footer */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-6 border-t border-slate-800 bg-slate-950/40">

                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition disabled:opacity-40"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading || !formData.text.trim()}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle size={17} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Plus size={17} />
                                    Save Memory
                                </>
                            )}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default AddMemoryModal;
