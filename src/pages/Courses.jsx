import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/seqamlab/data/courses.json").then((res) => res.json()).then(setCourses);
  }, []);

  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.semester || "").toLowerCase().includes(query.toLowerCase()) ||
    (c.description || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-[#cc0033] mb-4">Courses</h2>
      <input
        type="text"
        placeholder="Filter by name, semester, or description..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-6"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <Card key={i} title={c.name}>
            <strong>{c.semester}</strong><br />
            {c.description}
          </Card>
        ))}
      </div>
    </div>
  );
}
