# GhostRadio

A full-stack internet radio streaming web app built with Next.js, TypeScript, and Tailwind CSS. Browse stations by country and stream live radio using the [Radio Browser API](https://www.radio-browser.info/).

## Features

- Browse countries with station counts and flag emojis
- Search/filter countries and stations
- Stream radio stations via HTML5 audio (`url_resolved`)
- Play/pause controls with volume slider
- Dark-themed sidebar + player layout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/internet-radio)

Or deploy from the CLI:

```bash
npm install -g vercel
vercel
```

The app uses Next.js API routes to proxy Radio Browser API requests, avoiding CORS issues in production.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radio Browser API](https://de1.api.radio-browser.info/)
