# Asian Calorie Tracker

A simple calorie tracking app focused on everyday Asian foods — rice, noodles, dim sum, curries, bubble tea, and more. Track your daily intake and use AI to identify calories from natural language descriptions.

## Features

- **70+ Asian foods** — Chinese, Japanese, Korean, Thai, Vietnamese, Filipino, Indian, Malaysian, and more
- **Daily progress tracking** — Visual ring showing calories consumed vs. your daily goal
- **Meal logging** — Organize entries by breakfast, lunch, dinner, or snack
- **AI food identifier** — Describe what you ate (e.g. "2 bowls of pho", "large fried rice") and get calorie estimates
- **Browse & search** — Filter by category or search by name, including local language names (中文, 日本語, 한국어)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API server runs on port 3001.

## AI Identification

The app includes a smart local food matcher that understands portions, quantities, and fuzzy descriptions. For enhanced accuracy, set an OpenAI API key:

```bash
export OPENAI_API_KEY=sk-...
npm run dev
```

Without an API key, the built-in matcher uses the Asian foods database with intelligent fallback estimates.

## Production (self-hosted)

```bash
npm run build
npm start
```

Serves the built app and API on port 3001.

## Deploy to Netlify

The app is configured for Netlify out of the box — static frontend plus serverless functions for the AI API.

### Option A: Deploy from GitHub (recommended)

1. Go to [app.netlify.com](https://app.netlify.com) and sign in
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub account and select the **MyWeightLossPlan** repo
4. Netlify will read `netlify.toml` automatically:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

After the first deploy, your app will be live at a URL like `https://random-name.netlify.app`.

### Option B: Deploy from the CLI

```bash
npm install
npx netlify login
npx netlify init
npx netlify deploy --prod
```

### Optional: OpenAI on Netlify

For enhanced AI food identification in production:

1. In Netlify, go to **Site settings** → **Environment variables**
2. Add `OPENAI_API_KEY` with your API key
3. Redeploy the site

Without it, the built-in smart matcher still works.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- Express API server
- LocalStorage for persistence
