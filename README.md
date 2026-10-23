# AI Motion Presentation Studio

A modern AI SaaS starter for generating cinematic motion graphics presentations from a prompt.

## Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenAI API (with graceful mock fallback)

## Features
- Prompt-based storyboard generation
- Storyboard preview UI
- Motion style suggestions
- Investment pitch / product demo presentation flow
- Fallback demo mode without API keys

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Add your API keys if available.
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Future roadmap
- Add editing for each scene
- Add TTS voiceover generation
- Add export as MP4 or animated web deck
- Add user accounts and saved projects
- Add Claude API support alongside OpenAI
