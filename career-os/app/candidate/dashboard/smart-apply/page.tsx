"use client"

import { useState } from "react"
import {
 Sparkles,
 Clock,
 CheckCircle2,
 AlertCircle,
 Play,
 ChevronDown,
 ChevronUp,
 Copy,
 RefreshCw,
 FileText,
 Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog"
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const applications = [
 {
  id: "1",
  company: "Figma",
  role: "Data Scientist",
  status: "applied",
  statusLabel: "Applied — Awaiting Response",
  autofillProgress: 10,
  autofillTotal: 10,
 },
 {
  id: "2",
  company: "Stripe",
  role: "Senior Data Scientist",
  status: "interview",
  statusLabel: "Interview Scheduled",
  autofillProgress: 10,
  autofillTotal: 10,
  interviewDate: "June 18, 10:00 AM",
 },
 {
  id: "3",
  company: "Notion",
  role: "Product Analyst",
  status: "ready",
  statusLabel: "Autofill Ready",
  autofillProgress: 8,
  autofillTotal: 10,
 },
]

const suggestedApplications = [
 { id: "4", company: "Linear", role: "Analytics Lead", matchPercent: 84 },
 { id: "5", company: "Vercel", role: "Data Engineer", matchPercent: 79 },
]

const sessionTypes = [
 { id: "behavioural", name: "Behavioural Interview", description: "STAR method practice, leadership scenarios", highlighted: false },
 { id: "technical", name: "Technical Interview", description: "SQL, Python, statistics questions", highlighted: false },
 { id: "role-specific", name: "Role Specific", description: "Senior Data Scientist at Stripe", highlighted: true },
]

const pastSessions = [
 { id: "1", type: "Behavioural Interview", date: "June 10, 2026", duration: "25 min", score: 87 },
 { id: "2", type: "Technical Interview", date: "June 8, 2026", duration: "32 min", score: 79 },
]

const coverLetters = [
 { id: "1", role: "Senior Data Scientist", company: "Stripe", date: "June 12, 2026" },
 { id: "2", role: "Product Analyst", company: "Notion", date: "June 10, 2026" },
 { id: "3", role: "Analytics Lead", company: "Linear", date: "June 8, 2026" },
]

const availableRoles = [
 { id: "1", label: "Senior Data Scientist at Stripe" },
 { id: "2", label: "Product Analyst at Notion" },
 { id: "3", label: "Analytics Lead at Linear" },
 { id: "4", label: "Data Engineer at Vercel" },
]

export default function SmartApplyPage() {
 const [activeTab, setActiveTab] = useState("applications")
 const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null)
 const [generateModalOpen, setGenerateModalOpen] = useState(false)
 const [selectedRole, setSelectedRole] = useState("")

 const getStatusColor = (status: string) => {
  switch (status) {
   case "applied":
    return "bg-slate-500/10 text-slate-500"
   case "interview":
    return "bg-primary/10 text-primary"
   case "ready":
    return "bg-amber-500/10 text-amber-500"
   default:
    return "bg-secondary text-secondary-foreground"
  }
 }

 return (
  <div className="min-h-screen p-8">
   <div className="mb-8">
    <h1 className="text-2xl font-semibold text-foreground">Smart Apply</h1>
    <p className="text-muted-foreground">AI-powered application tools to help you land your next role</p>
   </div>

   <Tabs value={activeTab} onValueChange={setActiveTab}>
    <TabsList className="mb-6">
     <TabsTrigger value="applications">Applications</TabsTrigger>
     <TabsTrigger value="interview">Interview Prep</TabsTrigger>
     <TabsTrigger value="coverletters">Cover Letters</TabsTrigger>
    </TabsList>

    {/* Applications Tab */}
    <TabsContent value="applications">
     {/* Stat Bar */}
     <Card className="mb-8 border-border/60 bg-primary/5">
      <CardContent className="flex items-center justify-between p-4">
       <div className="flex items-center gap-8">
        <div className="text-center">
         <p className="text-2xl font-semibold text-foreground">15</p>
         <p className="text-sm text-muted-foreground">Applications this week</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-center">
         <p className="text-2xl font-semibold text-primary">3</p>
         <p className="text-sm text-muted-foreground">Interviews received</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-center">
         <p className="text-2xl font-semibold text-foreground">4 min</p>
         <p className="text-sm text-muted-foreground">Average time per app</p>
        </div>
       </div>
      </CardContent>
     </Card>

     {/* Applications in Progress */}
     <div className="mb-8">
      <h2 className="mb-4 text-lg font-medium text-foreground">Applications in Progress</h2>
      <div className="grid gap-4 md:grid-cols-3">
       {applications.map((app) => (
        <Card key={app.id} className="border-border/60">
         <CardContent className="p-4">
          <div className="mb-3 flex items-start justify-between">
           <div>
            <p className="font-medium text-foreground">{app.role}</p>
            <p className="text-sm text-muted-foreground">at {app.company}</p>
           </div>
           <Badge className={getStatusColor(app.status)}>{app.statusLabel}</Badge>
          </div>
          {app.interviewDate && (
           <p className="mb-3 text-sm text-primary">
            <Clock className="mr-1 inline h-3 w-3" />
            {app.interviewDate}
           </p>
          )}
          <div className="mb-2">
           <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Autofill progress</span>
            <span>{app.autofillProgress} of {app.autofillTotal} fields</span>
           </div>
           <Progress value={(app.autofillProgress / app.autofillTotal) * 100} className="h-1.5" />
          </div>
          {app.status === "ready" && (
           <Button size="sm" className="mt-2 w-full">Complete and Send</Button>
          )}
         </CardContent>
        </Card>
       ))}
      </div>
     </div>

     {/* Suggested to Apply */}
     <div>
      <h2 className="mb-4 text-lg font-medium text-foreground">Suggested to Apply</h2>
      <div className="grid gap-4 md:grid-cols-2">
       {suggestedApplications.map((app) => (
        <Card key={app.id} className="border-border/60">
         <CardContent className="p-4">
          <Badge className="mb-3 bg-primary/10 text-primary">
           ✦ Career OS can autofill 100% of this application
          </Badge>
          <div className="flex items-center justify-between">
           <div>
            <p className="font-medium text-foreground">{app.role}</p>
            <p className="text-sm text-muted-foreground">at {app.company}</p>
           </div>
           <div className="text-right">
            <p className="text-lg font-semibold text-primary">{app.matchPercent}%</p>
            <p className="text-xs text-muted-foreground">match</p>
           </div>
          </div>
          <Button size="sm" className="mt-3 w-full">Start Application</Button>
         </CardContent>
        </Card>
       ))}
      </div>
     </div>
    </TabsContent>

    {/* Interview Prep Tab */}
    <TabsContent value="interview">
     {/* Session Types */}
     <div className="mb-8">
      <h2 className="mb-4 text-lg font-medium text-foreground">Practice Sessions</h2>
      <div className="grid gap-4 md:grid-cols-3">
       {sessionTypes.map((session) => (
        <Card
         key={session.id}
         className={
          session.highlighted
           ? "border-2 border-primary bg-primary/5"
           : "border-border/60"
         }
        >
         <CardContent className="p-4">
          {session.highlighted && (
           <Badge className="mb-2 bg-primary/10 text-primary">✦ AI tailored</Badge>
          )}
          <p className="mb-1 font-medium text-foreground">{session.name}</p>
          <p className="mb-4 text-sm text-muted-foreground">{session.description}</p>
          <Button size="sm" className="w-full gap-2">
           <Play className="h-4 w-4" />
           Start Session
          </Button>
         </CardContent>
        </Card>
       ))}
      </div>
     </div>

     {/* Past Sessions */}
     <div>
      <h2 className="mb-4 text-lg font-medium text-foreground">Past Sessions</h2>
      <div className="space-y-4">
       {pastSessions.map((session) => (
        <Card key={session.id} className="border-border/60">
         <CardContent className="p-4">
          <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
            <div>
             <p className="font-medium text-foreground">{session.type}</p>
             <p className="text-sm text-muted-foreground">
              {session.date} · {session.duration}
             </p>
            </div>
           </div>
           <div className="flex items-center gap-4">
            <Badge
             className={
              session.score >= 85
               ? "bg-green-500/10 text-green-500"
               : session.score >= 70
               ? "bg-amber-500/10 text-amber-500"
               : "bg-red-500/10 text-red-500"
             }
            >
             {session.score}/100
            </Badge>
            <Button
             variant="outline"
             size="sm"
             onClick={() =>
              setExpandedFeedback(
               expandedFeedback === session.id ? null : session.id
              )
             }
            >
             Review Feedback
             {expandedFeedback === session.id ? (
              <ChevronUp className="ml-2 h-4 w-4" />
             ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
             )}
            </Button>
           </div>
          </div>
          {expandedFeedback === session.id && (
           <div className="mt-4 border-t border-border pt-4">
            <div className="space-y-3">
             <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
              <p className="text-sm text-foreground">
               Strong use of STAR method in leadership question
              </p>
             </div>
             <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
              <p className="text-sm text-foreground">
               Good quantification of impact (mentioned 34% improvement)
              </p>
             </div>
             <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
              <p className="text-sm text-foreground">
               Clear and concise communication style
              </p>
             </div>
             <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
              <p className="text-sm text-foreground">
               Consider adding more detail about cross-functional collaboration
              </p>
             </div>
             <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
              <p className="text-sm text-foreground">
               Could strengthen &quot;biggest weakness&quot; response with more specific growth examples
              </p>
             </div>
            </div>
            <div className="mt-4 rounded-lg bg-primary/5 p-3">
             <p className="text-sm text-primary">
              ✦ You are ready for behavioural rounds. Recommend one more technical session before your Stripe interview.
             </p>
            </div>
           </div>
          )}
         </CardContent>
        </Card>
       ))}
      </div>
     </div>
    </TabsContent>

    {/* Cover Letters Tab */}
    <TabsContent value="coverletters">
     {/* Generate New Button */}
     <div className="mb-6">
      <Dialog open={generateModalOpen} onOpenChange={setGenerateModalOpen}>
       <DialogTrigger asChild>
        <Button className="gap-2">
         <Sparkles className="h-4 w-4" />
         Generate New Cover Letter
        </Button>
       </DialogTrigger>
       <DialogContent>
        <DialogHeader>
         <DialogTitle>Generate Cover Letter</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
         <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
           Select target role
          </label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
           <SelectTrigger>
            <SelectValue placeholder="Choose a role..." />
           </SelectTrigger>
           <SelectContent>
            {availableRoles.map((role) => (
             <SelectItem key={role.id} value={role.id}>
              {role.label}
             </SelectItem>
            ))}
           </SelectContent>
          </Select>
         </div>
         <Button className="w-full" disabled={!selectedRole}>
          Generate
         </Button>
        </div>
       </DialogContent>
      </Dialog>
     </div>

     {/* Cover Letter List */}
     <div className="space-y-4">
      {coverLetters.map((letter) => (
       <Card key={letter.id} className="border-border/60">
        <CardContent className="p-4">
         <div className="flex items-center justify-between">
          <div>
           <p className="font-medium text-foreground">{letter.role}</p>
           <p className="text-sm text-muted-foreground">
            {letter.company} · Generated {letter.date}
           </p>
          </div>
          <div className="flex items-center gap-2">
           <Dialog>
            <DialogTrigger asChild>
             <Button variant="outline" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
             </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
             <DialogHeader>
              <DialogTitle>Cover Letter — {letter.role} at {letter.company}</DialogTitle>
             </DialogHeader>
             <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-white p-6 text-slate-900">
              <p className="mb-4">Dear Hiring Manager,</p>
              <p className="mb-4">
               I am writing to express my interest in the {letter.role} position at {letter.company}. With over 3 years of experience in data analytics and a clear trajectory toward data science, I am excited about the opportunity to contribute to your team&apos;s mission.
              </p>
              <p className="mb-4">
               In my current role at TechCorp Malaysia, I have built machine learning models that improved customer churn prediction by 34% and developed automated pipelines processing over 2 million records daily. My work has directly influenced business decisions and I am eager to bring this impact-driven approach to {letter.company}.
              </p>
              <p className="mb-4">
               What excites me most about {letter.company} is your commitment to data-driven product development. I have followed your engineering blog and was particularly impressed by your recent work on real-time analytics infrastructure.
              </p>
              <p className="mb-4">
               I would welcome the opportunity to discuss how my skills and trajectory align with your team&apos;s needs. Thank you for considering my application.
              </p>
              <p>Best regards,</p>
              <p>Alex Chen</p>
             </div>
            </DialogContent>
           </Dialog>
           <Button variant="outline" size="sm" className="gap-2">
            <Copy className="h-4 w-4" />
            Copy
           </Button>
           <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Regenerate
           </Button>
          </div>
         </div>
        </CardContent>
       </Card>
      ))}
     </div>
    </TabsContent>
   </Tabs>
  </div>
 )
}
