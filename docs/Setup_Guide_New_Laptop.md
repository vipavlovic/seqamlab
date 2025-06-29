# SEQAM Lab Website – Setup Guide for a New Laptop

This guide walks you through cloning, running, and securely configuring the SEQAM lab website on a new Mac or Linux system.

---

## ✅ 1. Prerequisites

- **Git** (install via Homebrew or Xcode Command Line Tools)
- **Node.js ≥ 16** (recommend using [nvm](https://github.com/nvm-sh/nvm))

```bash
# Install Node.js via NVM
brew install nvm
nvm install 18
nvm use 18
```

---

## 📦 2. Clone the Project

```bash
git clone https://github.com/vipavlovic/seqamlab.git
cd seqamlab
```

---

## 📂 3. Recommended Directory Location

Use a local folder **outside of Dropbox or iCloud**:

```bash
mkdir -p ~/Projects
mv seqamlab ~/Projects/
cd ~/Projects/seqamlab
```

---

## 🔐 4. Restore Private Files

### ✅ `authorized_users.json`
This file is `.gitignore`d and must be manually copied:

```
src/data/authorized_users.json
```

Ask the lab PI or a trusted member to send you this file securely.

---

## 🔑 5. Install Dependencies

```bash
npm install
```

---

## 🧪 6. Run the Website Locally

```bash
npm start
```

Visit:
```
http://localhost:3000/seqamlab
```

---

## 🚀 7. Deploy (if needed)

```bash
npm run build
npm run deploy
```

---

## 🔒 8. GitHub Login Setup (Submit Page)

Ensure the Firebase Auth GitHub login works:

- Add your domain (`vipavlovic.github.io`) to Firebase Auth → Settings → **Authorized domains**
- Sign in on the [Submit page](https://vipavlovic.github.io/seqamlab/submit) with your GitHub account

---

## 💡 Tips

- Never commit `authorized_users.json`
- Keep `src/firebase.js` or `.env` private if using environment variables

---

Contact @vipavlovic for setup help or access issues.
