"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, User } from "lucide-react"

type Message = { role: "ai" | "user"; text: string }

const suggestedQuestions = [
 "How am I doing overall?",
 "What should I focus on today?",
 "Help me prepare for my Stripe interview",
 "Am I on track for my goal?",
 "What skills should I learn next?",
 "How do I ask for a higher salary?",
]

function getAIResponse(input: string): string {
 const lower = input.toLowerCase()

 if (lower.includes("how am i doing") || lower.includes("overall") || lower.includes("progress")) {
  return "You are doing well, Alex. Your profile strength is at 72% and you have a 5-day activity streak. You have 3 active applications and an interview with Stripe in 3 days. The main thing holding you back right now is the ML certification — completing that would significantly improve your chances for senior roles."
 }
 if (lower.includes("today") || lower.includes("focus") || lower.includes("should i do")) {
  return "Based on your upcoming interview with Stripe on June 18, here is what I recommend for today:\n\n1. Review SQL window functions — Stripe interviews often include these.\n2. Prepare one STAR story about a data project you led.\n3. Check your Notion application — it has 2 incomplete fields.\n\nThese three things will move the needle the most right now."
 }
 if (lower.includes("interview") || lower.includes("stripe") || lower.includes("prepare")) {
  return "For your Stripe interview on June 18, focus on these three areas:\n\n• Technical: SQL window functions, Python for data manipulation, and A/B testing methodology.\n• Behavioural: Stripe values ownership and impact — prepare stories with clear before/after metrics.\n• Company knowledge: Understand Stripe's data infrastructure blog posts and their approach to fraud detection.\n\nAs a Wolf type, you naturally lead with confidence — use that energy in the room. Good luck!"
 }
 if (lower.includes("on track") || lower.includes("goal") || lower.includes("data scientist")) {
  return "You are 33% toward your goal of becoming a Senior Data Scientist within 18 months. You are on track, but the ML certification milestone is overdue. At your current pace, you may need 20 months instead of 18 if you do not start the certification in the next 3 weeks.\n\nMy advice: block 2 hours this weekend to enrol in the Google Cloud ML course. It is the single highest-leverage action right now."
 }
 if (lower.includes("skill") || lower.includes("learn") || lower.includes("study")) {
  return "Based on the current market and your career goal, here are the three skills with the highest return right now:\n\n1. Machine Learning (Python / scikit-learn) — critical for Senior DS roles.\n2. dbt — analytics engineering is the fastest-growing adjacent skill.\n3. Spark / Databricks — as data scales, this becomes a differentiator.\n\nStart with ML since it directly unblocks your goal. The others are 6–12 month horizon investments."
 }
 if (lower.includes("salary") || lower.includes("pay") || lower.includes("raise") || lower.includes("negotiate")) {
  return "The market median for a Data Analyst with your experience in Kuala Lumpur is around RM 6,800/month. If you are earning below that, here is how to open the conversation:\n\n\"I have done some research on market rates for this role. Based on my experience and recent work — like the churn dashboard that reduced churn by 12% — I believe a range of RM X to RM Y reflects my contribution accurately.\"\n\nAlways anchor with a number, not a range first. And time it before your next review, not after."
 }
 if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
  return "Hi Alex! I am your AI Career Coach. I have been following your progress and there are a few things I think we should talk about. What is on your mind today?\n\nOr you can pick one of the suggested topics below."
 }
 if (lower.includes("wolf") || lower.includes("animal") || lower.includes("personality") || lower.includes("type")) {
  return "As a Wolf type, your natural strengths are leadership, decisiveness, and building trust quickly. This makes you a great fit for analytics lead roles and team-oriented data science positions.\n\nOne thing to watch: Wolves can sometimes push for quick decisions in environments that need more deliberation. In interviews, balance your decisiveness with moments that show you also listen and adapt."
 }
 return "That is a great question. Based on your profile and current stage, here is my honest take:\n\nYou are in a strong position — your skills are relevant, your trajectory is clear, and you have real experience to talk about. The biggest gap right now is not skills or experience, it is the ML certification and applying to a few more senior roles to get interview reps in.\n\nWhat specific part of your job search would you like to dig into?"
}

export function CoachChat() {
 const [messages, setMessages] = useState<Message[]>([
  {
   role: "ai",
   text: "Hi Alex! I am your Career Coach. I have been watching your progress. You have an interview with Stripe in 3 days — want help preparing? Or ask me anything else.",
  },
 ])
 const [input, setInput] = useState("")
 const [loading, setLoading] = useState(false)
 const bottomRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" })
 }, [messages])

 const send = (text: string) => {
  if (!text.trim()) return
  const userMsg: Message = { role: "user", text }
  setMessages((prev) => [...prev, userMsg])
  setInput("")
  setLoading(true)
  setTimeout(() => {
   setMessages((prev) => [...prev, { role: "ai", text: getAIResponse(text) }])
   setLoading(false)
  }, 700)
 }

 return (
  <div className="flex flex-col h-full">
   {/* 聊天记录 */}
   <div className="flex-1 overflow-y-auto space-y-3 p-4 min-h-0">
    {messages.map((msg, i) => (
     <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
      <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5 ${
       msg.role === "ai" ? "bg-primary/15" : "bg-secondary"
      }`}>
       {msg.role === "ai"
        ? <Bot className="h-3 w-3 text-primary" />
        : <User className="h-3 w-3 text-foreground-secondary" />}
      </div>
      <div className={`rounded-xl px-3.5 py-2.5 text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed ${
       msg.role === "ai"
        ? "bg-card border border-card-border text-foreground"
        : "bg-primary text-primary-foreground"
      }`}>
       {msg.text}
      </div>
     </div>
    ))}
    {loading && (
     <div className="flex gap-2.5">
      <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
       <Bot className="h-3 w-3 text-primary" />
      </div>
      <div className="rounded-xl px-3.5 py-2.5 bg-card border border-card-border text-xs text-foreground-tertiary">
       Thinking...
      </div>
     </div>
    )}
    <div ref={bottomRef} />
   </div>

   {/* 建议问题 */}
   <div className="px-4 pb-2">
    <div className="flex gap-1.5 flex-wrap">
     {suggestedQuestions.slice(0, 3).map((q) => (
      <button
       key={q}
       onClick={() => send(q)}
       className="text-xs rounded-lg border border-card-border bg-card/60 px-2.5 py-1.5 text-foreground-secondary hover:text-foreground hover:border-primary/30 transition-colors"
      >
       {q}
      </button>
     ))}
    </div>
   </div>

   {/* 输入框 */}
   <div className="flex gap-2 p-4 pt-2 border-t border-card-border">
    <Textarea
     placeholder="Ask your coach anything..."
     value={input}
     onChange={(e) => setInput(e.target.value)}
     onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input) } }}
     className="flex-1 min-h-[40px] max-h-[100px] resize-none text-sm"
     rows={1}
    />
    <Button size="sm" onClick={() => send(input)} disabled={!input.trim() || loading} className="self-end">
     <Send className="h-3.5 w-3.5" />
    </Button>
   </div>
  </div>
 )
}
