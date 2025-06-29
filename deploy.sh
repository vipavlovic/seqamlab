#!/bin/bash

# Copy private version into the deployable public directory
cp src/data/papers.private.json public/data/papers.json

# Build and deploy
npm run build
npm run deploy

# Restore original (optional safety)
git restore public/data/papers.json

echo "✅ Deployed with private papers.json"
