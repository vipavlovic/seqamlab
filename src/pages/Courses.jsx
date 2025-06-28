import React, { useState, useMemo } from "react";
import courses from "../data/courses.json";

export default function Courses() {
  const [query, setQuery] = useState("");
  const [semester, setSemester] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesQuery = course.name.toLowerCase().includes(query.toLowerCase()) || course.description.toLowerCase().includes(query.toLowerCase());
      const matchesSemester = semester ? course.semester === semester : true;
      return matchesQuery && matchesSemester;
    });
  }, [query, semester]);

  const semesters = Array.from(new Set(courses.map(c => c.semester))).sort().reverse();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#cc0033] mb-6 text-center">Courses</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by course name or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-1/2"
        />
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-40"
        >
          <option value="">All Semesters</option>
          {semesters.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course, idx) => (
          <div key={idx} className="bg-white shadow rounded-xl p-5 border border-gray-200 text-left">
            <h2 className="text-lg font-bold mb-1">{course.name}</h2>
            <p className="text-sm text-gray-500 mb-1">Semester: {course.semester}</p>
            <p className="text-sm text-gray-700">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
