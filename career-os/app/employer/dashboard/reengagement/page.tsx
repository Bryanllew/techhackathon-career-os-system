"use client"

import { useState } from "react"
import { Users, TrendingUp, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
 DialogFooter,
} from "@/components/ui/dialog"

const readyNowCandidates = [
 {
  id: "d",
  name: "Candidate D",
  previousRole: "Junior Data Analyst",
  declinedDate: "Jan 2024",
  currentTrajectory: "Mid-level to Senior Data Scientist path",
  alignmentLabel: "Strong",
  alignmentColor: "bg-green-500/20 text-green-400",
  rationale: "Their trajectory has accelerated significantly since they last applied — they may now be ready for the senior role.",
  messageTemplate: "Hi [Name], it has been a while since we spoke. We have a Senior Data Scientist role open that we think aligns well with where your career is heading. Would you be open to a quick conversation?",
 },
 {
  id: "e",
  name: "Candidate E",
  previousRole: "Product Manager",
  declinedDate: "Withdrew mid-process",
  currentTrajectory: "Senior PM to Product Lead path",
  alignmentLabel: "Good",
  alignmentColor: "bg-primary/20 text-primary",
  rationale: "Withdrew due to timing — their situation and seniority have likely shifted since then.",
  messageTemplate: "Hi [Name], I hope you have been well! We have a new Senior Product Manager opportunity that might be a better fit for where you are now. Would you be interested in reconnecting?",
 },
]

const stayWarmCandidates = [
 {
  id: "f",
  name: "Candidate F",
  roleApplied: "Data Engineer",
  lastContact: "Oct 2023",
  checkInMessage: "Hi [Name], just checking in to see how things are going. We enjoyed meeting you earlier this year and wanted to stay in touch. No pressure — just keeping the door open!",
 },
 {
  id: "g",
  name: "Candidate G",
  roleApplied: "Frontend Developer",
  lastContact: "Aug 2023",
  checkInMessage: "Hi [Name], hope all is well! We have some interesting projects coming up and thought of you. Let us know if you would ever like to chat again.",
 },
 {
  id: "h",
  name: "Candidate H",
  roleApplied: "Analytics Lead",
  lastContact: "Nov 2023",
  checkInMessage: "Hi [Name], it has been a few months since we last connected. Just wanted to reach out and see how your new role is treating you. Always happy to reconnect!",
 },
]

