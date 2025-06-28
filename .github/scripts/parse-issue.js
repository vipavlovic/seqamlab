const fs = require('fs');
const path = require('path');

const issueTitle = process.argv[2];
const issueBody = process.argv[3];

if (!issueTitle || !issueBody) {
  console.error('❌ Missing issue title or body.');
  process.exit(1);
}

const typeMatch = issueTitle.match(/^\[(.*?)\]/);
if (!typeMatch) {
  console.error('❌ Cannot determine entry type from title.');
  process.exit(1);
}

const type = typeMatch[1].toLowerCase();
console.log('🧠 Detected type:', type);

const jsonMatch = issueBody.match(/```json\n([\s\S]*?)\n```/);
if (!jsonMatch) {
  console.error('❌ Cannot extract JSON payload from issue body.');
  process.exit(1);
}

let dataToAppend;
try {
  dataToAppend = JSON.parse(jsonMatch[1]);
  console.log('📦 Parsed JSON:', dataToAppend);
} catch (err) {
  console.error('❌ Invalid JSON format in issue body.', err);
  process.exit(1);
}

const filePath = path.join(__dirname, '../../src/data', `${type}s.json`);
console.log('📁 Target file:', filePath);

let existing = [];
if (fs.existsSync(filePath)) {
  try {
    existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error('❌ Failed to read existing data file.', err);
    process.exit(1);
  }
} else {
  console.warn('⚠️ File does not exist. Creating new one.');
}

existing.push(dataToAppend);

try {
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  console.log(`✅ Appended entry to ${type}s.json`);
} catch (err) {
  console.error('❌ Failed to write to file.', err);
  process.exit(1);
}
