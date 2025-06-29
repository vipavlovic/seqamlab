import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import allowedUsers from "../data/authorized_users.json";
import bibtexParse from "bibtex-parse-js";

export default function Submit() {
  const [user, setUser] = useState(null);
  const [type, setType] = useState("paper");
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");
  const [bibtexData, setBibtexData] = useState([]);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      const screenName = u?.reloadUserInfo?.screenName;
      if (u && allowedUsers.includes(screenName)) {
        setUser(u);
      }
    });
    return () => unsubscribe();
  }, []);

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
        const raw = reader.result;
        const entries = bibtexParse.toJSON(raw);
        const parsed = entries.map(entry => {
          const entryTextMatch = raw.match(new RegExp(`@${entry.entryType}\s*\{\s*${entry.citationKey}[^]*?\n\}`, "i"));
          return {
            title: entry.entryTags?.title || "",
            authors: entry.entryTags?.author || "",
            year: entry.entryTags?.year || "",
            journal: entry.entryTags?.journal || entry.entryTags?.booktitle || "",
            doi: entry.entryTags?.doi || "",
            bibtex: entryTextMatch ? entryTextMatch[0].trim() : ""
          };
        }).filter(p => p.title);
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
    const labels = encodeURIComponent("email-alert");
    const issueUrl = `https://github.com/vipavlovic/seqamlab/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=${labels}`;

    window.open(issueUrl, '_blank');
    setStatus("✅ GitHub Issue draft opened in new tab. Review and submit it manually.");
  };

  const username = user?.reloadUserInfo?.screenName;

  if (!username || !allowedUsers.includes(username)) {
    return (
      <div className="text-center mt-20 space-y-4">
        <p className="text-lg">This page is restricted to SEQAM Lab members.</p>
        <button
          onClick={() => signInWithPopup(auth, provider)}
          className="bg-[#cc0033] text-white px-4 py-2 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <span>Signed in as <strong>{username}</strong></span>
        <button
          onClick={() => { signOut(auth); setUser(null); }}
          className="text-red-600 underline"
        >
          Sign out
        </button>
      </div>

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
