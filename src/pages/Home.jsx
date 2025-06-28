import React from "react";
import { Link } from "react-router-dom";
import papers from "../data/papers.json";
import people from "../data/people.json";
import projects from "../data/projects.json";

export default function Home() {
  const featuredPapers = [...papers]
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, 3);

  const featuredProjects = [...projects]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const featuredPeople = [...people].slice(0, 3);

  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-[#cc0033] mb-4">
        Sequence Analysis and Modeling (SEQAM) Lab
      </h1>
      <p className="text-lg max-w-2xl mx-auto mb-8">
        Research at the intersection of sequence modeling, statistical inference, and machine learning at Rutgers University.
      </p>

      <div className="mb-10">
        <div className="inline-flex space-x-4 mb-6 border-b-2 border-gray-200 pb-2">
          <Link to="/projects" className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700">Projects</Link>
          <Link to="/papers" className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700">Papers</Link>
          <Link to="/people" className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700">People</Link>
          <Link to="/courses" className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700">Courses</Link>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-[#cc0033] mb-6">Recent Papers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredPapers.map((p, idx) => (
            <div key={idx} className="bg-white shadow rounded-xl p-5 text-left border border-gray-200">
              <h3 className="text-lg font-bold mb-1">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{p.authors}</p>
              <p className="text-sm text-gray-400 mb-2">{p.journal} ({p.year})</p>
              <a href={`https://doi.org/${p.doi}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View Paper</a>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-[#cc0033] mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredProjects.map((proj, idx) => (
            <div key={idx} className="bg-white shadow rounded-xl p-5 text-left border border-gray-200">
              <h3 className="text-lg font-bold mb-1">{proj.title}</h3>
              <p className="text-sm text-gray-700">{proj.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#cc0033] mb-6">Lab Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredPeople.map((person, idx) => (
            <div key={idx} className="bg-white shadow rounded-xl p-5 text-left border border-gray-200">
              <h3 className="text-lg font-bold mb-1">{person.name}</h3>
              <p className="text-sm text-gray-700">{person.title}</p>
              <p className="text-sm text-gray-500 mb-2">{person.research_interests.join(', ')}</p>
              <a href={person.profile_link} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">Profile</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
