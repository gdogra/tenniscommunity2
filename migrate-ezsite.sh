#!/bin/bash

# Exit immediately if any command fails
set -e

echo "🔁 Starting migration from ../ezsite into tenniscommunity-web"

# Copy components
mkdir -p src/components
cp -R ../ezsite/components/* src/components/

# Copy hooks
mkdir -p src/hooks
cp -R ../ezsite/hooks/* src/hooks/

# Copy pages -> pages/
mkdir -p src/pages
cp -R ../ezsite/pages/* src/pages/

# Copy styles
mkdir -p src/styles
cp -R ../ezsite/styles/* src/styles/

# Copy Firebase setup only (not supabase)
mkdir -p src/lib
cp ../ezsite/lib/firebase.js src/lib/firebase.ts

# Copy index.html as reference (optional)
cp ../ezsite/index.html public/index.ezsite.html

# Clean conflicting app dir if present
if [ -d "src/app" ]; then
  echo "⚠️  Removing conflicting src/app directory..."
  rm -rf src/app
fi

# Clean up .next and build artifacts
rm -rf .next out

echo "✅ Migration complete. You can now run:"
echo ""
echo "   npm run dev"
echo ""

