"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ChevronDown, ChevronUp, X, SlidersHorizontal, CheckSquare, Square } from "lucide-react"

type AnimalType = "wolf" | "eagle" | "dolphin" | "fox" | "bear"

const animalEmoji: Record<AnimalType, string> = {
 wolf: "🐺", eagle: "🦅", dolphin: "🐬", fox: "🦊", bear: "🐻",
}

type Job = {
 id: number
 title: string
 company: string
 matchPercentage: number
 location: string
 reason: string
 salary: string
 workMode: "Remote" | "Hybrid" | "Onsite"
 industry: "Data" | "Product" | "Engineering" | "Marketing"
 animalFit: AnimalType
 skillsHave: string[]
 skillsNeed: string[]
 nextStep: string
}

const jobs: Job[] = [
 {
  id: 1,
  title: "Senior Data Scientist",
  company: "Stripe",
  matchPercentage: 92,
  location: "Remote",
  reason: "Strong Python and SQL skills align perfectly with the role requirements.",
  salary: "RM 12,000 – 16,000",
  workMode: "Remote",
  industry: "Data",
  animalFit: "eagle",
  skillsHave: ["Python", "SQL", "Statistical Analysis"],
  skillsNeed: ["Machine Learning", "Spark"],
  nextStep: "Senior Data Scientist → Lead Scientist → Head of Data",
 },
 {
  id: 2,
  title: "Product Analyst",
  company: "Notion",
  matchPercentage: 87,
  location: "Hybrid – KL",
  reason: "Your product analytics and Tableau experience matches what they need.",
  salary: "RM 8,000 – 12,000",
  workMode: "Hybrid",
  industry: "Product",
  animalFit: "fox",
  skillsHave: ["Tableau", "Product Analytics", "SQL"],
  skillsNeed: ["A/B Testing", "Mixpanel"],
  nextStep: "Product Analyst → Senior PA → Product Manager",
 },
 {
  id: 3,
  title: "Analytics Lead",
  company: "Linear",
  matchPercentage: 84,
  location: "Remote",
  reason: "Leadership potential and data storytelling skills stand out.",
  salary: "RM 13,000 – 18,000",
  workMode: "Remote",
  industry: "Data",
  animalFit: "wolf",
  skillsHave: ["Data Visualization", "SQL", "Communication"],
  skillsNeed: ["Team Management", "dbt"],
  nextStep: "Analytics Lead → Analytics Director → VP of Data",
 },
 {
  id: 4,
  title: "Data Scientist",
  company: "Figma",
  matchPercentage: 82,
  location: "Hybrid – PJ",
  reason: "Design analytics experience and creative problem-solving are valued here.",
  salary: "RM 9,000 – 13,000",
  workMode: "Hybrid",
  industry: "Data",
  animalFit: "fox",
  skillsHave: ["Python", "Statistical Analysis"],
  skillsNeed: ["ML Ops", "Experiment Design"],
  nextStep: "Data Scientist → Senior DS → Research Scientist",
 },
 {
  id: 5,
  title: "BI Manager",
  company: "Airbnb",
  matchPercentage: 79,
  location: "Onsite – KL",
  reason: "Tableau proficiency and stakeholder reporting skills are strong signals.",
  salary: "RM 11,000 – 15,000",
  workMode: "Onsite",
  industry: "Data",
  animalFit: "bear",
  skillsHave: ["Tableau", "Excel", "Reporting"],
  skillsNeed: ["Power BI", "Looker"],
  nextStep: "BI Manager → Head of BI → Analytics Director",
 },
 {
  id: 6,
  title: "Senior Analyst",
  company: "Spotify",
  matchPercentage: 76,
  location: "Remote",
  reason: "Marketing analytics background pairs well with music streaming data.",
  salary: "RM 8,500 – 11,000",
  workMode: "Remote",
  industry: "Marketing",
  animalFit: "dolphin",
  skillsHave: ["Marketing Metrics", "SQL", "Excel"],
  skillsNeed: ["Amplitude", "Growth Analytics"],
  nextStep: "Senior Analyst → Lead Analyst → Marketing Director",
 },
 {
  id: 7,
  title: "Growth Data Scientist",
  company: "Vercel",
  matchPercentage: 74,
  location: "Remote",
  reason: "E-commerce analytics experience translates well to growth metrics.",
  salary: "RM 10,000 – 14,000",
  workMode: "Remote",
  industry: "Data",
  animalFit: "fox",
  skillsHave: ["Python", "E-commerce Analytics"],
  skillsNeed: ["Bayesian A/B Testing", "Causal Inference"],
  nextStep: "Growth DS → Senior Growth DS → Head of Growth",
 },
 {
  id: 8,
  title: "Analytics Engineer",
  company: "dbt Labs",
  matchPercentage: 72,
  location: "Remote",
  reason: "SQL and data pipeline understanding make you a strong candidate.",
  salary: "RM 9,500 – 13,500",
  workMode: "Remote",
  industry: "Engineering",
  animalFit: "bear",
  skillsHave: ["SQL", "Data Pipeline Basics"],
  skillsNeed: ["dbt", "Airflow", "Data Modeling"],
  nextStep: "Analytics Engineer → Senior AE → Data Architect",
 },
 {
  id: 9,
  title: "Product Data Scientist",
  company: "Grab",
  matchPercentage: 80,
  location: "Hybrid – KL",
  reason: "Local market knowledge and product analytics skills are a strong fit.",
  salary: "RM 10,000 – 15,000",
  workMode: "Hybrid",
  industry: "Product",
  animalFit: "eagle",
  skillsHave: ["Product Analytics", "Python", "SQL"],
  skillsNeed: ["Causal Inference", "ML Experimentation"],
  nextStep: "Product DS → Senior DS → Head of Product Analytics",
 },
 {
  id: 10,
  title: "Marketing Analyst",
  company: "Shopee",
  matchPercentage: 77,
  location: "Onsite – KL",
  reason: "Marketing metrics and Excel skills match the team's current needs.",
  salary: "RM 6,500 – 9,000",
  workMode: "Onsite",
  industry: "Marketing",
  animalFit: "dolphin",
  skillsHave: ["Marketing Metrics", "Excel", "Communication"],
  skillsNeed: ["CRM Analytics", "Attribution Modeling"],
  nextStep: "Marketing Analyst → Senior MA → Head of Marketing Analytics",
 },
 {
  id: 11,
  title: "Data Engineer",
  company: "Axiata",
  matchPercentage: 70,
  location: "Hybrid – KL",
  reason: "SQL and data fundamentals are a solid foundation to grow from.",
  salary: "RM 7,000 – 10,000",
  workMode: "Hybrid",
  industry: "Engineering",
  animalFit: "bear",
  skillsHave: ["SQL"],
  skillsNeed: ["Spark", "Kafka", "Scala", "Data Pipeline Design"],
  nextStep: "Data Engineer → Senior DE → Data Platform Lead",
 },
 {
  id: 12,
  title: "Insights Manager",
  company: "Zalora",
  matchPercentage: 73,
  location: "Hybrid – KL",
  reason: "E-commerce analytics experience and stakeholder communication stand out.",
  salary: "RM 9,000 – 13,000",
  workMode: "Hybrid",
  industry: "Data",
  animalFit: "wolf",
  skillsHave: ["E-commerce Analytics", "Communication", "Tableau"],
  skillsNeed: ["Executive Storytelling", "Market Research"],
  nextStep: "Insights Manager → Head of Insights → Chief Analytics Officer",
 },
]

