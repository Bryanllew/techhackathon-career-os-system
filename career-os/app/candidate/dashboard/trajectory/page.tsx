"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Target, Clock, Lightbulb, Calendar, Users, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// ── Paths ──────────────────────────────────────────────

const paths = [
  {
    role: "Data Scientist",
    fit: 92,
    fitLabel: "Strong fit",
    fitColor: "text-success",
    timeframe: "12–18 months",
    why: "Your 4 years of data analysis combined with growing ML skills makes this the most natural next step. Candidates with your profile who added ML depth consistently reached Senior DS within 18 months.",
    nextSteps: ["Complete an advanced ML certification (Coursera or DataCamp)", "Build 2–3 portfolio projects with predictive modelling", "Apply to 10+ Data Scientist roles — your ML project outcomes will differentiate you"],
    color: "#5AC8FA",
    milestones: [
      { label: "ML Foundations", time: "3 months", skill: "Machine Learning", salary: "RM 14,000" },
      { label: "First DS Role", time: "9 months", skill: "Deep Learning", salary: "RM 18,000" },
      { label: "Senior Data Scientist", time: "18 months", skill: "MLOps", salary: "RM 24,000" },
    ],
    people: { count: 143, median: "14 months", key: "Machine Learning certification" },
  },
  {
    role: "Product Analyst",
    fit: 87,
    fitLabel: "Good fit",
    fitColor: "text-warning",
    timeframe: "6–9 months",
    why: "Your stakeholder communication skills and business acumen position you well for product-facing analytics. This is a faster transition that keeps you close to business impact.",
    nextSteps: ["Learn product analytics frameworks (AARRR, North Star Metric)", "Shadow a product manager weekly for 4 weeks", "Lead a cross-functional analytics project from scoping to presentation"],
    color: "#F59E0B",
    milestones: [
      { label: "Product Thinking", time: "2 months", skill: "A/B Testing", salary: "RM 12,000" },
      { label: "Product Analyst Role", time: "6 months", skill: "User Research", salary: "RM 15,000" },
    ],
    people: { count: 89, median: "7 months", key: "Stakeholder communication" },
  },
  {
    role: "BI Manager",
    fit: 78,
    fitLabel: "Worth exploring",
    fitColor: "text-foreground-tertiary",
    timeframe: "18–24 months",
    why: "This path builds toward people leadership. It takes longer because it requires developing both technical depth and management experience — but the long-term earning potential is significant.",
    nextSteps: ["Start mentoring junior analysts on your team now", "Lead a data quality or governance initiative this quarter", "Present strategic insights to executive stakeholders monthly"],
    color: "#8E8E93",
    milestones: [
      { label: "Advanced SQL", time: "2 months", skill: "Data Modelling", salary: "RM 13,000" },
      { label: "BI Analyst", time: "8 months", skill: "Strategic Planning", salary: "RM 16,000" },
      { label: "BI Manager", time: "24 months", skill: "Team Leadership", salary: "RM 22,000" },
    ],
    people: { count: 67, median: "22 months", key: "Team leadership exposure" },
  },
]

const comparison = [
  {
    label: "Time to transition",
    ds: "12–18 months",
    pa: "6–9 months",
    bm: "18–24 months",
  },
  {
    label: "Salary uplift (MYR/mo)",
    ds: "+RM 6,000–12,000",
    pa: "+RM 3,000–6,000",
    bm: "+RM 5,000–10,000",
  },
  {
    label: "Difficulty",
    ds: "Building technical ML depth",
    pa: "Shifting analytical mindset to product",
    bm: "Developing people leadership",
  },
  {
    label: "Skills to build",
    ds: "ML, Deep Learning, MLOps",
    pa: "Product metrics, A/B testing, UX research",
    bm: "Team leadership, data strategy, exec comms",
  },
]

// ── Page ───────────────────────────────────────────────

