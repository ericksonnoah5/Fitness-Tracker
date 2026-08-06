# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal Next.js hub for Noah & Katie: a Supabase-backed calorie/weight
fitness tracker, Katie's professional bio/CV, a Raspberry Pi kitchen-counter
dashboard, and a handful of "coming soon" pages (account, notes, recipes).

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # run production build
npm run lint    # next lint (extends next/core-web-vitals, next/typescript)
```

There is no test runner configured in this repo.

## Architecture

**App Router with route groups** (`src/app/`):

- `(main)/` — the fitness tracker and misc pages (`account`, `notes`, `recipes`, `test`), plus a nested `(fitness)` group for `login`, `signup`, and `fitness/[username]/home`. Has shared `layout.tsx`/`loading.tsx`/`error.tsx`/`not-found.tsx`.
- `(professional)/` — `katie` and `noah` bio pages, with its own `layout`/`loading`/`error`/`not-found` boundaries.
- `dashboard/` and `dashboardv2/` — the Raspberry Pi dashboard (weather/calendar/photo slideshow), outside any route group, each with independent styling (`dashboard/style.css`).
- `api/` — route handlers: `weight` (calorie averaging), `push/subscribe` and `push/send` (Web Push via `web-push`), `verify-passkey`, `test`.

**Supabase** is the only backend/data store:

- `src/lib/supabase/client.ts` — browser client (`createClient` from `@supabase/supabase-js`), for use in client components.
- `src/lib/supabase/server.ts` — server client (`createServerClient` from `@supabase/ssr`), wires Next's cookie store for SSR/route handlers. Use this one in API routes and server components.
- `supabase/migrations/` — SQL migrations (currently just the photo storage bucket). No local Supabase CLI config is checked in; migrations are applied manually against the hosted project.
- `src/middleware.ts` is currently a no-op passthrough — no auth/session refresh logic is wired up yet despite Supabase SSR being in place.

**Auth model is minimal/ad hoc**: `api/verify-passkey` checks a submitted value against a single shared `mypasskey` env var rather than per-user Supabase auth — this guards Noah's/Katie's private pages, not a multi-user account system.

**Push notifications**: `push_subscriptions` table in Supabase stores endpoint/keys per subscriber; `api/push/send` broadcasts to all rows via `web-push` and prunes subscriptions that come back 404/410 (expired).

**UI stack**: Tailwind CSS + shadcn (`components.json`: style `radix-vega`, base color `zinc`, icon library `hugeicons`) on top of `radix-ui`/`@base-ui/react` primitives. Shared UI lives in `src/components/ui/`; app-specific components (notification settings, photo upload, service worker registration) live directly in `src/components/`. Path alias `@/*` maps to `src/*`.

**PWA bits**: `manifest.json` + `ServiceWorkerRegister` component registered in the root layout — the app is installable and push-capable.

## Notes

- The README's route table is out of date (references `(raspberrypi)` and `(katie)` route groups that no longer exist as such — the dashboard now lives at `dashboard`/`dashboardv2` and bios are under `(professional)`). Trust the actual `src/app` structure over the README when they disagree.
- ESLint/Prettier are configured (`prettier-plugin-tailwindcss` for class sorting) but there's no pre-commit hook enforcing them — run `npm run lint` manually before committing.

## Trigger word: "to-do"

If the user's entire message is just "to-do" (any casing), open `c-todo.md`
in the project root and work through its items as your task list for that
message — don't ask for clarification first, just start.

Marking convention as you finish each item, in place in `c-todo.md`:

- `X` — done
- `-` — mostly/partially done
- `O` — not done / not started

Leave completed-but-unmarked items as plain text until you've actually
done the work; don't pre-mark before finishing.

there will also be levels of intensity that I want low medium high

low - just make it work lowest amount of tokens as possible quickest you can bugs are expected just functionality not perfection
med - be normal, do some tests, make it look nice, function and form, resonable amount of work, plan a little, reseach if needed
high - do not hold back, use as many tokens as possible, think big, do deep reseach, plan, work on this for a long time, more tokens the better

I will also let you know if I want a new branch or for you to commit or not.
If there are old itemms on the list that are marked off just ignore them and move on.
