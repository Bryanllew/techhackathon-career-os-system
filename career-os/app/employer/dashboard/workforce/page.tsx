"use client"

import { useState } from "react"
import Link from "next/link"
import { Info, TrendingDown, Cpu, Users, ChevronRight, AlertCircle, Clock, Calendar, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const internalCandidates = [
 { id: "marcus", name: "Marcus Lim", role: "Senior Analyst", trajectory: "On track for Data Science Lead in 18 months" },
 { id: "raj", name: "Raj Patel", role: "Data Engineer", trajectory: "On track for Platform Lead in 24 months" },
 { id: "maya", name: "Maya Chen", role: "Product Analyst", trajectory: "On track for Analytics Manager in 12 months" },
]

const reengageCandidates = [
 { id: "jordan", name: "Jordan Lee", appliedFor: "Data Scientist", timeAgo: "9 months ago", status: "Likely ready now" },
 { id: "alex", name: "Alex Rivera", appliedFor: "Backend Engineer", timeAgo: "6 months ago", status: "May be exploring" },
]

const atRiskEmployees = [
 { id: "marcus-r", name: "Marcus Lim", role: "Senior Analyst", risk: "Early departure signals" },
 { id: "priya", name: "Priya Nair", role: "Data Engineer", risk: "Engagement declining" },
]

const planningTabs = [
 {
  id: "2035",
  label: "10 Years (2035)",
  title: "Actions to take in the next 3 years",
  context: "Demand for data and engineering talent will outpace supply significantly by 2035. The companies best positioned are already building internal pipelines and university relationships today.",
  actions: [
   { text: "Identify your top 5 internal development candidates now — use Career OS trajectory data to find them", link: "/employer/dashboard/search" },
   { text: "Partner with 2 universities through Career OS Live Internship pipeline to build a feeder programme", link: "/employer/dashboard/events" },
   { text: "Begin auditing which roles could be partially AI-augmented — use the AI Roles Audit tool in Active Roles", link: "/employer/dashboard/roles" },
  ],
 },
 {
  id: "2045",
  label: "20 Years (2045)",
  title: "Start planning now for 10-20 year shifts",
  context: "The mid-career professionals you hire today will be your senior leaders in 2040. Your succession pipeline starts with who you develop now.",
  actions: [
   { text: "Create a formal internal development track for high-trajectory employees — Career OS can identify them", link: "/employer/dashboard/search" },
   { text: "Build a long-term re-engagement pool of strong candidates who were not ready before — they will be", link: "/employer/dashboard/search?tab=saved" },
   { text: "Begin tracking retention of top performers as a strategic metric — Career OS People Signals can automate this", link: "/employer/dashboard/people" },
  ],
 },
 {
  id: "2055",
  label: "30 Years (2055)",
  title: "Long-range structural planning",
  context: "Workforce composition will look fundamentally different. Start building the infrastructure now that makes your company adaptable.",
  actions: [
   { text: "Ensure your hiring process can source globally — Career OS can surface candidates willing to relocate", link: "/employer/dashboard/search" },
   { text: "Build institutional knowledge documentation so expertise does not leave when people retire", link: "/employer/dashboard/people" },
   { text: "Model which functions in your company could be AI-led — the answer will change every 3 years", link: "/employer/dashboard/roles" },
  ],
 },
]

export default function WorkforcePlannerPage() {
 const [externalHiring, setExternalHiring] = useState([40])
 const [internalDevelopment, setInternalDevelopment] = useState([30])
 const [aiAugmented, setAiAugmented] = useState([20])
 const [contractGlobal, setContractGlobal] = useState([10])
 const [activeTab, setActiveTab] = useState("2035")
 const [devNotes, setDevNotes] = useState<Record<string, string>>({})
 const [nudgeMessage, setNudgeMessage] = useState("")
 const [scheduleData, setScheduleData] = useState<Record<string, { date: string; time: string }>>({})
 const [rewrittenJD, setRewrittenJD] = useState("")

 const activeScenario = planningTabs.find((t) => t.id === activeTab)

 return (
  <div className="min-h-screen p-8">
   {/* Header */}
   <div className="mb-8">
    <h1 className="text-2xl font-semibold text-foreground">Workforce Resilience Planner</h1>
    <p className="text-muted-foreground">
     Not a forecast. A way to stress-test your assumptions about where your talent will come from — before those assumptions get expensive.
    </p>
   </div>

   {/* How to use this */}
   <Card className="mb-8 border-border/60 bg-card/50">
    <CardContent className="flex gap-4 p-6">
     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
      <Info className="h-5 w-5 text-primary" />
     </div>
     <div>
      <h3 className="mb-2 font-semibold text-foreground">How to use this</h3>
      <p className="text-sm text-muted-foreground">
       This tool does not predict your workforce. Nobody can do that honestly. It helps you see which assumptions your current hiring model is quietly making — and what happens to those assumptions when demographics shift, AI capability grows, or competition tightens. Move the sliders. Read what shifts. Use it to have better conversations, not to set targets.
      </p>
     </div>
    </CardContent>
   </Card>

   {/* The context your hiring plan sits inside */}
   <div className="mb-8">
    <h2 className="mb-4 text-lg font-semibold text-foreground">The context your hiring plan sits inside</h2>
    <div className="grid grid-cols-2 gap-6">
     {/* Left column - Chart visualization */}
     <Card className="border-border/60 bg-card/50">
      <CardContent className="p-6">
       <div className="mb-4 flex items-end justify-center gap-8">
        <div className="flex flex-col items-center">
         <div className="mb-2 h-32 w-16 rounded-t-md bg-primary/60" />
         <span className="text-sm text-muted-foreground">2025</span>
        </div>
        <div className="flex flex-col items-center">
         <div className="mb-2 h-28 w-16 rounded-t-md bg-primary/40" />
         <span className="text-sm text-muted-foreground">2035</span>
        </div>
        <div className="flex flex-col items-center">
         <div className="mb-2 h-24 w-16 rounded-t-md bg-primary/20" />
         <span className="text-sm text-muted-foreground">2045</span>
        </div>
       </div>
       <p className="text-center text-xs text-muted-foreground">
        Working-age population trend (illustrative)
       </p>
      </CardContent>
     </Card>

     {/* Right column - Insight cards */}
     <div className="space-y-3">
      <Card className="border-border/60 bg-card/50">
       <CardContent className="flex gap-3 p-4">
        <TrendingDown className="h-5 w-5 shrink-0 text-amber-400" />
        <p className="text-sm text-muted-foreground">
         The talent you compete for today will be harder to find in 10 years — not impossible, but more expensive and slower to hire.
        </p>
       </CardContent>
      </Card>
      <Card className="border-border/60 bg-card/50">
       <CardContent className="flex gap-3 p-4">
        <Cpu className="h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
         Some roles you are hiring for now may be partially automated by 2035. Some roles you will urgently need in 2040 do not have a job title yet.
        </p>
       </CardContent>
      </Card>
      <Card className="border-border/60 bg-card/50">
       <CardContent className="flex gap-3 p-4">
        <Users className="h-5 w-5 shrink-0 text-green-400" />
        <p className="text-sm text-muted-foreground">
         Companies that develop people internally now build a structural advantage. Retention becomes a hiring strategy.
        </p>
       </CardContent>
      </Card>
     </div>
    </div>
    <p className="mt-4 text-sm text-muted-foreground">
     Malaysia&apos;s working-age population is projected to peak around 2030 and decline steadily through 2050. This is not a crisis — it is a structural shift that rewards companies who plan early and punishes those who assume the talent pool stays the same.
    </p>
   </div>

   {/* Model your workforce mix */}
   <Card className="mb-8 border-border/60 bg-card/50">
    <CardHeader>
     <CardTitle className="text-lg">Model your workforce mix</CardTitle>
     <p className="text-sm text-muted-foreground">
      Adjust the sliders to reflect how you currently hire and develop people. The recommendations below update based on your mix.
     </p>
    </CardHeader>
    <CardContent className="space-y-8">
     {/* Sliders */}
     <div className="grid grid-cols-2 gap-6">
      <div>
       <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">People hired externally</label>
        <span className="text-sm font-medium text-primary">{externalHiring[0]}%</span>
       </div>
       <Slider value={externalHiring} onValueChange={setExternalHiring} max={100} step={5} className="w-full" />
      </div>

      <div>
       <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">People developed internally</label>
        <span className="text-sm font-medium text-primary">{internalDevelopment[0]}%</span>
       </div>
       <Slider value={internalDevelopment} onValueChange={setInternalDevelopment} max={100} step={5} className="w-full" />
      </div>

      <div>
       <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">AI-augmented roles</label>
        <span className="text-sm font-medium text-primary">{aiAugmented[0]}%</span>
       </div>
       <Slider value={aiAugmented} onValueChange={setAiAugmented} max={100} step={5} className="w-full" />
      </div>

      <div>
       <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Contract or globally-sourced roles</label>
        <span className="text-sm font-medium text-primary">{contractGlobal[0]}%</span>
       </div>
       <Slider value={contractGlobal} onValueChange={setContractGlobal} max={100} step={5} className="w-full" />
      </div>
     </div>
    </CardContent>
   </Card>

   {/* Action Plan */}
   <div className="mb-8">
    <h2 className="mb-2 text-lg font-semibold text-foreground">Based on your current mix, here is what Career OS recommends</h2>
    <p className="mb-6 text-sm text-muted-foreground">
     These are starting points, not mandates. Every recommendation links to something you can action inside Career OS today.
    </p>

    <div className="space-y-4">
     {/* Card 1 - Internal Development */}
     <Card className="border-border/60 bg-card/50">
      <CardContent className="p-6">
       <div className="mb-4 flex items-start justify-between">
        <div>
         <Badge className="mb-2 bg-red-500/20 text-red-400 border-0">Urgent</Badge>
         <h3 className="text-lg font-semibold text-foreground">Start developing 3 internal candidates for senior roles now</h3>
        </div>
       </div>
       <p className="mb-4 text-sm text-muted-foreground">
        Your internal development rate is at {internalDevelopment[0]}%. At this level, when senior roles open you will compete on the external market at full cost. Three of your current employees show strong upward trajectories — developing them now costs significantly less than hiring externally in 3 years.
       </p>
       <div className="mb-4 grid grid-cols-3 gap-3">
        {internalCandidates.map((candidate) => (
         <Card key={candidate.id} className="border-border/40 bg-muted/30">
          <CardContent className="p-4">
           <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
             <span className="text-xs font-medium text-primary">{candidate.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div>
             <p className="text-sm font-medium text-foreground">{candidate.name}</p>
             <p className="text-xs text-muted-foreground">{candidate.role}</p>
            </div>
           </div>
           <p className="mb-2 text-xs text-primary">{candidate.trajectory}</p>
           <Link href={`/employer/dashboard/candidate/${candidate.id}`} className="text-xs text-primary hover:underline">
            View profile
           </Link>
          </CardContent>
         </Card>
        ))}
       </div>
       <div className="flex gap-3">
        <Button variant="outline" size="sm" asChild>
         <Link href="/employer/dashboard/search">
          View internal candidates
          <ChevronRight className="ml-1 h-4 w-4" />
         </Link>
        </Button>
        <Dialog>
         <DialogTrigger asChild>
          <Button size="sm">Create development plan</Button>
         </DialogTrigger>
         <DialogContent className="max-w-lg">
          <DialogHeader>
           <DialogTitle>Create Development Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
           {internalCandidates.map((candidate) => (
            <div key={candidate.id}>
             <Label className="text-sm font-medium">{candidate.name}</Label>
             <Textarea
              placeholder={`Development notes for ${candidate.name}...`}
              value={devNotes[candidate.id] || ""}
              onChange={(e) => setDevNotes({ ...devNotes, [candidate.id]: e.target.value })}
              className="mt-1"
             />
            </div>
           ))}
           <Button className="w-full">Save Development Plans</Button>
          </div>
         </DialogContent>
        </Dialog>
       </div>
      </CardContent>
     </Card>

     {/* Card 2 - Re-engagement */}
     <Card className="border-border/60 bg-card/50">
      <CardContent className="p-6">
       <div className="mb-4">
        <Badge className="mb-2 bg-red-500/20 text-red-400 border-0">Urgent</Badge>
        <h3 className="text-lg font-semibold text-foreground">Re-engage 2 candidates before the hiring window closes</h3>
       </div>
       <p className="mb-4 text-sm text-muted-foreground">
        You have candidates in your re-engagement pool who are likely ready to consider a new role. As external competition increases, warm candidates become significantly more valuable than cold outreach. Reaching out now costs nothing. Waiting 6 months may mean they are already placed.
       </p>
       <div className="mb-4 grid grid-cols-2 gap-3">
        {reengageCandidates.map((candidate) => (
         <Card key={candidate.id} className="border-border/40 bg-muted/30">
          <CardContent className="p-4">
           <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
             <span className="text-xs font-medium text-primary">{candidate.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div>
             <p className="text-sm font-medium text-foreground">{candidate.name}</p>
             <p className="text-xs text-muted-foreground">Applied for {candidate.appliedFor}</p>
            </div>
           </div>
           <p className="text-xs text-muted-foreground">{candidate.timeAgo}</p>
           <Badge className="mt-2 bg-primary/20 text-primary border-0 text-xs">{candidate.status}</Badge>
          </CardContent>
         </Card>
        ))}
       </div>
       <div className="flex gap-3">
        <Button variant="outline" size="sm" asChild>
         <Link href="/employer/dashboard/search?tab=saved">
          Go to Re-Engagement Pool
          <ChevronRight className="ml-1 h-4 w-4" />
         </Link>
        </Button>
        <Dialog>
         <DialogTrigger asChild>
          <Button size="sm">Send nudge to both</Button>
         </DialogTrigger>
         <DialogContent>
          <DialogHeader>
           <DialogTitle>Draft Re-engagement Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
           <p className="text-sm text-muted-foreground">Sending to: Jordan Lee, Alex Rivera</p>
           <Textarea
            placeholder="Write your message or let AI draft one..."
            value={nudgeMessage}
            onChange={(e) => setNudgeMessage(e.target.value)}
            rows={6}
           />
           <div className="flex gap-2">
            <Button variant="outline" onClick={() => setNudgeMessage("Hi [Name],\n\nI hope this message finds you well. We had a great conversation a while back about opportunities at Stripe, and I wanted to reach out because we have some exciting new roles that might align with where you are headed.\n\nWould you be open to a quick chat to explore what might be a good fit?\n\nBest,\nSarah")}>
             Generate with AI
            </Button>
            <Button className="flex-1">Send Messages</Button>
           </div>
          </div>
         </DialogContent>
        </Dialog>
       </div>
      </CardContent>
     </Card>

     {/* Card 3 - At-risk employees */}
     <Card className="border-border/60 bg-card/50">
      <CardContent className="p-6">
       <div className="mb-4">
        <Badge className="mb-2 bg-amber-500/20 text-amber-400 border-0">Soon</Badge>
        <h3 className="text-lg font-semibold text-foreground">Schedule development check-ins for at-risk employees</h3>
       </div>
       <p className="mb-4 text-sm text-muted-foreground">
        Marcus Lim and Priya Nair are showing early departure signals. The cost of replacing a senior employee is typically 1.5 to 2 times their annual salary. A 30-minute conversation this week is the cheapest intervention available. Career OS has suggested conversation starters ready for both.
       </p>
       <div className="mb-4 grid grid-cols-2 gap-3">
        {atRiskEmployees.map((employee) => (
         <Card key={employee.id} className="border-amber-500/30 bg-muted/30">
          <CardContent className="p-4">
           <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
             <span className="text-xs font-medium text-amber-400">{employee.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div>
             <p className="text-sm font-medium text-foreground">{employee.name}</p>
             <p className="text-xs text-muted-foreground">{employee.role}</p>
            </div>
           </div>
           <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">
            <AlertCircle className="mr-1 h-3 w-3" />
            {employee.risk}
           </Badge>
          </CardContent>
         </Card>
        ))}
       </div>
       <div className="flex gap-3">
        <Button variant="outline" size="sm" asChild>
         <Link href="/employer/dashboard/people">
          View retention signals
          <ChevronRight className="ml-1 h-4 w-4" />
         </Link>
        </Button>
        <Dialog>
         <DialogTrigger asChild>
          <Button size="sm">Schedule check-ins</Button>
         </DialogTrigger>
         <DialogContent>
          <DialogHeader>
           <DialogTitle>Schedule Check-ins</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
           {atRiskEmployees.map((employee) => (
            <div key={employee.id} className="rounded-lg border border-border p-4">
             <p className="mb-2 font-medium text-foreground">{employee.name}</p>
             <div className="grid grid-cols-2 gap-2">
              <div>
               <Label className="text-xs">Date</Label>
               <Input
                type="date"
                value={scheduleData[employee.id]?.date || ""}
                onChange={(e) => setScheduleData({ ...scheduleData, [employee.id]: { ...scheduleData[employee.id], date: e.target.value } })}
               />
              </div>
              <div>
               <Label className="text-xs">Time</Label>
               <Input
                type="time"
                value={scheduleData[employee.id]?.time || ""}
                onChange={(e) => setScheduleData({ ...scheduleData, [employee.id]: { ...scheduleData[employee.id], time: e.target.value } })}
               />
              </div>
             </div>
            </div>
           ))}
           <Button className="w-full">Send Calendar Invites</Button>
          </div>
         </DialogContent>
        </Dialog>
       </div>
      </CardContent>
     </Card>

     {/* Card 4 - Job description rewrite */}
     <Card className="border-border/60 bg-card/50">
      <CardContent className="p-6">
       <div className="mb-4">
        <Badge className="mb-2 bg-amber-500/20 text-amber-400 border-0">Soon</Badge>
        <h3 className="text-lg font-semibold text-foreground">Post your Backend Engineer role with a trajectory-first description</h3>
       </div>
       <p className="mb-4 text-sm text-muted-foreground">
        Your Backend Engineer role has been paused. As platform engineering talent becomes harder to find, roles that describe the growth opportunity — not just the requirements — attract stronger candidates. Career OS can rewrite your job description to lead with trajectory.
       </p>
       <div className="flex gap-3">
        <Button variant="outline" size="sm" asChild>
         <Link href="/employer/dashboard/roles">
          Go to Active Roles
          <ChevronRight className="ml-1 h-4 w-4" />
         </Link>
        </Button>
        <Dialog>
         <DialogTrigger asChild>
          <Button size="sm">
           Rewrite with AI
           <span className="ml-1 text-primary">✦</span>
          </Button>
         </DialogTrigger>
         <DialogContent className="max-w-2xl">
          <DialogHeader>
           <DialogTitle>Trajectory-First Job Description</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
           <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
             <p className="mb-2 text-sm font-medium text-primary">✦ AI-Rewritten Version</p>
             <div className="text-sm text-foreground space-y-2">
              <p className="font-semibold">Backend Engineer → Platform Engineering Lead</p>
              <p>This is not just a backend role. It is the first step toward leading our platform engineering function. You will start by building distributed systems that handle millions of requests — and within 18-24 months, you will be architecting the infrastructure strategy for the entire company.</p>
              <p><strong>Where this role leads:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
               <li>Platform Engineering Lead (18-24 months)</li>
               <li>Engineering Manager, Infrastructure (2-3 years)</li>
               <li>VP Engineering pathway (4-5 years)</li>
              </ul>
              <p><strong>What you will do:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
               <li>Design and build scalable microservices in Go</li>
               <li>Lead Kubernetes migration for core services</li>
               <li>Mentor junior engineers (this is how you grow into leadership)</li>
              </ul>
             </div>
            </CardContent>
           </Card>
           <div className="flex gap-2">
            <Button variant="outline" className="flex-1">Edit</Button>
            <Button className="flex-1">Apply Changes</Button>
           </div>
          </div>
         </DialogContent>
        </Dialog>
       </div>
      </CardContent>
     </Card>

     {/* Card 5 - Career fair */}
     <Card className="border-border/60 bg-card/50">
      <CardContent className="p-6">
       <div className="mb-4">
        <Badge className="mb-2 bg-blue-500/20 text-blue-400 border-0">Plan ahead</Badge>
        <h3 className="text-lg font-semibold text-foreground">Run a career fair to build your 2027 talent pipeline</h3>
       </div>
       <p className="mb-4 text-sm text-muted-foreground">
        Companies that build relationships with graduate talent 2 to 3 years before they need to hire have significantly lower recruitment costs and faster time-to-hire. A virtual career fair on Career OS reaches trajectory-matched candidates before they are publicly looking.
       </p>
       <div className="flex gap-3">
        <Button variant="outline" size="sm" asChild>
         <Link href="/employer/dashboard/events?type=career-fair">
          Create an event
          <ChevronRight className="ml-1 h-4 w-4" />
         </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
         <Link href="/employer/dashboard/events?tab=past">
          See past event results
          <ChevronRight className="ml-1 h-4 w-4" />
         </Link>
        </Button>
       </div>
      </CardContent>
     </Card>
    </div>
   </div>

   {/* Planning horizon tabs */}
   <div className="mb-8">
    <div className="mb-4 flex gap-1 rounded-lg border border-border bg-muted/30 p-1">
     {planningTabs.map((tab) => (
      <button
       key={tab.id}
       onClick={() => setActiveTab(tab.id)}
       className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === tab.id
         ? "bg-background text-foreground shadow-sm"
         : "text-muted-foreground hover:text-foreground"
       }`}
      >
       {tab.label}
      </button>
     ))}
    </div>

    {activeScenario && (
     <Card className="border-border/60 bg-card/50">
      <CardContent className="p-6">
       <h3 className="mb-2 font-semibold text-foreground">{activeScenario.title}</h3>
       <p className="mb-4 text-muted-foreground">{activeScenario.context}</p>
       <div className="space-y-3">
        {activeScenario.actions.map((action, index) => (
         <div key={index} className="flex items-start justify-between rounded-lg border border-border/40 bg-muted/20 p-4">
          <p className="text-sm text-foreground">{action.text}</p>
          <Link href={action.link} className="ml-4 shrink-0 text-sm text-primary hover:underline">
           Do this now
           <ChevronRight className="ml-1 inline h-3 w-3" />
          </Link>
         </div>
        ))}
       </div>
      </CardContent>
     </Card>
    )}
   </div>

   {/* Disclaimer */}
   <Card className="border-border/60 bg-muted/30">
    <CardContent className="p-4">
     <p className="text-sm text-muted-foreground">
      <span className="text-primary">✦</span> This is a planning tool, not a prediction. Use it to stress-test assumptions and have better strategic conversations, not to set targets.
     </p>
    </CardContent>
   </Card>
  </div>
 )
}
