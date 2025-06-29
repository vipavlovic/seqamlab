import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function People() {
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/seqamlab/data/people.json").then(res => res.json()).then(setPeople);
  }, []);

  const filtered = people.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const current = filtered.filter(p => p.status !== "past");
  const past = filtered.filter(p => p.status === "past");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <input
        type="text"
        placeholder="Filter by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-6"
      />

      <section>
        <h2 className="text-2xl font-bold text-[#cc0033] mb-4">Lab Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {current.map((p, i) => (
            <Card key={i} title={p.name} footer={p.profile_link && <a href={p.profile_link} target="_blank" rel="noreferrer">Profile</a>}>
              {p.title}<br />
              {p.research_interests}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Former Lab Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {past.map((p, i) => (
            <Card key={i} title={p.name} footer={p.profile_link && <a href={p.profile_link} target="_blank" rel="noreferrer">Profile</a>}>
              {p.title}<br />
              {p.research_interests}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
