"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Briefcase,
  Users,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Clock,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const quickActions = [
  { name: "Search candidates", desc: "Find talent matching your open roles", icon: Search, href: "/employer/dashboard/search", accent: "#007AFF" },
  { name: "View active roles", desc: "Manage your live job openings", icon: Briefcase, href: "/employer/dashboard/roles", accent: "#5856D6" },
  { name: "Check team signals", desc: "Monitor engagement across your team", icon: Users, href: "/employer/dashboard/people", accent: "#FF9500" },
  { name: "Review re-engagement", desc: "Rediscover past candidates now a better fit", icon: RefreshCw, href: "/employer/dashboard/reengagement", accent: "#34C759" },
  { name: "Workforce planner", desc: "Map headcount and hiring timelines", icon: BarChart3, href: "/employer/dashboard/workforce", accent: "#5AC8FA" },
]

const activeRoles = [
  { title: "Senior Data Scientist", status: "Active", statusColor: "text-green-400", applicants: 28 },
  { title: "Product Manager", status: "Interviewing", statusColor: "text-primary", applicants: 31 },
  { title: "Backend Engineer", status: "Paused", statusColor: "text-amber-400", applicants: 15 },
]

const teamMembers = [
  { name: "Sarah Lim", trend: "Stable", dotColor: "bg-green-500" },
  { name: "James Tan", trend: "Wavering", dotColor: "bg-amber-500" },
  { name: "Priya Nair", trend: "Disengaging", dotColor: "bg-red-500" },
  { name: "Raj Kumar", trend: "Stable", dotColor: "bg-green-500" },
]

const newHires = [
  { name: "Wei Chen", status: "On Track", statusColor: "text-green-400" },
  { name: "Aisha Malik", status: "Needs Support", statusColor: "text-amber-400" },
]

const insights = [
  {
    id: 1,
    text: "Priya Nair's engagement has dropped significantly. Her trajectory suggests she is ready for a senior role. You have no internal path for her right now.",
    buttonText: "Act now",
    buttonVariant: "destructive" as const,
    href: "/employer/dashboard/people",
  },
  {
    id: 2,
    text: "Candidate D, who declined your Junior DA role in Jan 2024, has since built significant ML experience. Their trajectory now aligns strongly with your Senior DS role.",
    buttonText: "View profile",
    buttonVariant: "outline" as const,
    href: "/employer/dashboard/candidate/d",
  },
  {
    id: 3,
    text: "Your Backend Engineer role has been paused for 47 days. Three candidates in your saved list match it well. Consider re-activating or archiving.",
    buttonText: "Review role",
    buttonVariant: "outline" as const,
    href: "/employer/dashboard/roles",
  },
]

