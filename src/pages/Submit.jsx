import React, { useState } from "react";

export default function Submit() {
  const [type, setType] = useState("paper");
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");

  const fields = {
    paper: ["title", "authors", "year", "journal", "doi"],
    project: ["title", "description", "date"],
    person: ["name", "title", "research_interests", "profile_link"],
    course: ["name", "description", "semester"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const issueTitle = `[${type.toUpperCase()}] ${form.title || form.name}`;
    const issueBody = `\n\nSubmitted via SEQAM Lab website:\n\n\`\`\`json\n${JSON.stringify(form, null, 2)}\n\`\`\``;

    const issueUrl = `https://github.com/vipavlovic/seqamlab/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;

    window.open(issueUrl, '_blank');
    setStatus("✅ GitHub Issue draft opened in new tab. Review and submit it manually.");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-[#cc0033] mb-6 text-center">Submit New Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Type</label>
          <select name="type" value={type} onChange={(e) => { setType(e.target.value); setForm({}); }} className="border p-2 rounded w-full">
            <option value="paper">Paper</option>
            <option value="project">Project</option>
            <option value="person">Person</option>
            <option value="course">Course</option>
          </select>
        </div>

        {fields[type].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold mb-1">{field.replace(/_/g, ' ')}</label>
            <input
              type="text"
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
        ))}

        <button type="submit" className="px-4 py-2 bg-[#cc0033] text-white rounded hover:bg-red-700">
          Draft GitHub Issue
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Generated JSON</h2>
        <pre className="bg-gray-100 p-4 text-sm rounded border overflow-x-auto">{JSON.stringify(form, null, 2)}</pre>
      </div>

      {status && <p className="mt-4 text-center font-semibold">{status}</p>}
    </div>
  );
}
