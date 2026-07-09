# Cellular Journeys

Marketing and informational website for Cellular Journeys, Inc., a 501(c)(3)
nonprofit in Jacksonville, Florida. The site is an organizational hub for
programs, platforms, events, involvement, internships, governance, contact, and
giving information.

CancerQuest.org is a separate live platform. This project links to CancerQuest
and does not rebuild or migrate it.

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Phosphor Icons
- Self-hosted Newsreader and Atkinson Hyperlegible fonts
- Vercel-compatible serverless form endpoint using Resend

## Local development

```bash
npm install
npm run dev
```

The Vite development server renders the site. The `/api/forms` endpoint is a
Vercel serverless function and requires a compatible local serverless runtime or
a Vercel deployment for end-to-end form delivery.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Form delivery

Forms post privately to `/api/forms`. The endpoint sends submissions by email
through Resend and does not persist them in a public database.

Configure these environment variables in the selected host:

```text
RESEND_API_KEY
FORM_DESTINATION_EMAIL
FORM_FROM_EMAIL
```

`FORM_FROM_EMAIL` must be a sender authorized by the client's Resend account.
The internship application and parent or guardian consent form may contain
sensitive personal information. Keep form delivery logs private, limit account
access, and establish a retention policy before launch.

## Portable deployment

The frontend builds to static files in `dist`. `vercel.json` supplies SPA route
rewrites, security headers, and the serverless forms route. Another static host
can serve the frontend if its rewrite rule sends application routes to
`index.html`. The form endpoint must be adapted to that host's function format.

## Content and data

Board, platform, event, and document-library content is stored in
`src/data/content.ts` so it can later be moved to a CMS without changing page
layouts.

The scientific images in `public/images` are generated editorial visuals. They
do not depict Cellular Journeys events, participants, or patient outcomes.

## Needs client input before launch

- Supply the official Cellular Journeys logo and wordmark asset.
- Supply approved board headshots.
- Supply the approved one-line descriptions for the six organizational values.
- Confirm the full platform descriptions for Facebook, Instagram, and LinkedIn.
- Confirm the Cancer Awareness Fair venue and final registration details.
- Supply approved photos and recaps for the Recent Event Highlights gallery.
- Supply the approved Program Philosophy paragraph.
- Supply the approved required qualities and preferred qualifications lists for
  internship eligibility.
- Supply approved legal language for participation consent, media release,
  public engagement, confidentiality, liability waiver, and medical
  authorization.
- Supply the adopted Bylaws, IRS tax-exempt status confirmation, Florida annual
  report, and Certificate of Liability Insurance in a public-safe form. Review
  every file for personal home addresses before publishing it.
- Supply any other approved governance, financial, impact, or policy documents.
- Supply the approved Conflict of Interest Policy paragraph and DEI and Respect
  statement.
- Provide the public organizational contact email and phone number.
- Select and configure Resend form delivery, including the private destination
  email address.
- Select a payment processor and provide approved legal donation language.
- Decide on the production host and configure `cellularjourneys.org`.

No financial totals, fundraising goals, audience metrics, testimonials, or
unverified impact figures are included.
