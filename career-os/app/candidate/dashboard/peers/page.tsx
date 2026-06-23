"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, DollarSign, Briefcase } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const pathData = [
 { name: "Senior Data Analyst", value: 35, color: "#007AFF" },
 { name: "Data Scientist", value: 28, color: "#5856D6" },
 { name: "Product Analyst", value: 15, color: "#34C759" },
 { name: "Self-employed / Freelance", value: 12, color: "#FF9500" },
 { name: "Stayed in current role", value: 10, color: "#8E8E93" },
]

type PathKey = "Senior Data Analyst" | "Data Scientist" | "Product Analyst" | "Self-employed / Freelance" | "Stayed in current role"

const pathDetails: Record<PathKey, {
 medianSalary: string
 timeToTransition: string
 topSkills: string[]
 topCompanies: string[]
}> = {
 "Senior Data Analyst": {
  medianSalary: "RM 9,500/month",
  timeToTransition: "12–18 months in same company",
  topSkills: ["Advanced SQL", "Tableau", "Stakeholder Management", "Python"],
  topCompanies: ["TechCorp", "Maybank", "Grab", "Shopee"],
 },
 "Data Scientist": {
  medianSalary: "RM 12,000/month",
  timeToTransition: "12–24 months with new employer",
  topSkills: ["Python", "Machine Learning", "Statistics", "Spark"],
  topCompanies: ["Grab", "Axiata", "Stripe", "International companies"],
 },
 "Product Analyst": {
  medianSalary: "RM 8,500/month",
  timeToTransition: "8–14 months lateral move",
  topSkills: ["Product Thinking", "SQL", "A/B Testing", "Mixpanel"],
  topCompanies: ["Notion", "Figma", "Local SaaS startups"],
 },
 "Self-employed / Freelance": {
  medianSalary: "RM 7,000–18,000/month (variable)",
  timeToTransition: "6–12 months to first stable income",
  topSkills: ["Client Management", "Python", "Data Storytelling", "Consulting"],
  topCompanies: ["Independent — own clients"],
 },
 "Stayed in current role": {
  medianSalary: "RM 5,500–8,000/month",
  timeToTransition: "No transition — organic progression",
  topSkills: ["Domain expertise", "Reporting", "Internal tools"],
  topCompanies: ["Same employer"],
 },
}

const anonymousCases = [
 {
  background: "Data Analyst, 2 years at a retail company",
  from: "2022",
  to: "2024",
  outcome: "Transitioned to Data Scientist at a fintech company",
  salaryChange: "+38%",
  howLong: "18 months",
  keyMove: "Completed an online ML course and built a public Kaggle portfolio.",
 },
 {
  background: "Junior Data Analyst, fresh graduate",
  from: "2021",
  to: "2023",
  outcome: "Promoted to Senior Data Analyst internally",
  salaryChange: "+28%",
  howLong: "24 months",
  keyMove: "Took ownership of a cross-team reporting project and presented results to C-suite.",
 },
 {
  background: "Data Analyst, 3 years experience",
  from: "2020",
  to: "2022",
  outcome: "Pivoted to Product Analyst at a SaaS startup",
  salaryChange: "+15%",
  howLong: "10 months",
  keyMove: "Built side projects using product analytics tools and connected with product managers on LinkedIn.",
 },
]