const workModes = ["All", "Remote", "Hybrid", "Onsite"] as const
const industries = ["All", "Data", "Product", "Engineering", "Marketing"] as const
const salaryRanges = [
 { label: "All salaries", min: 0 },
 { label: "RM 3k – 6k", min: 3000, max: 6999 },
 { label: "RM 7k – 9k", min: 7000, max: 9999 },
 { label: "RM 10k – 13k", min: 10000, max: 13999 },
 { label: "RM 14k+", min: 14000 },
]

function parseSalaryMin(salary: string): number {
 const match = salary.match(/[\d,]+/)
 if (!match) return 0
 return parseInt(match[0].replace(/,/g, ""))
}

export default function JobMatchesPage() {
 const [searchQuery, setSearchQuery] = useState("")
 const [workMode, setWorkMode] = useState<string>("All")
 const [industry, setIndustry] = useState<string>("All")
 const [salaryIdx, setSalaryIdx] = useState(0)
 const [expandedId, setExpandedId] = useState<number | null>(null)
 const [selectedIds, setSelectedIds] = useState<number[]>([])
 const [compareOpen, setCompareOpen] = useState(false)
 const [userAnimal, setUserAnimal] = useState<AnimalType | null>(null)

 useEffect(() => {
  const stored = localStorage.getItem("animalType")
  if (stored) setUserAnimal(JSON.parse(stored).primary as AnimalType)
 }, [])

 const salaryRange = salaryRanges[salaryIdx]

 const filtered = jobs.filter((job) => {
  const q = searchQuery.toLowerCase()
  const matchesSearch =
   job.title.toLowerCase().includes(q) ||
   job.company.toLowerCase().includes(q) ||
   job.location.toLowerCase().includes(q)
  const matchesMode = workMode === "All" || job.workMode === workMode
  const matchesIndustry = industry === "All" || job.industry === industry
  const jobSalaryMin = parseSalaryMin(job.salary)
  const matchesSalary =
   salaryIdx === 0 ||
   (jobSalaryMin >= salaryRange.min && (salaryRange.max === undefined || jobSalaryMin <= (salaryRange as { min: number; max?: number }).max!))
  return matchesSearch && matchesMode && matchesIndustry && matchesSalary
 })

 const toggleSelect = (id: number) => {
  if (selectedIds.includes(id)) {
   setSelectedIds(selectedIds.filter((x) => x !== id))
  } else if (selectedIds.length < 3) {
   setSelectedIds([...selectedIds, id])
  }
 }

 const compareJobs = jobs.filter((j) => selectedIds.includes(j.id))

 return (
  <div className="min-h-screen p-8">
   <div className="mb-6">
    <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground mb-1">Job Matches</h1>
    <p className="text-sm text-foreground-secondary">
     {filtered.length} roles matching your trajectory
     {userAnimal && <span> · Showing {animalEmoji[userAnimal]} {userAnimal} type fit</span>}
    </p>
   </div>

   {/* 过滤器栏 */}
   <div className="mb-6 flex flex-wrap gap-3 items-center">
    <Input
     placeholder="Search by title, company or location..."
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
     className="max-w-xs"
    />

    <div className="flex gap-1 rounded-lg border border-card-border bg-card/60 p-1">
     {workModes.map((m) => (
      <button
       key={m}
       onClick={() => setWorkMode(m)}
       className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
        workMode === m
         ? "bg-primary text-primary-foreground"
         : "text-foreground-secondary hover:text-foreground"
       }`}
      >
       {m}
      </button>
     ))}
    </div>

    <div className="flex gap-1 rounded-lg border border-card-border bg-card/60 p-1">
     {industries.map((ind) => (
      <button
       key={ind}
       onClick={() => setIndustry(ind)}
       className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
        industry === ind
         ? "bg-primary text-primary-foreground"
         : "text-foreground-secondary hover:text-foreground"
       }`}
      >
       {ind}
      </button>
     ))}
    </div>

    <Select value={String(salaryIdx)} onValueChange={(v) => setSalaryIdx(Number(v))}>
     <SelectTrigger className="w-44">
      <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
      <SelectValue />
     </SelectTrigger>
     <SelectContent>
      {salaryRanges.map((r, i) => (
       <SelectItem key={i} value={String(i)}>{r.label}</SelectItem>
      ))}
     </SelectContent>
    </Select>

    {selectedIds.length >= 2 && (
     <Button onClick={() => setCompareOpen(true)} variant="outline" size="sm">
      Compare {selectedIds.length} jobs
     </Button>
    )}
   </div>

   {/* 职位列表 */}
   {filtered.length === 0 ? (
    <div className="py-20 text-center text-foreground-secondary">
     No roles match your filters.{" "}
     <button
      onClick={() => { setSearchQuery(""); setWorkMode("All"); setIndustry("All"); setSalaryIdx(0) }}
      className="text-primary hover:underline"
     >
      Clear all filters
     </button>
    </div>
   ) : (
    <div className="grid gap-4 md:grid-cols-2">
     {filtered.map((job) => {
      const isExpanded = expandedId === job.id
      const isSelected = selectedIds.includes(job.id)
      const isMyAnimal = userAnimal && job.animalFit === userAnimal

      return (
       <Card
        key={job.id}
        className={`transition-all ${isSelected ? "border-primary/50 shadow-sm" : ""}`}
       >
        <CardContent className="p-5">
         <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2">
           <button onClick={() => toggleSelect(job.id)} className="mt-0.5 flex-shrink-0">
            {isSelected
             ? <CheckSquare className="h-4 w-4 text-primary" />
             : <Square className="h-4 w-4 text-foreground-tertiary hover:text-foreground" />
            }
           </button>
           <div>
            <h3 className="font-medium text-foreground leading-snug">{job.title}</h3>
            <p className="text-sm text-foreground-secondary">{job.company} · {job.location}</p>
           </div>
          </div>
          <Badge className="bg-primary/15 text-primary border-primary/20 ml-2 flex-shrink-0">
           {job.matchPercentage}% match
          </Badge>
         </div>

         <p className="text-xs text-foreground-secondary mb-3">{job.salary}</p>

         {/* 展开/收起 匹配详情 */}
         <button
          onClick={() => setExpandedId(isExpanded ? null : job.id)}
          className="flex items-center gap-1 text-xs text-primary hover:underline mb-3"
         >
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          {isExpanded ? "Hide details" : "Why you match"}
         </button>

         {isExpanded && (
          <div className="mb-3 rounded-lg bg-card/80 border border-card-border p-4 space-y-3 text-xs">
           <div>
            <p className="text-foreground-tertiary mb-1.5">Skills you have</p>
            <div className="flex flex-wrap gap-1.5">
             {job.skillsHave.map((s) => (
              <Badge key={s} className="bg-primary/10 text-primary border-primary/20 text-xs">✓ {s}</Badge>
             ))}
            </div>
           </div>
           <div>
            <p className="text-foreground-tertiary mb-1.5">Skills to build</p>
            <div className="flex flex-wrap gap-1.5">
             {job.skillsNeed.map((s) => (
              <Badge key={s} variant="outline" className="text-xs">○ {s}</Badge>
             ))}
            </div>
           </div>
           <div>
            <p className="text-foreground-tertiary mb-1">Where this role takes you</p>
            <p className="text-foreground">{job.nextStep}</p>
           </div>
          </div>
         )}

         {/* 底部标签行 */}
         <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
           <Badge variant="outline" className="text-xs">{job.workMode}</Badge>
           <Badge variant="outline" className="text-xs">{job.industry}</Badge>
           <Badge className={`text-xs ${isMyAnimal ? "bg-primary/10 text-primary border-primary/20" : "bg-card border-card-border text-foreground-tertiary"}`}>
            {animalEmoji[job.animalFit]} {isMyAnimal ? "Fits your type ✓" : `${job.animalFit} type`}
           </Badge>
          </div>
          <Button size="sm" variant="ghost" asChild className="text-xs">
           <Link href={`/candidate/dashboard/job/${job.id}`}>Explore →</Link>
          </Button>
         </div>
        </CardContent>
       </Card>
      )
     })}
    </div>
   )}

   {/* 职位对比 Sheet */}
   <Sheet open={compareOpen} onOpenChange={setCompareOpen}>
    <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
     <SheetHeader className="mb-6">
      <SheetTitle>Job Comparison</SheetTitle>
     </SheetHeader>
     <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareJobs.length}, 1fr)` }}>
      {compareJobs.map((job) => (
       <div key={job.id} className="rounded-xl border border-card-border bg-card/60 p-5 space-y-4">
        <div>
         <p className="text-xs text-foreground-tertiary mb-0.5">{job.company}</p>
         <h3 className="font-semibold text-foreground">{job.title}</h3>
         <Badge className="mt-1 bg-primary/10 text-primary border-primary/20">{job.matchPercentage}% match</Badge>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1">Salary</p>
         <p className="text-sm font-medium text-foreground">{job.salary}</p>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1">Work Mode</p>
         <Badge variant="outline" className="text-xs">{job.workMode}</Badge>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1">Industry</p>
         <Badge variant="outline" className="text-xs">{job.industry}</Badge>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1.5">Skills you have</p>
         <div className="flex flex-wrap gap-1">
          {job.skillsHave.map((s) => (
           <Badge key={s} className="bg-primary/10 text-primary border-primary/20 text-xs">✓ {s}</Badge>
          ))}
         </div>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1.5">Skills to build</p>
         <div className="flex flex-wrap gap-1">
          {job.skillsNeed.map((s) => (
           <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
          ))}
         </div>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1">Career path</p>
         <p className="text-xs text-foreground-secondary">{job.nextStep}</p>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1">Animal Fit</p>
         <p className="text-sm">{animalEmoji[job.animalFit]} {job.animalFit}</p>
        </div>
        <Button size="sm" className="w-full" asChild>
         <Link href={`/candidate/dashboard/job/${job.id}`}>Explore Role</Link>
        </Button>
       </div>
      ))}
     </div>
     <Button
      variant="ghost"
      size="sm"
      className="mt-4"
      onClick={() => { setCompareOpen(false); setSelectedIds([]) }}
     >
      <X className="h-3.5 w-3.5 mr-1" /> Clear selection
     </Button>
    </SheetContent>
   </Sheet>
  </div>
 )
}
