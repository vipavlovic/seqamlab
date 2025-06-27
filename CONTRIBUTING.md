# Contributing to the SEQAM Lab Website

We welcome contributions! Here's how you can help:

## 📝 Add Content
1. Go to **Issues** in the GitHub repo
2. Create a new issue with this format:
   **Title:** `[PAPERS] Title of the Paper`
   **Body:**
   ```json
   {
     "title": "Example Paper",
     "authors": "Jane Doe, John Smith",
     "date": "2025-06-01",
     "link": "https://example.com"
   }
   ```
3. The GitHub Action will automatically add it to `papers.json`

## 🧑‍💻 Develop Locally
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm start
```

## 🌟 Tips
- Use valid JSON
- Title tags like `[PROJECTS]`, `[COURSES]`, `[PEOPLE]`, `[PAPERS]`
- Open a pull request for code changes

Thanks for contributing!