export default function PeersPage() {
 const [selected, setSelected] = useState<PathKey | null>(null)

 const details = selected ? pathDetails[selected] : null

 return (
  <div className="min-h-screen p-8">
   <div className="mb-8">
    <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground mb-1">Peer Mirror</h1>
    <p className="text-sm text-foreground-secondary">
     What happened to 143 people who started where you are — 2 years later.
    </p>
   </div>

   <div className="mb-4 rounded-xl border border-card-border bg-card/60 p-4 flex items-center gap-3">
    <Users className="h-5 w-5 text-primary flex-shrink-0" />
    <p className="text-sm text-foreground-secondary">
     These are anonymised, aggregated paths from people who were <span className="font-medium text-foreground">Data Analysts with 2–3 years of experience</span> in Malaysia — similar to your profile.
    </p>
   </div>

   {/* 饼图 */}
   <div className="grid gap-8 md:grid-cols-2 mb-8">
    <Card>
     <CardHeader>
      <CardTitle className="text-base">Where They Are Now</CardTitle>
     </CardHeader>
     <CardContent>
      <ResponsiveContainer width="100%" height={300}>
       <PieChart>
        <Pie
         data={pathData}
         cx="50%"
         cy="50%"
         innerRadius={70}
         outerRadius={120}
         paddingAngle={3}
         dataKey="value"
         onClick={(entry) => setSelected(entry.name as PathKey)}
         className="cursor-pointer"
        >
         {pathData.map((entry, index) => (
          <Cell
           key={index}
           fill={entry.color}
           opacity={selected && selected !== entry.name ? 0.4 : 1}
           stroke={selected === entry.name ? "white" : "transparent"}
           strokeWidth={2}
          />
         ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value}%`} />
       </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-2">
       {pathData.map((p) => (
        <button
         key={p.name}
         onClick={() => setSelected(selected === p.name as PathKey ? null : p.name as PathKey)}
         className={`w-full flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
          selected === p.name ? "bg-card border border-card-border" : "hover:bg-card/50"
         }`}
        >
         <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
          <span className="text-sm text-foreground">{p.name}</span>
         </div>
         <span className="text-sm font-medium text-foreground">{p.value}%</span>
        </button>
       ))}
      </div>
     </CardContent>
    </Card>

    {/* 路径详情 */}
    <Card>
     <CardHeader>
      <CardTitle className="text-base">
       {selected ? `Path: ${selected}` : "Select a path to explore"}
      </CardTitle>
     </CardHeader>
     <CardContent>
      {!selected ? (
       <div className="py-16 text-center text-foreground-tertiary text-sm">
        Click any segment or label on the left to see details.
       </div>
      ) : details ? (
       <div className="space-y-5">
        <div>
         <p className="text-xs text-foreground-tertiary mb-1 flex items-center gap-1">
          <DollarSign className="h-3 w-3" /> Typical salary
         </p>
         <p className="font-medium text-foreground">{details.medianSalary}</p>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-1 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> Time to transition
         </p>
         <p className="font-medium text-foreground">{details.timeToTransition}</p>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-2 flex items-center gap-1">
          Key skills that helped
         </p>
         <div className="flex flex-wrap gap-1.5">
          {details.topSkills.map((s) => (
           <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
          ))}
         </div>
        </div>
        <div>
         <p className="text-xs text-foreground-tertiary mb-2 flex items-center gap-1">
          <Briefcase className="h-3 w-3" /> Common employers
         </p>
         <div className="flex flex-wrap gap-1.5">
          {details.topCompanies.map((c) => (
           <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
          ))}
         </div>
        </div>
       </div>
      ) : null}
     </CardContent>
    </Card>
   </div>

   {/* 匿名案例 */}
   <div>
    <p className="text-section-label mb-4">Anonymous Stories from This Cohort</p>
    <div className="space-y-4">
     {anonymousCases.map((c, i) => (
      <Card key={i}>
       <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
         <div>
          <p className="text-xs text-foreground-tertiary mb-1">{c.from} → {c.to}</p>
          <p className="text-sm font-medium text-foreground">{c.outcome}</p>
         </div>
         <Badge className="bg-primary/10 text-primary border-primary/20 flex-shrink-0 ml-3">{c.salaryChange} salary</Badge>
        </div>
        <p className="text-xs text-foreground-secondary mb-2">
         <span className="font-medium text-foreground">Started as:</span> {c.background}
        </p>
        <p className="text-xs text-foreground-secondary mb-2">
         <span className="font-medium text-foreground">Time taken:</span> {c.howLong}
        </p>
        <div className="rounded-lg bg-primary-subtle p-3">
         <p className="text-xs text-primary">✦ Key move: {c.keyMove}</p>
        </div>
       </CardContent>
      </Card>
     ))}
    </div>
   </div>
  </div>
 )
}
