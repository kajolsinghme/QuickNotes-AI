"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSummarize = async () => {
    if (!text) return;

    try {
      setLoading(true);
      const res = await axios.post("api/summarize", { text });
      setResult(res.data.summary);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast("Copied to clipboard!");
  };

  const handleClear = () => {
    setText("");
    setResult("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-5">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center gap-2">
            QuickNotes <span className="text-violet-500">AI</span>{" "}
            <span className="text-violet-500">🤖</span>
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Summarize your notes instantly with AI
          </p>
        </div>

        <div>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Paste your notes here..."
            value={text}
            onChange={handleChange}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{text.length} characters</span>
            <button onClick={handleClear} className="text-red-500">
              Clear
            </button>
          </div>
        </div>

        <button
          className="w-full bg-violet-500 text-white py-3 font-semibold rounded-xl hover:bg-violet-700 transition"
          onClick={handleSummarize}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {result && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-2">Summary</h2>
            <p className="text-gray-600">{result}</p>
            <button onClick={handleCopy} className="text-blue-600 text-sm">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