export default function EmployerDashboardPage() {
  const [feedback, setFeedback] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      setFeedbackSubmitted(true)
      setFeedback("")
    }
  }

  return (
    <div className="min-h-screen p-8">
      {/* Personalized Greeting */}
      <div className="mb-8">
        <p className="text-section-label mb-1">Employer</p>
        <h1 className="text-4xl font-light tracking-[-0.02em] text-foreground">Good morning, Sarah.</h1>
        <p className="mt-2 text-foreground-secondary text-sm">
          You have 1 candidate ready to re-engage, Priya Nair needs attention, and your Senior Data Scientist role has 3 strong new applicants.
        </p>
      </div>

      {/* ── Quick Actions ────────────────────────────── */}
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-foreground-tertiary">Quick Actions</p>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="group relative flex flex-col gap-3 rounded-2xl border border-card-border bg-elevated/60 backdrop-blur-[10px] p-5 transition-all hover:border-white/15 hover:bg-elevated/80 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Icon circle */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${action.accent}18` }}
              >
                <action.icon className="h-5 w-5 transition-colors" style={{ color: action.accent }} />
              </div>
              {/* Text */}
              <div>
                <p className="text-[13px] font-semibold text-foreground group-hover:text-foreground transition-colors">
                  {action.name}
                </p>
                <p className="mt-1 text-[11px] text-foreground-tertiary leading-relaxed">
                  {action.desc}
                </p>
              </div>
              {/* Arrow on hover */}
              <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04] opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowRight className="h-3 w-3" style={{ color: action.accent }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Summary Stat Tiles */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-subtle">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-data text-foreground">3</p>
              <p className="text-xs text-foreground-tertiary mt-1">active roles · 74 applicants</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning-subtle">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-data text-foreground">2</p>
              <p className="text-xs text-foreground-tertiary mt-1">team members need attention</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success-subtle">
              <RefreshCw className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-data text-foreground">3</p>
              <p className="text-xs text-foreground-tertiary mt-1">past candidates ready</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              <Clock className="h-6 w-6 text-foreground-tertiary" />
            </div>
            <div>
              <p className="text-data text-foreground">28</p>
              <p className="text-xs text-foreground-tertiary mt-1">days avg. time to hire</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Section */}
      <div className="mb-8 grid grid-cols-2 gap-6">
        {/* Left Column - Hiring Pipeline Snapshot */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Hiring Pipeline Snapshot</h2>
          <Card className="border-border/60 bg-card/50">
            <CardContent className="divide-y divide-border p-0">
              {activeRoles.map((role, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-foreground">{role.title}</p>
                    <p className={`text-sm ${role.statusColor}`}>{role.status}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.applicants} applicants</p>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Re-engagement highlight card */}
          <Card className="border-l-4 border-l-primary border-border/60 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-sm text-foreground">
                <span className="text-primary">✦</span> Career OS has identified 2 candidates in your saved list whose trajectories now align more closely with your Senior Data Scientist role than when you first saved them.{" "}
                <Link href="/employer/dashboard/reengagement" className="text-primary hover:underline">
                  View re-engagement opportunities →
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Team Signals at a Glance */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Team Signals at a Glance</h2>
          <Card className="border-border/60 bg-card/50">
            <CardContent className="divide-y divide-border p-0">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${member.dotColor}`} />
                    <p className="font-medium text-foreground">{member.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.trend}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Link href="/employer/dashboard/people" className="block text-sm text-primary hover:underline">
            View full signals →
          </Link>
          {/* Mini onboarding card */}
          <Card className="border-border/60 bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Hire Onboarding</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {newHires.map((hire, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <p className="font-medium text-foreground">{hire.name}</p>
                  <p className={`text-sm ${hire.statusColor}`}>{hire.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Link href="/employer/dashboard/people" className="block text-sm text-primary hover:underline">
            View onboarding health →
          </Link>
        </div>
      </div>

      {/* What Career OS noticed this week */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">What Career OS noticed this week</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {insights.map((insight) => (
            <Card key={insight.id} className="border-l-4 border-l-primary border-border/60 bg-card/50">
              <CardContent className="flex h-full flex-col justify-between p-4">
                <p className="mb-4 text-sm text-muted-foreground">{insight.text}</p>
                <Button variant={insight.buttonVariant} size="sm" asChild>
                  <Link href={insight.href}>{insight.buttonText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Your Own Track - Feedback Card */}
      <Card className="border-2 border-dashed border-amber-500/50 bg-amber-500/5">
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold text-foreground">Employers face problems we haven&apos;t named.</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            If there is a workforce challenge you are facing that does not fit any of the tools here — tell us. The employers who share their edge cases are the ones who shape what Career OS builds next.
          </p>
          {feedbackSubmitted ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm">Thank you — your submission is being reviewed by the Career OS team</span>
            </div>
          ) : (
            <div className="flex gap-3">
              <Textarea
                placeholder="Describe the workforce challenge you're facing..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[80px] flex-1 resize-none"
              />
              <Button onClick={handleFeedbackSubmit} className="self-end">
                <Send className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
