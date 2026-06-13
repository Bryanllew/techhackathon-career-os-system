"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Star,
  MoreHorizontal,
  Sparkles,
  X,
  ArrowRight,
  Users,
  Target,
  Briefcase,
  FileText,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  MessageSquare,
  Newspaper,
  UserPlus,
  Building2,
  Pin,
  Share2,
  Copy,
  Archive,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// ── Types ──────────────────────────────────────────────

type Stage = "saved" | "networking" | "applying" | "applied" | "interviewing" | "offer"

interface JobCard {
  id: string
  company: string
  initials: string
  role: string
  location: string
  matchPercent: number
  daysInStage: number
  stage: Stage
  salaryMYR: number
  roleType: string
  isTopMatch?: boolean
  hasOffer?: boolean
  interviewDate?: string
  contacts?: string[]
}

// ── Data ───────────────────────────────────────────────

const initialJobs: JobCard[] = [
  { id: "1", company: "Grab", initials: "GR", role: "Data Analyst II", location: "KL", matchPercent: 78, daysInStage: 5, stage: "saved", salaryMYR: 12000, roleType: "Analytics", contacts: ["JL", "KT"] },
  { id: "2", company: "Shopee", initials: "SH", role: "ML Engineer", location: "Singapore", matchPercent: 65, daysInStage: 3, stage: "saved", salaryMYR: 20000, roleType: "Data Science" },
  { id: "3", company: "CIMB", initials: "CI", role: "Quantitative Analyst", location: "KL", matchPercent: 52, daysInStage: 7, stage: "saved", salaryMYR: 13000, roleType: "Analytics" },
  { id: "4", company: "Petronas", initials: "PE", role: "Junior Data Scientist", location: "KL", matchPercent: 45, daysInStage: 2, stage: "saved", salaryMYR: 9000, roleType: "Data Science" },
  { id: "5", company: "Maybank", initials: "MB", role: "BI Developer", location: "KL", matchPercent: 72, daysInStage: 4, stage: "networking", salaryMYR: 11000, roleType: "Business Intelligence", contacts: ["RM"] },
  { id: "6", company: "AirAsia", initials: "AA", role: "Data Engineer", location: "KL", matchPercent: 58, daysInStage: 6, stage: "networking", salaryMYR: 15000, roleType: "Data Engineering" },
  { id: "7", company: "Axiata", initials: "AX", role: "Analytics Manager", location: "KL", matchPercent: 71, daysInStage: 3, stage: "networking", salaryMYR: 14500, roleType: "Analytics", contacts: ["SP", "TW"] },
  { id: "8", company: "Stripe", initials: "ST", role: "Senior Data Scientist", location: "Remote", matchPercent: 92, daysInStage: 2, stage: "applying", salaryMYR: 18000, roleType: "Data Science", isTopMatch: true },
  { id: "9", company: "Notion", initials: "NO", role: "Product Analyst", location: "Remote", matchPercent: 87, daysInStage: 1, stage: "applying", salaryMYR: 14000, roleType: "Analytics" },
  { id: "10", company: "Linear", initials: "LI", role: "Analytics Lead", location: "Remote", matchPercent: 84, daysInStage: 4, stage: "applying", salaryMYR: 16000, roleType: "Analytics" },
  { id: "11", company: "Figma", initials: "FI", role: "Data Scientist", location: "SF", matchPercent: 88, daysInStage: 7, stage: "applied", salaryMYR: 17500, roleType: "Data Science" },
  { id: "12", company: "Airbnb", initials: "AB", role: "BI Manager", location: "Remote", matchPercent: 82, daysInStage: 3, stage: "applied", salaryMYR: 15500, roleType: "Business Intelligence" },
  { id: "13", company: "Spotify", initials: "SP", role: "Senior Analyst", location: "NY", matchPercent: 79, daysInStage: 7, stage: "applied", salaryMYR: 15000, roleType: "Analytics" },
  { id: "14", company: "Stripe", initials: "ST", role: "Senior Data Scientist", location: "Remote", matchPercent: 92, daysInStage: 5, stage: "interviewing", salaryMYR: 18000, roleType: "Data Science", interviewDate: "June 18" },
  { id: "15", company: "Notion", initials: "NO", role: "Product Analyst", location: "Remote", matchPercent: 87, daysInStage: 3, stage: "interviewing", salaryMYR: 14000, roleType: "Analytics", interviewDate: "June 20" },
  { id: "16", company: "Linear", initials: "LI", role: "Analytics Lead", location: "Remote", matchPercent: 84, daysInStage: 1, stage: "offer", salaryMYR: 16000, roleType: "Analytics", hasOffer: true },
]

const stageMeta: { id: Stage; label: string; dotColor: string; subtitle: string; emptyPrompt: string; typicalDays: string }[] = [
  { id: "saved", label: "Saved", dotColor: "#64748B", subtitle: "Companies you're watching", emptyPrompt: "Add companies you're interested in to start tracking them here.", typicalDays: "—" },
  { id: "networking", label: "Networking", dotColor: "#3B82F6", subtitle: "Building connections before applying", emptyPrompt: "Add companies you want to connect with before applying.", typicalDays: "7–14" },
  { id: "applying", label: "Applying", dotColor: "#F59E0B", subtitle: "Preparing your application", emptyPrompt: "Move saved roles here when you start preparing your application materials.", typicalDays: "3–7" },
  { id: "applied", label: "Applied", dotColor: "#007AFF", subtitle: "Waiting for a response", emptyPrompt: "Applications you've submitted will appear here. Follow up regularly for best results.", typicalDays: "7–14" },
  { id: "interviewing", label: "Interviewing", dotColor: "#A855F7", subtitle: "Active conversations", emptyPrompt: "Your scheduled interviews will show up here with preparation reminders.", typicalDays: "7–21" },
  { id: "offer", label: "Offer/Closed", dotColor: "#22C55E", subtitle: "Decisions made", emptyPrompt: "Your offers will appear here when employers respond.", typicalDays: "3–7" },
]

const panelTabs = [
  { id: "overview", label: "Overview" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "ai", label: "AI Tools" },
  { id: "contacts", label: "Contacts" },
  { id: "jobs", label: "Jobs" },
  { id: "notes", label: "Notes" },
  { id: "company", label: "Company" },
]

// ── Helpers ────────────────────────────────────────────

function getFitTier(pct: number): { label: string; color: string } {
  if (pct >= 80) return { label: "Strong fit", color: "text-success" }
  if (pct >= 65) return { label: "Good fit", color: "text-[#5AC8FA]" }
  return { label: "Explore", color: "text-foreground-tertiary" }
}

