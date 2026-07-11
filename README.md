# 🏋️ Noah & Katie's Corner of the Internet

A little personal hub built with Next.js — part fitness tracker, part Katie's
medical-school portfolio, part Raspberry Pi home dashboard, and part
"we'll get to it eventually."

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-backend-3ecf8e?logo=supabase)

## 🗺️ What's in here

| Route | What it does |
|---|---|
| `/` | Home — links out to everything below |
| `/login`, `/fitness/[username]/home` | Calorie/weight tracker backed by Supabase |
| `/katie` | Katie's professional bio & CV |
| `/raspberrypi` | Live weather + calendar + photo slideshow dashboard, meant to run on a Pi |
| `/account`, `/signup`, `/notes`, `/recipes`, `/noah` | 🚧 Coming soon |

## 📁 Project shape

Routes are grouped by who/what they belong to, each with its own
`layout` / `loading` / `error` boundaries:

```
src/app/
  (main)/        # account, fitness tracker, login, notes, recipes...
  (katie)/       # Katie's bio page
  (raspberrypi)/ # the home dashboard
  api/           # server route handlers (e.g. /api/weight)
```

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and poke around.

## 🛠️ Stack

- [Next.js](https://nextjs.org) (App Router)
- [Supabase](https://supabase.com) for auth/data
- [Tailwind CSS](https://tailwindcss.com) + [base-ui](https://base-ui.com)/[Radix](https://www.radix-ui.com) for styling & primitives

## 📸 The Raspberry Pi dashboard

`/raspberrypi` is designed to be pinned open on an actual Raspberry Pi
sitting on a kitchen counter — clock, weather, shared calendar, and a
rotating photo slideshow, no login required.
