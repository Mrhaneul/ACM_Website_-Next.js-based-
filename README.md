# ACM at CBU

Public website for the Association for Computing Machinery student chapter at California Baptist University. Next.js 15 (App Router), Tailwind 3, Firebase Hosting + Firestore.

Live: https://acm-website-459ef.web.app

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
```

## Where things live

| What | Where |
|---|---|
| External links (Teams join link, Instagram, email, app store links) | `src/config/site.ts` |
| Team descriptions, leads, meeting info | `src/data/teams.ts` |
| AIM partnership content | `src/data/aim.ts` |
| Skill taxonomy, majors, years for the join form | `src/data/skills.ts` |
| Design tokens and shared classes (`btn-primary`, `field`, `card`, ...) | `src/app/globals.css`, `tailwind.config.ts` |
| Pages | `src/app/{page,teams,about,join,contact}/` |
| Join flow (form, skill picker, Teams setup guide) | `src/components/Join/` |
| Firestore security rules | `firestore.rules` |

### Updating the Microsoft Teams join code

Edit `teamsJoinCode` in `src/config/site.ts`. "Join on Teams" buttons go to `/linktree`, which shows the code, and the setup guide on `/join` reads it too. Officers, advisor, and the general meeting time live in the same file.

### Form submissions

- **Join form (`/join`)** writes to the `registrations` collection. `/register/admin` lists submissions, shows per-team counts, and exports CSV. To use it, create an account at `/login` with your CBU email, verify it, then sign in on the admin page. Only emails listed as officers (`src/config/site.ts`) or team leads (`src/data/teams.ts`) can read; that allowlist is duplicated in `firestore.rules`, so update both when leadership changes. `/register` redirects to `/join`.
- **Contact form** writes to `messages`. Same read rules.

No environment variables are required.

### AIM partnership

Copy for the partnership lives in `src/data/aim.ts` (per-team deliverables, problem areas, principles, travel ideas). The logo is `public/aim-logo.png`.

### Tests

```bash
npm test   # vitest: csv + registration validators
```

## Deploy

The site is a static export (`output: "export"` in `next.config.ts`); `next build` writes `out/` and Firebase Hosting serves it. No Cloud Functions, no server.

```bash
npm run build
firebase deploy                          # hosting + firestore rules
firebase deploy --only hosting           # just the site
firebase deploy --only firestore:rules   # just the rules
```

## Member portal (not linked from the site)

`/login` and `/dashboard` are a Firebase Auth member portal from an earlier iteration. They still build and work but nothing on the public site links to them.
