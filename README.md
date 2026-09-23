# Fitness Tracker

A Next.js personal hub combining calorie tracking, a home dashboard, professional profiles, and a dog potty tracker.

[Live site](https://fitness-tracker-chi-ashy.vercel.app)

## Overview

Originally a fitness tracker, this project has grown into a shared personal hub for Noah and Katie. Supabase provides data storage for calorie entries, dog events, photo uploads, and push subscriptions. Several account and planning pages remain placeholders.

## Features

- Calorie entry history, running totals, and a calculated average.
- A home dashboard with calendar embeds, weather, and rotating photos.
- Professional profile pages and portfolio content.
- Dog potty event logging through `/dogdash`.
- Photo uploads and Web Push subscription components.
- PWA manifest and service worker registration.

## Tech stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS and reusable UI components
- Supabase browser and server clients
- Web Push via `web-push`

## Getting started

```bash
git clone https://github.com/ericksonnoah5/Fitness-Tracker.git
cd Fitness-Tracker
npm ci
cp .env.example .env.local
```

Fill in `.env.local` with your own Supabase and, if needed, Web Push configuration, then run:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

### Backend configuration

The repository does not include a complete database schema, seed data, or migration set. A fresh Supabase project needs tables and policies matching the source before data-backed features work:

- `Users`, `Weight`, `Input`, and `Day` for the fitness pages and calorie average API.
- `PottyTime` for dog events.
- `push_subscriptions` for Web Push endpoints and keys.
- A `photos` storage bucket for uploads.

Use the queries in `src/app/` and `src/components/` to inspect the expected fields. Set up access policies on your own Supabase project. The provided environment template contains placeholders only.

## Project structure

```text
src/app/
  (main)/           Home, fitness, login, and placeholder pages
  (professional)/   Katie and Noah profile pages
  dashboard/        Calendar, weather, and photo dashboard
  dogdash/          Dog potty tracker
  api/              Calorie average, passkey, and push handlers
src/components/     Shared UI, uploads, and notifications
src/lib/supabase/   Browser and server database clients
public/             Images, videos, PWA assets, and dashboard script
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve a production build |
| `npm run lint` | Existing `next lint` script; tooling needs updating for the declared Next.js version |

## Limitations

This is a personal prototype. The fitness login compares a username and plaintext password against the `Users` table instead of establishing a Supabase Auth session. The shared passkey check is separate, middleware does not enforce authentication, and API authorization needs further work before use as a public multi-user service.

Some routes remain unfinished. Database setup is manual, and the calorie-to-weight display is a simplified calculation. The repository includes personal media and calendar identifiers; replace these when adapting the project. No automated test suite is configured.

## Credits

Created by Noah Erickson for Noah and Katie. Dashboard weather is provided by Open-Meteo, with calendar views from Google Calendar.

## License

Source code is available under the [MIT License](LICENSE). Personal photographs, videos, CV documents, and biographical content are not included in the software license.
