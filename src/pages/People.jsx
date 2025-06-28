import React, { useState, useMemo } from "react";
import people from "../data/people.json";

export default function People() {
  const [query, setQuery] = useState("");

  const filteredPeople = useMemo(() => {
    return people.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.title.toLowerCase().includes(query.toLowerCase()) ||
      person.research_interests.join(' ').toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#cc0033] mb-6 text-center">Lab Members</h1>

      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search by name, title, or interest..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPeople.map((person, idx) => (
          <div key={idx} className="bg-white shadow rounded-xl p-5 border border-gray-200 text-left">
            <h2 className="text-lg font-bold mb-1">{person.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{person.title}</p>
            <p className="text-sm text-gray-500 mb-2">{person.research_interests.join(', ')}</p>
            <a href={person.profile_link} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">Profile</a>
          </div>
        ))}
      </div>
    </div>
  );
}
