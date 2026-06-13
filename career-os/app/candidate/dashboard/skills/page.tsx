"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, XCircle, Clock, Lightbulb, X, ExternalLink } from "lucide-react"

const skillsYouHave = ["SQL", "Python", "Excel", "Data Visualization", "Statistical Analysis", "Tableau"]
const skillsToGrow = ["Machine Learning Basics", "A/B Testing", "Stakeholder Communication"]
const skillsMissing = ["Deep Learning", "Cloud Platforms (AWS/GCP)", "Product Sense"]

const targetRoles = [
  { title: "Data Scientist", fit: 92, skills: { have: ["SQL", "Python", "Statistical Analysis", "Data Visualization"], grow: ["Machine Learning Basics", "A/B Testing"], missing: ["Deep Learning", "Cloud Platforms (AWS/GCP)"] } },
  { title: "Product Analyst", fit: 87, skills: { have: ["SQL", "Excel", "Data Visualization", "Tableau"], grow: ["Stakeholder Communication", "A/B Testing"], missing: ["Product Sense"] } },
  { title: "BI Manager", fit: 78, skills: { have: ["SQL", "Excel", "Tableau", "Data Visualization"], grow: ["Stakeholder Communication"], missing: ["Team Leadership", "Strategic Planning"] } },
]

const recommendations = [
  {
    skill: "Machine Learning Basics",
    estimatedTime: "6–8 weeks",
    reason: "Opens doors to Data Scientist roles and is frequently cited as the most impactful skill addition for analysts on this trajectory.",
    icon: "🧠",
    demand: { label: "Demand: Very High", color: "text-[#5AC8FA]" },
    buttonLabel: "Find courses →",
    resources: [
      { name: "Machine Learning Specialisation", platform: "Coursera (Andrew Ng)", duration: "8 weeks" },
      { name: "Intro to Machine Learning", platform: "Kaggle Learn", duration: "3 weeks" },
      { name: "Applied ML in Python", platform: "DataCamp", duration: "4 weeks" },
    ],
  },
  {
    skill: "Cloud Platforms (AWS/GCP)",
    estimatedTime: "4–6 weeks",
    reason: "Essential for modern data roles. Most Data Scientist job posts now list cloud platform experience as a core requirement.",
    icon: "☁️",
    demand: { label: "Demand: High", color: "text-[#5AC8FA]" },
    buttonLabel: "Find courses →",
    resources: [
      { name: "AWS Certified Data Analytics", platform: "AWS Training", duration: "6 weeks" },
      { name: "Google Cloud Data Engineer", platform: "Coursera", duration: "5 weeks" },
      { name: "Cloud Essentials for Data Pros", platform: "A Cloud Guru", duration: "3 weeks" },
    ],
  },
  {
    skill: "Product Sense",
    estimatedTime: "Ongoing",
    reason: "Differentiates you for Product Analyst roles and helps you communicate impact to stakeholders.",
    icon: "💡",
    demand: { label: "Demand: Growing", color: "text-warning" },
    buttonLabel: "Explore resources →",
    resources: [
      { name: "Product Analytics Playbook", platform: "Reforge", duration: "6 weeks" },
      { name: "Inspired: How to Create Products", platform: "Book by Marty Cagan", duration: "2 weeks" },
      { name: "Product Thinking for Analysts", platform: "LinkedIn Learning", duration: "3 hours" },
    ],
  },
]

