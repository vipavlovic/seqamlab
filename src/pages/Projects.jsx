import React, { useState, useMemo } from "react";
import projects from "../data/projects.json";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");

  const filteredProjects = useMemo(() => {
    const sorted = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.filter((proj) => {
      const matchesQuery = proj.title.toLowerCase().includes(query.toLowerCase()) || proj.description.toLowerCase().includes(query.toLowerCase());
      const matchesYear = year ? new Date(proj.date).getFullYear().toString() === year : true;
      return matchesQuery && matchesYear;
    });
  }, [query, year]);

  const availableYears = Array.from(new Set(projects.map(p => new Date(p.date).getFullYear().toString()))).sort().reverse();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#cc0033] mb-6 text-center">Projects</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or description..."
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
        {filteredProjects.map((proj, idx) => (
          <div key={idx} className="bg-white shadow rounded-xl p-5 border border-gray-200 text-left">
            <h2 className="text-lg font-bold mb-1">{proj.title}</h2>
            <p className="text-sm text-gray-500 mb-1">{proj.date}</p>
            <p className="text-sm text-gray-700">{proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
