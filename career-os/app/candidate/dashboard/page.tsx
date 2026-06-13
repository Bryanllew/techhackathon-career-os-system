"use client"

import { useState } from "react"
import Link from "next/link"
import {
 Briefcase,
 Search,
 CalendarDays,
 FileText,
 TrendingUp,
 Send,
 Calendar,
 Target,
 Star,
 Sparkles,
 Flame,
 Trophy,
 BarChart3,
 ArrowUpRight,
 Minus,
 ArrowDownRight,
 CheckCircle2,
 Circle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const quickActions = [
 { label: "Find a new job", icon: Search, href: "/candidate/dashboard/explore" },
 { label: "Track my applications", icon: Briefcase, href: "/candidate/dashboard/overview" },
 { label: "Prepare for interview", icon: CalendarDays, href: "/candidate/dashboard/smart-apply?tab=interview" },
 { label: "Build my resume", icon: FileText, href: "/candidate/dashboard/resume" },
 { label: "See my career path", icon: TrendingUp, href: "/candidate/dashboard/trajectory" },
]

const upcomingEvents = [
 {
  title: "Interview: Senior Data Scientist at Stripe",
  date: "June 18",
  time: "10:00 AM",
  type: "interview",
  action: { label: "Prepare with AI", href: "/candidate/dashboard/smart-apply?tab=interview" },
 },
 {
  title: "Mock Interview Session",
  date: "June 20",
  time: "2:00 PM",
  type: "mock",
 },
 {
  title: "Application deadline: Analytics Lead at Linear",
  date: "June 22",
  time: null,
  type: "deadline",
  action: { label: "Apply now", href: "/candidate/dashboard/job/3" },
 },
]

const marketSkills = [
 { name: "Python", demand: 85, trend: "up", label: "High demand — trending up" },
 { name: "SQL", demand: 90, trend: "up", label: "High demand — trending up" },
 { name: "Tableau", demand: 60, trend: "stable", label: "Stable" },
 { name: "Excel", demand: 55, trend: "stable", label: "Stable" },
 { name: "VBA", demand: 30, trend: "down", label: "Declining" },
]

const recentWins = [
 { text: "Completed dashboard migration to Tableau", date: "2 days ago" },
 { text: "Presented quarterly metrics to leadership", date: "1 week ago" },
]

const streakDays = [true, true, false, true, true, true, true]

export default function CandidateDashboard() {
 const [winText, setWinText] = useState("")
 const [wins, setWins] = useState(recentWins)

 const handleLogWin = () => {
  if (winText.trim()) {
   setWins([{ text: winText, date: "Just now" }, ...wins])
   setWinText("")
  }
 }

 return (
  <div className="min-h-screen p-8">
   {/* Personal Greeting */}
   <div className="mb-8">
    <p className="text-section-label mb-1">Candidate</p>
    <h1 className="text-4xl font-light tracking-[-0.02em] text-foreground">Good morning, Alex.</h1>
    <p className="mt-2 text-foreground-secondary text-sm">
     You have an interview with Stripe in 3 days and 2 new roles matching your trajectory.
    </p>
   </div>

   {/* Zone 1 — Quick Actions */}
   <div className="mb-8">
    <div className="flex gap-2">
     {quickActions.map((action) => (
      <Link
       key={action.label}
       href={action.href}
       className="group flex items-center gap-2.5 rounded-xl border border-card-border bg-card/60 backdrop-blur-[10px] px-4 py-3 text-sm font-medium text-foreground-secondary transition-all hover:border-primary/30 hover:text-foreground hover:bg-card/80"
      >
       <action.icon className="h-4 w-4 text-foreground-tertiary transition-colors group-hover:text-primary" />
       <span className="whitespace-nowrap">{action.label}</span>
      </Link>
     ))}
    </div>
   </div>

   {/* Zone 2 — Your Progress */}
   <div className="mb-8 grid gap-4 md:grid-cols-3">
    {/* Trajectory Progress */}
    <Card>
     <CardContent className="p-6">
      <h3 className="mb-3 text-section-label">Trajectory Progress</h3>
      <Progress value={34} className="mb-2 h-2" />
      <p className="mb-1 text-data">34%</p>
      <p className="mb-1 text-sm text-foreground-secondary">toward Data Scientist goal</p>
      <p className="mb-3 text-xs text-foreground-tertiary">3 skills remaining · 2 applications in progress</p>
      <Link href="/candidate/dashboard/trajectory" className="text-sm text-primary hover:underline">
       View path
      </Link>
     </CardContent>
    </Card>

    {/* Profile Strength */}
    <Card>
     <CardContent className="flex flex-col items-center p-6">
      <h3 className="mb-3 self-start text-section-label">Profile Strength</h3>
      <div className="relative mb-2 flex h-20 w-20 items-center justify-center">
       <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
        <path
         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
         fill="none"
         stroke="currentColor"
         strokeWidth="3"
         className="text-secondary"
        />
        <path
         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
         fill="none"
         stroke="currentColor"
         strokeWidth="3"
         strokeDasharray="72, 100"
         className="text-primary"
        />
       </svg>
       <span className="absolute text-xl font-semibold text-foreground">72%</span>
      </div>
      <p className="mb-3 text-center text-sm text-foreground-secondary">
       Add a project to reach 85% and increase employer visibility.
      </p>
      <Link href="/candidate/dashboard/profile" className="text-sm text-primary hover:underline">
       Update profile
      </Link>
     </CardContent>
    </Card>

    {/* Activity Streak */}
    <Card>
     <CardContent className="p-6">
      <h3 className="mb-3 text-section-label">Activity Streak</h3>
      <div className="mb-2 flex items-center gap-2">
       <Flame className="h-6 w-6 text-amber-500" />
       <span className="text-lg font-semibold text-foreground">5 day streak</span>
      </div>
      <p className="mb-3 text-sm text-foreground-secondary">
       You&apos;ve been active 5 days in a row. Keep the momentum going.
      </p>
      <div className="flex gap-2">
       {streakDays.map((active, i) => (
        <div
         key={i}
         className={`h-3 w-3 rounded-full ${active ? "bg-primary" : "bg-secondary"}`}
        />
       ))}
      </div>
     </CardContent>
    </Card>
   </div>

   {/* Zone 3 — Job Activity Summary */}
   <div className="mb-8 grid gap-4 md:grid-cols-4">
    <Link href="/candidate/dashboard/overview">
     <Card className="h-full transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-6">
       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-subtle">
        <Send className="h-6 w-6 text-primary" />
       </div>
       <div>
        <p className="text-data text-foreground">3</p>
        <p className="text-xs text-foreground-tertiary mt-1">Applications Sent</p>
       </div>
      </CardContent>
     </Card>
    </Link>

    <Link href="/candidate/dashboard/calendar">
     <Card className="h-full transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-6">
       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#5856D6]/15">
        <Calendar className="h-6 w-6 text-[#5856D6]" />
       </div>
       <div>
        <p className="text-data text-foreground">2</p>
        <p className="text-xs text-foreground-tertiary mt-1">Interviews</p>
       </div>
      </CardContent>
     </Card>
    </Link>

    <Link href="/candidate/dashboard/explore">
     <Card className="h-full transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-6">
       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-subtle">
        <Target className="h-6 w-6 text-primary" />
       </div>
       <div>
        <p className="text-data text-foreground">24</p>
        <p className="text-xs text-foreground-tertiary mt-1">New Matches</p>
       </div>
      </CardContent>
     </Card>
    </Link>

    <Link href="/candidate/dashboard/overview?filter=offer">
     <Card className="h-full transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-6">
       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success-subtle">
        <Star className="h-6 w-6 text-success" />
       </div>
       <div>
        <p className="text-data text-foreground">1</p>
        <p className="text-xs text-foreground-tertiary mt-1">Offer Received</p>
       </div>
      </CardContent>
     </Card>
    </Link>
   </div>

   {/* Zone 4 — Coming Up */}
   <div className="mb-8">
    <p className="text-section-label mb-4">Coming Up</p>
    <div className="space-y-3">
     {upcomingEvents.map((event, i) => {
      const accentColor =
        event.type === "interview"
          ? "border-l-primary"
          : event.type === "mock"
          ? "border-l-[#5856D6]"
          : "border-l-warning"

      return (
        <div
          key={i}
          className={`flex items-center justify-between rounded-xl border border-card-border bg-card/60 backdrop-blur-[10px] border-l-2 ${accentColor} p-5 transition-all hover:border-white/10`}
        >
          <div className="flex items-center gap-5">
            <div className="rounded-lg bg-card/80 border border-card-border px-3.5 py-2.5 text-center min-w-[60px]">
              <span className="block text-[10px] font-medium text-foreground-tertiary uppercase tracking-wider">
                {event.date.split(" ")[0].slice(0, 3)}
              </span>
              <span className="block text-xl font-light text-foreground tracking-[-0.02em] leading-tight mt-0.5">
                {event.date.split(" ")[1]}
              </span>
            </div>
            <div>
              <p className="text-[15px] font-medium text-foreground leading-snug">{event.title}</p>
              {event.time && (
                <p className="text-xs text-foreground-tertiary mt-1.5">{event.time}</p>
              )}
            </div>
          </div>
          {event.action && (
            <Button variant="ghost" size="sm" asChild className="shrink-0">
              <Link href={event.action.href}>{event.action.label}</Link>
            </Button>
          )}
        </div>
      )
     })}
    </div>
   </div>

   {/* Zone 5 — AI Career Coach */}
   <Card className="mb-8">
    <CardHeader>
     <CardTitle className="flex items-center gap-2 text-lg">
      <Sparkles className="h-5 w-5 text-primary" />
      Your AI Career Coach
     </CardTitle>
    </CardHeader>
    <CardContent>
     <div className="grid gap-6 md:grid-cols-2">
      {/* Goal Setting Panel */}
      <div>
       <div className="mb-4 rounded-lg border border-primary-border bg-primary-subtle p-4">
        <p className="font-medium text-foreground">Become a Senior Data Scientist within 18 months</p>
       </div>
       <Progress value={33} className="mb-2 h-2" />
       <p className="mb-4 text-sm text-foreground-secondary">On track — 6 months in, 12 months remaining.</p>
       <Button variant="outline" size="sm" className="mb-4">
        Update goal
       </Button>
       <div className="space-y-3">
        <div className="flex items-center gap-3">
         <Circle className="h-4 w-4 text-foreground-tertiary" />
         <span className="text-sm text-foreground-secondary">Complete ML certification</span>
        </div>
        <div className="flex items-center gap-3">
         <CheckCircle2 className="h-4 w-4 text-primary" />
         <span className="text-sm text-foreground">Build 2 portfolio projects</span>
         <Badge variant="secondary" className="text-xs">1 of 2 done</Badge>
        </div>
        <div className="flex items-center gap-3">
         <Circle className="h-4 w-4 text-foreground-tertiary" />
         <span className="text-sm text-foreground-secondary">Apply to 5 Data Scientist roles</span>
         <Badge variant="secondary" className="text-xs">2 of 5 done</Badge>
        </div>
       </div>
      </div>

      {/* Proactive Nudge */}
      <div className="rounded-lg border border-border bg-card p-4">
       <p className="mb-3 text-sm text-primary">✦ Career Coach says:</p>
       <p className="mb-4 text-sm text-foreground">
        Alex, candidates with your profile who complete a cloud certification in the next 60 days are{" "}
        <span className="font-semibold">3x more likely</span> to land a Data Scientist role. The Google Cloud
        certification takes 6 weeks and is valued by 78% of your target employers.
       </p>
       <Button size="sm">Learn more</Button>
      </div>
     </div>
    </CardContent>
   </Card>

   {/* Zone 6 — Skills Market Radar + Log Win */}
   <div className="grid gap-8 md:grid-cols-2">
    {/* Skills Market Radar */}
    <Card>
     <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg font-medium tracking-tight">
       <BarChart3 className="h-5 w-5 text-primary" />
       Skills Market Radar
      </CardTitle>
     </CardHeader>
     <CardContent>
      <p className="mb-4 text-sm text-foreground-secondary">
       What the market is paying for right now — and where you stand.
      </p>
      <div className="space-y-4">
       {marketSkills.map((skill) => (
        <div key={skill.name} className="space-y-1">
         <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">{skill.name}</span>
          <span
           className={`flex items-center gap-1 text-xs ${
            skill.trend === "up"
             ? "text-primary"
             : skill.trend === "down"
             ? "text-amber-500"
             : "text-foreground-tertiary"
           }`}
          >
           {skill.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
           {skill.trend === "stable" && <Minus className="h-3 w-3" />}
           {skill.trend === "down" && <ArrowDownRight className="h-3 w-3" />}
           {skill.label}
          </span>
         </div>
         <div className="h-2 w-full rounded-full bg-secondary">
          <div
           className={`h-2 rounded-full ${
            skill.trend === "up"
             ? "bg-primary"
             : skill.trend === "down"
             ? "bg-amber-500"
             : "bg-muted-foreground"
           }`}
           style={{ width: `${skill.demand}%` }}
          />
         </div>
        </div>
       ))}
      </div>
      <div className="mt-4 rounded-lg bg-primary-subtle p-3">
       <p className="text-sm text-primary">
        ✦ Adding <strong>Deep Learning</strong> to your profile could move you into a RM 2,000 higher salary bracket.
       </p>
      </div>
     </CardContent>
    </Card>

    {/* Log This Week's Win */}
    <Card>
     <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg font-medium tracking-tight">
       <Trophy className="h-5 w-5 text-primary" />
       Log This Week&apos;s Win
      </CardTitle>
     </CardHeader>
     <CardContent>
      <p className="mb-4 text-sm text-foreground-secondary">
       What did you accomplish this week, Alex?
      </p>
      <div className="mb-4 flex gap-2">
       <Input
        placeholder="I finished..."
        value={winText}
        onChange={(e) => setWinText(e.target.value)}
        onKeyDown={(e) => {
         if (e.key === "Enter") handleLogWin()
        }}
       />
       <Button onClick={handleLogWin} disabled={!winText.trim()}>
        Log It
       </Button>
      </div>
      <div className="space-y-3">
       <p className="text-section-label mb-3">Recent Wins</p>
       {wins.slice(0, 3).map((win, index) => (
        <div
         key={index}
         className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
        >
         <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
          <Trophy className="h-3 w-3 text-primary" />
         </div>
         <div>
          <p className="text-sm text-foreground">{win.text}</p>
          <p className="text-xs text-foreground-tertiary">{win.date}</p>
         </div>
        </div>
       ))}
      </div>
     </CardContent>
    </Card>
   </div>
  </div>
 )
}
