import React, { useState } from "react";
import bibtexParse from "bibtex-parse-js";

export default function Submit() {
  const [type, setType] = useState("paper");
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");
  const [bibtexData, setBibtexData] = useState([]);
  const [fileName, setFileName] = useState("");

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

  const handleBibtexUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const entries = bibtexParse.toJSON(reader.result);
        const parsed = entries.map(entry => ({
          title: entry.entryTags?.title || "",
          authors: entry.entryTags?.author || "",
          year: entry.entryTags?.year || "",
          journal: entry.entryTags?.journal || entry.entryTags?.booktitle || "",
          doi: entry.entryTags?.doi || ""
        })).filter(p => p.title);
        setBibtexData(parsed);
        setStatus(`✅ Parsed ${parsed.length} BibTeX entr${parsed.length === 1 ? 'y' : 'ies'}`);
      } catch (err) {
        setStatus("❌ Failed to parse BibTeX file.");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entries = type === 'paper' && bibtexData.length > 0 ? bibtexData : [form];
    const issueTitle = type === 'paper' && bibtexData.length > 0
      ? `[PAPER] Bulk import from ${fileName}`
      : `[${type.toUpperCase()}] ${form.title || form.name}`;

    const issueBody = `\n\nSubmitted via SEQAM Lab website:\n\n\`\`\`json\n${JSON.stringify(entries, null, 2)}\n\`\`\``;

    const issueUrl = `https://github.com/vipavlovic/seqamlab/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;

    window.open(issueUrl, '_blank');
    setStatus("✅ GitHub Issue draft opened in new tab. Review and submit it manually.");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-[#cc0033] mb-6 text-center">Submit New Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Type</label>
          <select name="type" value={type} onChange={(e) => { setType(e.target.value); setForm({}); setBibtexData([]); }} className="border p-2 rounded w-full">
            <option value="paper">Paper</option>
            <option value="project">Project</option>
            <option value="person">Person</option>
            <option value="course">Course</option>
          </select>
        </div>

        {type === "paper" && (
          <div>
            <label className="block text-sm font-semibold mb-1">Upload BibTeX File</label>
            <input type="file" accept=".bib" onChange={handleBibtexUpload} className="border p-2 rounded w-full" />
          </div>
        )}

        {bibtexData.length === 0 && fields[type].map((field) => (
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

      {(bibtexData.length > 0 || Object.keys(form).length > 0) && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Generated JSON</h2>
          <pre className="bg-gray-100 p-4 text-sm rounded border overflow-x-auto">
            {JSON.stringify(bibtexData.length > 0 ? bibtexData : form, null, 2)}
          </pre>
        </div>
      )}

      {status && <p className="mt-4 text-center font-semibold">{status}</p>}
    </div>
  );
}
