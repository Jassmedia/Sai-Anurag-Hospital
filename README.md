# Sai Anurag — Website (Phase 1)

Frontend-only website built with **Next.js (App Router) + TypeScript + CSS Modules**.
No backend, database or third-party integrations yet.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Where to update content

| What                                   | File                          |
| -------------------------------------- | ----------------------------- |
| Address, phone, WhatsApp, email, hours, map, social links, booking link | `src/config/site.ts` |
| Doctors (photos, qualifications, bio)  | `src/data/doctors.ts`         |
| Specialties                            | `src/data/specialties.ts`     |
| "Why Choose" items, About checklist    | `src/data/highlights.ts`      |
| Contact form submission                | `src/lib/contact.ts`          |
| WhatsApp number                        | `src/config/whatsapp.ts`      |
| Appointment timings, days off          | `src/data/availability.ts`    |
| Appointment submission / availability API | `src/lib/appointments.ts`  |
| About section photos                   | `src/data/images.ts`          |
| Colours, fonts, spacing (design tokens)| `src/app/globals.css`         |

Any contact value left as `null` shows "To be updated" on the site.
Doctor photos go in `public/images/doctors/` and are referenced from `doctors.ts`.

## Logo

`public/images/logo/sai-anurag-logo.png` is the original logo. The header and
footer use pieces cut from it: `logo-mark*.png` (symbol) and `logo-wordmark*.png`
("Sai Anurag"), with `-light` versions for dark backgrounds. The favicon is
`src/app/icon.png` and the iPhone home-screen icon is `src/app/apple-icon.png`.
If the logo changes, regenerate these files from the new original.
