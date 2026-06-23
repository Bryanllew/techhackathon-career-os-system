"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, BookOpen, Briefcase, GraduationCap, Heart, Plane, Clock } from "lucide-react"

type ChapterType = "work" | "study" | "family" | "rest" | "travel"

const chapterMeta: Record<ChapterType, { label: string; icon: React.ElementType; color: string; bg: string }> = {
 work: { label: "Work Phase", icon: Briefcase, color: "text-primary", bg: "bg-primary/10" },
 study: { label: "Study / Upskill", icon: GraduationCap, color: "text-[#5856D6]", bg: "bg-[#5856D6]/10" },
 family: { label: "Family / Care", icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
 rest: { label: "Rest / Recovery", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
 travel: { label: "Travel / Explore", icon: Plane, color: "text-cyan-500", bg: "bg-cyan-500/10" },
}

const careerImpact: Record<ChapterType, string> = {
 work: "Full career momentum. Best time to target promotions or role switches.",
 study: "Short pause from career growth — significant skill gains that pay off long-term.",
 family: "Career may slow, but re-entry is very common. Skills stay relevant if the break is under 2-3 years.",
 rest: "Short breaks rarely affect career prospects. Longer breaks need a strong re-entry narrative.",
 travel: "Treated similarly to a rest break. International experience can be a differentiator.",
}

type Chapter = {
 id: string
 type: ChapterType
 startYear: number
 durationYears: number
 goal: string
}

const defaultChapters: Chapter[] = [
 { id: "1", type: "work", startYear: 2022, durationYears: 2, goal: "Build 3 years of data experience at TechCorp." },
 { id: "2", type: "study", startYear: 2024, durationYears: 1, goal: "Complete a part-time ML certification while working." },
 { id: "3", type: "work", startYear: 2025, durationYears: 3, goal: "Move into a senior data science role." },
]

const currentYear = 2026

export default function ChaptersPage() {
 const [chapters, setChapters] = useState<Chapter[]>(defaultChapters)
 const [open, setOpen] = useState(false)
 const [form, setForm] = useState({ type: "work" as ChapterType, startYear: String(currentYear), durationYears: "1", goal: "" })

 const handleAdd = () => {
  const chapter: Chapter = {
   id: Date.now().toString(),
   type: form.type,
   startYear: parseInt(form.startYear),
   durationYears: parseInt(form.durationYears),
   goal: form.goal,
  }
  const sorted = [...chapters, chapter].sort((a, b) => a.startYear - b.startYear)
  setChapters(sorted)
  setForm({ type: "work", startYear: String(currentYear), durationYears: "1", goal: "" })
  setOpen(false)
 }

 const handleDelete = (id: string) => setChapters(chapters.filter((c) => c.id !== id))

 const timelineStart = Math.min(...chapters.map((c) => c.startYear), currentYear)
 const timelineEnd = Math.max(...chapters.map((c) => c.startYear + c.durationYears), currentYear + 5)
 const totalYears = timelineEnd - timelineStart

 return (
  <div className="min-h-screen p-8">
   <div className="mb-8 flex items-start justify-between">
    <div>
     <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground mb-1">Life Chapter Designer</h1>
     <p className="text-sm text-foreground-secondary">
      Plan your career around life's natural pauses — not against them.
     </p>
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger asChild>
      <Button className="gap-2"><Plus className="h-4 w-4" /> Add Chapter</Button>
     </DialogTrigger>
     <DialogContent>
      <DialogHeader><DialogTitle>Add a Life Chapter</DialogTitle></DialogHeader>
      <div className="space-y-3 pt-2">
       <div>
        <label className="text-xs text-foreground-tertiary mb-1 block">Chapter type</label>
        <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as ChapterType })}>
         <SelectTrigger><SelectValue /></SelectTrigger>
         <SelectContent>
          {(Object.keys(chapterMeta) as ChapterType[]).map((t) => (
           <SelectItem key={t} value={t}>{chapterMeta[t].label}</SelectItem>
          ))}
         </SelectContent>
        </Select>
       </div>
       <div className="grid grid-cols-2 gap-3">
        <div>
         <label className="text-xs text-foreground-tertiary mb-1 block">Start year</label>
         <Input type="number" value={form.startYear} onChange={(e) => setForm({ ...form, startYear: e.target.value })} />
        </div>
        <div>
         <label className="text-xs text-foreground-tertiary mb-1 block">Duration (years)</label>
         <Input type="number" min="1" max="10" value={form.durationYears} onChange={(e) => setForm({ ...form, durationYears: e.target.value })} />
        </div>
       </div>
       <div>
        <label className="text-xs text-foreground-tertiary mb-1 block">Goal for this chapter</label>
        <Textarea placeholder="What do you want to achieve or experience?" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} className="min-h-[70px]" />
       </div>
       <Button className="w-full" onClick={handleAdd}>Save Chapter</Button>
      </div>
     </DialogContent>
    </Dialog>
   </div>

   {/* 时间轴 */}
   <div className="mb-8 overflow-x-auto">
    <div className="min-w-[600px] relative mb-2">
     <div className="flex justify-between text-xs text-foreground-tertiary mb-2">
      {Array.from({ length: totalYears + 1 }, (_, i) => (
       <span key={i} style={{ position: "absolute", left: `${(i / totalYears) * 100}%` }}>
        {timelineStart + i}
       </span>
      ))}
     </div>
     <div className="relative h-12 mt-5 rounded-xl overflow-hidden bg-secondary">
      {/* 现在标记 */}
      <div
       className="absolute top-0 bottom-0 w-0.5 bg-white/60 z-10"
       style={{ left: `${((currentYear - timelineStart) / totalYears) * 100}%` }}
      />
      {chapters.map((ch) => {
       const meta = chapterMeta[ch.type]
       const left = ((ch.startYear - timelineStart) / totalYears) * 100
       const width = (ch.durationYears / totalYears) * 100
       return (
        <div
         key={ch.id}
         className={`absolute top-0 bottom-0 flex items-center justify-center text-xs font-medium opacity-90 ${meta.bg} ${meta.color}`}
         style={{ left: `${left}%`, width: `${width}%` }}
        >
         <span className="truncate px-1">{chapterMeta[ch.type].label}</span>
        </div>
       )
      })}
     </div>
     <p className="text-[10px] text-foreground-tertiary mt-1 text-right">▲ Now ({currentYear})</p>
    </div>
   </div>

   {/* 章节列表 */}
   <div className="space-y-4">
    {chapters.sort((a, b) => a.startYear - b.startYear).map((ch) => {
     const meta = chapterMeta[ch.type]
     const Icon = meta.icon
     const isNow = ch.startYear <= currentYear && ch.startYear + ch.durationYears > currentYear
     return (
      <Card key={ch.id} className={isNow ? "border-primary/40" : ""}>
       <CardContent className="p-5">
        <div className="flex items-start justify-between">
         <div className="flex items-start gap-3">
          <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.bg}`}>
           <Icon className={`h-4.5 w-4.5 ${meta.color}`} />
          </div>
          <div>
           <div className="flex items-center gap-2 mb-0.5">
            <p className="font-medium text-foreground">{meta.label}</p>
            {isNow && <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Current</Badge>}
           </div>
           <p className="text-xs text-foreground-tertiary mb-2">
            {ch.startYear} – {ch.startYear + ch.durationYears} · {ch.durationYears} {ch.durationYears === 1 ? "year" : "years"}
           </p>
           {ch.goal && <p className="text-sm text-foreground-secondary">{ch.goal}</p>}
           <p className="mt-2 text-xs text-foreground-tertiary italic">{careerImpact[ch.type]}</p>
          </div>
         </div>
         <button onClick={() => handleDelete(ch.id)} className="text-foreground-tertiary hover:text-foreground">
          <Trash2 className="h-4 w-4" />
         </button>
        </div>
       </CardContent>
      </Card>
     )
    })}
   </div>
  </div>
 )
}
