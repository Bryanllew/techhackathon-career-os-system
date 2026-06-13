import Link from "next/link"
import { Briefcase, Users, Eye, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const roles = [
 {
  id: 1,
  title: "Senior Data Scientist",
  department: "Data & Analytics",
  applicants: 24,
  status: "Active" as const,
  postedDate: "Jan 10, 2024",
 },
 {
  id: 2,
  title: "Product Manager",
  department: "Product",
  applicants: 18,
  status: "Active" as const,
  postedDate: "Jan 8, 2024",
 },
 {
  id: 3,
  title: "Backend Engineer",
  department: "Engineering",
  applicants: 32,
  status: "Paused" as const,
  postedDate: "Dec 15, 2023",
 },
]

export default function ActiveRolesPage() {
 return (
  <div className="min-h-screen p-8">
   {/* Header */}
   <div className="mb-8 flex items-center justify-between">
    <div>
     <h1 className="text-2xl font-semibold text-foreground">Active Roles</h1>
     <p className="text-muted-foreground">
      Manage your job postings and view applicants.
     </p>
    </div>
    <Button>Post New Role</Button>
   </div>

   {/* Stats */}
   <div className="mb-8 grid gap-4 md:grid-cols-3">
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
       <Briefcase className="h-6 w-6 text-primary" />
      </div>
      <div>
       <p className="text-2xl font-semibold text-foreground">3</p>
       <p className="text-sm text-muted-foreground">Total Roles</p>
      </div>
     </CardContent>
    </Card>
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
       <Play className="h-6 w-6 text-emerald-400" />
      </div>
      <div>
       <p className="text-2xl font-semibold text-foreground">2</p>
       <p className="text-sm text-muted-foreground">Active</p>
      </div>
     </CardContent>
    </Card>
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
       <Users className="h-6 w-6 text-amber-400" />
      </div>
      <div>
       <p className="text-2xl font-semibold text-foreground">74</p>
       <p className="text-sm text-muted-foreground">Total Applicants</p>
      </div>
     </CardContent>
    </Card>
   </div>

   {/* Role Cards */}
   <div className="grid gap-4">
    {roles.map((role) => (
     <Card
      key={role.id}
      className="transition-colors hover:border-primary/50"
     >
      <CardContent className="p-6">
       <div className="flex items-start justify-between">
        <div className="flex-1">
         <div className="mb-2 flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
          <Badge
           variant="secondary"
           className={
            role.status === "Active"
             ? "bg-emerald-500/10 text-emerald-400"
             : "bg-amber-500/10 text-amber-400"
           }
          >
           {role.status === "Active" ? (
            <Play className="mr-1 h-3 w-3" />
           ) : (
            <Pause className="mr-1 h-3 w-3" />
           )}
           {role.status}
          </Badge>
         </div>
         <p className="mb-4 text-sm text-muted-foreground">{role.department}</p>
         <div className="flex items-center gap-6 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
           <Users className="h-4 w-4" />
           {role.applicants} applicants
          </span>
          <span className="text-muted-foreground">Posted {role.postedDate}</span>
         </div>
        </div>

        <div className="ml-6 flex gap-2">
         <Button variant="outline" size="sm" asChild>
          <Link href={`/employer/dashboard/roles/${role.id}/applicants`}>
           <Eye className="mr-2 h-4 w-4" />
           View Applicants
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
