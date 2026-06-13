"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Briefcase, Calendar, MapPin, Target } from "lucide-react"

const workHistory = [
 {
  title: "Data Analyst",
  company: "TechCorp Malaysia",
  location: "Kuala Lumpur",
  period: "Jan 2022 - Present",
  description: "Analyzing product metrics and building dashboards for stakeholder reporting.",
  current: true,
 },
 {
  title: "Junior Data Analyst",
  company: "StartupXYZ",
  location: "Kuala Lumpur",
  period: "Jun 2020 - Dec 2021",
  description: "Built SQL queries and Excel reports for the marketing team.",
  current: false,
 },
 {
  title: "Data Intern",
  company: "Analytics Co",
  location: "Petaling Jaya",
  period: "Jan 2020 - May 2020",
  description: "Learned data fundamentals and assisted with data cleaning projects.",
  current: false,
 },
]

const skills = {
 technical: ["SQL", "Python", "Excel", "Tableau", "Data Visualization", "Statistical Analysis"],
 soft: ["Problem Solving", "Communication", "Attention to Detail", "Teamwork"],
 domain: ["E-commerce Analytics", "Marketing Metrics", "Product Analytics"],
}

export default function ProfilePage() {
 const [isEditing, setIsEditing] = useState(false)

 return (
  <div className="min-h-screen p-8">
   {/* Header */}
   <div className="mb-8 flex items-start justify-between">
    <div>
     <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
     <p className="text-muted-foreground">Manage your career profile and preferences.</p>
    </div>
    <Button
     variant="outline"
     size="sm"
     onClick={() => setIsEditing(!isEditing)}
     className="gap-2"
    >
     <Pencil className="h-4 w-4" />
     {isEditing ? "Done Editing" : "Edit Profile"}
    </Button>
   </div>

   {/* Profile Info Card */}
   <Card className="mb-8 border-border/60 bg-card/50">
    <CardContent className="p-6">
     <div className="flex items-start gap-6">
      {/* Avatar */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
       <span className="text-2xl font-semibold text-primary">AC</span>
      </div>

      {/* Info */}
      <div className="flex-1">
       <h2 className="text-xl font-semibold text-foreground">Alex Chen</h2>
       <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
         <Briefcase className="h-4 w-4" />
         Data Analyst
        </span>
        <span className="flex items-center gap-1">
         <MapPin className="h-4 w-4" />
         Technology
        </span>
        <span className="flex items-center gap-1">
         <Calendar className="h-4 w-4" />
         2-3 years experience
        </span>
       </div>
      </div>
     </div>
    </CardContent>
   </Card>

   {/* Work History */}
   <Card className="mb-8 border-border/60 bg-card/50">
    <CardHeader>
     <CardTitle className="text-lg">Work History</CardTitle>
    </CardHeader>
    <CardContent>
     <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-0.5 bg-border" />

      <div className="space-y-6">
       {workHistory.map((job, index) => (
        <div key={index} className="relative flex gap-4 pl-6">
         {/* Timeline dot */}
         <div
          className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 ${
           job.current
            ? "border-primary bg-primary"
            : "border-border bg-card"
          }`}
         />

         <div className="flex-1">
          <div className="flex items-start justify-between">
           <div>
            <h3 className="font-medium text-foreground">{job.title}</h3>
            <p className="text-sm text-muted-foreground">
             {job.company} · {job.location}
            </p>
           </div>
           <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{job.period}</span>
            {job.current && (
             <Badge className="bg-primary/10 text-primary">Current</Badge>
            )}
           </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
         </div>
        </div>
       ))}
      </div>
     </div>
    </CardContent>
   </Card>

   {/* Skills */}
   <Card className="mb-8 border-border/60 bg-card/50">
    <CardHeader>
     <CardTitle className="text-lg">Skills</CardTitle>
    </CardHeader>
    <CardContent>
     <div className="grid gap-6 md:grid-cols-3">
      {/* Technical */}
      <div>
       <h3 className="mb-3 text-sm font-medium text-muted-foreground">Technical</h3>
       <div className="flex flex-wrap gap-2">
        {skills.technical.map((skill) => (
         <Badge
          key={skill}
          variant="secondary"
          className="bg-primary/10 text-primary hover:bg-primary/20"
         >
          {skill}
         </Badge>
        ))}
       </div>
      </div>

      {/* Soft Skills */}
      <div>
       <h3 className="mb-3 text-sm font-medium text-muted-foreground">Soft Skills</h3>
       <div className="flex flex-wrap gap-2">
        {skills.soft.map((skill) => (
         <Badge
          key={skill}
          variant="secondary"
          className="bg-secondary text-secondary-foreground"
         >
          {skill}
         </Badge>
        ))}
       </div>
      </div>

      {/* Domain Knowledge */}
      <div>
       <h3 className="mb-3 text-sm font-medium text-muted-foreground">Domain Knowledge</h3>
       <div className="flex flex-wrap gap-2">
        {skills.domain.map((skill) => (
         <Badge
          key={skill}
          variant="secondary"
          className="bg-secondary text-secondary-foreground"
         >
          {skill}
         </Badge>
        ))}
       </div>
      </div>
     </div>
    </CardContent>
   </Card>

   {/* Career Goal */}
   <Card className="border-border/60 bg-card/50">
    <CardHeader className="flex flex-row items-center justify-between">
     <CardTitle className="flex items-center gap-2 text-lg">
      <Target className="h-5 w-5 text-primary" />
      Career Goal
     </CardTitle>
     <Button variant="outline" size="sm">
      Update Goal
     </Button>
    </CardHeader>
    <CardContent>
     <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-foreground">
       Transition from Data Analyst to a <strong>Senior Data Scientist</strong> role within
       the next 2 years, focusing on machine learning and product analytics in the tech
       industry.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
       <Badge variant="outline">Data Scientist</Badge>
       <Badge variant="outline">Product Analyst</Badge>
       <Badge variant="outline">BI Manager</Badge>
      </div>
     </div>
    </CardContent>
   </Card>
  </div>
 )
}
