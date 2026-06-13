"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Download, Share2, Users, CheckCircle, AlertTriangle, TrendingUp, MapPin, Calendar, Sparkles, Search, Gem, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const roleData = {
 1: { title: "Senior Data Scientist", department: "Data & Analytics", applicants: 24 },
 2: { title: "Product Manager", department: "Product", applicants: 18 },
 3: { title: "Backend Engineer", department: "Engineering", applicants: 32 },
}

const applicants = [
 {
  id: "app-1",
  name: "David Wong",
  currentRole: "Data Analyst",
  appliedDate: "2 days ago",
  trajectory: "Analytics → Data Science",
  trajectoryFit: 92,
  skills: ["Python", "TensorFlow", "Statistical Modeling"],
  verifiedSkills: ["Python", "Statistical Modeling"],
  availability: "Available immediately",
  location: "Kuala Lumpur",
  matchRationale: "Strong analytical foundation with hands-on ML project experience that maps directly to this role's quantitative requirements.",
  interviewReadiness: "Strong",
  status: "high-fit",
  verified: true,
 },
 {
  id: "app-2",
  name: "Lisa Tan",
  currentRole: "ML Engineer",
  appliedDate: "3 days ago",
  trajectory: "ML Engineering → Data Science Leadership",
  trajectoryFit: 90,
  skills: ["PyTorch", "MLOps", "Team Leadership"],
  verifiedSkills: ["PyTorch", "MLOps"],
  availability: "Available in 2 weeks",
  location: "Singapore",
  matchRationale: "ML production experience with emerging leadership trajectory — a strong fit for senior DS work that requires model deployment expertise.",
  interviewReadiness: "Strong",
  status: "high-fit",
  verified: true,
 },
 {
  id: "app-3",
  name: "Kevin Ng",
  currentRole: "Junior Data Analyst",
  appliedDate: "5 days ago",
  trajectory: "Analytics → Data Science",
  trajectoryFit: 78,
  skills: ["Python", "SQL", "Kaggle Competitions"],
  verifiedSkills: ["Python", "Kaggle Competitions"],
  availability: "Available immediately",
  location: "Penang",
  matchRationale: "Lacks 1 year of required experience but has 3 verified ML projects and a hackathon win — strong momentum signal.",
  interviewReadiness: "Moderate",
  status: "hidden-gem",
  verified: false,
 },
 {
  id: "app-4",
  name: "Sarah Lee",
  currentRole: "Business Analyst",
  appliedDate: "7 days ago",
  trajectory: "Business Analytics → Data Science",
  trajectoryFit: 75,
  skills: ["SQL", "Tableau", "Python"],
  verifiedSkills: ["SQL"],
  availability: "Available in 1 month",
  location: "Kuala Lumpur",
  matchRationale: "Solid analytical background transitioning into data science — shows learning trajectory through recent Python certification.",
  interviewReadiness: "Moderate",
  status: "standard",
  verified: true,
 },
 {
  id: "app-5",
  name: "James Chen",
  currentRole: "Data Scientist",
  appliedDate: "14 days ago",
  trajectory: "Data Science → Senior DS",
  trajectoryFit: 85,
  skills: ["Python", "Deep Learning", "A/B Testing"],
  verifiedSkills: ["Python", "Deep Learning", "A/B Testing"],
  availability: "Available immediately",
  location: "Remote",
  matchRationale: "Experienced data scientist ready for senior responsibilities — strong technical depth with proven A/B testing track record.",
  interviewReadiness: "Strong",
  status: "requires-action",
  verified: true,
  actionNote: "Applied 14 days ago with no response. Candidates typically withdraw after 2 weeks of silence.",
 },
]

type FilterTab = "all" | "high-fit" | "hidden-gems" | "verified" | "action"
type SortOption = "trajectory" | "date" | "readiness"

function getTierLabel(trajectoryFit: number): { label: string; bgClass: string; textClass: string } {
 if (trajectoryFit >= 90) {
  return { label: "Strong fit", bgClass: "bg-green-500/20", textClass: "text-green-400" }
 } else if (trajectoryFit >= 80) {
  return { label: "Good fit", bgClass: "bg-primary/20", textClass: "text-primary" }
 } else {
  return { label: "Developing fit", bgClass: "bg-amber-500/20", textClass: "text-amber-400" }
 }
}

