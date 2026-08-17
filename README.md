# Affinity 3CX Command Centre

A responsive React and TypeScript proof-of-concept for an executive 3CX operations dashboard, with priority visibility for missed calls in the Sales queue.

## Live demo

[Open the CIO dashboard preview](https://dan-affinity.github.io/affinity-3cx-dashboard/)

> [!IMPORTANT]
> This is a frontend demonstration using fictional mock data. All names, phone numbers, calls, queue activity, and performance metrics shown in the dashboard are fabricated and are not sourced from a live 3CX system.

## Run locally

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Current architecture

```text
React UI
  -> useThreeCxDashboard()
  -> threeCxService.ts
  -> mockThreeCxService.ts
```

The UI depends on `threeCxService.ts`, not directly on the mock provider. When live integration is available, this service will call an authenticated Affinity backend that combines supported 3CX Call Control and reporting/CDR data.

```text
React dashboard
  -> authenticated Affinity backend
  -> 3CX Call Control and reporting/CDR feeds
```

Never place 3CX credentials or client secrets in this frontend, browser storage, or a `VITE_` environment variable.

## Included

- Sales-first missed-call overview
- Active, waiting, available-agent, missed-call, and SLA KPIs
- Operational attention alerts
- Live call activity
- Queue performance and agent presence
- Hourly answered and missed-call volume
- Recent missed-call history
- 10-second mock refresh
- Responsive executive desktop and mobile layouts

## Deployment

Pushes to `main` build and deploy the static dashboard through GitHub Actions and GitHub Pages. The Vite base path is configured for the `affinity-3cx-dashboard` project site.
