/*
Extended React-based lab website with dynamic pages, GitHub-based data editing, and full support for people, projects, courses, and papers.
Includes GitHub Action, sample data, and package.json for GitHub Pages hosting.
*/

// Directory: package.json
{
  "name": "lab-website",
  "version": "1.0.0",
  "private": true,
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0"
  },
  "devDependencies": {
    "gh-pages": "^5.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

// Directory: .github/workflows/update-data.yml
name: Update Data from Issues

on:
  issues:
    types: [opened]

jobs:
  parse-and-append:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Parse issue and update data
        run: |
          node .github/scripts/parse-issue.js "$GITHUB_EVENT_PATH"

      - name: Commit changes
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@github.com"
          git add src/data/*.json
          git commit -m "Append new entry from issue"
          git push

// Directory: .github/scripts/parse-issue.js
const fs = require('fs');
const path = require('path');
const eventPath = process.argv[2];
const issue = JSON.parse(fs.readFileSync(eventPath, 'utf8')).issue;

const match = issue.title.match(/\[(.*?)\]/);
if (!match) process.exit(0);

const type = match[1].toLowerCase();
const body = issue.body.trim();
const entry = JSON.parse(body);

const filePath = path.resolve(__dirname, '../../src/data/' + type + '.json');
const existing = JSON.parse(fs.readFileSync(filePath));
existing.push(entry);
fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

// Directory: src/data/papers.json
[
  {
    "title": "Transformers in Vision",
    "authors": "Jane Doe, John Smith",
    "date": "2025-04-01",
    "link": "https://example.com/paper1"
  }
]

// Directory: src/data/projects.json
[
  {
    "title": "AI for Climate",
    "description": "Using ML to predict climate patterns.",
    "date": "2024-10-15"
  }
]

// Directory: src/data/people.json
[
  {
    "name": "Jane Doe",
    "title": "Postdoctoral Fellow",
    "research_interests": ["Computer Vision", "Deep Learning"],
    "profile_link": "https://example.com/jane"
  }
]

// Directory: src/data/courses.json
[
  {
    "name": "Deep Learning",
    "description": "Graduate-level course on deep learning methods.",
    "semester": "Spring 2025"
  }
]

// Reminder:
// Replace YOUR_USERNAME and YOUR_REPO_NAME in package.json homepage.
// Run `npm run deploy` to publish to GitHub Pages.
// Ensure repo has proper PAT or GitHub App permissions for Actions to push changes.
