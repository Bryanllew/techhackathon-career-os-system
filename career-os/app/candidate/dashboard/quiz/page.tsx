"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Brain, ChevronRight, RotateCcw } from "lucide-react"

type AnimalType = "wolf" | "eagle" | "dolphin" | "fox" | "bear"

const animals: Record<AnimalType, {
 emoji: string
 name: string
 tagline: string
 traits: string[]
 strengths: string[]
 blindspot: string
 careers: string[]
 color: string
}> = {
 wolf: {
  emoji: "🐺",
  name: "Wolf",
  tagline: "The Natural Leader",
  traits: ["Decisive", "Team-oriented", "Protective"],
  strengths: ["Leading teams through challenges", "Building trust quickly", "Making tough calls under pressure"],
  blindspot: "Can be impatient with slower-paced teammates",
  careers: ["Team Lead", "Project Manager", "Operations Director"],
  color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
 },
 eagle: {
  emoji: "🦅",
  name: "Eagle",
  tagline: "The Strategic Thinker",
  traits: ["Visionary", "Independent", "Analytical"],
  strengths: ["Seeing the big picture clearly", "Planning long-term strategy", "Working independently with focus"],
  blindspot: "Can overlook small but important details",
  careers: ["Strategy Analyst", "Product Director", "Management Consultant"],
  color: "bg-amber-500/15 border-amber-500/30 text-amber-400",
 },
 dolphin: {
  emoji: "🐬",
  name: "Dolphin",
  tagline: "The Connector",
  traits: ["Empathetic", "Collaborative", "Communicative"],
  strengths: ["Building relationships across teams", "Resolving conflicts with ease", "Creating inclusive environments"],
  blindspot: "May avoid conflict even when it needs to happen",
  careers: ["Customer Success", "HR Business Partner", "Sales Lead"],
  color: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
 },
 fox: {
  emoji: "🦊",
  name: "Fox",
  tagline: "The Creative Solver",
  traits: ["Adaptable", "Creative", "Curious"],
  strengths: ["Finding unexpected solutions", "Adapting fast to change", "Connecting dots others miss"],
  blindspot: "Can lose focus when too many ideas compete",
  careers: ["Consultant", "Entrepreneur", "Product Designer"],
  color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
 },
 bear: {
  emoji: "🐻",
  name: "Bear",
  tagline: "The Reliable Executor",
  traits: ["Detail-oriented", "Dependable", "Thorough"],
  strengths: ["Delivering consistent, high-quality work", "Following through on commitments", "Keeping systems running smoothly"],
  blindspot: "Can struggle when plans change unexpectedly",
  careers: ["Software Engineer", "Finance Analyst", "Operations Manager"],
  color: "bg-stone-500/15 border-stone-500/30 text-stone-400",
 },
}

const questions: { text: string; dimension: AnimalType }[] = [
 { text: "I enjoy taking on a leadership role in team settings.", dimension: "wolf" },
 { text: "When problems arise, I step up to find a solution.", dimension: "wolf" },
 { text: "Others naturally look to me for direction.", dimension: "wolf" },
 { text: "I like to analyse a lot of information before making decisions.", dimension: "eagle" },
 { text: "I prefer thinking about the bigger picture over small details.", dimension: "eagle" },
 { text: "I work best when I can operate independently.", dimension: "eagle" },
 { text: "I feel most energised when collaborating with others.", dimension: "dolphin" },
 { text: "Understanding how others feel is important to me.", dimension: "dolphin" },
 { text: "I am good at managing conflicts between people.", dimension: "dolphin" },
 { text: "I enjoy finding creative or unconventional solutions.", dimension: "fox" },
 { text: "I adapt quickly when situations change.", dimension: "fox" },
 { text: "I get curious and excited about trying new approaches.", dimension: "fox" },
 { text: "I pay very close attention to accuracy and detail.", dimension: "bear" },
 { text: "I finish one task fully before moving to the next.", dimension: "bear" },
 { text: "People can count on me to deliver what I promise.", dimension: "bear" },
]

