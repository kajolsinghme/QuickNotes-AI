"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSummarize = async() => {
    if(!text){
      return
    }
    setLoading(true)
    console.log(text)
    setTimeout(() => {
    setResult("This is a dummy summary for now.");
    setLoading(false);
  }, 1000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h1 className="text-3xl text-center mb-24 font-bold text-gray-800">
        AI Notes Summarizer
      </h1>
      <textarea className="mb-24 w-full h-40 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 " placeholder="Paste your notes here..." value={text} onChange={handleChange}/>
      <button className="w-full bg-green-600 text-white py-3 font-semibold rounded-xl hover:bg-green-700 transition" onClick={handleSummarize}>{loading? "Summarizing...": "Summarize" }</button>
      {result && (
        <div className="bg-gray-50 border rounded-xl p-4">
            <h2 className="font-semibold text-gray-700 mb-2">Summary</h2>
            <p className="text-gray-600">{result}</p>
          </div>
      )}
    </div>
    </main>
  );
}
