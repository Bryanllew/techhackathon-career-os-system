"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trophy, Plus, Trash2, Sparkles, X } from "lucide-react"

type Entry = {
 id: string
 project: string
 whatIDid: string
 result: string
 skills: string[]
}

const defaultEntries: Entry[] = [
 {
  id: "1",
  project: "Customer Churn Dashboard",
  whatIDid: "Built a real-time churn prediction dashboard for the marketing team using Python and Tableau.",
  result: "Reduced churn rate by 12% over 3 months. Adopted by 4 teams company-wide.",
  skills: ["Python", "Tableau", "Machine Learning", "SQL"],
 },
 {
  id: "2",
  project: "Sales Data Pipeline Migration",
  whatIDid: "Led the migration of legacy Excel reports to an automated SQL pipeline, reducing manual work.",
  result: "Saved 8 hours per week in manual reporting. Zero errors in the first 6 months post-launch.",
  skills: ["SQL", "Excel", "Data Engineering"],
 },
]

const resumeSnippet = (e: Entry) =>
 `• ${e.project}: ${e.whatIDid.split(".")[0]}. ${e.result.split(".")[0]}. Skills: ${e.skills.join(", ")}.`

export default function PortfolioPage() {
 const [entries, setEntries] = useState<Entry[]>(defaultEntries)
 const [open, setOpen] = useState(false)
 const [snippetId, setSnippetId] = useState<string | null>(null)

 const [form, setForm] = useState({ project: "", whatIDid: "", result: "", skills: "" })

 const handleAdd = () => {
  if (!form.project.trim()) return
  const entry: Entry = {
   id: Date.now().toString(),
   project: form.project,
   whatIDid: form.whatIDid,
   result: form.result,
   skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
  }
  setEntries([entry, ...entries])
  setForm({ project: "", whatIDid: "", result: "", skills: "" })
  setOpen(false)
 }

 const handleDelete = (id: string) => setEntries(entries.filter((e) => e.id !== id))

 return (
  <div className="min-h-screen p-8">
   <div className="mb-8 flex items-start justify-between">
    <div>
     <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground mb-1">Living Portfolio</h1>
     <p className="text-sm text-foreground-secondary">
      A running record of what you actually did — ready when you need it.
     </p>
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger asChild>
      <Button className="gap-2">
       <Plus className="h-4 w-4" /> Add Achievement
      </Button>
     </DialogTrigger>
     <DialogContent>
      <DialogHeader>
       <DialogTitle>Add an Achievement</DialogTitle>
      </DialogHeader>
      <div className="space-y-3 pt-2">
       <div>
        <label className="text-xs text-foreground-tertiary mb-1 block">Project or task name</label>
        <Input placeholder="e.g. Customer Churn Dashboard" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
       </div>
       <div>
        <label className="text-xs text-foreground-tertiary mb-1 block">What you did</label>
        <Textarea placeholder="Describe what you specifically did..." value={form.whatIDid} onChange={(e) => setForm({ ...form, whatIDid: e.target.value })} className="min-h-[80px]" />
       </div>
       <div>
        <label className="text-xs text-foreground-tertiary mb-1 block">Result or impact</label>
        <Textarea placeholder="What changed because of your work?" value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} className="min-h-[60px]" />
       </div>
       <div>
        <label className="text-xs text-foreground-tertiary mb-1 block">Skills used (comma separated)</label>
        <Input placeholder="Python, SQL, Tableau" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
       </div>
       <Button className="w-full" onClick={handleAdd} disabled={!form.project.trim()}>Save Achievement</Button>
      </div>
     </DialogContent>
    </Dialog>
   </div>

   {entries.length === 0 ? (
    <div className="py-24 text-center">
     <Trophy className="h-10 w-10 text-foreground-tertiary mx-auto mb-3" />
     <p className="text-foreground-secondary text-sm">No achievements yet. Add your first one!</p>
    </div>
   ) : (
    <div className="space-y-4">
     {entries.map((entry) => (
      <Card key={entry.id}>
       <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
         <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary flex-shrink-0" />
          <h3 className="font-medium text-foreground">{entry.project}</h3>
         </div>
         <button onClick={() => handleDelete(entry.id)} className="text-foreground-tertiary hover:text-foreground transition-colors">
          <Trash2 className="h-4 w-4" />
         </button>
        </div>
        <p className="text-sm text-foreground-secondary mb-2">{entry.whatIDid}</p>
        <p className="text-sm text-foreground mb-3">
         <span className="text-primary font-medium">Result:</span> {entry.result}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
         {entry.skills.map((s) => (
          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
         ))}
        </div>
        <Dialog>
         <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => setSnippetId(entry.id)}>
           <Sparkles className="h-3.5 w-3.5" /> Generate Resume Snippet
          </Button>
         </DialogTrigger>
         <DialogContent>
          <DialogHeader>
           <DialogTitle>Resume Snippet</DialogTitle>
          </DialogHeader>
          <div className="mt-2 rounded-lg bg-card border border-card-border p-4 text-sm text-foreground font-mono whitespace-pre-wrap">
           {resumeSnippet(entry)}
          </div>
          <Button size="sm" className="mt-2 gap-1.5">
           <Trophy className="h-3.5 w-3.5" /> Copy to Clipboard
          </Button>
         </DialogContent>
        </Dialog>
       </CardContent>
      </Card>
     ))}
    </div>
   )}
  </div>
 )
}
