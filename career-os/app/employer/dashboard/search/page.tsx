"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ArrowRight, TrendingUp, Bookmark, CheckCircle, MapPin, Calendar, Sparkles, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const candidates = [
 {
  id: "a",
  name: "Candidate A",
  currentRole: "Senior Data Analyst",
  primaryTrajectory: "Analytics → Data Science Leadership",
  secondaryTrajectory: "Analytics → Product Analytics Management",
  skills: ["Python", "SQL", "Machine Learning", "Team Leadership"],
  trajectoryFit: 94,
  yearsExperience: 6,
  lastActive: new Date("2024-01-15"),
  surfacedReason: "trajectory directly aligns with data science leadership roles and ML project portfolio is verified.",
  matchedTrajectoryFilter: "Analytics → Data Science",
  availability: "Available July 2026",
  location: "Kuala Lumpur",
  workArrangement: "Hybrid",
  interviewReadiness: "Strong — completed 3 mock sessions",
  verified: true,
 },
 {
  id: "b",
  name: "Candidate B",
  currentRole: "Backend Engineer",
  primaryTrajectory: "Backend → Platform Engineering",
  secondaryTrajectory: "Backend → Engineering Management",
  skills: ["Go", "Kubernetes", "AWS", "System Design"],
  trajectoryFit: 89,
  yearsExperience: 8,
  lastActive: new Date("2024-01-10"),
  surfacedReason: "platform engineering transition is underway with hands-on Kubernetes migration already completed.",
  matchedTrajectoryFilter: "Backend → Platform",
  availability: "Available immediately",
  location: "Penang",
  workArrangement: "Remote",
  interviewReadiness: "Strong — scored 82/100",
  verified: true,
 },
 {
  id: "c",
  name: "Candidate C",
  currentRole: "Product Manager",
  primaryTrajectory: "PM → Product Leadership",
  secondaryTrajectory: "PM → Startup Founder",
  skills: ["Strategy", "Analytics", "User Research", "Roadmapping"],
  trajectoryFit: 86,
  yearsExperience: 5,
  lastActive: new Date("2024-01-18"),
  surfacedReason: "PM to product leadership trajectory matches your open Product Manager role direction.",
  matchedTrajectoryFilter: "PM → Leadership",
  availability: "Available August 2026",
  location: "Kuala Lumpur",
  workArrangement: "On-site",
  interviewReadiness: "Moderate",
  verified: true,
 },
]

const savedCandidatesData = [
 {
  id: "a",
  name: "Candidate A",
  currentRole: "Senior Data Analyst",
  primaryTrajectory: "Analytics → Data Science Leadership",
  secondaryTrajectory: "Analytics → Product Analytics Management",
  skills: ["Python", "SQL", "Machine Learning", "Team Leadership"],
  trajectoryFit: 94,
  savedDate: "Jan 12, 2024",
  verified: true,
  signal: { type: "profile", message: "Profile updated 2 days ago" },
  aiNote: "Candidate A updated their ML project portfolio 2 days ago — this strengthens their fit for your Senior Data Scientist role.",
  availability: "Available July 2026",
  location: "Kuala Lumpur",
  workArrangement: "Hybrid",
 },
 {
  id: "c",
  name: "Candidate C",
  currentRole: "Product Manager",
  primaryTrajectory: "PM → Product Leadership",
  secondaryTrajectory: "PM → Startup Founder",
  skills: ["Strategy", "Analytics", "User Research", "Roadmapping"],
  trajectoryFit: 86,
  savedDate: "Jan 8, 2024",
  verified: true,
  signal: { type: "active", message: "Active on platform" },
  aiNote: "Candidate C has been active on Career OS this week — this may indicate they are exploring options.",
  availability: "Available August 2026",
  location: "Kuala Lumpur",
  workArrangement: "On-site",
 },
]

const trajectoryFilters = [
 "Analytics → Data Science",
 "Backend → Platform",
 "PM → Leadership",
 "Any trajectory",
]

const activeRoles = [
 { id: 1, title: "Senior Data Scientist" },
 { id: 2, title: "Product Manager" },
 { id: 3, title: "Backend Engineer" },
]

type SortOption = "trajectory" | "recent" | "saved"
type TabOption = "search" | "saved"