export default function TrajectoryPage() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <div className="min-h-screen p-8">
      <Link href="/candidate/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />Back to dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">My Trajectory</h1>
        <p className="text-muted-foreground">
          Here are the realistic paths available from where you are now. These are based on outcomes of real people with similar profiles — not a prediction of your specific future.
        </p>
      </div>

      {/* Starting Point */}
      <Card className="mb-6 border-border/60 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg"><Target className="h-5 w-5 text-primary" />Your Starting Point</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="rounded-lg border border-border bg-secondary px-6 py-4">
              <p className="text-lg font-semibold text-foreground">Data Analyst</p>
              <p className="text-sm text-muted-foreground">Current Role</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">4 years</span> of experience</p>
              <p>Strong foundation in SQL, Python, and statistical analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Visual Career Map ────────────────────────── */}
      <Card className="mb-6 border-border/60 bg-card/50">
        <CardContent className="p-6">
          <h3 className="mb-6 text-sm font-semibold text-foreground">Career Path Map</h3>

          {/* Starting node */}
          <div className="mb-8 flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-[10px] font-semibold text-primary">You</div>
            <span className="ml-3 text-[13px] font-medium text-foreground">Data Analyst — You are here</span>
          </div>

          {/* Three lanes */}
          <div className="space-y-8">
            {paths.map((path, pi) => (
              <div key={path.role}>
                {/* Lane label */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: path.color }} />
                  <span className="text-[11px] font-semibold text-foreground">{path.role}</span>
                  <span className={`text-[10px] font-medium ${path.fitColor}`}>{path.fitLabel}</span>
                </div>

                {/* Lane bar */}
                <div className="relative mb-2 h-2 w-full rounded-full bg-secondary">
                  <div className="absolute inset-y-0 left-0 rounded-full opacity-30" style={{ backgroundColor: path.color, width: pi === 0 ? "80%" : pi === 1 ? "60%" : "50%" }} />
                </div>

                {/* Milestone nodes */}
                <div className="relative flex justify-between" style={{ paddingLeft: "5%", paddingRight: pi === 1 ? "25%" : "5%" }}>
                  {path.milestones.map((m, mi) => (
                    <div key={m.label} className="relative flex flex-col items-center" style={{ left: `${mi * 15}%` }}>
                      {/* Connector line */}
                      {mi < path.milestones.length - 1 && (
                        <div className="absolute top-4 left-8 h-px bg-border" style={{ width: "60px" }} />
                      )}
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all hover:scale-110"
                        style={{ borderColor: path.color, backgroundColor: `${path.color}15` }}
                        onClick={() => setActiveTooltip(activeTooltip === `${pi}-${mi}` ? null : `${pi}-${mi}`)}
                      >
                        <span className="text-[10px] font-bold" style={{ color: path.color }}>{mi + 1}</span>
                      </button>
                      <span className="mt-1.5 text-[10px] font-medium text-foreground-secondary text-center">{m.label}</span>
                      <span className="text-[9px] text-foreground-disabled">{m.time}</span>

                      {/* Tooltip */}
                      {activeTooltip === `${pi}-${mi}` && (
                        <div className="absolute top-12 z-50 w-48 rounded-xl border border-card-border bg-surface/95 backdrop-blur-[20px] p-3 shadow-2xl">
                          <p className="text-[12px] font-semibold text-foreground">{m.label}</p>
                          <p className="mt-1 text-[11px] text-foreground-secondary">Unlocks: <strong>{m.skill}</strong></p>
                          <p className="text-[11px] text-foreground-tertiary">Avg salary: {m.salary}/mo</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── People Like You ──────────────────────────── */}
      <div className="mb-6 rounded-2xl border border-card-border bg-elevated/60 p-6 backdrop-blur-[10px]">
        <h3 className="mb-4 text-sm font-semibold text-foreground">People like you</h3>
        <div className="grid grid-cols-3 gap-6">
          {paths.map((path) => (
            <div key={path.role} className="text-center">
              {/* Anonymised people stack */}
              <div className="mb-3 flex justify-center">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex h-9 w-9 items-center justify-center rounded-full border border-card-border bg-secondary text-[10px] font-medium text-foreground-tertiary" style={{ opacity: 1 - i * 0.18 }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[13px] font-semibold text-foreground">{path.people.count} people</p>
                <p className="text-[11px] text-foreground-secondary">with your profile made this transition</p>
                <p className="text-[11px] text-foreground-tertiary">Median time: <strong className="text-foreground-secondary">{path.people.median}</strong></p>
                <p className="text-[11px] text-foreground-tertiary">Most common unlocking skill: <strong className="text-foreground-secondary">{path.people.key}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Path Cards ────────────────────────────────── */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {paths.map((path, index) => (
          <Card key={index} className="border-border/60 bg-card/50">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${path.color}15` }}>
                  <TrendingUp className="h-5 w-5" style={{ color: path.color }} />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">{path.role}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-medium ${path.fitColor}`}>{path.fitLabel}</span>
                    <span className="flex items-center gap-1 text-[11px] text-foreground-tertiary"><Clock className="h-3 w-3" />{path.timeframe}</span>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-[12px] text-muted-foreground leading-relaxed">{path.why}</p>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
                  <Lightbulb className="h-3.5 w-3.5" style={{ color: path.color }} />Recommended next steps
                </p>
                <ul className="space-y-1.5">
                  {path.nextSteps.map((step, si) => (
                    <li key={si} className="flex items-start gap-2 text-[12px] text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: path.color }} />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Path Comparison Table ─────────────────────── */}
      <Card className="mb-6 border-border/60 bg-card/50">
        <CardHeader><CardTitle className="text-sm font-semibold text-foreground">Path Comparison</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-foreground-tertiary font-medium w-[180px]">&nbsp;</th>
                  <th className="p-4 text-foreground font-semibold">Data Scientist</th>
                  <th className="p-4 text-foreground font-semibold">Product Analyst</th>
                  <th className="p-4 text-foreground font-semibold">BI Manager</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, ri) => (
                  <tr key={ri} className="border-b border-border-light last:border-b-0 hover:bg-white/[0.01]">
                    <td className="p-4 text-foreground-tertiary font-medium">{row.label}</td>
                    <td className="p-4 text-foreground-secondary">{row.ds}</td>
                    <td className="p-4 text-foreground-secondary">{row.pa}</td>
                    <td className="p-4 text-foreground-secondary">{row.bm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── 交叉链接区 ──────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Life Chapters 链接（真实链接，不再是 teaser） */}
        <Card className="border-card-border bg-card/60">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Planning a career break?</p>
              <p className="text-xs text-foreground-secondary mt-0.5">Design your life chapters around your career — not against it.</p>
            </div>
            <Link
              href="/candidate/dashboard/chapters"
              className="text-xs text-primary hover:underline flex-shrink-0 ml-2"
            >
              Open Life Chapters →
            </Link>
          </CardContent>
        </Card>

        {/* Skills 链接 */}
        <Card className="border-card-border bg-card/60">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">See your skill gaps in detail</p>
              <p className="text-xs text-foreground-secondary mt-0.5">Skills Gap Analysis breaks down exactly what to learn per role.</p>
            </div>
            <Link
              href="/candidate/dashboard/skills"
              className="text-xs text-primary hover:underline flex-shrink-0 ml-2"
            >
              View Skills →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
