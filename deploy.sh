#!/bin/bash

# Replace the public version with private version for deployment
cp src/data/papers.private.json src/data/papers.json

# Build and deploy the site
npm run build
npm run deploy

# Restore the public version (if needed)
git restore src/data/papers.json

echo "✅ Deployed with private papers.json"
