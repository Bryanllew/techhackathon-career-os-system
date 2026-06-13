"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, CheckCircle2, TrendingUp, Building2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const jobData = {
 1: {
  title: "Senior Data Scientist",
  company: "Stripe",
  matchPercentage: 92,
  location: "San Francisco, CA (Hybrid)",
  salaryRange: { min: 180000, max: 240000 },
  candidateSalary: 125000,
  whyYouMatch: [
   "Your 4 years of data analysis experience maps directly to the quantitative foundation this role requires.",
   "Your trajectory shows a clear progression toward ML and predictive modeling — exactly what this team is building.",
   "Candidates with your background have a 78% success rate in similar Data Scientist transitions.",
  ],
  skillsYouHave: ["Python", "SQL", "Data Analysis", "Statistics", "Machine Learning Basics"],
  skillsToGrow: ["Deep Learning", "A/B Testing at Scale", "MLOps"],
 },
 2: {
  title: "Product Analyst",
  company: "Notion",
  matchPercentage: 87,
  location: "Remote (US)",
  salaryRange: { min: 150000, max: 200000 },
  candidateSalary: 125000,
  whyYouMatch: [
   "Your analytical mindset combined with business acumen positions you well for product-focused roles.",
   "Your experience with stakeholder communication is highly valued in product analytics.",
   "The product analyst trajectory often leads to PM roles, aligning with your career growth goals.",
  ],
  skillsYouHave: ["SQL", "Data Analysis", "Communication", "Excel", "Python"],
  skillsToGrow: ["Product Metrics", "Experimentation", "User Research"],
 },
 3: {
  title: "Analytics Lead",
  company: "Linear",
  matchPercentage: 84,
  location: "Remote (Global)",
  salaryRange: { min: 160000, max: 220000 },
  candidateSalary: 125000,
  whyYouMatch: [
   "Your growing leadership experience positions you for team lead responsibilities.",
   "Your technical depth combined with communication skills is ideal for leading analytics initiatives.",
   "This role would accelerate your trajectory toward Director-level positions.",
  ],
  skillsYouHave: ["SQL", "Python", "Data Analysis", "Leadership", "Project Management"],
  skillsToGrow: ["Team Management", "Analytics Strategy", "Executive Communication"],
 },
}

export default function JobDetailPage() {
 const params = useParams()
 const id = params.id as string
 const job = jobData[id as keyof typeof jobData] || jobData[1]
 const [showModal, setShowModal] = useState(false)
 const [interestExpressed, setInterestExpressed] = useState(false)

 const salaryPercentage = Math.round(
  ((job.candidateSalary - job.salaryRange.min) /
   (job.salaryRange.max - job.salaryRange.min)) *
   100
 )

 const handleExpressInterest = () => {
  setInterestExpressed(true)
  setShowModal(true)
 }

 return (
  <div className="min-h-screen p-8">
   {/* Modal */}
   {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
     <div className="mx-4 w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
      <div className="mb-4 flex items-start justify-between">
       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-6 w-6 text-primary" />
       </div>
       <button
        onClick={() => setShowModal(false)}
        className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
       >
        <X className="h-5 w-5" />
       </button>
      </div>
      <h2 className="mb-2 text-lg font-semibold text-foreground">Interest expressed!</h2>
      <p className="mb-6 text-muted-foreground">
       The employer will be notified of your interest in the {job.title} position at {job.company}.
      </p>
      <Button onClick={() => setShowModal(false)} className="w-full">
       Close
      </Button>
     </div>
    </div>
   )}

   {/* Back Button */}
   <Link
    href="/candidate/dashboard"
    className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
   >
    <ArrowLeft className="h-4 w-4" />
    Back to dashboard
   </Link>

   {/* Header */}
   <div className="mb-8 flex items-start justify-between">
    <div>
     <div className="mb-2 flex items-center gap-3">
      <h1 className="text-2xl font-semibold text-foreground">{job.title}</h1>
      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
       {job.matchPercentage}% match
      </Badge>
     </div>
     <div className="flex items-center gap-4 text-muted-foreground">
      <span className="flex items-center gap-1">
       <Building2 className="h-4 w-4" />
       {job.company}
      </span>
      <span>{job.location}</span>
     </div>
    </div>
    <Button 
     size="lg" 
     onClick={handleExpressInterest}
     disabled={interestExpressed}
     variant={interestExpressed ? "secondary" : "default"}
    >
     {interestExpressed ? "Interest Expressed" : "Express Interest"}
    </Button>
   </div>

   <div className="grid gap-6 lg:grid-cols-2">
    {/* Why You Match */}
    <Card className="border-border/60 bg-card/50">
     <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
       <TrendingUp className="h-5 w-5 text-primary" />
       Why you match
      </CardTitle>
     </CardHeader>
     <CardContent>
      <ul className="space-y-4">
       {job.whyYouMatch.map((reason, index) => (
        <li key={index} className="flex gap-3">
         <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
         <span className="text-muted-foreground">{reason}</span>
        </li>
       ))}
      </ul>
     </CardContent>
    </Card>

    {/* Salary Range */}
    <Card className="border-border/60 bg-card/50">
     <CardHeader>
      <CardTitle className="text-lg">Salary Range</CardTitle>
     </CardHeader>
     <CardContent>
      <div className="mb-6">
       <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
         ${job.salaryRange.min.toLocaleString()}
        </span>
        <span className="text-muted-foreground">
         ${job.salaryRange.max.toLocaleString()}
        </span>
       </div>
       <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
        <div
         className="h-full bg-primary/30"
         style={{ width: "100%" }}
        />
        <div
         className="absolute top-0 h-full w-1 bg-primary"
         style={{ left: `${Math.max(0, Math.min(100, salaryPercentage))}%` }}
        />
       </div>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
       <div>
        <p className="text-sm text-muted-foreground">Your current estimated salary</p>
        <p className="text-lg font-semibold text-foreground">
         ${job.candidateSalary.toLocaleString()}
        </p>
       </div>
       <div className="text-right">
        <p className="text-sm text-muted-foreground">Potential increase</p>
        <p className="text-lg font-semibold text-primary">
         +${(job.salaryRange.min - job.candidateSalary).toLocaleString()} - $
         {(job.salaryRange.max - job.candidateSalary).toLocaleString()}
        </p>
       </div>
      </div>
     </CardContent>
    </Card>

    {/* Skills You Have */}
    <Card className="border-border/60 bg-card/50">
     <CardHeader>
      <CardTitle className="text-lg">Skills you have</CardTitle>
     </CardHeader>
     <CardContent>
      <div className="flex flex-wrap gap-2">
       {job.skillsYouHave.map((skill) => (
        <Badge
         key={skill}
         variant="secondary"
         className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
        >
         {skill}
        </Badge>
       ))}
      </div>
     </CardContent>
    </Card>

    {/* Skills to Grow */}
    <Card className="border-border/60 bg-card/50">
     <CardHeader>
      <CardTitle className="text-lg">Skills to grow</CardTitle>
     </CardHeader>
     <CardContent>
      <div className="flex flex-wrap gap-2">
       {job.skillsToGrow.map((skill) => (
        <Badge
         key={skill}
         variant="secondary"
         className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
        >
         {skill}
        </Badge>
       ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
       Building these skills will strengthen your candidacy and help you grow in this role.
      </p>
     </CardContent>
    </Card>
   </div>
  </div>
 )
}
