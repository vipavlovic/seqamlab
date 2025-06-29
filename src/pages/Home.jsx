import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [papers, setPapers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("/seqamlab/data/papers.json").then((res) => res.json()).then(setPapers);
    fetch("/seqamlab/data/projects.json").then((res) => res.json()).then(setProjects);
    fetch("/seqamlab/data/courses.json").then((res) => res.json()).then(setCourses);
    fetch("/seqamlab/data/people.json").then((res) => res.json()).then(setPeople);
  }, []);

  const recent = (list, n = 5) =>
    [...list]
      .sort((a, b) => (b.year || b.date || "").localeCompare(a.year || a.date || ""))
      .slice(0, n);

  const currentPeople = people.filter(p => p.status !== "past").slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#cc0033] mb-2">
          Sequence Analysis and Modeling Lab (SEQAM)
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-base">
          Researching machine learning, sequence analysis, bioinformatics, and probabilistic modeling to understand and engineer complex data.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-[#cc0033] mb-4">Recent Papers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recent(papers).map((paper, i) => (
            <Card
              key={i}
              title={paper.title}
              footer={paper.doi ? <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">DOI</a> : null}
            >
              {paper.authors} ({paper.year})<br />
              {paper.journal && <i>{paper.journal}</i>}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[#cc0033] mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recent(projects).map((project, i) => (
            <Card key={i} title={project.title}>
              {project.description}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[#cc0033] mb-4">Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recent(courses).map((course, i) => (
            <Card key={i} title={course.name}>
              <strong>{course.semester}</strong><br />
              {course.description}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[#cc0033] mb-4">Lab Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentPeople.map((person, i) => (
            <Card
              key={i}
              title={person.name}
              footer={person.profile_link && <a href={person.profile_link} target="_blank" rel="noreferrer">Profile</a>}
            >
              {person.title}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
