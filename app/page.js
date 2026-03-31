"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSummarize = async () => {
    if (!text) {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("api/summarize", {
        text: text,
      });
      setResult(res.data.summary);
    } catch (error) {
      console.error(error);
      setResult("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setText("");
    setResult("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-5">
        <h1 className="text-3xl text-center mb-24 font-bold text-gray-800">
          AI Notes Summarizer
        </h1>
        <div>
          <textarea
          className="w-full h-40 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 "
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
          className="w-full bg-green-600 text-white py-3 font-semibold rounded-xl hover:bg-green-700 transition"
          onClick={handleSummarize}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
        {result && (
          <div className="bg-gray-50 border rounded-xl p-4 space-y-3">
            <h2 className="font-semibold text-gray-700 mb-2">Summary</h2>
            <p className="text-gray-600">{result}</p>
            <button
              onClick={handleCopy}
              className="text-sm text-green-600"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