function getUrgency(job: JobCard): { borderColor: string; reason: string } {
  if (job.interviewDate) return { borderColor: "border-l-[#5AC8FA]", reason: "interview" }
  if (job.hasOffer) return { borderColor: "border-l-success", reason: "offer" }
  if (job.stage === "applied" && job.daysInStage >= 7) return { borderColor: "border-l-warning", reason: "stale" }
  if (job.stage === "saved" && job.matchPercent < 60) return { borderColor: "border-l-slate-500", reason: "low-match" }
  if (job.isTopMatch) return { borderColor: "border-l-success", reason: "top" }
  return { borderColor: "border-l-card-border", reason: "normal" }
}

function getStatusLine(job: JobCard): { text: string; color: string; icon?: React.ReactNode } {
  switch (job.stage) {
    case "saved":
      return { text: "Not yet contacted — consider reaching out", color: "text-foreground-tertiary" }
    case "networking":
      return { text: "In conversation — keep momentum going", color: "text-foreground-tertiary" }
    case "applying":
      return { text: "Application in progress — 3 fields remaining", color: "text-foreground-secondary" }
    case "applied":
      if (job.daysInStage >= 7) return { text: `No response in ${job.daysInStage} days — follow up now`, color: "text-warning" }
      return { text: `Awaiting response — applied ${job.daysInStage} day${job.daysInStage > 1 ? "s" : ""} ago`, color: "text-foreground-tertiary" }
    case "interviewing": {
      const daysUntil = job.interviewDate ? Math.max(1, Math.ceil((new Date(`2026-06-${job.interviewDate.split(" ")[1]}`).getTime() - new Date("2026-06-06").getTime()) / 86400000)) : 3
      return { text: `Interview ${job.interviewDate} — in ${daysUntil} days`, color: "text-[#5AC8FA]", icon: <Calendar className="h-3 w-3" /> }
    }
    case "offer":
      return job.hasOffer ? { text: "Offer received — decide by June 20", color: "text-success" } : { text: "Closed — archived", color: "text-foreground-tertiary" }
    default:
      return { text: "", color: "" }
  }
}

function getColumnSignal(stage: Stage, jobs: JobCard[]): { count: number; signal: string; signalColor: string } {
  const count = jobs.length
  switch (stage) {
    case "applying": { const readyCount = jobs.filter((j) => j.isTopMatch).length; return readyCount > 0 ? { count, signal: `${readyCount} ready to submit`, signalColor: "text-[#5AC8FA]" } : { count, signal: "", signalColor: "" } }
    case "applied": { const needsFollowUp = jobs.filter((j) => j.daysInStage >= 7).length; return needsFollowUp > 0 ? { count, signal: `${needsFollowUp} needs follow-up`, signalColor: "text-warning" } : { count, signal: "", signalColor: "" } }
    case "interviewing": { const thisWeek = jobs.filter((j) => j.interviewDate).length; return thisWeek > 0 ? { count, signal: `${thisWeek} this week`, signalColor: "text-[#5AC8FA]" } : { count, signal: "", signalColor: "" } }
    case "offer": { const actionNeeded = jobs.filter((j) => j.hasOffer).length; return actionNeeded > 0 ? { count, signal: "action needed", signalColor: "text-success" } : { count, signal: "", signalColor: "" } }
    default: return { count, signal: "", signalColor: "" }
  }
}

function getBoardHealth(lastActivityDays: number): { label: string; color: string; dotColor: string } {
  if (lastActivityDays <= 3) return { label: "Active", color: "text-[#5AC8FA]", dotColor: "bg-[#5AC8FA]" }
  if (lastActivityDays <= 7) return { label: "Needs attention", color: "text-warning", dotColor: "bg-warning" }
  return { label: "Stale", color: "text-destructive", dotColor: "bg-destructive" }
}

// ── Panel helpers ──────────────────────────────────────

function getPanelHealth(job: JobCard): { dot: string; text: string; color: string } | null {
  if (job.stage === "applied" && job.daysInStage >= 7) return { dot: "bg-warning", text: "Follow-up overdue", color: "text-warning" }
  if (job.stage === "interviewing") return { dot: "bg-[#5AC8FA]", text: "Interview upcoming", color: "text-[#5AC8FA]" }
  if (job.stage === "offer" && job.hasOffer) return { dot: "bg-success", text: "Decision needed", color: "text-success" }
  return null
}

function getNextAction(job: JobCard): { title: string; body: string } {
  switch (job.stage) {
    case "saved": return { title: "Your best next move right now", body: "You have a warm connection at this company. Reaching out before applying increases your chances by 4x." }
    case "networking": return { title: "Your best next move right now", body: "Keep the conversation going. Ask about the team's current challenges — it gives you material for your application later." }
    case "applying": return { title: "Your best next move right now", body: "Your application is nearly ready. Focus on tailoring the cover letter — personalised letters get 3x more responses." }
    case "applied": return { title: "Your best next move right now", body: `It has been ${job.daysInStage} days with no response. A brief follow-up email now is appropriate and expected.` }
    case "interviewing": { const days = job.interviewDate ? Math.max(1, Math.ceil((new Date(`2026-06-${job.interviewDate.split(" ")[1]}`).getTime() - new Date("2026-06-06").getTime()) / 86400000)) : 3; return { title: "Your best next move right now", body: `Your interview is in ${days} days. Career OS recommends one mock session before you go in.` } }
    case "offer": return { title: "Your best next move right now", body: job.hasOffer ? "Review the offer details carefully. Compare against market benchmarks before responding." : "This opportunity is closed. Review what you learned to apply to future applications." }
    default: return { title: "Your best next move right now", body: "" }
  }
}

function getTrajectoryNote(job: JobCard): string {
  if (job.matchPercent >= 80) return `This role builds the skills your Data Scientist trajectory requires. Candidates with your profile who took similar roles reached Senior DS positions within 16 months on average.`
  if (job.matchPercent >= 65) return `This role partially aligns with your Data Scientist trajectory. It strengthens some areas but may need supplemental learning for your target role.`
  return `This role has limited alignment with your Data Scientist trajectory. Consider whether it builds the specific skills you need or explore higher-match alternatives.`
}

// ── Page ───────────────────────────────────────────────