export default function QuizPage() {
 const router = useRouter()
 const [scores, setScores] = useState<number[]>(Array(15).fill(3))
 const [submitted, setSubmitted] = useState(false)
 const [result, setResult] = useState<{ primary: AnimalType; secondary: AnimalType } | null>(null)

 const handleSlider = (index: number, value: number[]) => {
  const next = [...scores]
  next[index] = value[0]
  setScores(next)
 }

 const handleSubmit = () => {
  const totals: Record<AnimalType, number> = { wolf: 0, eagle: 0, dolphin: 0, fox: 0, bear: 0 }
  questions.forEach((q, i) => { totals[q.dimension] += scores[i] })

  const sorted = (Object.entries(totals) as [AnimalType, number][]).sort((a, b) => b[1] - a[1])
  const primary = sorted[0][0]
  const secondary = sorted[1][0]

  const resultData = { primary, secondary, completedAt: new Date().toISOString().split("T")[0] }
  localStorage.setItem("animalType", JSON.stringify(resultData))
  setResult({ primary, secondary })
  setSubmitted(true)
 }

 const handleRetake = () => {
  setScores(Array(15).fill(3))
  setSubmitted(false)
  setResult(null)
 }

 if (submitted && result) {
  const primary = animals[result.primary]
  const secondary = animals[result.secondary]
  return (
   <div className="max-w-2xl mx-auto py-8">
    <div className="text-center mb-10">
     <div className="text-7xl mb-4">{primary.emoji}</div>
     <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground mb-1">
      You are a <span className="font-semibold">{primary.name}</span>
     </h1>
     <p className="text-foreground-secondary">{primary.tagline}</p>
    </div>

    <Card className="mb-6">
     <CardContent className="p-6">
      <div className="flex gap-3 mb-5">
       {primary.traits.map((t) => (
        <Badge key={t} className={primary.color}>{t}</Badge>
       ))}
      </div>
      <div className="mb-5">
       <p className="text-section-label mb-2">Your Strengths</p>
       <ul className="space-y-1.5">
        {primary.strengths.map((s) => (
         <li key={s} className="flex items-start gap-2 text-sm text-foreground-secondary">
          <span className="text-primary mt-0.5">✓</span>{s}
         </li>
        ))}
       </ul>
      </div>
      <div className="mb-5">
       <p className="text-section-label mb-2">Watch Out For</p>
       <p className="text-sm text-foreground-secondary">{primary.blindspot}</p>
      </div>
      <div>
       <p className="text-section-label mb-2">Roles That Fit You</p>
       <div className="flex gap-2 flex-wrap">
        {primary.careers.map((c) => (
         <Badge key={c} variant="secondary">{c}</Badge>
        ))}
       </div>
      </div>
     </CardContent>
    </Card>

    <Card className="mb-8">
     <CardContent className="p-5">
      <p className="text-section-label mb-2">Secondary Type</p>
      <div className="flex items-center gap-3">
       <span className="text-2xl">{secondary.emoji}</span>
       <div>
        <p className="text-sm font-medium text-foreground">
         You also have {secondary.name} qualities — {secondary.tagline.toLowerCase()}
        </p>
        <div className="flex gap-2 mt-1">
         {secondary.traits.map((t) => (
          <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
         ))}
        </div>
       </div>
      </div>
     </CardContent>
    </Card>

    <div className="flex gap-3">
     <Button className="flex-1" onClick={() => router.push("/candidate/dashboard/jobs")}>
      See Jobs That Fit You
      <ChevronRight className="h-4 w-4 ml-1" />
     </Button>
     <Button variant="outline" onClick={handleRetake}>
      <RotateCcw className="h-4 w-4 mr-1" />
      Retake Quiz
     </Button>
    </div>
   </div>
  )
 }

 const progress = Math.round((scores.filter(s => s !== 3).length / 15) * 100)

 return (
  <div className="max-w-2xl mx-auto py-8">
   <div className="mb-8">
    <div className="flex items-center gap-2 mb-2">
     <Brain className="h-5 w-5 text-primary" />
     <p className="text-section-label">Personality Quiz</p>
    </div>
    <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground mb-2">
     What is your work animal type?
    </h1>
    <p className="text-foreground-secondary text-sm">
     Rate how much each statement sounds like you. Takes about 3 minutes.
    </p>
    <div className="mt-4">
     <div className="flex justify-between text-xs text-foreground-tertiary mb-1.5">
      <span>Progress</span>
      <span>{Math.round((scores.filter(s => s !== 3).length / 15) * 100)}%</span>
     </div>
     <Progress value={progress} className="h-1.5" />
    </div>
   </div>

   <div className="space-y-5">
    {questions.map((q, i) => {
     return (
      <div key={i}>
       <Card>
        <CardContent className="p-5">
         <p className="text-sm text-foreground mb-4">{q.text}</p>
         <div className="px-1">
          <Slider
           min={1}
           max={5}
           step={1}
           value={[scores[i]]}
           onValueChange={(val) => handleSlider(i, val)}
           className="mb-3"
          />
          <div className="flex justify-between text-[10px] text-foreground-tertiary">
           <span>Not like me at all</span>
           <span className="font-medium text-foreground">{scores[i]} / 5</span>
           <span>Very much like me</span>
          </div>
         </div>
        </CardContent>
       </Card>
      </div>
     )
    })}
   </div>

   <div className="mt-8">
    <Button className="w-full" size="lg" onClick={handleSubmit}>
     See My Animal Type
     <ChevronRight className="h-4 w-4 ml-1" />
    </Button>
   </div>
  </div>
 )
}
