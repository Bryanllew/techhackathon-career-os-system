"use client"

import { useState } from "react"
import Link from "next/link"
import {
 Users,
 AlertTriangle,
 ArrowRightLeft,
 UserPlus,
 CheckCircle2,
 AlertCircle,
 TrendingUp,
 Calendar,
 MessageSquare,
 DollarSign,
 Shuffle,
 Mail,
 Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet"

type Tab = "team" | "new-hires"

const employees = [
 {
  id: 1,
  name: "Sarah Lim",
  role: "Data Analyst",
  tenure: "2.5 years",
  engagementTrend: "Stable",
  borderColor: "border-l-green-500",
  textColor: "text-green-400",
  signal: "Regularly logging wins and updating skills. No action needed.",
  observations: [
   "Consistent engagement patterns over the past 6 months",
   "Recently completed two skill certifications",
   "Active in internal mentorship programme",
  ],
  conversationStarters: [
   "Ask: What projects would you be excited to take on next year?",
   "Ask: Is there anything we could do to make your role even more fulfilling?",
  ],
  actions: [
   { label: "Schedule career conversation", icon: Calendar },
   { label: "Review compensation against market rate", icon: DollarSign },
  ],
  riskOutcome: null,
 },
 {
  id: 2,
  name: "James Tan",
  role: "BI Developer",
  tenure: "1.8 years",
  engagementTrend: "Wavering",
  borderColor: "border-l-amber-500",
  textColor: "text-amber-400",
  signal: "Has not updated skills profile in 6 weeks. Career OS has noticed increased browsing of external roles.",
  observations: [
   "Skills profile has not been updated in 6 weeks — unusual for this employee",
   "Login frequency has dropped by 30% compared to last quarter",
   "Career OS has noticed increased browsing of external role listings",
  ],
  conversationStarters: [
   "Ask: What would make your next 6 months here feel meaningful?",
   "Ask: Is there a project or responsibility you'd want to take on if it existed?",
  ],
  actions: [
   { label: "Schedule career conversation", icon: Calendar },
   { label: "Review compensation against market rate", icon: DollarSign },
   { label: "Discuss internal mobility options", icon: Shuffle },
   { label: "Draft a message", icon: Mail },
  ],
  riskOutcome: "Employees at this stage who don't receive a meaningful career conversation within the next few weeks tend to start quietly exploring. The window to retain them is still open.",
 },
 {
  id: 3,
  name: "Priya Nair",
  role: "Data Engineer",
  tenure: "3 years",
  engagementTrend: "Disengaging",
  borderColor: "border-l-red-500",
  textColor: "text-red-400",
  signal: "Profile activity has dropped significantly over the past 4 weeks. Her trajectory suggests she is ready for a senior role — and there is no clear path to one internally right now.",
  observations: [
   "Profile activity has dropped significantly over the past 4 weeks",
   "Her trajectory suggests she is ready for a senior role",
   "There is no clear internal path to a senior position right now",
   "Has not engaged with internal learning resources in 2 months",
  ],
  conversationStarters: [
   "Ask: Where do you want to be in 2 years, and what would need to be true here for that to happen?",
   "Ask: Is there a senior role or scope you feel ready for that we haven't talked about yet?",
  ],
  actions: [
   { label: "Schedule career conversation", icon: Calendar },
   { label: "Review compensation against market rate", icon: DollarSign },
   { label: "Discuss internal mobility options", icon: Shuffle },
   { label: "Draft a message", icon: Mail },
  ],
  riskOutcome: "Employees at this disengagement level who don't receive internal recognition or a clear path forward within 60 days are significantly more likely to begin actively looking elsewhere.",
 },
 {
  id: 4,
  name: "Raj Kumar",
  role: "Analytics Manager",
  tenure: "4 years",
  engagementTrend: "Stable",
  borderColor: "border-l-green-500",
  textColor: "text-green-400",
  signal: "Consistent engagement. Recently completed an internal mentorship programme.",
  observations: [
   "Consistent engagement patterns maintained",
   "Recently completed an internal mentorship programme as a mentor",
   "Actively contributing to team documentation and knowledge sharing",
  ],
  conversationStarters: [
   "Ask: What's the most rewarding part of your mentorship work?",
   "Ask: Are there other ways you'd like to contribute to the team's growth?",
  ],
  actions: [
   { label: "Schedule career conversation", icon: Calendar },
   { label: "Review compensation against market rate", icon: DollarSign },
  ],
  riskOutcome: null,
 },
]

const newHires = [
 {
  id: 1,
  name: "Wei Chen",
  role: "Senior Data Scientist",
  startDate: "June 20, 2024",
  status: "On Track",
  statusColor: "text-green-400",
  borderColor: "border-l-green-500",
  factors: [
   { type: "positive", text: "Role closely matches their stated trajectory" },
   { type: "positive", text: "Team culture signals align with their working style" },
   { type: "warning", text: "No internal mentor with their technical background has been assigned yet — consider doing this before day one" },
  ],
  signals: [
   { type: "positive", text: "Role closely matches their stated trajectory", explanation: "Their career goals align well with what this position offers" },
   { type: "positive", text: "Team culture signals align with their working style", explanation: "Assessment indicates strong fit with team dynamics" },
   { type: "warning", text: "No mentor assigned", explanation: "Consider assigning a mentor with similar technical background before day one" },
  ],
  recommendations: [
   "Assign a technical mentor before their start date",
   "Schedule intro meetings with key stakeholders in first week",
   "Set up 30-60-90 day check-in cadence with manager",
   "Prepare a clear first project for immediate contribution",
  ],
  watchItems: [
   "Team integration — are they forming connections beyond their direct team?",
   "Early project ownership — do they have something meaningful to contribute to by week 2?",
  ],
 },
 {
  id: 2,
  name: "Aisha Malik",
  role: "Product Manager",
  startDate: "July 1, 2024",
  status: "Needs Support",
  statusColor: "text-amber-400",
  borderColor: "border-l-amber-500",
  factors: [
   { type: "positive", text: "Strong role and skills alignment" },
   { type: "warning", text: "This candidate values autonomy — the role currently has high process overhead that may feel constraining early on" },
   { type: "warning", text: "Career OS suggests giving early ownership of a defined project to reduce this risk" },
  ],
  signals: [
   { type: "positive", text: "Strong role and skills alignment", explanation: "Their skillset matches role requirements well" },
   { type: "warning", text: "Values autonomy highly", explanation: "The role currently has high process overhead that may feel constraining early on" },
   { type: "warning", text: "Early ownership needed", explanation: "Without a defined project, there's risk of early disengagement" },
  ],
  recommendations: [
   "Give early ownership of a small, well-defined project",
   "Reduce unnecessary process overhead in first 30 days",
   "Schedule 30-60-90 day check-ins with direct manager",
   "Consider a mentor outside the direct team for broader perspective",
  ],
  watchItems: [
   "Autonomy satisfaction — does she feel she has enough ownership?",
   "Process friction — is the overhead causing frustration or does she feel supported?",
  ],
 },
 {
  id: 3,
  name: "Marco Santos",
  role: "BI Developer",
  startDate: "May 1, 2024",
  status: "Improving",
  statusColor: "text-primary",
  borderColor: "border-l-primary",
  showTrendingUp: true,
  factors: [
   { type: "positive", text: "Early project delivery — strong positive signal" },
   { type: "warning", text: "Has not yet connected with the wider data team — social integration is lagging behind task integration" },
  ],
  signals: [
   { type: "positive", text: "Early project delivery", explanation: "Completed first assignment ahead of schedule — strong positive signal" },
   { type: "positive", text: "Technical onboarding complete", explanation: "Has access to all systems and tools needed" },
   { type: "warning", text: "Social integration lagging", explanation: "Has not yet connected with the wider data team beyond immediate colleagues" },
  ],
  recommendations: [
   "Introduce to wider data team through a team lunch or coffee chat",
   "Pair on a cross-functional project to build broader relationships",
   "Check in on team culture fit — does he feel welcomed?",
   "Celebrate early wins publicly to build visibility",
  ],
  watchItems: [
   "Team relationships — is he building connections beyond his immediate work?",
   "Sense of belonging — does he feel part of the team culture?",
  ],
 },
]

export default function PeopleSignalsPage() {
 const [activeTab, setActiveTab] = useState<Tab>("team")
 const [selectedEmployee, setSelectedEmployee] = useState<typeof employees[0] | null>(null)
 const [selectedNewHire, setSelectedNewHire] = useState<typeof newHires[0] | null>(null)

 const disengagingCount = employees.filter((e) => e.engagementTrend === "Wavering" || e.engagementTrend === "Disengaging").length
 const immediateActionCount = employees.filter((e) => e.engagementTrend === "Disengaging").length
 const newHireNeedsSupportCount = newHires.filter((h) => h.status === "Needs Support").length
 const mobilityOpportunities = 1

 return (
  <div className="min-h-screen p-8">
   {/* Header */}
   <div className="mb-8">
    <h1 className="text-2xl font-semibold text-foreground">People Signals</h1>
    <p className="text-muted-foreground">
     Early indicators across your team — both new hires finding their footing and established employees who may be disengaging. The same question underneath: who needs attention before it becomes a problem?
    </p>
   </div>

   {/* Summary Stat Tiles */}
   <div className="mb-8 grid grid-cols-5 gap-4">
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
       <Users className="h-5 w-5 text-amber-400" />
      </div>
      <div>
       <p className="text-lg font-semibold text-foreground">{disengagingCount}</p>
       <p className="text-xs text-muted-foreground">showing disengagement signals</p>
      </div>
     </CardContent>
    </Card>
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
       <AlertTriangle className="h-5 w-5 text-red-400" />
      </div>
      <div>
       <p className="text-lg font-semibold text-foreground">{immediateActionCount}</p>
       <p className="text-xs text-muted-foreground">needs immediate action</p>
      </div>
     </CardContent>
    </Card>
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
       <UserPlus className="h-5 w-5 text-primary" />
      </div>
      <div>
       <p className="text-lg font-semibold text-foreground">{newHires.length}</p>
       <p className="text-xs text-muted-foreground">new hires being tracked</p>
      </div>
     </CardContent>
    </Card>
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
       <AlertCircle className="h-5 w-5 text-amber-400" />
      </div>
      <div>
       <p className="text-lg font-semibold text-foreground">{newHireNeedsSupportCount}</p>
       <p className="text-xs text-muted-foreground">new hire needs support</p>
      </div>
     </CardContent>
    </Card>
    <Card className="border-border/60 bg-card/50">
     <CardContent className="flex items-center gap-4 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
       <ArrowRightLeft className="h-5 w-5 text-green-400" />
      </div>
      <div>
       <p className="text-lg font-semibold text-foreground">{mobilityOpportunities}</p>
       <p className="text-xs text-muted-foreground">mobility opportunity identified</p>
      </div>
     </CardContent>
    </Card>
   </div>

   {/* Tabs */}
   <div className="mb-6 flex gap-1 rounded-lg border border-border bg-muted/30 p-1">
    <button
     onClick={() => setActiveTab("team")}
     className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      activeTab === "team"
       ? "bg-background text-foreground shadow-sm"
       : "text-muted-foreground hover:text-foreground"
     }`}
    >
     Your Team
    </button>
    <button
     onClick={() => setActiveTab("new-hires")}
     className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      activeTab === "new-hires"
       ? "bg-background text-foreground shadow-sm"
       : "text-muted-foreground hover:text-foreground"
     }`}
    >
     New Hires
    </button>
   </div>

   {/* Tab Content */}
   {activeTab === "team" ? (
    <div className="space-y-4">
     {employees.map((employee) => (
      <Card
       key={employee.id}
       className={`cursor-pointer border-l-4 ${employee.borderColor} transition-colors hover:border-primary/50`}
       onClick={() => setSelectedEmployee(employee)}
      >
       <CardContent className="p-6">
        <div className="flex items-start justify-between">
         <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
           <h3 className="font-semibold text-foreground">{employee.name}</h3>
           <span className="text-muted-foreground">·</span>
           <span className="text-muted-foreground">{employee.role}</span>
           <span className="text-muted-foreground">·</span>
           <span className="text-muted-foreground">{employee.tenure}</span>
          </div>
          <p className={`mb-2 text-sm font-medium ${employee.textColor}`}>
           Engagement Trend: {employee.engagementTrend}
          </p>
          <p className="text-sm text-muted-foreground">{employee.signal}</p>
         </div>
         <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Eye className="h-5 w-5" />
         </Button>
        </div>
       </CardContent>
      </Card>
     ))}
    </div>
   ) : (
    <div className="space-y-4">
     {newHires.map((hire) => (
      <Card
       key={hire.id}
       className={`cursor-pointer border-l-4 ${hire.borderColor} transition-colors hover:border-primary/50`}
       onClick={() => setSelectedNewHire(hire)}
      >
       <CardContent className="p-6">
        <div className="flex items-start justify-between">
         <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
           <h3 className="font-semibold text-foreground">{hire.name}</h3>
           <span className="text-muted-foreground">·</span>
           <span className="text-muted-foreground">{hire.role}</span>
           <span className="text-muted-foreground">·</span>
           <span className="text-muted-foreground">{hire.startDate}</span>
          </div>
          <p className={`mb-4 flex items-center gap-2 text-sm font-medium ${hire.statusColor}`}>
           Integration Status: {hire.status}
           {hire.showTrendingUp && <TrendingUp className="h-4 w-4" />}
          </p>
          <div className="space-y-2">
           {hire.factors.map((factor, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
             {factor.type === "positive" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
             ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
             )}
             <span className="text-muted-foreground">{factor.text}</span>
            </div>
           ))}
          </div>
         </div>
         <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Eye className="h-5 w-5" />
         </Button>
        </div>
       </CardContent>
      </Card>
     ))}
    </div>
   )}

   {/* Disclaimer Card */}
   <Card className="mt-8 border-border/60 bg-muted/30">
    <CardContent className="p-4">
     <p className="text-sm text-muted-foreground">
      <span className="text-primary">✦</span> People Signals are directional observations, not verdicts. They point to conversations worth having — not conclusions already reached. No personal data is shared without candidate consent.
     </p>
    </CardContent>
   </Card>

   {/* Employee Side Panel */}
   <Sheet open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
    <SheetContent className="w-[480px] overflow-y-auto sm:max-w-[480px]">
     {selectedEmployee && (
      <>
       <SheetHeader className="mb-6">
        <SheetTitle className="flex items-center gap-3">
         {selectedEmployee.name}
         <span className={`text-sm font-normal ${selectedEmployee.textColor}`}>
          {selectedEmployee.engagementTrend}
         </span>
        </SheetTitle>
       </SheetHeader>

       <div className="space-y-6">
        {/* What Career OS noticed */}
        <div>
         <h4 className="mb-3 text-sm font-semibold text-foreground">What Career OS noticed</h4>
         <ul className="space-y-2">
          {selectedEmployee.observations.map((obs, index) => (
           <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
            {obs}
           </li>
          ))}
         </ul>
        </div>

        {/* Suggested conversation starters */}
        <div>
         <h4 className="mb-3 text-sm font-semibold text-foreground">Suggested conversation starters</h4>
         <ul className="space-y-2">
          {selectedEmployee.conversationStarters.map((starter, index) => (
           <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {starter}
           </li>
          ))}
         </ul>
        </div>

        {/* Suggested actions */}
        <div>
         <h4 className="mb-3 text-sm font-semibold text-foreground">Suggested actions</h4>
         <div className="space-y-2">
          {selectedEmployee.actions.map((action, index) => (
           <button
            key={index}
            className="flex w-full items-center gap-3 rounded-lg border border-border bg-card/50 p-3 text-left text-sm text-foreground transition-colors hover:border-primary hover:bg-primary/5"
           >
            <action.icon className="h-4 w-4 text-muted-foreground" />
            {action.label}
           </button>
          ))}
         </div>
        </div>

        {/* Risk outcome warning */}
        {selectedEmployee.riskOutcome && (
         <Card className="border-amber-500/50 bg-amber-500/5">
          <CardContent className="p-4">
           <h4 className="mb-2 text-sm font-semibold text-foreground">
            What tends to happen if this goes unaddressed
           </h4>
           <p className="text-sm text-muted-foreground">{selectedEmployee.riskOutcome}</p>
          </CardContent>
         </Card>
        )}
       </div>
      </>
     )}
    </SheetContent>
   </Sheet>

   {/* New Hire Side Panel */}
   <Sheet open={!!selectedNewHire} onOpenChange={() => setSelectedNewHire(null)}>
    <SheetContent className="w-[480px] overflow-y-auto sm:max-w-[480px]">
     {selectedNewHire && (
      <>
       <SheetHeader className="mb-6">
        <SheetTitle className="flex items-center gap-3">
         {selectedNewHire.name}
         <span className={`text-sm font-normal ${selectedNewHire.statusColor}`}>
          {selectedNewHire.status}
         </span>
        </SheetTitle>
       </SheetHeader>

       <div className="space-y-6">
        {/* Signals we're seeing */}
        <div>
         <h4 className="mb-3 text-sm font-semibold text-foreground">Signals we&apos;re seeing</h4>
         <div className="space-y-3">
          {selectedNewHire.signals.map((signal, index) => (
           <div key={index} className="flex items-start gap-2">
            {signal.type === "positive" ? (
             <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
            ) : (
             <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            )}
            <div>
             <p className="text-sm font-medium text-foreground">{signal.text}</p>
             <p className="text-sm text-muted-foreground">{signal.explanation}</p>
            </div>
           </div>
          ))}
         </div>
        </div>

        {/* Recommended actions */}
        <div>
         <h4 className="mb-3 text-sm font-semibold text-foreground">Recommended actions for the next 30 days</h4>
         <ul className="space-y-2">
          {selectedNewHire.recommendations.map((rec, index) => (
           <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {rec}
           </li>
          ))}
         </ul>
        </div>

        {/* What to watch */}
        <div>
         <h4 className="mb-3 text-sm font-semibold text-foreground">What to watch</h4>
         <ul className="space-y-2">
          {selectedNewHire.watchItems.map((item, index) => (
           <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Eye className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            {item}
           </li>
          ))}
         </ul>
        </div>
       </div>
      </>
     )}
    </SheetContent>
   </Sheet>
  </div>
 )
}
