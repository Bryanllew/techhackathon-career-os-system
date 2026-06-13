# Career OS

**See where your career is actually heading.** Career OS replaces the résumé with a trajectory graph — mapping where people are going, not just where they've been — and matches them to roles that sit on that path.

## The Problem

Job boards see your last role. Recruiters see your last title. Both reduce your career to a single point in time — your past. The result is a labor market that matches résumés to job descriptions, not people to opportunities.

## What Career OS Does

**For candidates**, Career OS is a career operating system. It shows real career paths from 50,000+ trajectories, maps the skills needed for each transition, and turns your job search into a structured workflow.

**For employers**, Career OS is a workforce intelligence layer. It tracks team engagement, identifies flight risks, and surfaces candidates whose trajectory aligns with open roles — including past applicants whose skills have since caught up.

## Key Features

### Candidate Dashboard
- **Trajectory Mapping** — Visualize career paths others have taken from roles like yours, with timelines, salary bands, and unlock skills
- **Skills Gap Analysis** — See what skills you're missing for target roles, ranked by current market demand
- **Kanban Pipeline** — Manage your job search across 6 stages (Saved → Networking → Applying → Applied → Interviewing → Offer)
- **Personal Deal Room** — 7-tab side panel consolidating everything about an opportunity: role overview, interview tips, AI tools, contacts, similar jobs, notes, and company context
- **Smart Apply** — AI-assisted application tools

### Employer Dashboard
- **Team Signals** — Monitor engagement and identify flight risks before people leave
- **Candidate Search** — Find people by trajectory fit, not keyword overlap
- **Role Management** — Track active roles and their applicant pipelines
- **Re-engagement** — Flag past candidates whose skills now match open roles
- **Workforce Planning** — Internal mobility and development path tracking

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| UI | React 19, shadcn/ui, Radix UI |
| Styling | Tailwind CSS 4, CSS custom properties |
| Forms | React Hook Form, Zod |
| Charts | Recharts |
| Icons | Lucide React |
| Package Manager | pnpm |

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Setup

```bash
# Clone the repo
git clone https://github.com/Bryanllew/techhackathon-career-os-system.git
cd techhackathon-career-os-system/career-os

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
career-os/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── candidate/                # Candidate portal
│   │   ├── page.tsx              # Candidate login/signup
│   │   └── dashboard/            # Candidate dashboard pages
│   │       ├── overview/         # Career overview & trajectory
│   │       ├── jobs/             # Job listings
│   │       ├── job/[id]/         # Job detail with deal room
│   │       ├── skills/           # Skills gap analysis
│   │       ├── resume/           # Resume manager
│   │       ├── trajectory/       # Career path explorer
│   │       ├── smart-apply/      # AI-assisted apply
│   │       ├── explore/          # Company & role exploration
│   │       └── profile/          # User profile
│   └── employer/                 # Employer portal
│       └── dashboard/            # Employer dashboard pages
│           ├── people/           # Team management
│           ├── roles/            # Role management
│           ├── roles/[id]/       # Role detail & applicants
│           ├── candidate/[id]/   # Candidate detail view
│           ├── search/           # Candidate search
│           ├── saved/            # Saved candidates
│           ├── reengagement/     # Past candidate tracking
│           └── workforce/        # Workforce planning
├── components/
│   ├── ui/                       # shadcn/ui components (80+)
│   └── theme-provider.tsx        # Dark/light theme provider
├── lib/                          # Shared utilities
├── hooks/                        # Custom React hooks
├── styles/                       # Global styles
└── public/                       # Static assets
```

## Design

Dark iOS glass morphism — translucent surfaces, backdrop blur, layered depth, and a design token system built to scale. Supports both dark and light modes via `next-themes`.

## License

MIT

---

Built for the Tech Hackathon. [Live demo →](https://career-os-olive.vercel.app)