function getTierLabel(trajectoryFit: number): { label: string; description: string; bgClass: string; textClass: string } {
 if (trajectoryFit >= 90) {
  return {
   label: "Strong fit",
   description: "Trajectory, skills, and experience closely match this role's direction.",
   bgClass: "bg-green-500/20",
   textClass: "text-green-400"
  }
 } else if (trajectoryFit >= 80) {
  return {
   label: "Good fit",
   description: "Solid alignment with minor gaps bridgeable within 90 days.",
   bgClass: "bg-primary/20",
   textClass: "text-primary"
  }
 } else {
  return {
   label: "Partial fit",
   description: "Some alignment with potential for growth.",
   bgClass: "bg-amber-500/20",
   textClass: "text-amber-400"
  }
 }
}

function getAIInterpretation(query: string): string {
 const lowerQuery = query.toLowerCase()
 if (lowerQuery.includes("data") && lowerQuery.includes("science")) {
  return "Candidates on an analytics → data science trajectory with 2+ years experience and growing ML exposure."
 }
 if (lowerQuery.includes("backend") || lowerQuery.includes("platform")) {
  return "Candidates transitioning from backend engineering to platform or infrastructure leadership roles."
 }
 if (lowerQuery.includes("product") || lowerQuery.includes("pm")) {
  return "Candidates with PM experience moving toward product leadership or strategic roles."
 }
 if (lowerQuery.includes("lead") || lowerQuery.includes("manager")) {
  return "Candidates showing leadership trajectory signals across technical or product domains."
 }
 return "Candidates whose trajectory aligns with your search criteria, sorted by direction fit."
}

