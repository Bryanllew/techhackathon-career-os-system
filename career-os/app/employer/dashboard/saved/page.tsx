import Link from "next/link"
import { ArrowRight, TrendingUp, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const savedCandidates = [
 {
  id: "a",
  name: "Candidate A",
  currentRole: "Senior Data Analyst",
  trajectoryDirection: "Moving from analytics → data science leadership",
  skills: ["Python", "SQL", "Machine Learning", "Team Leadership"],
  trajectoryFit: 94,
  savedDate: "Jan 12, 2024",
 },
 {
  id: "c",
  name: "Candidate C",
  currentRole: "Product Manager",
  trajectoryDirection: "Moving from PM → product leadership",
  skills: ["Strategy", "Analytics", "User Research", "Roadmapping"],
  trajectoryFit: 86,
  savedDate: "Jan 8, 2024",
 },
]

export default function SavedCandidatesPage() {
 return (
  <div className="min-h-screen p-8">
   {/* Header */}
   <div className="mb-8">
    <h1 className="text-2xl font-semibold text-foreground">Saved Candidates</h1>
    <p className="text-muted-foreground">
     Candidates you&apos;ve bookmarked for later review.
    </p>
   </div>

   {/* Stats */}
   <Card className="mb-8 border-border/60 bg-card/50">
    <CardContent className="flex items-center gap-4 p-6">
     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
      <Bookmark className="h-6 w-6 text-primary" />
     </div>
     <div>
      <p className="text-2xl font-semibold text-foreground">{savedCandidates.length}</p>
      <p className="text-sm text-muted-foreground">Saved Candidates</p>
     </div>
    </CardContent>
   </Card>

   {/* Candidate Cards */}
   <div className="grid gap-4">
    {savedCandidates.map((candidate) => (
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
           <h3 className="font-semibold text-foreground">{candidate.name}</h3>
           <p className="text-sm text-muted-foreground">{candidate.currentRole}</p>
          </div>
         </div>

         <div className="mb-4 flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{candidate.trajectoryDirection}</span>
         </div>

         <div className="flex flex-wrap gap-2">
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

         <p className="mt-4 text-xs text-muted-foreground">Saved on {candidate.savedDate}</p>
        </div>

        <div className="ml-6 flex flex-col items-end gap-3">
         <div className="text-right">
          <p className="text-sm text-muted-foreground">Trajectory fit</p>
          <p className="text-2xl font-semibold text-primary">{candidate.trajectoryFit}%</p>
         </div>
         <Button variant="outline" size="sm" asChild>
          <Link href={`/employer/dashboard/candidate/${candidate.id}`}>
           View Profile
           <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
         </Button>
        </div>
       </div>
      </CardContent>
     </Card>
    ))}
   </div>
  </div>
 )
}
