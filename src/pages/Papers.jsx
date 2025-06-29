import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Papers() {
  const [papers, setPapers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/seqamlab/data/papers.json").then((res) => res.json()).then(setPapers);
  }, []);

  const filtered = papers
    .filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      (p.authors || "").toLowerCase().includes(query.toLowerCase()) ||
      (p.year || "").includes(query)
    )
    .sort((a, b) => (b.year || "").localeCompare(a.year || ""));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-[#cc0033] mb-4">Research Papers</h2>
      <input
        type="text"
        placeholder="Filter by title, author, or year..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-6"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <Card key={i} title={p.title} footer={p.doi && <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">DOI</a>}>
            {p.authors} ({p.year})<br />
            {p.journal && <i>{p.journal}</i>}
          </Card>
        ))}
      </div>
    </div>
  );
}