export default function TalentSearchPage() {
 const [searchQuery, setSearchQuery] = useState("")
 const [activeSearch, setActiveSearch] = useState("")
 const [sortBy, setSortBy] = useState<SortOption>("trajectory")
 const [activeTrajectoryFilter, setActiveTrajectoryFilter] = useState("Any trajectory")
 const [savedCandidates, setSavedCandidates] = useState<Set<string>>(new Set(["a", "c"]))
 const [activeTab, setActiveTab] = useState<TabOption>("search")
 const [draftMessage, setDraftMessage] = useState("")
 const [savedSortBy, setSavedSortBy] = useState<"trajectory" | "recent" | "saved">("trajectory")
 const [savedFilter, setSavedFilter] = useState<"all" | "signal" | "ready">("all")

 const filteredAndSortedCandidates = useMemo(() => {
  let result = [...candidates]

  if (activeSearch) {
   const query = activeSearch.toLowerCase()
   result = result.filter(
    (c) =>
     c.name.toLowerCase().includes(query) ||
     c.currentRole.toLowerCase().includes(query) ||
     c.primaryTrajectory.toLowerCase().includes(query) ||
     c.skills.some((skill) => skill.toLowerCase().includes(query))
   )
  }

  if (activeTrajectoryFilter !== "Any trajectory") {
   result = result.filter((c) => c.matchedTrajectoryFilter === activeTrajectoryFilter)
  }

  switch (sortBy) {
   case "trajectory":
    result.sort((a, b) => b.trajectoryFit - a.trajectoryFit)
    break
   case "recent":
    result.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())
    break
  }

  return result
 }, [activeSearch, sortBy, activeTrajectoryFilter])

 const filteredSavedCandidates = useMemo(() => {
  let result = [...savedCandidatesData]
  
  if (savedFilter === "signal") {
   result = result.filter(c => c.signal)
  } else if (savedFilter === "ready") {
   result = result.filter(c => c.signal?.type === "active")
  }

  switch (savedSortBy) {
   case "trajectory":
    result.sort((a, b) => b.trajectoryFit - a.trajectoryFit)
    break
   case "recent":
    result.sort((a, b) => new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime())
    break
  }

  return result
 }, [savedSortBy, savedFilter])

 const handleSearch = () => {
  setActiveSearch(searchQuery)
 }

 const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
   handleSearch()
  }
 }

 const toggleSaveCandidate = (id: string) => {
  setSavedCandidates((prev) => {
   const next = new Set(prev)
   if (next.has(id)) {
    next.delete(id)
   } else {
    next.add(id)
   }
   return next
  })
 }

 return (
  <div className="min-h-screen p-8">
   {/* Header */}
   <div className="mb-8">
    <h1 className="text-2xl font-semibold text-foreground">Talent Search</h1>
    <p className="text-muted-foreground">
     Search by trajectory — where someone is heading, not just where they have been.
    </p>
   </div>

   {/* Tabs */}
   <div className="mb-6 flex gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
    <button
     onClick={() => setActiveTab("search")}
     className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      activeTab === "search"
       ? "bg-background text-foreground shadow-sm"
       : "text-muted-foreground hover:text-foreground"
     }`}
    >
     Search
    </button>
    <button
     onClick={() => setActiveTab("saved")}
     className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      activeTab === "saved"
       ? "bg-background text-foreground shadow-sm"
       : "text-muted-foreground hover:text-foreground"
     }`}
    >
     Saved ({savedCandidates.size})
    </button>
   </div>

   {activeTab === "search" ? (
    <>
     {/* Search Bar */}
     <div className="mb-4">
      <div className="relative">
       <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
       <Input
        type="text"
        placeholder="Describe in plain English who you're looking for — e.g. backend engineer ready to lead a platform team in 12 months."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-14 pl-12 pr-36 text-base"
       />
       <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <Badge className="bg-primary/20 text-primary border-0 text-xs">
         <Sparkles className="mr-1 h-3 w-3" />
         AI Search
        </Badge>
        <Button onClick={handleSearch}>Search</Button>
       </div>
      </div>
     </div>

     {/* AI Interpretation */}
     {activeSearch && (
      <Card className="mb-6 border-primary/30 bg-primary/5">
       <CardContent className="flex items-start gap-3 p-4">
        <Sparkles className="h-5 w-5 shrink-0 text-primary" />
        <div>
         <p className="text-sm font-medium text-primary">AI interpreted your search as:</p>
         <p className="text-sm text-muted-foreground">{getAIInterpretation(activeSearch)}</p>
        </div>
       </CardContent>
      </Card>
     )}

     {/* Trajectory Filter Chips */}
     <div className="mb-8 flex flex-wrap gap-2">
      {trajectoryFilters.map((filter) => (
       <button
        key={filter}
        onClick={() => setActiveTrajectoryFilter(filter)}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
         activeTrajectoryFilter === filter
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
        }`}
       >
        {filter}
       </button>
      ))}
     </div>

     {/* Results Header */}
     <div className="mb-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
       Showing <span className="font-medium text-foreground">{filteredAndSortedCandidates.length} candidates</span> whose trajectories align with your search.
      </p>
      <select 
       className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
       value={sortBy}
       onChange={(e) => setSortBy(e.target.value as SortOption)}
      >
       <option value="trajectory">Sort by: Direction Fit</option>
       <option value="recent">Sort by: Recent Activity</option>
      </select>
     </div>

     {/* Candidate Cards */}
     <div className="grid gap-4">
      {filteredAndSortedCandidates.length === 0 ? (
       <Card className="border-border/60 bg-card/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
         <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
         <p className="text-lg font-medium text-foreground">No candidates found for this search</p>
         <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search terms or filters</p>
         <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => {
           setSearchQuery("")
           setActiveSearch("")
           setActiveTrajectoryFilter("Any trajectory")
          }}
         >
          Clear search
         </Button>
        </CardContent>
       </Card>
      ) : (
       filteredAndSortedCandidates.map((candidate) => {
        const tier = getTierLabel(candidate.trajectoryFit)
        const isSaved = savedCandidates.has(candidate.id)
        return (
         <Card
          key={candidate.id}
          className="transition-colors hover:border-primary/50"
         >
          <CardContent className="p-6">
           <div className="flex items-start justify-between">
            <div className="flex-1">
             <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
               <span className="text-lg font-medium text-foreground">
                {candidate.name.split(" ")[1]}
               </span>
              </div>
              <div>
               <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                {candidate.verified && (
                 <Badge className="bg-primary/20 text-primary border-0 text-xs">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Verified
                 </Badge>
                )}
               </div>
               <p className="text-sm text-muted-foreground">{candidate.currentRole}</p>
              </div>
             </div>

             {/* Trajectory Directions */}
             <div className="mb-3">
              <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground/60">
               POSSIBLE DIRECTIONS
              </p>
              <div className="flex items-center gap-2 text-sm">
               <TrendingUp className="h-4 w-4 text-primary" />
               <span className="text-primary">{candidate.primaryTrajectory}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm">
               <TrendingUp className="h-4 w-4 text-muted-foreground" />
               <span className="text-muted-foreground">{candidate.secondaryTrajectory}</span>
               <span className="text-muted-foreground/60">(secondary)</span>
              </div>
             </div>

             {/* AI Match Rationale */}
             <p className="mb-3 text-sm text-primary">
              <span className="font-medium">Surfaced because:</span> {candidate.surfacedReason}
             </p>

             {/* Skills */}
             <div className="mb-3 flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
               <Badge
                key={skill}
                variant="secondary"
                className="bg-secondary text-secondary-foreground"
               >
                {skill}
               </Badge>
              ))}
             </div>

             {/* Logistics */}
             <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
               <Calendar className="h-3.5 w-3.5" />
               {candidate.availability}
              </span>
              <span className="flex items-center gap-1">
               <MapPin className="h-3.5 w-3.5" />
               {candidate.location}
              </span>
              <span>{candidate.workArrangement}</span>
             </div>

             {/* Interview Readiness */}
             <p className="text-sm text-muted-foreground">
              <span className="font-medium">Interview Readiness:</span> {candidate.interviewReadiness}
             </p>
            </div>

            <div className="ml-6 flex flex-col items-end gap-3">
             {/* Tier Badge */}
             <Badge className={`${tier.bgClass} ${tier.textClass} border-0`}>
              {tier.label}
             </Badge>
             <p className="max-w-[140px] text-right text-xs text-muted-foreground">
              {tier.description}
             </p>

             <div className="flex gap-2">
              <Button
               variant="ghost"
               size="icon"
               onClick={() => toggleSaveCandidate(candidate.id)}
               className={isSaved ? "text-primary" : "text-muted-foreground"}
              >
               <Bookmark className={`h-5 w-5 ${isSaved ? "fill-primary" : ""}`} />
              </Button>
              <Button variant="outline" size="sm" asChild>
               <Link href={`/employer/dashboard/candidate/${candidate.id}`}>
                View Profile
                <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
              </Button>
             </div>
            </div>
           </div>
          </CardContent>
         </Card>
        )
       })
      )}
     </div>
    </>
   ) : (
    /* Saved Candidates Tab */
    <>
     {/* Stats */}
     <div className="mb-6 grid grid-cols-3 gap-4">
      <Card className="border-border/60 bg-card/50">
       <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
         <Bookmark className="h-5 w-5 text-primary" />
        </div>
        <div>
         <p className="text-xl font-semibold text-foreground">{savedCandidatesData.length}</p>
         <p className="text-sm text-muted-foreground">Saved Candidates</p>
        </div>
       </CardContent>
      </Card>
      <Card className="border-amber-500/30 bg-card/50">
       <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
         <AlertCircle className="h-5 w-5 text-amber-400" />
        </div>
        <div>
         <p className="text-xl font-semibold text-foreground">1</p>
         <p className="text-sm text-amber-400">Active Signal — profile updated recently</p>
        </div>
       </CardContent>
      </Card>
      <Card className="border-primary/30 bg-card/50">
       <CardContent className="flex items-center gap-4 p-4">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
         <Clock className="h-5 w-5 text-primary" />
         <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-primary" />
        </div>
        <div>
         <p className="text-xl font-semibold text-foreground">1</p>
         <p className="text-sm text-primary">Interview Window Open — respond within 48hrs</p>
        </div>
       </CardContent>
      </Card>
     </div>

     {/* Sort and Filter */}
     <div className="mb-6 flex items-center justify-between">
      <div className="flex gap-2">
       <select 
        className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
        value={savedSortBy}
        onChange={(e) => setSavedSortBy(e.target.value as typeof savedSortBy)}
       >
        <option value="trajectory">Sort by: Trajectory Fit</option>
        <option value="recent">Sort by: Recently Active</option>
        <option value="saved">Sort by: Date Saved</option>
       </select>
       <select 
        className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground"
        value={savedFilter}
        onChange={(e) => setSavedFilter(e.target.value as typeof savedFilter)}
       >
        <option value="all">Filter: All</option>
        <option value="signal">Filter: Has Signal</option>
        <option value="ready">Filter: Ready to Contact</option>
       </select>
      </div>
     </div>

     {/* Saved Candidate Cards */}
     <div className="grid gap-4">
      {filteredSavedCandidates.map((candidate) => {
       const tier = getTierLabel(candidate.trajectoryFit)
       return (
        <Card
         key={candidate.id}
         className="transition-colors hover:border-primary/50"
        >
         <CardContent className="p-6">
          <div className="flex items-start justify-between">
           <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <span className="text-lg font-medium text-foreground">
               {candidate.name.split(" ")[1]}
              </span>
             </div>
             <div>
              <div className="flex items-center gap-2">
               <h3 className="font-semibold text-foreground">{candidate.name}</h3>
               {candidate.verified && (
                <Badge className="bg-primary/20 text-primary border-0 text-xs">
                 <CheckCircle className="mr-1 h-3 w-3" />
                 Verified
                </Badge>
               )}
               {candidate.signal && (
                <Badge className={`border-0 text-xs ${
                 candidate.signal.type === "profile" 
                  ? "bg-amber-500/20 text-amber-400" 
                  : "bg-primary/20 text-primary"
                }`}>
                 {candidate.signal.message}
                </Badge>
               )}
              </div>
              <p className="text-sm text-muted-foreground">{candidate.currentRole}</p>
             </div>
            </div>

            {/* Trajectory */}
            <div className="mb-3">
             <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-primary">{candidate.primaryTrajectory}</span>
             </div>
             <div className="mt-1 flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{candidate.secondaryTrajectory}</span>
              <span className="text-muted-foreground/60">(secondary)</span>
             </div>
            </div>

            {/* Skills */}
            <div className="mb-3 flex flex-wrap gap-2">
             {candidate.skills.slice(0, 4).map((skill) => (
              <Badge
               key={skill}
               variant="secondary"
               className="bg-secondary text-secondary-foreground"
              >
               {skill}
              </Badge>
             ))}
            </div>

            {/* Logistics */}
            <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
             <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {candidate.availability}
             </span>
             <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {candidate.location}
             </span>
             <span>{candidate.workArrangement}</span>
            </div>

            {/* AI Note */}
            <Card className="border-primary/30 bg-primary/5">
             <CardContent className="flex items-start gap-2 p-3">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm text-primary">{candidate.aiNote}</p>
             </CardContent>
            </Card>
           </div>

           <div className="ml-6 flex flex-col items-end gap-3">
            <Badge className={`${tier.bgClass} ${tier.textClass} border-0`}>
             {tier.label}
            </Badge>
            <p className="text-xs text-muted-foreground">Saved {candidate.savedDate}</p>

            <div className="flex flex-col gap-2">
             <Button variant="outline" size="sm" asChild>
              <Link href={`/employer/dashboard/candidate/${candidate.id}`}>
               View Profile
              </Link>
             </Button>
             <Dialog>
              <DialogTrigger asChild>
               <Button size="sm">Reach Out</Button>
              </DialogTrigger>
              <DialogContent>
               <DialogHeader>
                <DialogTitle>Draft Message to {candidate.name}</DialogTitle>
               </DialogHeader>
               <div className="space-y-4">
                <Textarea
                 placeholder="Write your message..."
                 value={draftMessage}
                 onChange={(e) => setDraftMessage(e.target.value)}
                 rows={6}
                />
                <div className="flex gap-2">
                 <Button variant="outline" onClick={() => setDraftMessage(`Hi,\n\nI noticed your recent activity on Career OS and wanted to reach out. Your trajectory toward ${candidate.primaryTrajectory.split(" → ")[1]} aligns well with opportunities we have at Stripe.\n\nWould you be open to a quick conversation?\n\nBest,\nSarah`)}>
                  Generate with AI
                 </Button>
                 <Button className="flex-1">Send Message</Button>
                </div>
               </div>
              </DialogContent>
             </Dialog>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
               <Button variant="outline" size="sm">Add to Role</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
               {activeRoles.map((role) => (
                <DropdownMenuItem key={role.id}>{role.title}</DropdownMenuItem>
               ))}
              </DropdownMenuContent>
             </DropdownMenu>
            </div>
           </div>
          </div>
         </CardContent>
        </Card>
       )
      })}
     </div>

     {/* AI Suggestion */}
     <Card className="mt-6 border-primary/30 bg-card/50">
      <CardContent className="p-6">
       <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 shrink-0 text-primary" />
        <div className="flex-1">
         <p className="mb-2 font-medium text-primary">Career OS suggests</p>
         <p className="mb-4 text-sm text-muted-foreground">
          Candidate A has not been contacted in 12 days since you saved them. High-trajectory candidates typically consider 3 to 5 opportunities simultaneously. Reaching out now keeps you in the conversation.
         </p>
         <Dialog>
          <DialogTrigger asChild>
           <Button size="sm">Draft message</Button>
          </DialogTrigger>
          <DialogContent>
           <DialogHeader>
            <DialogTitle>Draft Message to Candidate A</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
            <Textarea
             placeholder="Write your message..."
             rows={6}
            />
            <div className="flex gap-2">
             <Button variant="outline">Generate with AI</Button>
             <Button className="flex-1">Send Message</Button>
            </div>
           </div>
          </DialogContent>
         </Dialog>
        </div>
       </div>
      </CardContent>
     </Card>
    </>
   )}
  </div>
 )
}
