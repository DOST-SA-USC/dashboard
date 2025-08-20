#!/bin/bash

# Development Environment Setup Script
# This script sets up the development environment for the DOST SA USC Tracker

set -e

echo "🚀 Setting up DOST SA USC Tracker development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for .env.local file
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local from example..."
    cp .env.local.example .env.local
    echo "⚠️  Please edit .env.local with your actual environment variables"
fi

# Run initial checks
echo "🔍 Running code quality checks..."

# Type checking
echo "  🔧 Type checking..."
npm run type-check

# Linting
echo "  📋 Linting..."
npm run lint

# Formatting check
echo "  💅 Formatting check..."
npm run format:check

# Testing
echo "  🧪 Running tests..."
npm run test

# Build test
echo "  🏗️  Testing build..."
npm run build || echo "⚠️  Build failed - this might be due to missing environment variables"

echo ""
echo "🎉 Development environment setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your environment variables"
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. Open http://localhost:3000 in your browser"
echo ""
echo "Available scripts:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run lint         - Run linting"
echo "  npm run format       - Format code"
echo "  npm run test         - Run tests"
echo "  npm run type-check   - Check TypeScript types"
echo ""
echo "Happy coding! 🚀"