export default function ViewApplicantsPage() {
 const params = useParams()
 const roleId = Number(params.id) || 1
 const role = roleData[roleId as keyof typeof roleData] || roleData[1]

 const [searchQuery, setSearchQuery] = useState("")
 const [activeTab, setActiveTab] = useState<FilterTab>("all")
 const [sortBy, setSortBy] = useState<SortOption>("trajectory")
 const [verifiedOnly, setVerifiedOnly] = useState(false)
 const [scheduleData, setScheduleData] = useState({ date: "", time: "", format: "video" })
 const [passNote, setPassNote] = useState("")

 const tabCounts = {
  all: applicants.length,
  "high-fit": applicants.filter(a => a.status === "high-fit").length,
  "hidden-gems": applicants.filter(a => a.status === "hidden-gem").length,
  verified: applicants.filter(a => a.verified).length,
  action: applicants.filter(a => a.status === "requires-action").length,
 }

 const filteredApplicants = applicants
  .filter(a => {
   if (searchQuery) {
    const query = searchQuery.toLowerCase()
    if (!a.name.toLowerCase().includes(query) && !a.currentRole.toLowerCase().includes(query)) {
     return false
    }
   }
   if (verifiedOnly && !a.verified) return false
   if (activeTab === "high-fit") return a.status === "high-fit"
   if (activeTab === "hidden-gems") return a.status === "hidden-gem"
   if (activeTab === "verified") return a.verified
   if (activeTab === "action") return a.status === "requires-action"
   return true
  })
  .sort((a, b) => {
   if (sortBy === "trajectory") return b.trajectoryFit - a.trajectoryFit
   if (sortBy === "readiness") return a.interviewReadiness === "Strong" ? -1 : 1
   return 0
  })

 return (
  <TooltipProvider>
   <div className="min-h-screen p-8">
    {/* Header */}
    <div className="mb-6 flex items-center justify-between">
     <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" asChild>
       <Link href="/employer/dashboard/roles">
        <ArrowLeft className="h-5 w-5" />
       </Link>
      </Button>
      <div>
       <h1 className="text-2xl font-semibold text-foreground">{role.title}</h1>
       <p className="text-muted-foreground">{role.department} · {role.applicants} applicants</p>
      </div>
     </div>
     <div className="flex gap-2">
      <Button variant="outline" size="sm">
       <Download className="mr-2 h-4 w-4" />
       Export List
      </Button>
      <Button variant="outline" size="sm">
       <Share2 className="mr-2 h-4 w-4" />
       Share Role
      </Button>
     </div>
    </div>

    {/* Stats */}
    <div className="mb-6 grid grid-cols-4 gap-4">
     <Card className="border-border/60 bg-card/50">
      <CardContent className="flex items-center gap-4 p-4">
       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
        <Users className="h-5 w-5 text-muted-foreground" />
       </div>
       <div>
        <p className="text-xl font-semibold text-foreground">{role.applicants}</p>
        <p className="text-sm text-muted-foreground">Total Applicants</p>
       </div>
      </CardContent>
     </Card>
     <Card className="border-primary/30 bg-card/50">
      <CardContent className="flex items-center gap-4 p-4">
       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <TrendingUp className="h-5 w-5 text-primary" />
       </div>
       <div>
        <p className="text-xl font-semibold text-foreground">{tabCounts["high-fit"]}</p>
        <p className="text-sm text-primary">High Trajectory Fit</p>
       </div>
      </CardContent>
     </Card>
     <Card className="border-primary/30 bg-card/50">
      <CardContent className="flex items-center gap-4 p-4">
       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <CheckCircle className="h-5 w-5 text-primary" />
       </div>
       <div>
        <p className="text-xl font-semibold text-foreground">{tabCounts.verified}</p>
        <p className="text-sm text-primary">Career OS Verified</p>
       </div>
      </CardContent>
     </Card>
     <Card className="border-amber-500/30 bg-card/50">
      <CardContent className="flex items-center gap-4 p-4">
       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
       </div>
       <div>
        <p className="text-xl font-semibold text-foreground">{tabCounts.action}</p>
        <p className="text-sm text-amber-400">Requires Action</p>
       </div>
      </CardContent>
     </Card>
    </div>

    {/* Filter Tabs */}
    <div className="mb-4 flex gap-1 rounded-lg border border-border bg-muted/30 p-1 w-fit">
     {[
      { id: "all", label: `All (${tabCounts.all})` },
      { id: "high-fit", label: `High Trajectory Fit (${tabCounts["high-fit"]})` },
      { id: "hidden-gems", label: `Hidden Gems (${tabCounts["hidden-gems"]})`, tooltip: "Candidates who may lack one formal requirement but show strong momentum through side projects, competitions, or rapid skill growth." },
      { id: "verified", label: `Career OS Verified (${tabCounts.verified})` },
      { id: "action", label: `Requires Action (${tabCounts.action})` },
     ].map((tab) => (
      <Tooltip key={tab.id}>
       <TooltipTrigger asChild>
        <button
         onClick={() => setActiveTab(tab.id as FilterTab)}
         className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          activeTab === tab.id
           ? "bg-background text-foreground shadow-sm"
           : "text-muted-foreground hover:text-foreground"
         }`}
        >
         {tab.label}
        </button>
       </TooltipTrigger>
       {tab.tooltip && (
        <TooltipContent className="max-w-xs">
         <p>{tab.tooltip}</p>
        </TooltipContent>
       )}
      </Tooltip>
     ))}
    </div>

    {/* Secondary Filters */}
    <div className="mb-6 flex items-center gap-4">
     <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
       placeholder="Search applicants..."
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       className="pl-9"
      />
     </div>
     <select 
      className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as SortOption)}
     >
      <option value="trajectory">Sort by: Trajectory Fit</option>
      <option value="date">Sort by: Application Date</option>
      <option value="readiness">Sort by: Interview Readiness</option>
     </select>
     <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <input
       type="checkbox"
       checked={verifiedOnly}
       onChange={(e) => setVerifiedOnly(e.target.checked)}
       className="rounded border-border"
      />
      Show Career OS Verified only
     </label>
    </div>

    {/* Applicant Cards */}
    <div className="space-y-4">
     {filteredApplicants.map((applicant) => {
      const tier = getTierLabel(applicant.trajectoryFit)
      const isHighFit = applicant.status === "high-fit"
      const isHiddenGem = applicant.status === "hidden-gem"
      const requiresAction = applicant.status === "requires-action"

      return (
       <Card
        key={applicant.id}
        className={`bg-card/50 transition-colors hover:border-primary/50 ${
         isHighFit ? "border-l-4 border-l-primary border-border/60" :
         requiresAction ? "border-l-4 border-l-amber-500 border-border/60" :
         "border-border/60"
        }`}
       >
        <CardContent className="p-6">
         <div className="flex items-start gap-6">
          {/* Left Section */}
          <div className="flex items-start gap-4 flex-1">
           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <span className="text-lg font-medium text-foreground">
             {applicant.name.split(" ").map(n => n[0]).join("")}
            </span>
           </div>
           <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
             <h3 className="font-semibold text-foreground">{applicant.name}</h3>
             {isHiddenGem && (
              <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">
               <Gem className="mr-1 h-3 w-3" />
               Hidden Gem
              </Badge>
             )}
            </div>
            <p className="text-sm text-muted-foreground">{applicant.currentRole}</p>
            <p className="text-xs text-muted-foreground">Applied {applicant.appliedDate}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
             <TrendingUp className="h-4 w-4 text-primary" />
             <span className="text-primary">{applicant.trajectory}</span>
            </div>
           </div>
          </div>

          {/* Middle Section */}
          <div className="flex-1">
           <p className="mb-3 text-sm text-muted-foreground">{applicant.matchRationale}</p>
           
           <div className="mb-3 flex flex-wrap gap-2">
            {applicant.skills.map((skill) => (
             <Badge
              key={skill}
              variant="secondary"
              className="bg-secondary text-secondary-foreground"
             >
              {applicant.verifiedSkills.includes(skill) && (
               <CheckCircle className="mr-1 h-3 w-3 text-primary" />
              )}
              {skill}
             </Badge>
            ))}
           </div>

           <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
             <Calendar className="h-3.5 w-3.5" />
             {applicant.availability}
            </span>
            <span className="flex items-center gap-1">
             <MapPin className="h-3.5 w-3.5" />
             {applicant.location}
            </span>
           </div>

           {isHiddenGem && (
            <Card className="mt-3 border-amber-500/30 bg-amber-500/5">
             <CardContent className="flex items-start gap-2 p-3">
              <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
              <p className="text-xs text-amber-400">{applicant.matchRationale}</p>
             </CardContent>
            </Card>
           )}

           {requiresAction && applicant.actionNote && (
            <Card className="mt-3 border-amber-500/30 bg-amber-500/5">
             <CardContent className="flex items-start gap-2 p-3">
              <Clock className="h-4 w-4 shrink-0 text-amber-400" />
              <p className="text-xs text-amber-400">{applicant.actionNote}</p>
             </CardContent>
            </Card>
           )}
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-end gap-3 min-w-[160px]">
           <Badge className={`${tier.bgClass} ${tier.textClass} border-0`}>
            {tier.label}
           </Badge>
           <Badge className={`border-0 text-xs ${
            applicant.interviewReadiness === "Strong" 
             ? "bg-green-500/20 text-green-400" 
             : "bg-amber-500/20 text-amber-400"
           }`}>
            Interview: {applicant.interviewReadiness}
           </Badge>

           <div className="flex flex-col gap-2 w-full">
            <Button variant="outline" size="sm" asChild className="w-full">
             <Link href={`/employer/dashboard/candidate/${applicant.id}`}>
              View Full Profile
             </Link>
            </Button>
            <Dialog>
             <DialogTrigger asChild>
              <Button size="sm" className="w-full">Schedule Interview</Button>
             </DialogTrigger>
             <DialogContent>
              <DialogHeader>
               <DialogTitle>Schedule Interview with {applicant.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                <div>
                 <Label>Date</Label>
                 <Input
                  type="date"
                  value={scheduleData.date}
                  onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                 />
                </div>
                <div>
                 <Label>Time</Label>
                 <Input
                  type="time"
                  value={scheduleData.time}
                  onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                 />
                </div>
               </div>
               <div>
                <Label>Format</Label>
                <Select value={scheduleData.format} onValueChange={(v) => setScheduleData({ ...scheduleData, format: v })}>
                 <SelectTrigger>
                  <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                 </SelectContent>
                </Select>
               </div>
               <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                Auto-send calendar invite
               </label>
               <Button className="w-full">Send Interview Invite</Button>
              </div>
             </DialogContent>
            </Dialog>
            <Dialog>
             <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full text-muted-foreground">
               Pass
              </Button>
             </DialogTrigger>
             <DialogContent>
              <DialogHeader>
               <DialogTitle>Pass on {applicant.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
               <p className="text-sm text-muted-foreground">
                This will move the applicant to declined status. You can optionally add a note.
               </p>
               <Textarea
                placeholder="Optional note (not shared with candidate)..."
                value={passNote}
                onChange={(e) => setPassNote(e.target.value)}
                rows={3}
               />
               <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button variant="destructive" className="flex-1">Confirm Pass</Button>
               </div>
              </div>
             </DialogContent>
            </Dialog>
           </div>
          </div>
         </div>
        </CardContent>
       </Card>
      )
     })}
    </div>

    {/* AI Hiring Insight */}
    <Card className="mt-6 border-primary/30 bg-card/50">
     <CardContent className="p-6">
      <div className="flex items-start gap-3">
       <Sparkles className="h-5 w-5 shrink-0 text-primary" />
       <div>
        <p className="mb-2 font-medium text-primary">AI Hiring Insight</p>
        <p className="text-sm text-muted-foreground">
         Of your {role.applicants} applicants, {tabCounts["high-fit"]} show a trajectory directly aligned with this role. The 3 highest-fit candidates have not been contacted yet. Companies that respond to high-trajectory candidates within 48 hours are 3x more likely to close them. Your response window for the top candidates closes in approximately 12 hours.
        </p>
       </div>
      </div>
     </CardContent>
    </Card>
   </div>
  </TooltipProvider>
 )
}