export default function ReEngagementPage() {
 const [openDialogId, setOpenDialogId] = useState<string | null>(null)
 const [messageContent, setMessageContent] = useState<Record<string, string>>({})

 const getMessageContent = (id: string, template: string) => {
  return messageContent[id] ?? template
 }

 const setMessage = (id: string, content: string) => {
  setMessageContent((prev) => ({ ...prev, [id]: content }))
 }

 return (
  <div className="min-h-screen p-8">
   {/* Header */}
   <div className="mb-8">
    <h1 className="text-2xl font-semibold text-foreground">Talent Re-Engagement</h1>
    <p className="text-muted-foreground">
     Candidates who weren&apos;t right before — but might be now. Keep the relationship alive without starting from scratch.
    </p>
   </div>

   {/* Summary Strip */}
   <div className="mb-8 grid grid-cols-3 gap-4">
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
       <Users className="h-6 w-6 text-primary" />
      </div>
      <div>
       <p className="text-2xl font-semibold text-foreground">12</p>
       <p className="text-sm text-muted-foreground">past candidates in your pipeline</p>
      </div>
     </CardContent>
    </Card>
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
       <TrendingUp className="h-6 w-6 text-green-400" />
      </div>
      <div>
       <p className="text-2xl font-semibold text-foreground">3</p>
       <p className="text-sm text-muted-foreground">now align more closely with open roles</p>
      </div>
     </CardContent>
    </Card>
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
       <Clock className="h-6 w-6 text-amber-400" />
      </div>
      <div>
       <p className="text-2xl font-semibold text-foreground">1</p>
       <p className="text-sm text-muted-foreground">candidate recently promoted — may now be ready for a senior role</p>
      </div>
     </CardContent>
    </Card>
   </div>

   {/* Ready Now Section */}
   <div className="mb-8">
    <h2 className="mb-4 text-lg font-semibold text-foreground">Ready Now</h2>
    <div className="grid grid-cols-2 gap-4">
     {readyNowCandidates.map((candidate) => (
      <Card key={candidate.id} className="border-border/60 bg-card/50">
       <CardHeader>
        <div className="flex items-start justify-between">
         <div>
          <CardTitle className="text-base font-semibold">{candidate.name}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
           Previously applied for: {candidate.previousRole}
          </p>
          <p className="text-sm text-muted-foreground">
           {candidate.declinedDate.includes("Withdrew") ? candidate.declinedDate : `Declined: ${candidate.declinedDate}`}
          </p>
         </div>
         <Badge className={`${candidate.alignmentColor} border-0`}>
          Trajectory Alignment: {candidate.alignmentLabel}
         </Badge>
        </div>
       </CardHeader>
       <CardContent>
        <p className="mb-2 text-sm text-muted-foreground">
         Current trajectory: {candidate.currentTrajectory}
        </p>
        <p className="mb-4 text-sm text-muted-foreground">{candidate.rationale}</p>
        <div className="flex gap-2">
         <Button variant="outline" size="sm">
          View updated profile
         </Button>
         <Dialog open={openDialogId === candidate.id} onOpenChange={(open) => setOpenDialogId(open ? candidate.id : null)}>
          <DialogTrigger asChild>
           <Button size="sm">Send re-engagement message</Button>
          </DialogTrigger>
          <DialogContent>
           <DialogHeader>
            <DialogTitle>Re-engage with {candidate.name}</DialogTitle>
            <DialogDescription>
             Edit the message below before sending.
            </DialogDescription>
           </DialogHeader>
           <Textarea
            value={getMessageContent(candidate.id, candidate.messageTemplate)}
            onChange={(e) => setMessage(candidate.id, e.target.value)}
            className="min-h-[150px]"
           />
           <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialogId(null)}>
             Cancel
            </Button>
            <Button onClick={() => setOpenDialogId(null)}>
             Send
            </Button>
           </DialogFooter>
          </DialogContent>
         </Dialog>
        </div>
       </CardContent>
      </Card>
     ))}
    </div>
   </div>

   {/* Stay Warm Section */}
   <div className="mb-8">
    <div className="mb-4 flex items-center gap-2">
     <h2 className="text-lg font-semibold text-foreground">Stay Warm</h2>
     <Heart className="h-4 w-4 text-muted-foreground" />
    </div>
    <p className="mb-4 text-sm italic text-muted-foreground">
     These candidates opted in to occasional contact. Career OS keeps the connection light — one message per quarter maximum.
    </p>
    <div className="space-y-3">
     {stayWarmCandidates.map((candidate) => (
      <Card key={candidate.id} className="border-border/60 bg-card/50">
       <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
         <div>
          <p className="font-medium text-foreground">{candidate.name}</p>
          <p className="text-sm text-muted-foreground">
           Applied for: {candidate.roleApplied}
          </p>
         </div>
         <p className="text-sm text-muted-foreground">
          Last contact: {candidate.lastContact}
         </p>
        </div>
        <Dialog open={openDialogId === candidate.id} onOpenChange={(open) => setOpenDialogId(open ? candidate.id : null)}>
         <DialogTrigger asChild>
          <Button variant="outline" size="sm">
           Send a check-in
          </Button>
         </DialogTrigger>
         <DialogContent>
          <DialogHeader>
           <DialogTitle>Check in with {candidate.name}</DialogTitle>
           <DialogDescription>
            A brief message to keep the connection warm.
           </DialogDescription>
          </DialogHeader>
          <Textarea
           value={getMessageContent(candidate.id, candidate.checkInMessage)}
           onChange={(e) => setMessage(candidate.id, e.target.value)}
           className="min-h-[120px]"
          />
          <DialogFooter>
           <Button variant="outline" onClick={() => setOpenDialogId(null)}>
            Cancel
           </Button>
           <Button onClick={() => setOpenDialogId(null)}>
            Send
           </Button>
          </DialogFooter>
         </DialogContent>
        </Dialog>
       </CardContent>
      </Card>
     ))}
    </div>
   </div>

   {/* Disclaimer Card */}
   <Card className="border-border/60 bg-muted/30">
    <CardContent className="p-4">
     <p className="text-sm text-muted-foreground">
      <span className="text-primary">✦</span> Talent Re-Engagement only contacts candidates who have opted in. All messages go through Career OS so candidates can manage their preferences at any time.
     </p>
    </CardContent>
   </Card>
  </div>
 )
}
