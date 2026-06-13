"use client"

import { useState } from "react"
import {
 FileText,
 Download,
 Copy,
 Upload,
 Cloud,
 Sparkles,
 Check,
 ChevronDown,
 ChevronUp,
 AlertCircle,
 CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const targetRoles = [
 { id: "1", role: "Senior Data Scientist", company: "Stripe", matchBefore: 87, matchAfter: 94, active: true },
 { id: "2", role: "Product Analyst", company: "Notion", matchBefore: 82, matchAfter: 89, active: false },
 { id: "3", role: "Analytics Lead", company: "Linear", matchBefore: 78, matchAfter: 86, active: false },
]

const keepSkills = ["Python", "SQL", "Machine Learning", "Data Analysis", "Tableau", "Statistical Modeling"]
const removeSkills = ["Microsoft Word", "PowerPoint", "Basic Excel", "Email Management", "Filing", "Typing Speed", "Customer Service", "Phone Etiquette"]

export default function ResumeBuilderPage() {
 const [activeTab, setActiveTab] = useState("build")
 const [selectedRole, setSelectedRole] = useState(targetRoles[0])
 const [expandedSections, setExpandedSections] = useState<string[]>(["summary", "experience", "skills", "trajectory"])

 const toggleSection = (section: string) => {
  setExpandedSections((prev) =>
   prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
  )
 }

 return (
  <div className="min-h-screen p-8">
   <div className="mb-8">
    <h1 className="text-2xl font-semibold text-foreground">Resume Builder</h1>
    <p className="text-muted-foreground">Build and review AI-tailored resumes for your target roles</p>
   </div>

   <Tabs value={activeTab} onValueChange={setActiveTab}>
    <TabsList className="mb-6">
     <TabsTrigger value="build">Build Resume</TabsTrigger>
     <TabsTrigger value="review">Review My Resume</TabsTrigger>
    </TabsList>

    {/* Build Resume Tab */}
    <TabsContent value="build">
     <div className="grid gap-8 lg:grid-cols-5">
      {/* Left Column - Role Selection */}
      <div className="lg:col-span-2 space-y-4">
       <h2 className="text-lg font-medium text-foreground">Target Roles</h2>
       <div className="space-y-3">
        {targetRoles.map((role) => (
         <Card
          key={role.id}
          className={`cursor-pointer transition-all ${
           selectedRole.id === role.id
            ? "border-primary bg-primary/5"
            : "border-border/60 hover:border-primary/50"
          }`}
          onClick={() => setSelectedRole(role)}
         >
          <CardContent className="p-4">
           <div className="flex items-start justify-between">
            <div>
             <p className="font-medium text-foreground">{role.role}</p>
             <p className="text-sm text-muted-foreground">at {role.company}</p>
            </div>
            {selectedRole.id === role.id && (
             <Badge className="bg-primary/10 text-primary">Active</Badge>
            )}
           </div>
           <Button size="sm" className="mt-3 w-full">
            Generate Resume
           </Button>
          </CardContent>
         </Card>
        ))}
       </div>

       {/* AI Insight */}
       <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4">
         <p className="text-sm text-primary">
          ✦ AI adjusted your summary to emphasise ML progression. Match score improved from{" "}
          <span className="font-semibold">{selectedRole.matchBefore}%</span> to{" "}
          <span className="font-semibold">{selectedRole.matchAfter}%</span>.
         </p>
        </CardContent>
       </Card>
      </div>

      {/* Right Column - Resume Preview */}
      <div className="lg:col-span-3">
       <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
         <div>
          <Badge className="mb-2 bg-primary/10 text-primary">
           ✦ AI Tailored for {selectedRole.role} at {selectedRole.company}
          </Badge>
          <CardTitle className="text-lg">Resume Preview</CardTitle>
         </div>
         <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
           <Download className="h-4 w-4" />
           Download PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
           <Copy className="h-4 w-4" />
           Copy Text
          </Button>
         </div>
        </CardHeader>
        <CardContent>
         <div className="rounded-lg border border-border bg-white p-8 text-slate-900">
          <h1 className="mb-1 text-2xl font-bold">Alex Chen</h1>
          <p className="mb-4 text-sm text-slate-600">
           alex.chen@email.com · +60 12-345-6789 · Kuala Lumpur, Malaysia · linkedin.com/in/alexchen
          </p>
          
          <div className="mb-4">
           <h2 className="mb-2 border-b border-slate-200 pb-1 text-sm font-semibold uppercase tracking-wider text-slate-900">
            Professional Summary
           </h2>
           <p className="text-sm text-slate-700">
            Data professional with 3+ years of experience transitioning from analytics to data science, with a proven track record of delivering ML-powered insights that drive business decisions. Currently building production machine learning models while managing enterprise-scale data pipelines. Passionate about leveraging statistical modeling and Python to solve complex business problems at scale.
           </p>
          </div>

          <div className="mb-4">
           <h2 className="mb-2 border-b border-slate-200 pb-1 text-sm font-semibold uppercase tracking-wider text-slate-900">
            Experience
           </h2>
           <div className="mb-3">
            <div className="flex justify-between">
             <p className="font-medium text-slate-900">Data Analyst</p>
             <p className="text-sm text-slate-600">2023 – Present</p>
            </div>
            <p className="text-sm text-slate-600">TechCorp Malaysia · Kuala Lumpur</p>
            <ul className="mt-1 list-inside list-disc text-sm text-slate-700">
             <li>Built ML classification model that improved customer churn prediction by 34%</li>
             <li>Developed automated reporting pipeline processing 2M+ records daily</li>
             <li>Led cross-functional data literacy training for 50+ stakeholders</li>
            </ul>
           </div>
           <div className="mb-3">
            <div className="flex justify-between">
             <p className="font-medium text-slate-900">Junior Data Analyst</p>
             <p className="text-sm text-slate-600">2021 – 2023</p>
            </div>
            <p className="text-sm text-slate-600">Analytics Co · Kuala Lumpur</p>
            <ul className="mt-1 list-inside list-disc text-sm text-slate-700">
             <li>Created Tableau dashboards tracking RM 50M+ in quarterly revenue</li>
             <li>Reduced report generation time by 60% through SQL optimization</li>
            </ul>
           </div>
          </div>

          <div>
           <h2 className="mb-2 border-b border-slate-200 pb-1 text-sm font-semibold uppercase tracking-wider text-slate-900">
            Skills
           </h2>
           <div className="flex flex-wrap gap-2">
            {["Python", "SQL", "Machine Learning", "Tableau", "Statistical Modeling", "Data Analysis"].map((skill) => (
             <span
              key={skill}
              className="rounded bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700"
             >
              {skill}
             </span>
            ))}
           </div>
          </div>
         </div>
        </CardContent>
       </Card>
      </div>
     </div>
    </TabsContent>

    {/* Review My Resume Tab */}
    <TabsContent value="review">
     {/* Upload Area */}
     <div className="mb-8">
      <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 p-12">
       <div className="text-center">
        <Cloud className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <p className="mb-2 text-lg font-medium text-foreground">
         Drop your resume here or click to upload
        </p>
        <p className="mb-4 text-sm text-muted-foreground">Supports PDF and Word</p>
        <Button variant="outline">Choose File</Button>
        <p className="mt-4">
         <button className="text-sm text-primary hover:underline">
          Or review my Career OS profile instead
         </button>
        </p>
       </div>
      </div>
     </div>

     {/* Completed Review Example */}
     <div className="mb-6">
      <Badge className="mb-4 bg-primary/10 text-primary">
       ✦ AI Review Complete — Senior Data Scientist at Stripe
      </Badge>
     </div>

     {/* Overall Score */}
     <Card className="mb-8 border-border/60">
      <CardContent className="p-6">
       <div className="flex items-center gap-8">
        <div className="relative flex h-32 w-32 items-center justify-center">
         <svg className="h-32 w-32 -rotate-90" viewBox="0 0 36 36">
          <path
           d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
           fill="none"
           stroke="currentColor"
           strokeWidth="2.5"
           className="text-secondary"
          />
          <path
           d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
           fill="none"
           stroke="currentColor"
           strokeWidth="2.5"
           strokeDasharray="73, 100"
           className="text-amber-500"
          />
         </svg>
         <div className="absolute text-center">
          <span className="text-3xl font-bold text-foreground">73</span>
          <span className="text-lg text-muted-foreground">/100</span>
         </div>
        </div>
        <div className="flex-1">
         <p className="mb-4 text-lg font-medium text-foreground">
          Good foundation — key improvements needed
         </p>
         <div className="space-y-3">
          <div>
           <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Impact & Achievements</span>
            <span className="text-foreground">68/100</span>
           </div>
           <Progress value={68} className="h-2" />
          </div>
          <div>
           <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Keyword Alignment</span>
            <span className="text-foreground">81/100</span>
           </div>
           <Progress value={81} className="h-2" />
          </div>
          <div>
           <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Clarity & Structure</span>
            <span className="text-foreground">77/100</span>
           </div>
           <Progress value={77} className="h-2" />
          </div>
          <div>
           <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Trajectory Fit</span>
            <span className="text-foreground">65/100</span>
           </div>
           <Progress value={65} className="h-2" />
          </div>
         </div>
        </div>
       </div>
      </CardContent>
     </Card>

     {/* Section Feedback */}
     <div className="space-y-4">
      {/* Professional Summary - Amber */}
      <Card className="border-l-4 border-l-amber-500 border-border/60">
       <CardHeader
        className="cursor-pointer"
        onClick={() => toggleSection("summary")}
       >
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-base">Professional Summary</CardTitle>
          <Badge className="bg-amber-500/10 text-amber-500">Needs improvement</Badge>
         </div>
         {expandedSections.includes("summary") ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
         ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
         )}
        </div>
       </CardHeader>
       {expandedSections.includes("summary") && (
        <CardContent>
         <div className="mb-4 rounded-lg bg-amber-500/5 p-4">
          <p className="text-sm text-foreground">
           <span className="border-b-2 border-amber-500">Data analyst with 3 years of experience</span> seeking new opportunities in the data science field.{" "}
           <span className="border-b-2 border-amber-500">Proficient in various tools</span> and looking to grow my career.
          </p>
         </div>
         <div className="mb-4">
          <p className="mb-2 text-sm text-primary">✦ AI Feedback:</p>
          <p className="text-sm text-muted-foreground">
           Your summary is too generic and passive. It doesn&apos;t highlight your trajectory toward data science or quantify your impact. The phrase &quot;various tools&quot; is vague — be specific about your technical stack.
          </p>
         </div>
         <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="mb-2 text-sm font-medium text-foreground">Suggested Rewrite:</p>
          <p className="text-sm text-foreground">
           Data professional transitioning from analytics to data science, with 3+ years of experience building ML models that improved customer churn prediction by 34%. Expert in Python, SQL, and statistical modeling, currently expanding into deep learning and cloud-based ML deployment.
          </p>
          <Button size="sm" className="mt-3">Apply This</Button>
         </div>
        </CardContent>
       )}
      </Card>

      {/* Work Experience - Green */}
      <Card className="border-l-4 border-l-green-500 border-border/60">
       <CardHeader
        className="cursor-pointer"
        onClick={() => toggleSection("experience")}
       >
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <CardTitle className="text-base">Work Experience</CardTitle>
          <Badge className="bg-green-500/10 text-green-500">Strong</Badge>
         </div>
         {expandedSections.includes("experience") ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
         ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
         )}
        </div>
       </CardHeader>
       {expandedSections.includes("experience") && (
        <CardContent className="space-y-3">
         <div className="flex items-start gap-2 rounded-lg bg-green-500/5 p-3">
          <Check className="mt-0.5 h-4 w-4 text-green-500" />
          <p className="text-sm text-foreground">Strong quantified achievement: &quot;improved customer churn prediction by 34%&quot;</p>
         </div>
         <div className="flex items-start gap-2 rounded-lg bg-green-500/5 p-3">
          <Check className="mt-0.5 h-4 w-4 text-green-500" />
          <p className="text-sm text-foreground">Good use of action verbs: Built, Developed, Led</p>
         </div>
         <div className="flex items-start gap-2 rounded-lg bg-amber-500/5 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
          <p className="text-sm text-foreground">
           Consider strengthening: &quot;Created Tableau dashboards&quot; — add business impact (revenue influenced, decisions enabled)
          </p>
         </div>
        </CardContent>
       )}
      </Card>

      {/* Skills Section - Amber */}
      <Card className="border-l-4 border-l-amber-500 border-border/60">
       <CardHeader
        className="cursor-pointer"
        onClick={() => toggleSection("skills")}
       >
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-base">Skills Section</CardTitle>
          <Badge className="bg-amber-500/10 text-amber-500">Needs improvement</Badge>
         </div>
         {expandedSections.includes("skills") ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
         ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
         )}
        </div>
       </CardHeader>
       {expandedSections.includes("skills") && (
        <CardContent>
         <p className="mb-4 text-sm text-muted-foreground">
          You have 14 skills listed, but only 6 are relevant to the target role. Removing irrelevant skills improves ATS matching and reviewer focus.
         </p>
         <div className="grid gap-4 md:grid-cols-2">
          <div>
           <p className="mb-2 text-sm font-medium text-green-500">Keep These</p>
           <div className="flex flex-wrap gap-2">
            {keepSkills.map((skill) => (
             <Badge key={skill} className="bg-green-500/10 text-green-500">
              {skill}
             </Badge>
            ))}
           </div>
          </div>
          <div>
           <p className="mb-2 text-sm font-medium text-muted-foreground">Consider Removing</p>
           <div className="flex flex-wrap gap-2">
            {removeSkills.map((skill) => (
             <Badge key={skill} variant="secondary" className="line-through opacity-60">
              {skill}
             </Badge>
            ))}
           </div>
          </div>
         </div>
         <Button size="sm" className="mt-4">Apply Suggested Changes</Button>
        </CardContent>
       )}
      </Card>

      {/* Trajectory Alignment - Red */}
      <Card className="border-l-4 border-l-red-500 border-border/60">
       <CardHeader
        className="cursor-pointer"
        onClick={() => toggleSection("trajectory")}
       >
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <CardTitle className="text-base">Trajectory Alignment</CardTitle>
          <Badge className="bg-red-500/10 text-red-500">Weak</Badge>
         </div>
         {expandedSections.includes("trajectory") ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
         ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
         )}
        </div>
       </CardHeader>
       {expandedSections.includes("trajectory") && (
        <CardContent>
         <p className="mb-4 text-sm text-muted-foreground">
          Your resume currently reads as a Data Analyst application, not a Data Scientist candidate. The trajectory toward ML/DS roles isn&apos;t clear to hiring managers.
         </p>
         <div className="space-y-4">
          <div className="rounded-lg bg-red-500/5 p-4">
           <p className="mb-2 text-xs font-medium uppercase text-red-500">Before</p>
           <p className="text-sm text-foreground">
            &quot;Developed automated reporting pipeline processing 2M+ records daily&quot;
           </p>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
           <p className="mb-2 text-xs font-medium uppercase text-primary">After</p>
           <p className="text-sm text-foreground">
            &quot;Architected ML-powered data pipeline processing 2M+ records daily, incorporating anomaly detection that reduced data quality issues by 45%&quot;
           </p>
          </div>
         </div>
        </CardContent>
       )}
      </Card>
     </div>

     {/* Bottom Actions */}
     <div className="mt-8 flex gap-4">
      <Button className="gap-2">
       <Sparkles className="h-4 w-4" />
       Apply All Suggested Changes
      </Button>
      <Button variant="outline" className="gap-2">
       <Download className="h-4 w-4" />
       Download Improved Resume
      </Button>
     </div>
    </TabsContent>
   </Tabs>
  </div>
 )
}
