import React, { useState, useMemo } from "react";
import papers from "../data/papers.json";

export default function Papers() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");

  const filteredPapers = useMemo(() => {
    const sorted = [...papers].sort((a, b) => parseInt(b.year) - parseInt(a.year));
    return sorted.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.authors.toLowerCase().includes(query.toLowerCase());
      const matchesYear = year ? p.year === year : true;
      return matchesQuery && matchesYear;
    });
  }, [query, year]);

  const availableYears = Array.from(new Set(papers.map(p => p.year))).sort().reverse();

  const handleCopy = (bibtex) => {
    navigator.clipboard.writeText(bibtex).then(() => {
      alert('BibTeX copied to clipboard!');
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#cc0033] mb-6 text-center">Research Papers</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-1/2"
        />
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-40"
        >
          <option value="">All Years</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((p, idx) => (
          <div key={idx} className="bg-white shadow rounded-xl p-5 border border-gray-200 text-left relative">
            <h2 className="text-lg font-bold mb-1">{p.title}</h2>
            <p className="text-sm text-gray-600 mb-1">{p.authors}</p>
            <p className="text-xs text-gray-400 mb-2">{p.journal} ({p.year})</p>
            <a href={`https://doi.org/${p.doi}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              View Paper
            </a>
            <details className="mt-4 bg-gray-50 border rounded p-3">
              <summary className="cursor-pointer font-medium text-sm mb-1 text-[#cc0033]">Show BibTeX</summary>
              <pre className="text-xs text-gray-800 whitespace-pre-wrap">{p.bibtex}</pre>
              <button
                onClick={() => handleCopy(p.bibtex)}
                className="mt-2 px-3 py-1 bg-[#cc0033] text-white text-xs rounded hover:bg-red-700"
              >
                Copy BibTeX
              </button>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
