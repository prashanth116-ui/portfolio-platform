# Prashanth Sundaram — Portfolio & Tools

A unified portfolio platform built with Next.js 14, showcasing software projects, trading systems, and a live stock scanner.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Charts**: react-plotly.js (equity curves, P/L bars, pie charts)
- **Diagrams**: Mermaid.js (strategy flow diagrams)
- **Database**: Supabase (PostgreSQL) for scanner data
- **Hosting**: Vercel with cron jobs
- **Data Feed**: TradingView screener via Python + Finnhub API fallback

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, metrics, featured projects |
| `/projects` | All 15 projects grouped by status |
| `/trading` | Trading systems overview + strategies |
| `/trading/flows` | 9 Mermaid strategy flow diagrams |
| `/trading/timeline` | Version history V6→V10.16 with A/B tests |
| `/trading/performance` | Charts, metrics, daily breakdown (privacy toggle) |
| `/scanner` | Live stock scanner with filters and sorting |
| `/astrology` | Coming soon placeholder |

## Getting Started

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env.local
# Fill in your Supabase and Finnhub keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase connection
- `SUPABASE_SERVICE_ROLE_KEY` — Server-side Supabase access
- `FINNHUB_API_KEY` — Stock data API (free tier: 60 calls/min)
- `CRON_SECRET` — Protects the `/api/scanner/fetch` endpoint
- `NEXT_PUBLIC_APP_URL` — Your deployed URL

## Scanner Setup

1. Create tables in Supabase using `supabase/schema.sql`
2. Optionally seed demo data with `supabase/seed.sql`
3. Set env vars in Vercel
4. Vercel cron runs `/api/scanner/fetch` every 15 min during market hours (Mon-Fri 9AM-4PM)

For local testing with TradingView data:
```bash
pip install tradingview-screener supabase
python scripts/fetch_tv_data.py
```

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy — zero code changes needed

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── projects/page.tsx     # Projects grid
│   ├── trading/
│   │   ├── page.tsx          # Trading overview
│   │   ├── flows/page.tsx    # Mermaid diagrams
│   │   ├── timeline/page.tsx # Version history
│   │   └── performance/page.tsx # Charts & metrics
│   ├── scanner/page.tsx      # Stock scanner
│   ├── astrology/page.tsx    # Placeholder
│   └── api/scanner/          # Scanner API routes
├── components/
│   ├── ui/                   # shadcn base components
│   ├── charts/               # Plotly chart wrappers
│   ├── nav.tsx               # Navigation header
│   ├── project-card.tsx      # Project cards
│   ├── strategy-card.tsx     # Strategy cards
│   └── mermaid-diagram.tsx   # Mermaid renderer
├── data/                     # Static data (migrated from Streamlit JSON)
└── lib/                      # Utilities + Supabase client
scripts/
    fetch_tv_data.py          # TradingView screener → Supabase
supabase/
    schema.sql                # Database tables + RLS
    seed.sql                  # Demo data
```
