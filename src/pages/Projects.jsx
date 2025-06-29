import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/seqamlab/data/projects.json").then((res) => res.json()).then(setProjects);
  }, []);

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-[#cc0033] mb-4">Projects</h2>
      <input
        type="text"
        placeholder="Filter by title or description..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-6"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <Card key={i} title={p.title}>
            {p.description}
          </Card>
        ))}
      </div>
    </div>
  );
}
