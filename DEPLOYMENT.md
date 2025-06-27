# SEQAM Lab Website Deployment Guide

## 🔧 Prerequisites
- Node.js ≥ 16.x
- GitHub account and access to repo
- GitHub Personal Access Token (PAT) for form submissions

## 🚀 Initial Setup
```bash
npm install
```

## 🌍 Configure for Deployment
1. Edit `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO"
   ```
2. Add PAT and repo info in `Submit.jsx` or use GitHub secrets

## 🏗️ Build and Deploy
```bash
npm run deploy
```

## 🔁 Ongoing Maintenance
- Use GitHub Issues to submit new entries
- GitHub Action will append them to JSON data files

## ✅ Final Checklist
- [ ] Replace placeholders in `Submit.jsx`
- [ ] Verify favicon and `logo192.png` in `/public`
- [ ] Test navigation and routing
- [ ] Confirm GitHub Pages is enabled under repo Settings > Pages
