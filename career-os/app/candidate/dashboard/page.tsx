"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
 Send,
 Calendar,
 Target,
 Star,
 Sparkles,
 Flame,
 Trophy,
 ArrowUpRight,
 Minus,
 ArrowDownRight,
 CheckCircle2,
 Circle,
 TrendingUp,
 ChevronDown,
 ChevronUp,
 MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const upcomingEvents = [
 {
  title: "Interview: Senior Data Scientist at Stripe",
  date: "June 18",
  time: "10:00 AM",
  type: "interview",
  action: { label: "Prepare", href: "/candidate/dashboard/smart-apply?tab=interview" },
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
 { name: "Python", demand: 85, trend: "up" },
 { name: "SQL", demand: 90, trend: "up" },
 { name: "Tableau", demand: 60, trend: "stable" },
 { name: "Excel", demand: 55, trend: "stable" },
 { name: "VBA", demand: 30, trend: "down" },
]

const recentWins = [
 { text: "Completed dashboard migration to Tableau", date: "2 days ago" },
 { text: "Presented quarterly metrics to leadership", date: "1 week ago" },
]

type MilestoneStatus = "not_started" | "in_progress" | "done"

const initialMilestones = [
 {
  id: "1",
  title: "Complete ML Certification",
  status: "not_started" as MilestoneStatus,
  aiAdvice: "The Google Cloud ML certification takes about 6 weeks and is valued by 78% of your target employers. Start this weekend and you can finish before your next job search window. Block 2 hours every Saturday and Sunday — that is all it takes.",
 },
 {
  id: "2",
  title: "Build 2 portfolio projects",
  status: "in_progress" as MilestoneStatus,
  progress: "1 of 2 done",
  aiAdvice: "Your first project (churn dashboard) is strong. For the second, build something with ML — a prediction model or recommendation system. Upload it to GitHub with a clear README. Hiring managers look at GitHub before interviews.",
 },
 {
  id: "3",
  title: "Apply to 5 Data Scientist roles",
  status: "in_progress" as MilestoneStatus,
  progress: "2 of 5 done",
  aiAdvice: "You have applied to Figma and Stripe. Next, apply to Notion, Grab, and one stretch company like Palantir or Google. Spread applications over 2 weeks — do not send all at once, so interviews do not overlap.",
 },
]

const dailyBriefings: Record<string, { headline: string; focus: string[] }> = {
 wolf: {
  headline: "Interview in 3 days. As a Wolf — lead with confidence and own the room.",
  focus: ["Review 2 STAR leadership stories", "Prepare a data project to present with impact", "Sleep before midnight tonight"],
 },
 eagle: {
  headline: "Interview in 3 days. As an Eagle — show your big picture thinking with precision.",
  focus: ["Prepare a system design answer for Stripe's data pipeline", "Know your numbers: churn model improved results by X%", "Review SQL window functions"],
 },
 dolphin: {
  headline: "Interview in 3 days. As a Dolphin — connect with your interviewer first, then impress.",
  focus: ["Research your interviewers on LinkedIn", "Prepare questions that show you care about team culture", "Practice SQL and Python basics"],
 },
 fox: {
  headline: "Interview in 3 days. As a Fox — bring creative thinking to every answer.",
  focus: ["Prepare an unconventional take on a common data problem", "Show curiosity: prepare 3 smart questions to ask them", "Review A/B testing concepts"],
 },
 bear: {
  headline: "Interview in 3 days. As a Bear — show your reliability and attention to detail.",
  focus: ["Review every detail of the job description", "Prepare precise, well-structured answers with exact metrics", "Practice SQL correctness — no shortcuts"],
 },
 default: {
  headline: "You have an interview with Stripe in 3 days. Here is your focus for today.",
  focus: ["Review SQL window functions", "Prepare 2 STAR stories", "Check your Notion application — 2 fields incomplete"],
 },
}

const animalData: Record<string, { emoji: string; label: string }> = {
 wolf: { emoji: "🐺", label: "Wolf" },
 eagle: { emoji: "🦅", label: "Eagle" },
 dolphin: { emoji: "🐬", label: "Dolphin" },
 fox: { emoji: "🦊", label: "Fox" },
 bear: { emoji: "🐻", label: "Bear" },
}

export default function CandidateDashboard() {
 const [winText, setWinText] = useState("")
 const [wins, setWins] = useState(recentWins)
 const [animalType, setAnimalType] = useState<string | null>(null)
 const [milestones, setMilestones] = useState(initialMilestones)
 const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)

 useEffect(() => {
  const stored = localStorage.getItem("animalType")
  if (stored) {
   const parsed = JSON.parse(stored)
   setAnimalType(parsed.primary)
  }
 }, [])

 const cycleStatus = (id: string) => {
  setMilestones((prev) =>
   prev.map((m) => {
    if (m.id !== id) return m
    const next: MilestoneStatus =
     m.status === "not_started" ? "in_progress" : m.status === "in_progress" ? "done" : "not_started"
    return { ...m, status: next }
   })
  )
 }

 const briefing = animalType && dailyBriefings[animalType] ? dailyBriefings[animalType] : dailyBriefings.default

 const handleLogWin = () => {
  if (winText.trim()) {
   setWins([{ text: winText, date: "Just now" }, ...wins])
   setWinText("")
  }
 }

 return (
  <div className="min-h-screen p-8">
   {/* 问候语 */}
   <div className="mb-8">
    <p className="text-section-label mb-1">Candidate</p>
    <h1 className="text-4xl font-light tracking-[-0.02em] text-foreground">Good morning, Alex.</h1>
    <p className="mt-2 text-foreground-secondary text-sm">
     You have an interview with Stripe in 3 days · 2 new roles matching your trajectory.
    </p>
   </div>

   {/* 工作动态（4项统计） */}
   <div className="mb-8 grid gap-4 md:grid-cols-4">
    <Link href="/candidate/dashboard/explore">
     <Card className="h-full transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-6">
       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-subtle">
        <Send className="h-5 w-5 text-primary" />
       </div>
       <div>
        <p className="text-2xl font-semibold text-foreground">3</p>
        <p className="text-xs text-foreground-tertiary mt-0.5">Applications</p>
       </div>
      </CardContent>
     </Card>
    </Link>

    <Link href="/candidate/dashboard/smart-apply">
     <Card className="h-full transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-6">
       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5856D6]/15">
        <Calendar className="h-5 w-5 text-[#5856D6]" />
       </div>
       <div>
        <p className="text-2xl font-semibold text-foreground">2</p>
        <p className="text-xs text-foreground-tertiary mt-0.5">Interviews</p>
       </div>
      </CardContent>
     </Card>
    </Link>

    <Link href="/candidate/dashboard/jobs">
     <Card className="h-full transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-6">
       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-subtle">
        <Target className="h-5 w-5 text-primary" />
       </div>
       <div>
        <p className="text-2xl font-semibold text-foreground">24</p>
        <p className="text-xs text-foreground-tertiary mt-0.5">New Matches</p>
       </div>
      </CardContent>
     </Card>
    </Link>

    <Link href="/candidate/dashboard/explore">
     <Card className="h-full transition-colors hover:border-primary/50">
      <CardContent className="flex items-center gap-4 p-6">
       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-subtle">
        <Star className="h-5 w-5 text-success" />
       </div>
       <div>
        <p className="text-2xl font-semibold text-foreground">1</p>
        <p className="text-xs text-foreground-tertiary mt-0.5">Offer</p>
       </div>
      </CardContent>
     </Card>
    </Link>
   </div>

   {/* 两列主布局 */}
   <div className="grid gap-8 md:grid-cols-[1fr_340px]">
    {/* 左列：主要内容 */}
    <div className="space-y-8">

     {/* 进度卡（合并3项） */}
     <Card>
      <CardContent className="p-6">
       <h3 className="text-section-label mb-5">Your Progress</h3>
       <div className="grid grid-cols-3 gap-6 mb-5">
        <div>
         <p className="text-xs text-foreground-tertiary mb-1">Career Goal</p>
         <p className="text-sm font-medium text-foreground mb-2">Data Scientist</p>
         <Progress value={34} className="h-1.5" />
         <p className="text-xs text-foreground-tertiary mt-1">34% complete</p>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1">Profile Strength</p>
         <p className="text-2xl font-semibold text-foreground">72%</p>
         <p className="text-xs text-foreground-tertiary mt-1">Add a project → 85%</p>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1">Activity Streak</p>
         <div className="flex items-center gap-1.5 mb-1">
          <Flame className="h-4 w-4 text-amber-500" />
          <p className="text-2xl font-semibold text-foreground">5</p>
         </div>
         <p className="text-xs text-foreground-tertiary">days in a row</p>
        </div>
       </div>
       <div className="flex gap-3">
        <Link href="/candidate/dashboard/trajectory" className="text-xs text-primary hover:underline">
         View career path →
        </Link>
        <Link href="/candidate/dashboard/profile" className="text-xs text-primary hover:underline">
         Update profile →
        </Link>
       </div>
      </CardContent>
     </Card>

     {/* 即将到来 */}
     <div>
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
             <div className="rounded-lg bg-card/80 border border-card-border px-3.5 py-2.5 text-center min-w-[56px]">
              <span className="block text-[10px] font-medium text-foreground-tertiary uppercase tracking-wider">
               {event.date.split(" ")[0].slice(0, 3)}
              </span>
              <span className="block text-xl font-light text-foreground tracking-[-0.02em] leading-tight mt-0.5">
               {event.date.split(" ")[1]}
              </span>
             </div>
             <div>
              <p className="text-sm font-medium text-foreground leading-snug">{event.title}</p>
              {event.time && (
               <p className="text-xs text-foreground-tertiary mt-1">{event.time}</p>
              )}
             </div>
            </div>
            {event.action && (
             <Button variant="ghost" size="sm" asChild className="shrink-0 text-xs">
              <Link href={event.action.href}>{event.action.label}</Link>
             </Button>
            )}
          </div>
        )
       })}
      </div>
     </div>

     {/* 技能市场（横向滚动） */}
     <Card>
      <CardHeader className="pb-3">
       <CardTitle className="flex items-center gap-2 text-base font-medium">
        <TrendingUp className="h-4 w-4 text-primary" />
        Skills Market Radar
       </CardTitle>
      </CardHeader>
      <CardContent>
       <div className="flex gap-4 overflow-x-auto pb-2">
        {marketSkills.map((skill) => (
         <div
          key={skill.name}
          className="min-w-[120px] rounded-xl border border-card-border bg-card/60 p-4 flex-shrink-0"
         >
          <p className="text-sm font-medium text-foreground mb-2">{skill.name}</p>
          <div className="h-1.5 w-full rounded-full bg-secondary mb-2">
           <div
            className={`h-1.5 rounded-full ${
             skill.trend === "up"
              ? "bg-primary"
              : skill.trend === "down"
              ? "bg-amber-500"
              : "bg-muted-foreground"
            }`}
            style={{ width: `${skill.demand}%` }}
           />
          </div>
          <span
           className={`flex items-center gap-0.5 text-xs ${
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
           {skill.demand}%
          </span>
         </div>
        ))}
       </div>
       <p className="mt-3 text-xs text-primary">
        ✦ Adding Deep Learning could move you into a RM 2,000 higher salary bracket.
       </p>
      </CardContent>
     </Card>
    </div>

    {/* 右列：辅助内容 */}
    <div className="space-y-6">

     {/* AI Career Coach — 每日简报 + 里程碑教练 */}
     <Card className="border-primary/20">
      <CardHeader className="pb-3">
       <CardTitle className="flex items-center gap-2 text-base font-medium">
        <Sparkles className="h-4 w-4 text-primary" />
        AI Career Coach
       </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

       {/* B: 每日简报 */}
       <div className="rounded-lg bg-primary/5 border border-primary/15 p-3">
        <p className="text-xs text-primary mb-2">✦ Today's Briefing</p>
        <p className="text-sm text-foreground leading-relaxed mb-3">{briefing.headline}</p>
        <div className="space-y-1.5">
         {briefing.focus.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
           <span className="flex-shrink-0 h-4 w-4 rounded-full bg-primary/15 text-primary text-[10px] flex items-center justify-center font-semibold mt-0.5">
            {i + 1}
           </span>
           <p className="text-xs text-foreground-secondary">{item}</p>
          </div>
         ))}
        </div>
       </div>

       {/* Goal progress */}
       <div>
        <div className="flex items-center justify-between mb-1.5">
         <p className="text-xs font-medium text-foreground">Goal: Senior Data Scientist</p>
         <span className="text-xs text-foreground-tertiary">33%</span>
        </div>
        <Progress value={33} className="h-1.5" />
       </div>

       {/* C: 里程碑教练 */}
       <div className="space-y-2">
        {milestones.map((m) => {
         const isOpen = expandedMilestone === m.id
         return (
          <Collapsible key={m.id} open={isOpen} onOpenChange={(open) => setExpandedMilestone(open ? m.id : null)}>
           <div className="rounded-lg border border-card-border bg-card/60 overflow-hidden">
            <div className="flex items-center gap-2 p-2.5">
             <button onClick={() => cycleStatus(m.id)} className="flex-shrink-0">
              {m.status === "done"
               ? <CheckCircle2 className="h-4 w-4 text-primary" />
               : m.status === "in_progress"
               ? <Circle className="h-4 w-4 text-amber-500" />
               : <Circle className="h-4 w-4 text-foreground-tertiary" />}
             </button>
             <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium truncate ${m.status === "done" ? "line-through text-foreground-tertiary" : "text-foreground"}`}>
               {m.title}
              </p>
              {m.progress && m.status !== "done" && (
               <p className="text-[10px] text-foreground-tertiary">{m.progress}</p>
              )}
             </div>
             <div className="flex items-center gap-1.5 flex-shrink-0">
              {m.status === "not_started" && (
               <Badge className="text-[9px] px-1.5 py-0 bg-secondary text-foreground-tertiary border-0">Not started</Badge>
              )}
              {m.status === "in_progress" && (
               <Badge className="text-[9px] px-1.5 py-0 bg-amber-500/10 text-amber-500 border-0">In progress</Badge>
              )}
              {m.status === "done" && (
               <Badge className="text-[9px] px-1.5 py-0 bg-primary/10 text-primary border-0">Done</Badge>
              )}
              <CollapsibleTrigger asChild>
               <button className="text-foreground-tertiary hover:text-primary transition-colors">
                {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
               </button>
              </CollapsibleTrigger>
             </div>
            </div>
            <CollapsibleContent>
             <div className="px-3 pb-3 pt-1 border-t border-card-border">
              <p className="text-xs text-primary mb-1">✦ Coach says:</p>
              <p className="text-xs text-foreground-secondary leading-relaxed">{m.aiAdvice}</p>
              {m.status !== "done" && (
               <button
                onClick={() => cycleStatus(m.id)}
                className="mt-2 text-[10px] text-primary hover:underline"
               >
                {m.status === "not_started" ? "Mark as started →" : "Mark as done →"}
               </button>
              )}
             </div>
            </CollapsibleContent>
           </div>
          </Collapsible>
         )
        })}
       </div>

       {/* 聊天入口提示 */}
       <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-2.5">
        <MessageCircle className="h-3.5 w-3.5 text-foreground-tertiary flex-shrink-0" />
        <p className="text-xs text-foreground-tertiary">
         Have questions? Use the <span className="text-primary font-medium">Ask Career Coach</span> button below.
        </p>
       </div>
      </CardContent>
     </Card>

     {/* 动物类型徽章 */}
     <Card>
      <CardContent className="p-5">
       {animalType ? (
        <div>
         <p className="text-section-label mb-2">Your Work Type</p>
         <div className="flex items-center gap-3">
          <span className="text-3xl">{animalData[animalType]?.emoji}</span>
          <div>
           <p className="font-medium text-foreground">{animalData[animalType]?.label} Type</p>
           <p className="text-xs text-foreground-tertiary">Based on your personality quiz</p>
          </div>
         </div>
         <Link href="/candidate/dashboard/quiz" className="text-xs text-primary hover:underline mt-3 inline-block">
          Retake quiz →
         </Link>
        </div>
       ) : (
        <div>
         <p className="text-section-label mb-2">Discover Your Work Type</p>
         <p className="text-xs text-foreground-secondary mb-3">
          Take a 3-minute quiz to find out which animal type matches your work style.
         </p>
         <Button size="sm" className="w-full text-xs" asChild>
          <Link href="/candidate/dashboard/quiz">Take the Quiz</Link>
         </Button>
        </div>
       )}
      </CardContent>
     </Card>

     {/* 本周 Win 记录 */}
     <Card>
      <CardHeader className="pb-3">
       <CardTitle className="flex items-center gap-2 text-base font-medium">
        <Trophy className="h-4 w-4 text-primary" />
        This Week&apos;s Wins
       </CardTitle>
      </CardHeader>
      <CardContent>
       <div className="mb-3 flex gap-2">
        <Input
         placeholder="I finished..."
         value={winText}
         onChange={(e) => setWinText(e.target.value)}
         onKeyDown={(e) => { if (e.key === "Enter") handleLogWin() }}
         className="text-sm"
        />
        <Button onClick={handleLogWin} disabled={!winText.trim()} size="sm">
         Log
        </Button>
       </div>
       <div className="space-y-2">
        {wins.slice(0, 3).map((win, index) => (
         <div
          key={index}
          className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"
         >
          <Trophy className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
          <div>
           <p className="text-xs text-foreground">{win.text}</p>
           <p className="text-[10px] text-foreground-tertiary mt-0.5">{win.date}</p>
          </div>
         </div>
        ))}
       </div>
      </CardContent>
     </Card>
    </div>
   </div>
  </div>
 )
}