export default function SkillsGapPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Skills Gap Analysis</h1>
        <p className="text-muted-foreground">See how your skills align with your target roles and what to build next.</p>
      </div>

      {/* ── Your Progress ────────────────────────────── */}
      <Card className="mb-6 border-border/60 bg-card/50">
        <CardContent className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Skills readiness toward Data Scientist goal</h3>
            <span className="text-sm font-semibold text-[#5AC8FA]">58%</span>
          </div>
          <div className="mb-3 h-2.5 w-full rounded-full bg-secondary">
            <div className="h-2.5 w-[58%] rounded-full bg-gradient-to-r from-[#5AC8FA] to-primary" />
          </div>
          <div className="flex items-center gap-6 text-[12px]">
            <span className="text-foreground-secondary">6 of 11 required skills in place</span>
            <span className="text-warning">3 skills in progress</span>
          </div>
        </CardContent>
      </Card>

      {/* Skills Summary */}
      <Card className="mb-8 border-border/60 bg-card/50">
        <CardHeader><CardTitle className="text-lg">Your Skills Overview</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /><h3 className="font-medium text-foreground">Skills You Have</h3></div>
              <div className="flex flex-wrap gap-2">{skillsYouHave.map((s) => (<Badge key={s} variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">{s}</Badge>))}</div>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2"><AlertCircle className="h-5 w-5 text-amber-500" /><h3 className="font-medium text-foreground">Skills to Grow</h3></div>
              <div className="flex flex-wrap gap-2">{skillsToGrow.map((s) => (<Badge key={s} variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">{s}</Badge>))}</div>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2"><XCircle className="h-5 w-5 text-red-500" /><h3 className="font-medium text-foreground">Skills Missing</h3></div>
              <div className="flex flex-wrap gap-2">{skillsMissing.map((s) => (<Badge key={s} variant="secondary" className="bg-red-500/10 text-red-600 hover:bg-red-500/20">{s}</Badge>))}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Roles Comparison */}
      <Card className="mb-8 border-border/60 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Skills by Target Role</CardTitle>
          <p className="mt-1 text-[12px] italic text-foreground-tertiary">
            These gaps are based on what Career OS sees in job postings for each role right now — not a fixed list. The market updates these requirements over time.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {targetRoles.map((role) => (
              <div key={role.title} className="rounded-lg border border-border bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-foreground">{role.title}</h3>
                  <Badge className="bg-primary/10 text-primary">{role.fit}% fit</Badge>
                </div>
                <div className="mb-3"><p className="mb-2 text-xs font-medium uppercase text-emerald-600">You Have</p><div className="flex flex-wrap gap-1">{role.skills.have.map((s) => (<span key={s} className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-600"><CheckCircle2 className="mr-1 h-3 w-3" />{s}</span>))}</div></div>
                <div className="mb-3"><p className="mb-2 text-xs font-medium uppercase text-amber-600">To Grow</p><div className="flex flex-wrap gap-1">{role.skills.grow.map((s) => (<span key={s} className="inline-flex items-center rounded bg-amber-500/10 px-2 py-0.5 text-xs text-amber-600"><AlertCircle className="mr-1 h-3 w-3" />{s}</span>))}</div></div>
                <div><p className="mb-2 text-xs font-medium uppercase text-red-600">Missing</p><div className="flex flex-wrap gap-1">{role.skills.missing.map((s) => (<span key={s} className="inline-flex items-center rounded bg-red-500/10 px-2 py-0.5 text-xs text-red-600"><XCircle className="mr-1 h-3 w-3" />{s}</span>))}</div></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-border/60 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg"><Lightbulb className="h-5 w-5 text-primary" />Recommended Skills to Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((rec) => (
              <div key={rec.skill} className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 relative">
                {/* Market demand badge — top right */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-medium ${rec.demand.color} bg-secondary/60 rounded-md px-2 py-0.5`}>{rec.demand.label}</span>
                </div>
                <div className="mb-3 flex items-start justify-between">
                  <div className="text-2xl">{rec.icon}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{rec.estimatedTime}</div>
                </div>
                <h3 className="mb-2 font-medium text-foreground">{rec.skill}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{rec.reason}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-[12px] text-[#5AC8FA] border-[#5AC8FA]/30 hover:bg-[#5AC8FA]/10"
                  onClick={() => setActiveModal(rec.skill)}
                >
                  {rec.buttonLabel}
                </Button>

                {/* Resource Modal */}
                {activeModal === rec.skill && (
                  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={() => setActiveModal(null)}>
                    <div className="w-[400px] rounded-2xl bg-surface border border-white/10 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-foreground">Learning Resources</h3>
                        <button onClick={() => setActiveModal(null)} className="rounded-md p-1 text-foreground-tertiary hover:text-foreground"><X className="h-4 w-4" /></button>
                      </div>
                      <p className="mb-4 text-[12px] text-foreground-secondary">Top 3 resources for <strong>{rec.skill}</strong></p>
                      <div className="space-y-3">
                        {rec.resources.map((r, i) => (
                          <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card/60 p-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-[11px] font-medium text-primary">{i + 1}</div>
                            <div>
                              <p className="text-[13px] font-medium text-foreground">{r.name}</p>
                              <p className="text-[11px] text-foreground-tertiary">{r.platform} · {r.duration}</p>
                            </div>
                            <ExternalLink className="ml-auto h-3.5 w-3.5 text-foreground-tertiary" />
                          </div>
                        ))}
                      </div>
                      <Button className="mt-4 w-full h-9 text-[13px]" asChild>
                        <Link href="/candidate/dashboard/smart-apply">✦ Get personalised learning plan</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
