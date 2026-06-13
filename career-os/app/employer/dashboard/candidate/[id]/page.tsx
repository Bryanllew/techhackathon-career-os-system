import Link from "next/link"
import {
 ArrowLeft,
 ArrowRight,
 Bookmark,
 MessageSquare,
 TrendingUp,
 Briefcase,
 Calendar,
 Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const candidateData = {
 a: {
  name: "Candidate A",
  currentRole: "Senior Data Analyst",
  trajectoryDirection: "Moving from analytics → data science leadership",
  trajectoryFit: 94,
  skills: {
   technical: ["Python", "SQL", "R", "Machine Learning", "TensorFlow"],
   analytical: ["Statistical Modeling", "A/B Testing", "Data Visualization"],
   leadership: ["Team Mentoring", "Stakeholder Management", "Project Planning"],
  },
  workHistory: [
   {
    role: "Senior Data Analyst",
    company: "TechCorp Inc.",
    period: "2022 - Present",
    description:
     "Leading data initiatives and mentoring junior analysts. Built ML models that improved conversion rates by 23%.",
   },
   {
    role: "Data Analyst",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description:
     "Developed dashboards and analytics pipelines. Collaborated with product teams on data-driven decisions.",
   },
   {
    role: "Junior Analyst",
    company: "Consulting Partners",
    period: "2018 - 2020",
    description:
     "Started career in business analytics. Gained foundation in SQL, Python, and statistical analysis.",
   },
  ],
  whyTheyFit:
   "This candidate shows a clear and deliberate trajectory from analytical roles toward data science leadership. Their progression from junior analyst to senior analyst with increasing ML responsibilities mirrors the exact growth pattern your team needs. With proven experience in mentoring and stakeholder management, they're positioned to contribute immediately while growing into a leadership role. Candidates with similar trajectories have shown 85% retention rates in comparable positions.",
  whatThisRoleSetsUpNext:
   "Joining as Senior Data Scientist would position this candidate to move into a Data Science Lead or Head of Analytics role within 18–24 months — which aligns exactly with where their trajectory is already pointing.",
  fiveToTenYearArc:
   "Based on this trajectory, candidates with this profile typically reach Director of Data Science within 7–10 years. Early investment in their ML skills now accelerates that arc significantly.",
 },
 b: {
  name: "Candidate B",
  currentRole: "Backend Engineer",
  trajectoryDirection: "Moving from backend → platform engineering",
  trajectoryFit: 89,
  skills: {
   technical: ["Go", "Python", "Kubernetes", "Docker", "AWS"],
   analytical: ["System Design", "Performance Optimization", "Monitoring"],
   leadership: ["Code Review", "Technical Documentation", "Architecture Decisions"],
  },
  workHistory: [
   {
    role: "Backend Engineer",
    company: "ScaleUp Co.",
    period: "2021 - Present",
    description:
     "Building and maintaining high-throughput microservices. Led migration to Kubernetes infrastructure.",
   },
   {
    role: "Software Engineer",
    company: "FinTech Solutions",
    period: "2019 - 2021",
    description:
     "Developed payment processing systems. Implemented monitoring and alerting infrastructure.",
   },
   {
    role: "Junior Developer",
    company: "Web Agency",
    period: "2017 - 2019",
    description:
     "Full-stack development for various clients. Developed strong foundation in backend systems.",
   },
  ],
  whyTheyFit:
   "This candidate demonstrates a natural evolution from backend development toward platform engineering. Their hands-on experience with Kubernetes migrations and infrastructure work, combined with their system design skills, positions them perfectly for your platform team. Their trajectory shows increasing ownership of infrastructure decisions, which aligns with your need for someone who can drive technical direction.",
  whatThisRoleSetsUpNext:
   "This role as Platform Engineer would position them to move into a Staff Engineer or Platform Lead role within 24–30 months, building on their existing infrastructure expertise and expanding their technical leadership scope.",
  fiveToTenYearArc:
   "Candidates with this backend-to-platform trajectory typically reach Principal Engineer or VP Engineering within 8–12 years, especially once they lead a major infrastructure migration — which this candidate has already done.",
 },
 c: {
  name: "Candidate C",
  currentRole: "Product Manager",
  trajectoryDirection: "Moving from PM → product leadership",
  trajectoryFit: 86,
  skills: {
   technical: ["Analytics Tools", "SQL", "Figma", "Jira"],
   analytical: ["User Research", "Market Analysis", "Competitive Analysis"],
   leadership: ["Strategy", "Roadmapping", "Cross-functional Leadership"],
  },
  workHistory: [
   {
    role: "Product Manager",
    company: "Growth Startup",
    period: "2021 - Present",
    description:
     "Owning product strategy for core platform. Grew user engagement by 40% through data-driven features.",
   },
   {
    role: "Associate PM",
    company: "Enterprise Software Co.",
    period: "2019 - 2021",
    description:
     "Managed B2B product features. Developed strong relationships with enterprise customers.",
   },
   {
    role: "Business Analyst",
    company: "Consulting Firm",
    period: "2017 - 2019",
    description:
     "Started in business analysis before transitioning to product. Strong analytical foundation.",
   },
  ],
  whyTheyFit:
   "This candidate shows a well-rounded progression toward product leadership with both B2B and B2C experience. Their analytical background gives them a data-driven approach to product decisions, while their experience growing user engagement demonstrates impact. They're at the right inflection point in their career to step into a leadership role with mentorship.",
  whatThisRoleSetsUpNext:
   "This Senior PM role would position them to move into a Group PM or Director of Product role within 18–24 months, leveraging their cross-functional leadership skills and expanding their strategic scope.",
  fiveToTenYearArc:
   "This profile typically reaches VP Product or Chief Product Officer within 10 years. Their combination of B2B enterprise and growth startup experience is rare at this career stage.",
 },
}

const trajectoryNodes = [
 { role: "Junior Analyst", year: "2018" },
 { role: "Data Analyst", year: "2020" },
 { role: "Senior Data Analyst", year: "2022" },
 { role: "Data Science Lead", year: "Next" },
]

export default async function CandidateProfilePage({
 params,
}: {
 params: Promise<{ id: string }>
}) {
 const { id } = await params
 const candidate = candidateData[id as keyof typeof candidateData] || candidateData.a

 return (
  <div className="min-h-screen p-8">
   {/* Back Button */}
   <Link
    href="/employer/dashboard"
    className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
   >
    <ArrowLeft className="h-4 w-4" />
    Back to search
   </Link>

   {/* Header */}
   <div className="mb-8 flex items-start justify-between">
    <div className="flex items-center gap-4">
     <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
      <span className="text-2xl font-medium text-foreground">
       {candidate.name.split(" ")[1]}
      </span>
     </div>
     <div>
      <div className="mb-1 flex items-center gap-3">
       <h1 className="text-2xl font-semibold text-foreground">{candidate.name}</h1>
       <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
        {candidate.trajectoryFit}% trajectory fit
       </Badge>
      </div>
      <p className="text-muted-foreground">{candidate.currentRole}</p>
      <div className="mt-1 flex items-center gap-1 text-sm text-primary">
       <TrendingUp className="h-4 w-4" />
       {candidate.trajectoryDirection}
      </div>
     </div>
    </div>
    <div className="flex gap-3">
     <Button variant="outline">
      <Bookmark className="mr-2 h-4 w-4" />
      Save Candidate
     </Button>
     <Button>
      <MessageSquare className="mr-2 h-4 w-4" />
      Reach Out
     </Button>
    </div>
   </div>

   <div className="grid gap-6 lg:grid-cols-3">
    {/* Left Column - Main Content */}
    <div className="space-y-6 lg:col-span-2">
     {/* Trajectory Chart */}
     <Card className="border-border/60 bg-card/50">
      <CardHeader>
       <CardTitle className="text-lg">Career Trajectory</CardTitle>
      </CardHeader>
      <CardContent>
       <div className="flex items-center justify-between">
        {trajectoryNodes.map((node, index) => (
         <div key={index} className="flex flex-col items-center">
          <div
           className={`flex h-12 w-12 items-center justify-center rounded-full ${
            node.year === "Next"
             ? "border-2 border-dashed border-primary bg-primary/10"
             : "bg-secondary"
           }`}
          >
           {node.year === "Next" ? (
            <TrendingUp className="h-5 w-5 text-primary" />
           ) : (
            <Briefcase className="h-5 w-5 text-muted-foreground" />
           )}
          </div>
          <p className="mt-2 text-center text-sm font-medium text-foreground">
           {node.role}
          </p>
          <p className="text-xs text-muted-foreground">{node.year}</p>
          {index < trajectoryNodes.length - 1 && (
           <ArrowRight className="absolute h-4 w-4 text-border" style={{ display: "none" }} />
          )}
         </div>
        ))}
       </div>
       {/* Connection lines */}
       <div className="relative -mt-[72px] mx-6 h-0.5 bg-border">
        <div
         className="h-full bg-primary"
         style={{ width: "75%" }}
        />
       </div>
       <div className="mt-[72px]" />
      </CardContent>
     </Card>

     {/* 5-10 Year Arc Card */}
     <Card className="border-l-4 border-l-primary border-border/60 bg-card/50">
      <CardHeader>
       <CardTitle className="flex items-center gap-2 text-lg">
        <Sparkles className="h-5 w-5 text-primary" />
        5–10 Year Arc
       </CardTitle>
      </CardHeader>
      <CardContent>
       <p className="leading-relaxed text-muted-foreground">{candidate.fiveToTenYearArc}</p>
      </CardContent>
     </Card>

     {/* Skills Breakdown */}
     <Card className="border-border/60 bg-card/50">
      <CardHeader>
       <CardTitle className="text-lg">Skills Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
       <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Technical</p>
        <div className="flex flex-wrap gap-2">
         {candidate.skills.technical.map((skill) => (
          <Badge
           key={skill}
           variant="secondary"
           className="bg-primary/10 text-primary"
          >
           {skill}
          </Badge>
         ))}
        </div>
       </div>
       <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Analytical</p>
        <div className="flex flex-wrap gap-2">
         {candidate.skills.analytical.map((skill) => (
          <Badge key={skill} variant="secondary">
           {skill}
          </Badge>
         ))}
        </div>
       </div>
       <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Leadership</p>
        <div className="flex flex-wrap gap-2">
         {candidate.skills.leadership.map((skill) => (
          <Badge key={skill} variant="secondary">
           {skill}
          </Badge>
         ))}
        </div>
       </div>
      </CardContent>
     </Card>

     {/* Work History Timeline */}
     <Card className="border-border/60 bg-card/50">
      <CardHeader>
       <CardTitle className="text-lg">Work History</CardTitle>
      </CardHeader>
      <CardContent>
       <div className="space-y-6">
        {candidate.workHistory.map((job, index) => (
         <div key={index} className="relative pl-6">
          {/* Timeline line */}
          {index !== candidate.workHistory.length - 1 && (
           <div className="absolute left-[7px] top-6 h-full w-0.5 bg-border" />
          )}
          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
          <div>
           <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground">{job.role}</h3>
            <span className="text-muted-foreground">at</span>
            <span className="font-medium text-foreground">{job.company}</span>
           </div>
           <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {job.period}
           </div>
           <p className="text-sm text-muted-foreground">{job.description}</p>
          </div>
         </div>
        ))}
       </div>
      </CardContent>
     </Card>
    </div>

    {/* Right Column - AI Insight */}
    <div className="space-y-6">
     <Card className="sticky top-8 border-primary/30 bg-primary/5">
      <CardHeader>
       <CardTitle className="flex items-center gap-2 text-lg">
        <svg
         className="h-5 w-5 text-primary"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
        >
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
         />
        </svg>
        Why this candidate fits your role
       </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
       <p className="leading-relaxed text-muted-foreground">{candidate.whyTheyFit}</p>
       
       {/* What this role sets them up for next */}
       <Card className="border-l-4 border-l-primary border-border/60 bg-card/50">
        <CardContent className="p-4">
         <p className="mb-2 text-sm font-medium text-primary">
          <Sparkles className="mr-1 inline h-4 w-4" />
          What this role sets them up for next
         </p>
         <p className="text-sm leading-relaxed text-muted-foreground">
          {candidate.whatThisRoleSetsUpNext}
         </p>
        </CardContent>
       </Card>
      </CardContent>
     </Card>
    </div>
   </div>
  </div>
 )
}
