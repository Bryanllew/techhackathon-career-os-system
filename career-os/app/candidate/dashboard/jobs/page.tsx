"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const allJobMatches = [
 {
  id: 1,
  title: "Senior Data Scientist",
  company: "Stripe",
  matchPercentage: 92,
  location: "San Francisco, CA (Hybrid)",
  reason: "Your trajectory from Data Analyst aligns perfectly with this role's growth expectations.",
 },
 {
  id: 2,
  title: "Product Analyst",
  company: "Notion",
  matchPercentage: 87,
  location: "Remote (US)",
  reason: "Your SQL and Python skills combined with your analytical background make you a strong fit.",
 },
 {
  id: 3,
  title: "Analytics Lead",
  company: "Linear",
  matchPercentage: 84,
  location: "Remote (Global)",
  reason: "Your leadership trajectory and technical skills match the team's growth direction.",
 },
 {
  id: 4,
  title: "Data Scientist",
  company: "Figma",
  matchPercentage: 82,
  location: "San Francisco, CA",
  reason: "Your analytical foundation and growing ML skills position you well for this team.",
 },
 {
  id: 5,
  title: "Business Intelligence Manager",
  company: "Airbnb",
  matchPercentage: 79,
  location: "Remote (US)",
  reason: "Your data visualization expertise and stakeholder management skills align with this role.",
 },
 {
  id: 6,
  title: "Senior Analyst",
  company: "Spotify",
  matchPercentage: 76,
  location: "New York, NY (Hybrid)",
  reason: "Your experience with large datasets and statistical analysis matches the team's needs.",
 },
 {
  id: 7,
  title: "Growth Data Scientist",
  company: "Vercel",
  matchPercentage: 74,
  location: "Remote (Global)",
  reason: "Your trajectory toward growth-focused analytics aligns with this role's requirements.",
 },
 {
  id: 8,
  title: "Analytics Engineer",
  company: "dbt Labs",
  matchPercentage: 72,
  location: "Remote (US)",
  reason: "Your SQL mastery and data pipeline experience make you a natural fit.",
 },
]

export default function JobMatchesPage() {
 const [searchQuery, setSearchQuery] = useState("")

 const filteredJobs = allJobMatches.filter(
  (job) =>
   job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
   job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
   job.location.toLowerCase().includes(searchQuery.toLowerCase())
 )

 return (
  <div className="min-h-screen p-8">
   {/* Back Button */}
   <Link
    href="/candidate/dashboard"
    className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
   >
    <ArrowLeft className="h-4 w-4" />
    Back to dashboard
   </Link>

   {/* Header */}
   <div className="mb-8">
    <h1 className="text-2xl font-semibold text-foreground">Job Matches</h1>
    <p className="text-muted-foreground">
     Roles that align with your trajectory and career goals.
    </p>
   </div>

   {/* Stats */}
   <Card className="mb-8 border-border/60 bg-card/50">
    <CardContent className="flex items-center gap-4 p-6">
     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
      <Briefcase className="h-6 w-6 text-primary" />
     </div>
     <div>
      <p className="text-2xl font-semibold text-foreground">{allJobMatches.length}</p>
      <p className="text-sm text-muted-foreground">Matching Positions</p>
     </div>
    </CardContent>
   </Card>

   {/* Search */}
   <div className="relative mb-6">
    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
    <Input
     type="text"
     placeholder="Search by role, company, or location..."
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
     className="h-12 pl-12 text-base"
    />
   </div>

   {/* Results */}
   <p className="mb-4 text-sm text-muted-foreground">
    Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> job matches
   </p>

   {/* Job Cards */}
   <div className="grid gap-4 md:grid-cols-2">
    {filteredJobs.map((job) => (
     <Card
      key={job.id}
      className="transition-colors hover:border-primary/50"
     >
      <CardContent className="p-5">
       <div className="mb-3 flex items-start justify-between">
        <div>
         <h3 className="font-semibold text-foreground">{job.title}</h3>
         <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
         {job.matchPercentage}% match
        </Badge>
       </div>
       <p className="mb-3 text-xs text-muted-foreground">{job.location}</p>
       <p className="mb-4 text-sm text-muted-foreground">{job.reason}</p>
       <Button variant="outline" size="sm" className="w-full" asChild>
        <Link href={`/candidate/dashboard/job/${job.id}`}>Explore</Link>
       </Button>
      </CardContent>
     </Card>
    ))}
   </div>

   {filteredJobs.length === 0 && (
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex flex-col items-center justify-center py-12">
      <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
      <p className="text-lg font-medium text-foreground">No jobs found</p>
      <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search terms</p>
      <Button
       variant="outline"
       className="mt-4"
       onClick={() => setSearchQuery("")}
      >
       Clear search
      </Button>
     </CardContent>
    </Card>
   )}
  </div>
 )
}