export default function OverviewPage() {
  const [jobs, setJobs] = useState(initialJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState<JobCard | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [toast, setToast] = useState<string | null>(null)
  const [draggedJob, setDraggedJob] = useState<JobCard | null>(null)
  const [noteText, setNoteText] = useState("")
  const [lastActivityDays, setLastActivityDays] = useState(1)
  const boardRef = useRef<HTMLDivElement>(null)

  // Panel-specific state
  const [showAiSummary, setShowAiSummary] = useState(false)
  const [expandedNews, setExpandedNews] = useState<Set<number>>(new Set())
  const [expandedCulture, setExpandedCulture] = useState<Set<string>>(new Set())
  const [pinnedNotes, setPinnedNotes] = useState<Set<number>>(new Set([0]))
  const [noteCategories, setNoteCategories] = useState<Record<number, string>>({ 0: "Recruiter call", 1: "Research" })
  const [showSalaryConvo, setShowSalaryConvo] = useState(false)
  const [clearConvo, setClearConvo] = useState(false)

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getJobsByStage = (stage: Stage) => filteredJobs.filter((job) => job.stage === stage)

  // ── Drag handlers ──────────────────────────────────

  const handleDragStart = (job: JobCard) => setDraggedJob(job)
  const handleDragOver = (e: React.DragEvent) => e.preventDefault()
  const handleDrop = (stage: Stage) => {
    if (draggedJob && draggedJob.stage !== stage) {
      setJobs(jobs.map((job) => (job.id === draggedJob.id ? { ...job, stage, daysInStage: 0 } : job)))
      setToast(`Moved to ${stageMeta.find((s) => s.id === stage)?.label}`)
      setLastActivityDays(1)
      setTimeout(() => setToast(null), 3000)
    }
    setDraggedJob(null)
  }

  const scrollToStage = (stage: Stage) => {
    const el = document.getElementById(`stage-${stage}`)
    el?.scrollIntoView({ behavior: "smooth", block: "center" })
    el?.classList.add("ring-2", "ring-primary/50", "rounded-xl")
    setTimeout(() => el?.classList.remove("ring-2", "ring-primary/50", "rounded-xl"), 2000)
  }

  const interviewingJobs = getJobsByStage("interviewing")
  const offersWithAction = getJobsByStage("offer").filter((j) => j.hasOffer)
  const staleApplied = getJobsByStage("applied").filter((j) => j.daysInStage >= 7)
  const health = getBoardHealth(lastActivityDays)

  // Reset panel state when changing selected job
  const handleSelectJob = (job: JobCard) => {
    setSelectedJob(job)
    setActiveTab("overview")
    setShowAiSummary(false)
    setExpandedNews(new Set())
    setExpandedCulture(new Set())
    setShowSalaryConvo(false)
    setClearConvo(false)
  }

  const handleMoveStage = (jobId: string, newStage: Stage) => {
    setJobs(jobs.map((j) => (j.id === jobId ? { ...j, stage: newStage, daysInStage: 0 } : j)))
    setSelectedJob((prev) => prev && prev.id === jobId ? { ...prev, stage: newStage, daysInStage: 0 } : prev)
    setToast(`Moved to ${stageMeta.find((s) => s.id === newStage)?.label}`)
    setLastActivityDays(1)
    setTimeout(() => setToast(null), 3000)
  }

  const toggleNews = (index: number) => {
    setExpandedNews((prev) => { const next = new Set(prev); if (next.has(index)) next.delete(index); else next.add(index); return next })
  }

  const toggleCulture = (tag: string) => {
    setExpandedCulture((prev) => { const next = new Set(prev); if (next.has(tag)) next.delete(tag); else next.add(tag); return next })
  }

  const togglePin = (index: number) => {
    setPinnedNotes((prev) => { const next = new Set(prev); if (next.has(index)) next.delete(index); else next.add(index); return next })
  }

  const notes = [
    { text: "Spoke with recruiter — they're looking for someone to lead a new analytics initiative.", date: "June 14, 2026 · 2:30 PM" },
    { text: "Found their tech blog — they use dbt and Snowflake. Should mention my experience.", date: "June 12, 2026 · 10:15 AM" },
  ]

  const sortedNotes = [...notes].sort((a, b) => {
    const aPinned = pinnedNotes.has(notes.indexOf(a)) ? 1 : 0
    const bPinned = pinnedNotes.has(notes.indexOf(b)) ? 1 : 0
    return bPinned - aPinned
  })

  const newsItems = [
    { title: `${selectedJob?.company || ""} raises $100M Series D`, source: "TechCrunch", date: "June 5, 2026", aiNote: "Fresh funding typically accelerates hiring across all teams. This Series D suggests aggressive growth — your application timing is strong." },
    { title: `${selectedJob?.company || ""} expands ${selectedJob?.company === "Grab" ? "GrabFinance" : "operations"} to 3 new markets`, source: "Bloomberg", date: "May 28, 2026", aiNote: "Financial services expansion creates demand for analysts who can work with transaction data. Mention this in your cover letter." },
    { title: `${selectedJob?.company || ""} announces AI research lab in KL`, source: "TechInAsia", date: "May 15, 2026", aiNote: "An AI research lab in KL signals local ML hiring. Your trajectory is directly relevant." },
  ]

  return (
    <div className="flex h-full flex-col">
      {/* ── Top Summary Strip ────────────────────────── */}
      <div className="border-b border-border bg-primary/5 px-8 py-3">
        <div className="flex items-center gap-6">
          <button onClick={() => scrollToStage("interviewing")} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#5AC8FA] transition-colors hover:bg-[#5AC8FA]/10">
            <Calendar className="h-3.5 w-3.5" />
            {interviewingJobs.length} interview{interviewingJobs.length !== 1 ? "s" : ""} this week
          </button>
          <span className="text-border">·</span>
          <button onClick={() => scrollToStage("applied")} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium text-warning transition-colors hover:bg-warning/10">
            <Clock className="h-3.5 w-3.5" />
            {staleApplied.length} application{staleApplied.length !== 1 ? "s" : ""} need follow-up
          </button>
          <span className="text-border">·</span>
          <button onClick={() => scrollToStage("offer")} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium text-success transition-colors hover:bg-success/10">
            <Star className="h-3.5 w-3.5" />
            {offersWithAction.length} offer waiting for response
          </button>
          <div className="ml-auto flex items-center gap-2 rounded-full bg-card/60 border border-card-border px-3 py-1">
            <span className={`h-2 w-2 rounded-full ${health.dotColor} animate-pulse`} />
            <span className={`text-[11px] font-medium ${health.color}`}>Board: {health.label}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="mb-6">
          <p className="text-section-label mb-1">Pipeline</p>
          <h1 className="text-[28px] font-light tracking-[-0.02em] text-foreground">Overview</h1>
          <p className="mt-1 text-sm text-foreground-secondary">Track your job applications and progress across every stage.</p>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search companies or roles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <Button className="gap-2"><Plus className="h-4 w-4" />Add New</Button>
        </div>

        {/* ── Kanban Board ───────────────────────────── */}
        <div ref={boardRef} className="flex gap-4 overflow-x-auto pb-6">
          {stageMeta.map((meta) => {
            const stageJobs = getJobsByStage(meta.id)
            const signal = getColumnSignal(meta.id, stageJobs)
            return (
              <div key={meta.id} id={`stage-${meta.id}`} className="w-72 flex-shrink-0 transition-all duration-500" onDragOver={handleDragOver} onDrop={() => handleDrop(meta.id)}>
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: meta.dotColor }} />
                    <span className="text-[13px] font-semibold text-foreground">{meta.label}</span>
                    <div className="ml-auto flex items-center gap-1.5">
                      {signal.signal && <span className={`text-[10px] font-medium ${signal.signalColor}`}>{signal.signal}</span>}
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground-tertiary">{stageJobs.length}</span>
                    </div>
                  </div>
                  <p className="mt-0.5 text-[11px] text-foreground-disabled">{meta.subtitle}</p>
                </div>
                <div className="space-y-2 rounded-xl bg-elevated/40 border border-card-border p-3 min-h-[400px]">
                  {stageJobs.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-card-border p-4">
                      <p className="text-center text-[12px] text-foreground-disabled leading-relaxed">{meta.emptyPrompt}</p>
                    </div>
                  ) : (
                    stageJobs.map((job) => {
                      const urgency = getUrgency(job)
                      const tier = getFitTier(job.matchPercent)
                      const status = getStatusLine(job)
                      const isStripeInterview = job.id === "14"
                      const isLinearOffer = job.id === "16"
                      const isFigmaApplied = job.id === "11"
                      const isPetronasSaved = job.id === "4"
                      return (
                        <div key={job.id} draggable onDragStart={() => handleDragStart(job)} onClick={() => handleSelectJob(job)}
                          className={`cursor-pointer rounded-xl border border-card-border bg-card/60 backdrop-blur-[10px] border-l-2 ${urgency.borderColor} p-4 transition-all hover:border-white/10 hover:bg-card/80 active:cursor-grabbing`}>
                          <div className="mb-2 flex items-center gap-2">
                            {isStripeInterview && <Badge className="bg-[#5AC8FA]/15 text-[#5AC8FA] border-transparent text-[10px] h-5"><Calendar className="mr-1 h-2.5 w-2.5" />Interview June 18</Badge>}
                            {isLinearOffer && <Badge className="bg-success/15 text-success border-transparent text-[10px] h-5">Offer</Badge>}
                            {job.isTopMatch && !isStripeInterview && !isLinearOffer && <Badge className="bg-success/10 text-success border-transparent text-[10px] h-5">Top Match</Badge>}
                          </div>
                          <div className="mb-2 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-[11px] font-semibold text-foreground-secondary">{job.initials}</div>
                              <div className="min-w-0">
                                <p className="truncate text-[13px] font-medium text-foreground">{job.company}</p>
                                <p className="truncate text-[12px] text-foreground-tertiary">{job.role}</p>
                              </div>
                            </div>
                          </div>
                          {isPetronasSaved && <p className="mb-2 text-[11px] text-foreground-tertiary">Low match — skills gap identified</p>}
                          <div className={`mb-2 flex items-center gap-1.5 text-[11px] ${status.color}`}>{status.icon}<span>{status.text}</span></div>
                          <div className="mb-3 flex items-center gap-2 text-[11px] text-foreground-tertiary"><span>{job.location}</span><span>·</span><span>MYR {job.salaryMYR.toLocaleString()}/mo</span><span>·</span><span>{job.daysInStage}d in stage</span></div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5"><span className={`text-[11px] font-medium ${tier.color}`}>{tier.label}</span><span className="text-[10px] text-foreground-disabled">{job.matchPercent}%</span></div>
                            <div className="flex items-center gap-1">
                              {isStripeInterview && <Link href="/candidate/dashboard/smart-apply?tab=interview" onClick={(e) => e.stopPropagation()} className="rounded-md px-2 py-1 text-[10px] text-[#5AC8FA] transition-colors hover:bg-[#5AC8FA]/10">Prepare →</Link>}
                              {isLinearOffer && <Link href={`/candidate/dashboard/job/3`} onClick={(e) => e.stopPropagation()} className="rounded-md px-2 py-1 text-[10px] text-success transition-colors hover:bg-success/10">View offer details</Link>}
                              {isFigmaApplied && <Link href="/candidate/dashboard/smart-apply" onClick={(e) => e.stopPropagation()} className="rounded-md px-2 py-1 text-[10px] text-warning transition-colors hover:bg-warning/10">✦ Draft follow-up</Link>}
                              {isPetronasSaved && <Link href="/candidate/dashboard/trajectory" onClick={(e) => e.stopPropagation()} className="rounded-md px-2 py-1 text-[10px] text-foreground-tertiary transition-colors hover:bg-white/5">See what to build →</Link>}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild><button onClick={(e) => e.stopPropagation()} className="rounded-md p-1 text-foreground-tertiary transition-colors hover:bg-muted hover:text-foreground-secondary"><MoreHorizontal className="h-3.5 w-3.5" /></button></DropdownMenuTrigger>
                                <DropdownMenuContent><DropdownMenuItem>Move to stage</DropdownMenuItem><DropdownMenuItem>Add note</DropdownMenuItem><DropdownMenuItem>Set reminder</DropdownMenuItem><DropdownMenuItem>Archive</DropdownMenuItem></DropdownMenuContent>
                              </DropdownMenu>
                              {job.contacts && job.contacts.length > 0 && <div className="flex -space-x-1.5">{job.contacts.slice(0, 2).map((contact, i) => <div key={i} className="flex h-5 w-5 items-center justify-center rounded-full border border-card bg-secondary text-[9px] font-medium text-foreground-tertiary">{contact}</div>)}</div>}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          ── SIDE PANEL — Personal Deal Room ────────────
          ══════════════════════════════════════════════════ */}
      {selectedJob && (() => {
        const tier = getFitTier(selectedJob.matchPercent)
        const panelHealth = getPanelHealth(selectedJob)
        const nextAction = getNextAction(selectedJob)
        const trajectoryNote = getTrajectoryNote(selectedJob)
        const stageIdx = stageMeta.findIndex((s) => s.id === selectedJob.stage)
        const currentMeta = stageMeta[stageIdx]
        const isOverTypical = selectedJob.stage === "applied" && selectedJob.daysInStage > 7

        return (
          <div className="fixed inset-y-0 right-0 z-50 w-[48%] border-l border-border bg-card shadow-2xl">
            <div className="flex h-full flex-col">
              {/* ── Panel Header ─────────────────────── */}
              <div className="border-b border-border p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-lg font-semibold text-foreground-secondary">
                      {selectedJob.initials}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{selectedJob.company}</h2>
                      <p className="text-muted-foreground">{selectedJob.role}</p>
                      <p className="mt-1 text-[11px] text-foreground-disabled">
                        Last updated {selectedJob.daysInStage === 0 ? "today" : `${selectedJob.daysInStage} day${selectedJob.daysInStage > 1 ? "s" : ""} ago`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {}}>Move to stage</DropdownMenuItem>
                        {stageMeta.map((s) => (
                          <DropdownMenuItem key={s.id} onClick={() => handleMoveStage(selectedJob.id, s.id)} className="pl-6 text-xs">
                            {s.label}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem onClick={() => { setSelectedJob(null); setToast("Opportunity archived"); setTimeout(() => setToast(null), 3000) }}>
                          <Archive className="mr-2 h-3.5 w-3.5" />Archive this opportunity
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(selectedJob.company); setToast("Company name copied"); setTimeout(() => setToast(null), 2000) }}>
                          <Copy className="mr-2 h-3.5 w-3.5" />Copy company name
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setToast("Link copied to clipboard"); setTimeout(() => setToast(null), 2000) }}>
                          <Share2 className="mr-2 h-3.5 w-3.5" />Share opportunity link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedJob(null)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Stage Tracker + Health */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 flex-1">
                    {stageMeta.map((stage, i) => (
                      <div key={stage.id} className="flex items-center">
                        <div className={`flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium ${stage.id === selectedJob.stage ? `${stage.color} text-white` : stageMeta.findIndex((s) => s.id === selectedJob.stage) > i ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                          {stage.label}
                        </div>
                        {i < stageMeta.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                  {panelHealth && (
                    <div className="flex items-center gap-1.5 rounded-full bg-card/60 border border-card-border px-2.5 py-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${panelHealth.dot}`} />
                      <span className={`text-[10px] font-medium ${panelHealth.color}`}>{panelHealth.text}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Panel Tabs ──────────────────────── */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
                <div className="border-b border-border px-6">
                  <TabsList className="h-11 w-full justify-start gap-3 bg-transparent p-0">
                    {panelTabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} className="h-11 border-b-2 border-transparent px-0 text-[11px] data-[state=active]:border-primary data-[state=active]:bg-transparent">
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {/* ═══════ OVERVIEW TAB ═══════ */}
                  <TabsContent value="overview" className="m-0">
                    {/* Stat tiles */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <Card className="border-border/60">
                        <CardContent className="p-3.5">
                          <p className="text-[11px] text-muted-foreground">Days in pipeline</p>
                          <p className="text-2xl font-semibold text-foreground">{selectedJob.daysInStage}</p>
                          <p className="mt-0.5 text-[10px] text-foreground-disabled">Current stage: {currentMeta?.label}</p>
                        </CardContent>
                      </Card>
                      <Card className="border-border/60">
                        <CardContent className="p-3.5">
                          <p className="text-[11px] text-muted-foreground">Match</p>
                          <p className={`text-lg font-semibold ${tier.color}`}>{tier.label}</p>
                          <p className="text-[10px] text-foreground-disabled">{selectedJob.matchPercent}% — Trajectory aligns with your Data Scientist goal</p>
                        </CardContent>
                      </Card>
                      <Card className="border-border/60">
                        <CardContent className="p-3.5">
                          <p className="text-[11px] text-muted-foreground">Open roles at company</p>
                          <p className="text-2xl font-semibold text-foreground">3</p>
                        </CardContent>
                      </Card>
                      <Card className="border-border/60">
                        <CardContent className="p-3.5">
                          <p className="text-[11px] text-muted-foreground">Readiness</p>
                          <div className="mt-1 flex gap-1">
                            {["Skills", "Exp", "Portfolio", "Prep"].map((label, i) => {
                              const vals = [85, 70, 45, 60]
                              return (
                                <div key={label} className="flex-1">
                                  <div className="h-1.5 w-full rounded-full bg-secondary">
                                    <div className={`h-1.5 rounded-full ${vals[i] >= 70 ? "bg-[#5AC8FA]" : "bg-warning"}`} style={{ width: `${vals[i]}%` }} />
                                  </div>
                                  <p className="mt-0.5 text-[8px] text-foreground-disabled text-center">{label}</p>
                                </div>
                              )
                            })}
                          </div>
                          <Link href="/candidate/dashboard/smart-apply" className="mt-1.5 inline-block text-[10px] text-primary hover:underline">Improve →</Link>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Trajectory Match */}
                    <Card className="mb-4 border-l-2 border-l-[#5AC8FA] border-border/60">
                      <CardContent className="p-4">
                        <div className="mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#5AC8FA]" />
                          <p className="text-[13px] font-semibold text-foreground">Trajectory Match</p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{trajectoryNote}</p>
                      </CardContent>
                    </Card>

                    {/* Pipeline Momentum */}
                    <div className="mb-4 rounded-xl border border-card-border bg-card/40 p-4">
                      <p className="mb-3 text-[12px] font-semibold text-foreground">Pipeline Momentum</p>
                      <div className="mb-3 flex items-center gap-0.5">
                        {stageMeta.map((s, i) => (
                          <div key={s.id} className="flex-1 flex items-center">
                            <div className={`h-1.5 w-full rounded-full ${i <= stageIdx ? "bg-primary" : "bg-secondary"}`} />
                            {i < stageMeta.length - 1 && <div className="w-0.5" />}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-foreground-secondary">
                          {selectedJob.daysInStage} day{selectedJob.daysInStage !== 1 ? "s" : ""} in {currentMeta?.label}
                        </span>
                        <span className={`${isOverTypical ? "text-warning" : "text-foreground-disabled"}`}>
                          {selectedJob.stage === "saved" ? "No time pressure" :
                           isOverTypical ? `You have been here longer than typical (${currentMeta?.typicalDays} days)` :
                           `Typical: ${currentMeta?.typicalDays} days`}
                        </span>
                      </div>
                    </div>

                    {/* Next Action */}
                    <Card className="mb-4 border-l-2 border-l-[#5AC8FA] border-border/60">
                      <CardContent className="p-4">
                        <p className="mb-1.5 text-[13px] font-semibold text-foreground">{nextAction.title}</p>
                        <p className="mb-3 text-sm text-muted-foreground leading-relaxed">{nextAction.body}</p>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1.5" asChild>
                            <Link href="/candidate/dashboard/smart-apply"><Sparkles className="h-3 w-3" />Draft message</Link>
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1.5" asChild>
                            <Link href="/candidate/dashboard/resume"><FileText className="h-3 w-3" />Tailor my resume</Link>
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1.5" asChild>
                            <Link href="/candidate/dashboard/smart-apply?tab=interview"><Target className="h-3 w-3" />Prep questions</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Readiness Breakdown */}
                    <div className="mb-4 rounded-xl border border-card-border bg-card/40 p-4">
                      <p className="mb-3 text-[12px] font-semibold text-foreground">How ready are you for this role?</p>
                      {[
                        { label: "Skills match", pct: 85 },
                        { label: "Experience level", pct: 70 },
                        { label: "Portfolio strength", pct: 45 },
                        { label: "Interview prep", pct: 60 },
                      ].map((item) => (
                        <div key={item.label} className="mb-2.5 last:mb-0">
                          <div className="mb-1 flex items-center justify-between text-[11px]">
                            <span className="text-foreground-secondary">{item.label}</span>
                            <span className={item.pct >= 70 ? "text-[#5AC8FA]" : "text-warning"}>{item.pct}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-secondary">
                            <div className={`h-1.5 rounded-full ${item.pct >= 70 ? "bg-[#5AC8FA]" : "bg-warning"}`} style={{ width: `${item.pct}%` }} />
                          </div>
                          {item.pct < 70 && (
                            <p className="mt-0.5 text-[10px] text-warning">
                              {item.label === "Portfolio strength" && "Add a project with ML outcomes to strengthen this area"}
                              {item.label === "Interview prep" && "One mock session recommended before your interview"}
                            </p>
                          )}
                        </div>
                      ))}
                      <Link href="/candidate/dashboard/smart-apply" className="mt-3 inline-flex items-center gap-1 text-[11px] text-primary hover:underline">
                        Improve readiness →<ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* Key Dates */}
                    <div>
                      <h3 className="mb-2 text-[12px] font-semibold text-foreground">Key Dates</h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-2.5">
                          <span className="text-[12px] text-muted-foreground">Added to tracker</span>
                          <span className="text-[12px] text-foreground">June 10, 2026</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-2.5">
                          <span className="text-[12px] text-muted-foreground">Application submitted</span>
                          <span className="text-[12px] text-foreground">June 12, 2026</span>
                        </div>
                        {(selectedJob.stage === "applied" || selectedJob.stage === "networking") && (
                          <div className="flex items-center justify-between rounded-lg bg-warning/10 p-2.5">
                            <span className="flex items-center gap-1.5 text-[12px] text-warning">
                              <Clock className="h-3 w-3" />Suggested follow-up by
                            </span>
                            <span className="text-[12px] font-medium text-warning">June 19, 2026</span>
                          </div>
                        )}
                        {selectedJob.interviewDate && (
                          <div className="flex items-center justify-between rounded-lg bg-purple-500/10 p-2.5">
                            <span className="text-[12px] text-purple-500">Interview scheduled</span>
                            <span className="text-[12px] font-medium text-purple-500">{selectedJob.interviewDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {/* ═══════ TIPS & TRICKS TAB ═══════ */}
                  <TabsContent value="tips" className="m-0 space-y-3">
                    <div className="mb-1 rounded-lg bg-[#5AC8FA]/5 border border-[#5AC8FA]/20 p-3">
                      <p className="text-[11px] text-[#5AC8FA] font-medium">✦ Personalised for your profile</p>
                      <p className="mt-0.5 text-[11px] text-foreground-tertiary">These insights are generated based on your background as a Data Analyst with ML experience — not generic advice.</p>
                    </div>
                    <Card className="border-border/60"><CardContent className="p-3.5"><div className="mb-1.5 flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /><span className="text-[13px] font-medium text-foreground">Interview Style</span></div><p className="text-[12px] text-muted-foreground">{selectedJob.company} typically conducts 4-round interviews: phone screen, technical assessment, system design, and culture fit.</p></CardContent></Card>
                    <Card className="border-border/60"><CardContent className="p-3.5"><div className="mb-1.5 flex items-center gap-2"><Target className="h-3.5 w-3.5 text-primary" /><span className="text-[13px] font-medium text-foreground">What they look for</span></div><p className="text-[12px] text-muted-foreground">Strong emphasis on business impact storytelling. Candidates connecting technical work to revenue outcomes perform 2x better.</p></CardContent></Card>
                    <Card className="border-border/60"><CardContent className="p-3.5"><div className="mb-1.5 flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-primary" /><span className="text-[13px] font-medium text-foreground">Application tip</span></div><p className="text-[12px] text-muted-foreground">Mention specific product metrics in your cover letter. Hiring managers at {selectedJob.company} value data-driven candidates.</p></CardContent></Card>
                    <Card className="border-border/60"><CardContent className="p-3.5"><div className="mb-1.5 flex items-center gap-2"><TrendingUp className="h-3.5 w-3.5 text-primary" /><span className="text-[13px] font-medium text-foreground">Salary negotiation</span></div><p className="text-[12px] text-muted-foreground">Market data shows this role pays RM 12,000-18,000/month. Your trajectory positions you in the upper range.</p></CardContent></Card>
                    <Card className="border-border/60"><CardContent className="p-3.5"><div className="mb-1.5 flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /><span className="text-[13px] font-medium text-foreground">Timing</span></div><p className="text-[12px] text-muted-foreground">{selectedJob.company}'s hiring team is most responsive on Tuesday and Wednesday mornings based on historical Career OS data. If you are planning to reach out, early this week is ideal.</p></CardContent></Card>
                    <p className="text-[10px] text-foreground-disabled">✦ Insights from anonymised candidate outcomes.</p>
                  </TabsContent>

                  {/* ═══════ AI TOOLS TAB ═══════ */}
                  <TabsContent value="ai" className="m-0">
                    <div className="mb-3 rounded-lg bg-[#5AC8FA]/5 border border-[#5AC8FA]/20 p-3">
                      <p className="text-[11px] text-[#5AC8FA] font-medium">✦ Context loaded</p>
                      <p className="mt-0.5 text-[11px] text-foreground-tertiary">Career OS has loaded your profile, this role's requirements, and {selectedJob.company}'s hiring patterns into this conversation.</p>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      <Button variant="outline" size="sm" className="h-7 text-[11px]">Draft cover letter</Button>
                      <Button variant="outline" size="sm" className="h-7 text-[11px]">Tailor my resume</Button>
                      <Button variant="outline" size="sm" className="h-7 text-[11px]">Prep interview Qs</Button>
                      <Button variant="outline" size="sm" className="h-7 text-[11px]">Research company</Button>
                    </div>
                    <Card className="mb-3 border-border/60">
                      <CardContent className="p-4 max-h-[320px] overflow-y-auto space-y-4">
                        {/* Message 1 */}
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"><Sparkles className="h-3 w-3 text-primary" /></div>
                            <span className="text-[11px] font-medium text-foreground">Career OS</span>
                          </div>
                          <p className="text-[12px] text-muted-foreground leading-relaxed">I've analysed your profile against this role. Your Python and SQL skills are a strong match, but consider highlighting your recent ML project to bridge the "machine learning" requirement gap. Would you like me to suggest specific bullet points?</p>
                        </div>
                        {/* Message 2 */}
                        <div>
                          <div className="mb-1.5 flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-foreground-secondary">JC</div>
                            <span className="text-[11px] font-medium text-foreground">You</span>
                          </div>
                          <p className="text-[12px] text-muted-foreground">What salary should I ask for?</p>
                        </div>
                        <div>
                          <div className="mb-1.5 flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"><Sparkles className="h-3 w-3 text-primary" /></div>
                            <span className="text-[11px] font-medium text-foreground">Career OS</span>
                          </div>
                          <p className="text-[12px] text-muted-foreground leading-relaxed">Based on your 4 years of experience and the market data for {selectedJob.role} roles at {selectedJob.company} in {selectedJob.location}, a reasonable range is <strong>RM {Math.round(selectedJob.salaryMYR * 0.85).toLocaleString()}–{Math.round(selectedJob.salaryMYR * 1.15).toLocaleString()}</strong> per month. Your trajectory toward ML roles positions you to negotiate toward the upper end. Lead with your ML project outcomes rather than your current salary.</p>
                        </div>
                        {/* Message 3 */}
                        {showSalaryConvo && (
                          <>
                            <div>
                              <div className="mb-1.5 flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-foreground-secondary">JC</div>
                                <span className="text-[11px] font-medium text-foreground">You</span>
                              </div>
                              <p className="text-[12px] text-muted-foreground">What should I highlight in my cover letter?</p>
                            </div>
                            <div>
                              <div className="mb-1.5 flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"><Sparkles className="h-3 w-3 text-primary" /></div>
                                <span className="text-[11px] font-medium text-foreground">Career OS</span>
                              </div>
                              <p className="text-[12px] text-muted-foreground leading-relaxed">Lead with your data storytelling ability — {selectedJob.company} values candidates who connect analysis to business outcomes. Mention your experience with large-scale data pipelines and your transition toward ML. Specifically reference their recent expansion news to show you've done your research.</p>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Textarea placeholder="Ask Career OS anything about this opportunity..." className="min-h-[60px] pr-10 text-[12px]" />
                        <Button size="icon" className="absolute bottom-2 right-2 h-7 w-7"><ArrowRight className="h-3.5 w-3.5" /></Button>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] text-foreground-tertiary" onClick={() => setShowSalaryConvo(true)}>More ↓</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] text-foreground-tertiary" onClick={() => setClearConvo(true)}>Clear</Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* ═══════ CONTACTS TAB ═══════ */}
                  <TabsContent value="contacts" className="m-0 space-y-3">
                    {selectedJob.contacts && selectedJob.contacts.length > 0 ? (
                      selectedJob.contacts.map((contact, i) => (
                        <Card key={i} className="border-border/60">
                          <CardContent className="p-3.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-[12px] font-medium text-foreground-secondary">{contact}</div>
                                <div>
                                  <p className="text-[13px] font-medium text-foreground">Contact {contact}</p>
                                  <p className="text-[11px] text-muted-foreground">Data Science Manager · 2nd connection</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="h-7 gap-1.5 text-[11px]"><MessageSquare className="h-3 w-3" />AI Outreach</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-border p-8 text-center">
                        <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">No contacts saved yet</p>
                        <Button variant="outline" size="sm" className="mt-3 gap-2"><UserPlus className="h-4 w-4" />Find contacts</Button>
                      </div>
                    )}
                  </TabsContent>

                  {/* ═══════ JOBS TAB ═══════ */}
                  <TabsContent value="jobs" className="m-0 space-y-3">
                    <div className="mb-1 rounded-lg bg-[#5AC8FA]/5 border border-[#5AC8FA]/20 p-3">
                      <p className="text-[11px] text-[#5AC8FA] font-medium">✦ Why Career OS shows these</p>
                      <p className="mt-0.5 text-[11px] text-foreground-tertiary">Showing roles at {selectedJob.company} that Career OS identifies as more aligned to your trajectory than the role you originally saved.</p>
                    </div>
                    <Card className="border-2 border-success/50">
                      <CardContent className="p-3.5">
                        <Badge className="mb-1.5 bg-success/10 text-success border-transparent text-[10px] h-5">Better match — 94% fit</Badge>
                        <p className="text-[13px] font-medium text-foreground">Senior ML Engineer</p>
                        <p className="mb-0.5 text-[11px] text-[#5AC8FA]">✦ Better match for your Data Scientist trajectory than your current saved role.</p>
                        <p className="mb-2 text-[11px] text-muted-foreground">{selectedJob.location} · Full-time</p>
                        <Button size="sm" className="h-7 text-[11px]">Add to Tracker</Button>
                      </CardContent>
                    </Card>
                    <Card className="border-border/60">
                      <CardContent className="p-3.5">
                        <div className="mb-1.5 flex items-center justify-between">
                          <p className="text-[13px] font-medium text-foreground">Data Analyst</p>
                          <Badge variant="secondary" className="text-[10px] h-5">78% fit</Badge>
                        </div>
                        <p className="mb-0.5 text-[11px] text-foreground-tertiary">✦ A lateral move — less useful for your trajectory unless the team is stronger.</p>
                        <p className="mb-2 text-[11px] text-muted-foreground">{selectedJob.location} · Full-time</p>
                        <Button variant="outline" size="sm" className="h-7 text-[11px]">Add to Tracker</Button>
                      </CardContent>
                    </Card>
                    <Card className="border-border/60">
                      <CardContent className="p-3.5">
                        <div className="mb-1.5 flex items-center justify-between">
                          <p className="text-[13px] font-medium text-foreground">Business Intelligence Lead</p>
                          <Badge variant="secondary" className="text-[10px] h-5">71% fit</Badge>
                        </div>
                        <p className="mb-0.5 text-[11px] text-foreground-tertiary">✦ Leadership track — useful if you are considering the BI Manager path.</p>
                        <p className="mb-2 text-[11px] text-muted-foreground">{selectedJob.location} · Full-time</p>
                        <Button variant="outline" size="sm" className="h-7 text-[11px]">Add to Tracker</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ═══════ NOTES TAB ═══════ */}
                  <TabsContent value="notes" className="m-0">
                    <div className="mb-3 flex gap-1.5">
                      <Input placeholder="Add a note..." value={noteText} onChange={(e) => setNoteText(e.target.value)} className="h-8 text-[12px]" />
                      <Button disabled={!noteText.trim()} size="sm" className="h-8 text-[11px]">Add</Button>
                      <Button variant="outline" size="sm" className="h-8 gap-1.5 text-[11px]" onClick={() => setShowAiSummary(!showAiSummary)}>
                        <Sparkles className="h-3 w-3" />AI Summary
                      </Button>
                    </div>

                    {showAiSummary && (
                      <div className="mb-3 rounded-lg bg-[#5AC8FA]/5 border border-[#5AC8FA]/20 p-3">
                        <p className="text-[11px] text-[#5AC8FA] font-medium mb-1">✦ AI Summary</p>
                        <p className="text-[12px] text-muted-foreground leading-relaxed">You spoke with a recruiter on June 14 who mentioned a new analytics initiative. The company uses dbt and Snowflake — relevant to mention in your application.</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      {sortedNotes.map((note, i) => {
                        const origIdx = notes.indexOf(note)
                        const isPinned = pinnedNotes.has(origIdx)
                        const category = noteCategories[origIdx] || "General"
                        return (
                          <div key={i} className={`rounded-lg border p-3 ${isPinned ? "border-[#5AC8FA]/30 bg-[#5AC8FA]/5" : "border-border"}`}>
                            <div className="mb-1.5 flex items-center gap-1.5">
                              <button onClick={() => togglePin(origIdx)} className={`rounded p-0.5 transition-colors ${isPinned ? "text-[#5AC8FA]" : "text-foreground-disabled hover:text-foreground-tertiary"}`}>
                                <Pin className="h-3 w-3" />
                              </button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="rounded-md bg-secondary px-1.5 py-0.5 text-[9px] font-medium text-foreground-tertiary hover:text-foreground-secondary">{category}</button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {["Recruiter call", "Research", "Reminder", "Interview prep", "Networking", "General"].map((cat) => (
                                    <DropdownMenuItem key={cat} onClick={() => setNoteCategories((prev) => ({ ...prev, [origIdx]: cat }))} className="text-[11px]">
                                      {cat} {category === cat && <CheckCircle2 className="ml-auto h-3 w-3" />}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="text-[12px] text-foreground">{note.text}</p>
                            <p className="mt-1 text-[10px] text-foreground-disabled">{note.date}</p>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>

                  {/* ═══════ COMPANY TAB ═══════ */}
                  <TabsContent value="company" className="m-0">
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-1.5 text-[13px] font-medium text-foreground">About {selectedJob.company}</h3>
                        <p className="text-[12px] text-muted-foreground leading-relaxed">{selectedJob.company} is a leading technology company focused on building products that empower teams to do their best work. Founded in 2010, they have grown to over 1,000 employees globally.</p>
                      </div>

                      {/* Why it matters */}
                      <Card className="border-l-2 border-l-[#5AC8FA] border-border/60">
                        <CardContent className="p-3.5">
                          <p className="mb-1 text-[12px] font-semibold text-foreground">Why it matters for your career</p>
                          <p className="text-[12px] text-muted-foreground leading-relaxed">{selectedJob.company} processes billions of transactions across 8 countries. For someone on a Data Analyst to Data Scientist trajectory, the scale of data problems here builds ML skills faster than most other environments in Southeast Asia.</p>
                        </CardContent>
                      </Card>

                      {/* Stat tiles */}
                      <div className="grid grid-cols-4 gap-2">
                        <div className="rounded-lg bg-secondary/50 p-2.5"><p className="text-[10px] text-muted-foreground">Industry</p><p className="text-[12px] font-medium text-foreground">Technology</p></div>
                        <div className="rounded-lg bg-secondary/50 p-2.5"><p className="text-[10px] text-muted-foreground">Size</p><p className="text-[12px] font-medium text-foreground">1,000-5,000</p></div>
                        <div className="rounded-lg bg-secondary/50 p-2.5"><p className="text-[10px] text-muted-foreground">Funding</p><p className="text-[12px] font-medium text-foreground">Series D</p></div>
                        <div className="rounded-lg bg-secondary/50 p-2.5"><p className="text-[10px] text-muted-foreground">Hiring pace</p><div className="mt-0.5 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success" /><p className="text-[12px] font-medium text-success">Actively growing</p></div></div>
                      </div>

                      {/* Expandable Culture Signals */}
                      <div>
                        <h3 className="mb-2 text-[13px] font-medium text-foreground">Culture Signals</h3>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { tag: "Remote-first", explanation: "Your location in KL is not a barrier for most roles." },
                            { tag: "Async communication", explanation: "Written communication is valued — your analytical documentation skills are an asset." },
                            { tag: "Data-driven", explanation: "Your analytical work will be taken seriously at all levels." },
                            { tag: "Flat hierarchy", explanation: "You will have direct access to decision-makers and your insights will be heard." },
                          ].map(({ tag, explanation }) => (
                            <div key={tag}>
                              <Badge variant="secondary" className="cursor-pointer text-[10px] h-6 px-2.5 hover:bg-secondary/80 transition-colors" onClick={() => toggleCulture(tag)}>
                                {tag}
                                <ChevronDown className={`ml-1 h-2.5 w-2.5 transition-transform ${expandedCulture.has(tag) ? "rotate-180" : ""}`} />
                              </Badge>
                              {expandedCulture.has(tag) && (
                                <p className="mt-1.5 text-[11px] text-foreground-tertiary">{explanation}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Career Growth */}
                      <div>
                        <h3 className="mb-2 text-[13px] font-medium text-foreground">Career Growth at {selectedJob.company}</h3>
                        <div className="space-y-1.5">
                          <div className="flex items-start gap-2"><span className="mt-1 h-1 w-1 rounded-full bg-foreground-tertiary shrink-0" /><p className="text-[12px] text-muted-foreground">Data Analysts typically progress to Senior DA or DS roles within <strong className="text-foreground-secondary">18–24 months</strong>.</p></div>
                          <div className="flex items-start gap-2"><span className="mt-1 h-1 w-1 rounded-full bg-foreground-tertiary shrink-0" /><p className="text-[12px] text-muted-foreground">Internal mobility is strong — <strong className="text-foreground-secondary">60% of senior roles</strong> filled internally.</p></div>
                          <div className="flex items-start gap-2"><span className="mt-1 h-1 w-1 rounded-full bg-foreground-tertiary shrink-0" /><p className="text-[12px] text-muted-foreground">{selectedJob.company} sponsors <strong className="text-foreground-secondary">Google Cloud and AWS certifications</strong> for data team members.</p></div>
                        </div>
                      </div>

                      {/* News */}
                      <div>
                        <h3 className="mb-2 text-[13px] font-medium text-foreground">Recent News</h3>
                        <div className="space-y-2">
                          {newsItems.map((item, i) => (
                            <Card key={i} className="border-border/60">
                              <CardContent className="p-3.5">
                                <div className="mb-1 flex items-center gap-2">
                                  <Newspaper className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span className="text-[12px] font-medium text-foreground">{item.title}</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground">{item.source} · {item.date}</p>
                                <button className="mt-2 flex items-center gap-1 text-[11px] text-primary hover:underline" onClick={() => toggleNews(i)}>
                                  <Sparkles className="h-3 w-3" />
                                  See how this affects your application
                                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedNews.has(i) ? "rotate-180" : ""}`} />
                                </button>
                                {expandedNews.has(i) && (
                                  <p className="mt-2 rounded-lg bg-[#5AC8FA]/5 border border-[#5AC8FA]/20 p-2.5 text-[11px] text-muted-foreground leading-relaxed">{item.aiNote}</p>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Career OS Assessment */}
                      <Card className="border-l-2 border-l-[#5AC8FA] border-border/60">
                        <CardContent className="p-4">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#5AC8FA]" />
                            <p className="text-[13px] font-semibold text-foreground">Career OS Assessment</p>
                          </div>
                          <p className="text-[12px] text-muted-foreground leading-relaxed">
                            {selectedJob.company} is a high-growth environment that rewards candidates who communicate impact clearly. For your Data Scientist trajectory, the scale of data problems here is a genuine accelerator. The main consideration is pace — {selectedJob.company} moves quickly and expects autonomy early. If you thrive in ambiguity, this is a strong fit for your goals.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        )
      })()}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-foreground px-4 py-2 text-sm text-background shadow-lg">
          {toast}
          <button className="ml-3 text-background/70 hover:text-background" onClick={() => setToast(null)}>Undo</button>
        </div>
      )}
    </div>
  )
}
