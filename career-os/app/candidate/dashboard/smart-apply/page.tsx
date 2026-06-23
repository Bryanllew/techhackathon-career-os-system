"use client"

import { useState, useRef, useEffect } from "react"
import {
 Sparkles,
 Clock,
 CheckCircle2,
 AlertCircle,
 ChevronDown,
 ChevronUp,
 Copy,
 RefreshCw,
 Eye,
 Send,
 RotateCcw,
 Bot,
 User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

/* ── 数据 ── */

const applications = [
 {
  id: "1",
  company: "Figma",
  role: "Data Scientist",
  status: "applied",
  statusLabel: "Applied",
  autofillProgress: 10,
  autofillTotal: 10,
  nextAction: "Follow up with a short email — it has been 5 days since you applied.",
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
  nextAction: "Prepare 3 STAR stories and review SQL window functions before June 18.",
 },
 {
  id: "3",
  company: "Notion",
  role: "Product Analyst",
  status: "ready",
  statusLabel: "Ready to Send",
  autofillProgress: 8,
  autofillTotal: 10,
  nextAction: "Complete 2 remaining fields and send before the deadline on June 22.",
 },
]

const suggestedApplications = [
 { id: "4", company: "Linear", role: "Analytics Lead", matchPercent: 84 },
 { id: "5", company: "Vercel", role: "Data Engineer", matchPercent: 79 },
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

/* ── 面试聊天数据 ── */

type SessionType = "behavioural" | "technical" | "role"

const sessionMeta: Record<SessionType, { name: string; description: string; color: string }> = {
 behavioural: {
  name: "Behavioural Interview",
  description: "STAR method · leadership · teamwork scenarios",
  color: "border-[#5856D6]/40 bg-[#5856D6]/5",
 },
 technical: {
  name: "Technical Interview",
  description: "SQL · Python · statistics · data modelling",
  color: "border-amber-500/40 bg-amber-500/5",
 },
 role: {
  name: "Role Specific",
  description: "Senior Data Scientist at Stripe — AI tailored",
  color: "border-primary/40 bg-primary/5",
 },
}

const questionBank: Record<SessionType, string[]> = {
 behavioural: [
  "Tell me about a time you had to deliver a project under a tight deadline. What did you do?",
  "Describe a situation where you had to convince a senior stakeholder to change direction. How did you approach it?",
  "Give me an example of when you made a mistake at work. How did you handle it?",
 ],
 technical: [
  "Write a SQL query to find the top 3 customers by total spending in the last 30 days.",
  "How would you detect and handle outliers in a dataset before building a predictive model?",
  "Explain the difference between L1 and L2 regularisation. When would you use each?",
 ],
 role: [
  "Stripe processes millions of transactions daily. How would you design an anomaly detection system for fraud at that scale?",
  "Walk me through how you would evaluate the success of a new payment feature after launch.",
  "How would you communicate a complex statistical finding to a non-technical product team?",
 ],
}

const feedbackBank: Record<SessionType, { good: string[]; improve: string }[]> = {
 behavioural: [
  {
   good: [
    "You used the STAR structure well — situation and task were clear.",
    "Good use of specific numbers to show impact.",
    "You showed self-awareness in how you reflected on the outcome.",
   ],
   improve: "Try to make the 'Result' step more concrete — what changed because of your action?",
  },
  {
   good: [
    "Clear explanation of how you read the stakeholder's concerns.",
    "You showed empathy and preparation before the conversation.",
    "The outcome was specific and measurable.",
   ],
   improve: "Add what you would do differently next time — interviewers value self-reflection.",
  },
  {
   good: [
    "Honest answer that shows maturity.",
    "You focused on what you learned, not just what went wrong.",
    "Good pacing — you did not ramble.",
   ],
   improve: "Be more specific about the steps you took to fix the mistake, not just the lesson.",
  },
 ],
 technical: [
  {
   good: [
    "Correct use of window functions and GROUP BY.",
    "You thought about edge cases like ties in the ranking.",
    "Clean, readable query structure.",
   ],
   improve: "Consider mentioning index optimisation for large tables — shows production awareness.",
  },
  {
   good: [
    "You named multiple methods (IQR, Z-score, visualisation).",
    "Good point about domain knowledge guiding the threshold.",
    "You mentioned treating outliers differently depending on cause.",
   ],
   improve: "Mention how you would document your outlier decisions so teammates can replicate it.",
  },
  {
   good: [
    "Clear explanation of the penalty terms.",
    "Correct use cases for sparse data vs correlated features.",
    "You connected theory to a real example.",
   ],
   improve: "Elastic Net is worth mentioning as a hybrid approach — shows breadth of knowledge.",
  },
 ],
 role: [
  {
   good: [
    "You correctly identified real-time vs batch trade-offs.",
    "Mentioning feature engineering specific to transactions was sharp.",
    "You showed awareness of false positive costs in fraud detection.",
   ],
   improve: "Add how you would monitor model drift in production — critical for fraud systems.",
  },
  {
   good: [
    "You named leading and lagging metrics — good distinction.",
    "Good mention of guard rails to catch regressions.",
    "You asked about the feature's goal before defining success.",
   ],
   improve: "Walk through how you would design the holdout group to avoid novelty effects.",
  },
  {
   good: [
    "You used an analogy to ground the concept — effective technique.",
    "You focused on the decision the team needs to make, not the method.",
    "Good point about showing uncertainty ranges, not just point estimates.",
   ],
   improve: "Bring a visual aid or dashboard mockup into your answer — it makes the communication concrete.",
  },
 ],
}

const suggestedQuestions: Record<SessionType, string[]> = {
 behavioural: [
  "Tell me about a time you handled a conflict in your team.",
  "How do you manage competing priorities?",
  "Describe a time you went above and beyond.",
 ],
 technical: [
  "Explain how a JOIN works and when to avoid it.",
  "What is the difference between precision and recall?",
  "How would you handle a highly imbalanced dataset?",
 ],
 role: [
  "How would you build a churn prediction model for Stripe?",
  "What metrics matter most in a payments product?",
  "How do you communicate model uncertainty to product teams?",
 ],
}

type ChatMessage = { role: "ai" | "user"; text: string }

/* ── 组件 ── */

function InterviewChat() {
 const [sessionType, setSessionType] = useState<SessionType | null>(null)
 const [questionIdx, setQuestionIdx] = useState(0)
 const [messages, setMessages] = useState<ChatMessage[]>([])
 const [input, setInput] = useState("")
 const [waitingFeedback, setWaitingFeedback] = useState(false)
 const [roundDone, setRoundDone] = useState(false)
 const bottomRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" })
 }, [messages])

 const startSession = (type: SessionType) => {
  setSessionType(type)
  setQuestionIdx(0)
  setRoundDone(false)
  setMessages([{ role: "ai", text: questionBank[type][0] }])
 }

 const handleSend = () => {
  if (!input.trim() || !sessionType) return
  const userMsg: ChatMessage = { role: "user", text: input }
  setInput("")
  setWaitingFeedback(true)

  const newMessages = [...messages, userMsg]
  setMessages(newMessages)

  setTimeout(() => {
   const feedback = feedbackBank[sessionType][questionIdx]
   const feedbackText = [
    "Thanks for your answer. Here is my feedback:",
    "",
    feedback.good.map((g) => `✓ ${g}`).join("\n"),
    "",
    `⚠ Improvement: ${feedback.improve}`,
   ].join("\n")

   const nextIdx = questionIdx + 1
   const isLast = nextIdx >= questionBank[sessionType].length

   const aiMessages: ChatMessage[] = [{ role: "ai", text: feedbackText }]

   if (!isLast) {
    aiMessages.push({ role: "ai", text: `Next question:\n\n${questionBank[sessionType][nextIdx]}` })
    setQuestionIdx(nextIdx)
   } else {
    aiMessages.push({
     role: "ai",
     text: "Great work completing this session! You answered all 3 questions. Review your feedback above to improve for your next interview.",
    })
    setRoundDone(true)
   }

   setMessages([...newMessages, ...aiMessages])
   setWaitingFeedback(false)
  }, 800)
 }

 const handleSuggest = (q: string) => setInput(q)

 const reset = () => {
  setSessionType(null)
  setMessages([])
  setInput("")
  setQuestionIdx(0)
  setRoundDone(false)
 }

 if (!sessionType) {
  return (
   <div>
    <p className="text-section-label mb-4">Choose a session type</p>
    <div className="grid gap-4 md:grid-cols-3 mb-8">
     {(Object.keys(sessionMeta) as SessionType[]).map((type) => {
      const meta = sessionMeta[type]
      return (
       <Card key={type} className={`cursor-pointer transition-all hover:shadow-md border-2 ${meta.color}`}
        onClick={() => startSession(type)}>
        <CardContent className="p-5">
         {type === "role" && <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">✦ AI tailored</Badge>}
         <p className="font-medium text-foreground mb-1">{meta.name}</p>
         <p className="text-xs text-foreground-secondary">{meta.description}</p>
         <Button size="sm" className="mt-4 w-full">Start Session</Button>
        </CardContent>
       </Card>
      )
     })}
    </div>

    {/* 历史记录 */}
    <p className="text-section-label mb-3">Past Sessions</p>
    <div className="space-y-3">
     {[
      { type: "Behavioural Interview", date: "June 10, 2026", duration: "25 min", score: 87 },
      { type: "Technical Interview", date: "June 8, 2026", duration: "32 min", score: 79 },
     ].map((s, i) => (
      <Card key={i}>
       <CardContent className="p-4 flex items-center justify-between">
        <div>
         <p className="text-sm font-medium text-foreground">{s.type}</p>
         <p className="text-xs text-foreground-secondary">{s.date} · {s.duration}</p>
        </div>
        <Badge className={s.score >= 85 ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}>
         {s.score}/100
        </Badge>
       </CardContent>
      </Card>
     ))}
    </div>
   </div>
  )
 }

 return (
  <div className="max-w-2xl mx-auto">
   <div className="flex items-center justify-between mb-4">
    <div>
     <p className="font-medium text-foreground">{sessionMeta[sessionType].name}</p>
     <p className="text-xs text-foreground-secondary">
      Question {Math.min(questionIdx + 1, 3)} of 3
     </p>
    </div>
    <Button variant="ghost" size="sm" onClick={reset}>
     <RotateCcw className="h-3.5 w-3.5 mr-1" /> Change type
    </Button>
   </div>

   {/* 聊天区域 */}
   <div className="rounded-xl border border-card-border bg-card/60 p-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-3 space-y-4">
    {messages.map((msg, i) => (
     <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
      <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center ${
       msg.role === "ai" ? "bg-primary/15" : "bg-secondary"
      }`}>
       {msg.role === "ai" ? <Bot className="h-3.5 w-3.5 text-primary" /> : <User className="h-3.5 w-3.5 text-foreground-secondary" />}
      </div>
      <div className={`rounded-xl px-4 py-3 text-sm max-w-[80%] whitespace-pre-wrap ${
       msg.role === "ai"
        ? "bg-card border border-card-border text-foreground"
        : "bg-primary text-primary-foreground"
      }`}>
       {msg.text}
      </div>
     </div>
    ))}
    {waitingFeedback && (
     <div className="flex gap-3">
      <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
       <Bot className="h-3.5 w-3.5 text-primary" />
      </div>
      <div className="rounded-xl px-4 py-3 bg-card border border-card-border text-xs text-foreground-tertiary">
       Analysing your answer...
      </div>
     </div>
    )}
    <div ref={bottomRef} />
   </div>

   {/* 建议问题 */}
   {!roundDone && (
    <div className="mb-3">
     <p className="text-xs text-foreground-tertiary mb-2">Suggested answers to explore:</p>
     <div className="flex flex-wrap gap-2">
      {suggestedQuestions[sessionType].map((q, i) => (
       <button
        key={i}
        onClick={() => handleSuggest(q)}
        className="text-xs rounded-lg border border-card-border bg-card/60 px-3 py-1.5 text-foreground-secondary hover:text-foreground hover:border-primary/30 transition-colors"
       >
        {q}
       </button>
      ))}
     </div>
    </div>
   )}

   {/* 输入区域 */}
   {!roundDone ? (
    <div className="flex gap-2">
     <Textarea
      placeholder="Type your answer here..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleSend() }}
      className="flex-1 min-h-[80px] text-sm resize-none"
     />
     <Button onClick={handleSend} disabled={!input.trim() || waitingFeedback} className="self-end">
      <Send className="h-4 w-4" />
     </Button>
    </div>
   ) : (
    <Button className="w-full" onClick={reset}>
     Start Another Session
    </Button>
   )}
   {!roundDone && <p className="text-xs text-foreground-tertiary mt-1.5 text-right">Ctrl + Enter to send</p>}
  </div>
 )
}

/* ── 主页面 ── */

export default function SmartApplyPage() {
 const [activeTab, setActiveTab] = useState("applications")
 const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null)
 const [generateModalOpen, setGenerateModalOpen] = useState(false)
 const [selectedRole, setSelectedRole] = useState("")
 const [generatedLetter, setGeneratedLetter] = useState(false)
 const [suggestion, setSuggestion] = useState<string | null>(null)

 const getStatusColor = (status: string) => {
  switch (status) {
   case "applied": return "bg-slate-500/10 text-slate-500"
   case "interview": return "bg-primary/10 text-primary"
   case "ready": return "bg-amber-500/10 text-amber-500"
   default: return "bg-secondary text-secondary-foreground"
  }
 }

 const coverLetterText = (role: string, company: string) =>
  `Dear Hiring Manager,\n\nI am writing to express my interest in the ${role} position at ${company}. With over 3 years of experience in data analytics and a clear trajectory toward data science, I am excited about the opportunity to contribute to your team's mission.\n\nIn my current role at TechCorp Malaysia, I have built machine learning models that improved customer churn prediction by 34% and developed automated pipelines processing over 2 million records daily. My work has directly influenced business decisions and I am eager to bring this impact-driven approach to ${company}.\n\nWhat excites me most about ${company} is your commitment to data-driven product development. I have followed your engineering blog and was particularly impressed by your recent work on real-time analytics infrastructure.\n\nI would welcome the opportunity to discuss how my skills and trajectory align with your team's needs.\n\nBest regards,\nAlex Chen`

 const suggestionTexts: Record<string, string> = {
  opening: "✦ AI Suggestion: Start with a specific achievement instead of 'I am writing to express...' — it stands out more.",
  tone: "✦ AI Suggestion: Your tone is formal enough for Stripe's engineering culture. Keep it concise — aim for under 300 words.",
  closing: "✦ AI Suggestion: Add a specific call to action in the closing — for example, mention you are available for a 30-minute call.",
 }

 return (
  <div className="min-h-screen p-8">
   <div className="mb-8">
    <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground">Smart Apply</h1>
    <p className="text-foreground-secondary text-sm">AI tools to help you land your next role</p>
   </div>

   <Tabs value={activeTab} onValueChange={setActiveTab}>
    <TabsList className="mb-6">
     <TabsTrigger value="applications">Applications</TabsTrigger>
     <TabsTrigger value="interview">Interview Prep</TabsTrigger>
     <TabsTrigger value="coverletters">Cover Letters</TabsTrigger>
    </TabsList>

    {/* ── Applications Tab ── */}
    <TabsContent value="applications">
     <div className="grid gap-3 md:grid-cols-3 mb-6 text-center">
      {[
       { label: "Applications this week", value: "15" },
       { label: "Interviews received", value: "3", accent: true },
       { label: "Avg time per app", value: "4 min" },
      ].map((s) => (
       <Card key={s.label}>
        <CardContent className="py-4">
         <p className={`text-2xl font-semibold ${s.accent ? "text-primary" : "text-foreground"}`}>{s.value}</p>
         <p className="text-xs text-foreground-secondary mt-0.5">{s.label}</p>
        </CardContent>
       </Card>
      ))}
     </div>

     <h2 className="text-section-label mb-4">Applications in Progress</h2>
     <div className="grid gap-4 md:grid-cols-3 mb-8">
      {applications.map((app) => (
       <Card key={app.id}>
        <CardContent className="p-4">
         <div className="mb-3 flex items-start justify-between">
          <div>
           <p className="text-sm font-medium text-foreground">{app.role}</p>
           <p className="text-xs text-foreground-secondary">at {app.company}</p>
          </div>
          <Badge className={`text-xs ${getStatusColor(app.status)}`}>{app.statusLabel}</Badge>
         </div>
         {app.interviewDate && (
          <p className="mb-2 text-xs text-primary">
           <Clock className="mr-1 inline h-3 w-3" />{app.interviewDate}
          </p>
         )}
         <div className="mb-3">
          <div className="mb-1 flex justify-between text-xs text-foreground-tertiary">
           <span>Autofill</span>
           <span>{app.autofillProgress}/{app.autofillTotal} fields</span>
          </div>
          <Progress value={(app.autofillProgress / app.autofillTotal) * 100} className="h-1.5" />
         </div>
         <div className="rounded-lg bg-primary-subtle p-2.5 mb-2">
          <p className="text-xs text-primary">→ {app.nextAction}</p>
         </div>
         {app.status === "ready" && (
          <Button size="sm" className="w-full text-xs">Complete and Send</Button>
         )}
        </CardContent>
       </Card>
      ))}
     </div>

     <h2 className="text-section-label mb-4">Suggested to Apply</h2>
     <div className="grid gap-4 md:grid-cols-2">
      {suggestedApplications.map((app) => (
       <Card key={app.id}>
        <CardContent className="p-4">
         <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs">
          ✦ Career OS can autofill 100% of this application
         </Badge>
         <div className="flex items-center justify-between">
          <div>
           <p className="text-sm font-medium text-foreground">{app.role}</p>
           <p className="text-xs text-foreground-secondary">at {app.company}</p>
          </div>
          <div className="text-right">
           <p className="text-lg font-semibold text-primary">{app.matchPercent}%</p>
           <p className="text-xs text-foreground-tertiary">match</p>
          </div>
         </div>
         <Button size="sm" className="mt-3 w-full text-xs">Start Application</Button>
        </CardContent>
       </Card>
      ))}
     </div>
    </TabsContent>

    {/* ── Interview Prep Tab ── */}
    <TabsContent value="interview">
     <InterviewChat />
    </TabsContent>

    {/* ── Cover Letters Tab ── */}
    <TabsContent value="coverletters">
     <div className="mb-6">
      <Dialog open={generateModalOpen} onOpenChange={(open) => { setGenerateModalOpen(open); if (!open) { setGeneratedLetter(false); setSuggestion(null) } }}>
       <DialogTrigger asChild>
        <Button className="gap-2">
         <Sparkles className="h-4 w-4" />
         Generate New Cover Letter
        </Button>
       </DialogTrigger>
       <DialogContent className="max-w-2xl">
        <DialogHeader>
         <DialogTitle>Generate Cover Letter</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
         <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger>
           <SelectValue placeholder="Choose a role..." />
          </SelectTrigger>
          <SelectContent>
           {availableRoles.map((role) => (
            <SelectItem key={role.id} value={role.id}>{role.label}</SelectItem>
           ))}
          </SelectContent>
         </Select>

         {!generatedLetter ? (
          <Button className="w-full" disabled={!selectedRole} onClick={() => setGeneratedLetter(true)}>
           Generate
          </Button>
         ) : (
          <>
           <div className="max-h-56 overflow-y-auto rounded-lg border border-border bg-card p-4 text-sm text-foreground whitespace-pre-wrap">
            {coverLetterText(
             availableRoles.find((r) => r.id === selectedRole)?.label.split(" at ")[0] ?? "",
             availableRoles.find((r) => r.id === selectedRole)?.label.split(" at ")[1] ?? ""
            )}
           </div>

           <p className="text-xs text-foreground-tertiary">Get AI suggestions:</p>
           <div className="flex gap-2 flex-wrap">
            {Object.entries({ opening: "Improve opening", tone: "Check tone", closing: "Fix closing" }).map(([key, label]) => (
             <button
              key={key}
              onClick={() => setSuggestion(key)}
              className={`text-xs rounded-lg border px-3 py-1.5 transition-colors ${
               suggestion === key
                ? "border-primary bg-primary/10 text-primary"
                : "border-card-border bg-card/60 text-foreground-secondary hover:text-foreground"
              }`}
             >
              {label}
             </button>
            ))}
           </div>

           {suggestion && (
            <div className="rounded-lg bg-primary-subtle p-3 text-xs text-primary">
             {suggestionTexts[suggestion]}
            </div>
           )}

           <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
             <Copy className="h-3.5 w-3.5" /> Copy
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => { setGeneratedLetter(false); setSuggestion(null) }}>
             <RefreshCw className="h-3.5 w-3.5" /> Regenerate
            </Button>
           </div>
          </>
         )}
        </div>
       </DialogContent>
      </Dialog>
     </div>

     <div className="space-y-3">
      {coverLetters.map((letter) => (
       <Card key={letter.id}>
        <CardContent className="p-4">
         <div className="flex items-center justify-between">
          <div>
           <p className="text-sm font-medium text-foreground">{letter.role}</p>
           <p className="text-xs text-foreground-secondary">{letter.company} · Generated {letter.date}</p>
          </div>
          <div className="flex items-center gap-2">
           <Dialog>
            <DialogTrigger asChild>
             <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Eye className="h-3.5 w-3.5" /> Preview
             </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
             <DialogHeader>
              <DialogTitle>{letter.role} at {letter.company}</DialogTitle>
             </DialogHeader>
             <div className="max-h-[55vh] overflow-y-auto rounded-lg border border-border bg-card p-5 text-sm text-foreground whitespace-pre-wrap">
              {coverLetterText(letter.role, letter.company)}
             </div>
            </DialogContent>
           </Dialog>
           <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Copy className="h-3.5 w-3.5" /> Copy
           </Button>
           <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" /> Regenerate
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
