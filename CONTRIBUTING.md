# Contributing to the SEQAM Lab Website

Thanks for your interest in contributing! This site is managed by the Sequence Analysis and Modeling Lab (SEQAM) at Rutgers University.

## 🛠️ Local Development

To set up the site locally:

```bash
git clone https://github.com/vipavlovic/seqamlab.git
cd seqamlab
npm install
npm start
```

Then visit `http://localhost:3000/seqamlab` in your browser.

## 📦 Tech Stack

- React + Vite
- Tailwind CSS
- Firebase Auth (GitHub login)
- GitHub Actions for data updates
- GitHub Pages for hosting

## 🧑‍💻 Making Contributions

You can contribute via:

- GitHub Pull Requests (preferred)
- Submitting new papers, people, or projects via the [Submit](https://vipavlovic.github.io/seqamlab/submit) page

To add new content directly:

1. Add to the appropriate file in `src/data/`:
   - `papers.json`
   - `people.json`
   - `projects.json`
   - `courses.json`
2. Commit with a clear message
3. Open a pull request targeting `main`

## ✅ Guidelines

- Use consistent formatting (2-space indentation in JSON)
- Keep data sorted by year where applicable
- Check that you didn't duplicate an existing entry (e.g., DOI for papers)
- Include meaningful descriptions

## 🔐 Access Control

- Submit page access is restricted via GitHub login and username whitelist (`authorized_users.json`)
- Email notifications are triggered via GitHub issue label `email-alert`

---

Thanks again for helping us improve the SEQAM Lab site!  
Contact @vipavlovic on GitHub with any questions.
