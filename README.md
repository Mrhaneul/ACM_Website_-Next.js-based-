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

- **Join form (`/join`)** writes to the `registrations` collection in the **acm-cbu-open-house** Firebase project (see `src/lib/firebase-registration.ts`). It needs the `NEXT_PUBLIC_REG_*` values from `.env.local.example` in a `.env.local` file, both locally and in the deploy environment. `/register/admin` lists submissions and exports CSV; `/register` redirects to `/join`.
- **Contact form** writes to `messages` in the main project. Anyone can create (validated by `firestore.rules`); only users whose `users/{uid}.role` is `admin` or `leader` can read.

### AIM partnership

Copy for the partnership lives in `src/data/aim.ts` (per-team deliverables, problem areas, principles, travel ideas). The logo is `public/aim-logo.png`.

### Tests

```bash
npm test   # vitest: csv + registration validators
```

## Deploy

```bash
firebase deploy                 # hosting + firestore rules
firebase deploy --only hosting  # just the site
```

## Member portal (not linked from the site)

`/login` and `/dashboard` are a Firebase Auth member portal from an earlier iteration. They still build and work but nothing on the public site links to them.
