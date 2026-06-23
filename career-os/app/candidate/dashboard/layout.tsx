"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
 LayoutDashboard,
 Search,
 Briefcase,
 FileText,
 TrendingUp,
 CalendarDays,
 Sparkles,
 User,
 LogOut,
 CloudSun,
 Users,
 Brain,
 Trophy,
 DollarSign,
 BookOpen,
 MessageCircle,
 X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CoachChat } from "@/components/ai-coach/coach-chat"

const navGroups = [
 {
  label: "Discover",
  items: [
   { name: "Home", href: "/candidate/dashboard", icon: LayoutDashboard },
   { name: "Opportunity Board", href: "/candidate/dashboard/explore", icon: Search },
   { name: "Job Matches", href: "/candidate/dashboard/jobs", icon: Briefcase },
   { name: "Applications", href: "/candidate/dashboard/smart-apply", icon: Sparkles },
   { name: "Market Pulse", href: "/candidate/dashboard/forecast", icon: CloudSun },
   { name: "Peer Paths", href: "/candidate/dashboard/peers", icon: Users },
  ],
 },
 {
  label: "My Career",
  items: [
   { name: "Resume Builder", href: "/candidate/dashboard/resume", icon: FileText },
   { name: "Skills Gap", href: "/candidate/dashboard/skills", icon: TrendingUp },
   { name: "Career Paths", href: "/candidate/dashboard/trajectory", icon: CalendarDays },
   { name: "Work Style", href: "/candidate/dashboard/quiz", icon: Brain },
   { name: "Achievements", href: "/candidate/dashboard/portfolio", icon: Trophy },
   { name: "Salary Insights", href: "/candidate/dashboard/salary", icon: DollarSign },
   { name: "Life Planning", href: "/candidate/dashboard/chapters", icon: BookOpen },
   { name: "My Profile", href: "/candidate/dashboard/profile", icon: User },
  ],
 },
]

export default function CandidateLayout({
 children,
}: {
 children: React.ReactNode
}) {
 const pathname = usePathname()
 const [chatOpen, setChatOpen] = useState(false)

 return (
  <div className="flex min-h-screen bg-background">
   {/* Glass sidebar */}
   <aside className="fixed inset-y-0 left-0 z-50 flex w-60 flex-col glass-mid border-r border-sidebar-border">
    {/* Logo */}
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-sidebar-border">
     <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[#5856D6]">
      <span className="text-sm font-semibold text-white">C</span>
     </div>
     <span className="text-base font-medium text-sidebar-foreground tracking-tight">
      Career OS
     </span>
     <span className="ml-auto rounded-md bg-sidebar-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sidebar-accent-foreground/70">
      Candidate
     </span>
    </div>

    {/* Navigation */}
    <nav className="flex-1 overflow-y-auto py-3">
     {navGroups.map((group) => (
      <div key={group.label} className="mb-2">
       <div className="px-5 py-2 text-[10px] font-medium uppercase tracking-widest text-foreground-disabled">
        {group.label}
       </div>
       {group.items.map((item) => {
        const isActive =
         pathname === item.href ||
         (item.href !== "/candidate/dashboard" &&
          pathname.startsWith(item.href))
        return (
         <Link
          key={item.name}
          href={item.href}
          className={cn(
           "flex items-center gap-2.5 mx-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150",
           isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          )}
         >
          <item.icon className="h-4 w-4" />
          {item.name}
         </Link>
        )
       })}
      </div>
     ))}
    </nav>

    {/* User area */}
    <div className="border-t border-sidebar-border p-3 mx-3 mb-3 rounded-xl glass-light">
     <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5856D6] to-primary">
       <span className="text-xs font-medium text-white">JC</span>
      </div>
      <div className="flex-1 min-w-0">
       <p className="text-[13px] font-medium text-sidebar-foreground truncate">
        Jordan Chen
       </p>
       <p className="text-[11px] text-sidebar-foreground/50 truncate">
        Data Scientist
       </p>
      </div>
      <Link
       href="/"
       className="rounded-lg p-1.5 text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
      >
       <LogOut className="h-3.5 w-3.5" />
      </Link>
     </div>
    </div>
   </aside>

   {/* Content area */}
   <main className="flex-1 pl-60">
    <div className="px-8 py-8">{children}</div>
   </main>

   {/* 浮动 AI Coach 聊天按钮 */}
   <div className="fixed bottom-6 right-6 z-50">
    {chatOpen ? (
     <div className="w-[380px] h-[520px] rounded-2xl border border-card-border bg-background shadow-2xl flex flex-col overflow-hidden">
      {/* 聊天头部 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-card-border bg-card/80 backdrop-blur-sm flex-shrink-0">
       <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center">
         <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
         <p className="text-sm font-medium text-foreground">AI Career Coach</p>
         <p className="text-[10px] text-foreground-tertiary">Always here to help</p>
        </div>
       </div>
       <button
        onClick={() => setChatOpen(false)}
        className="h-7 w-7 rounded-lg flex items-center justify-center text-foreground-tertiary hover:text-foreground hover:bg-secondary transition-colors"
       >
        <X className="h-4 w-4" />
       </button>
      </div>
      {/* 聊天内容 */}
      <div className="flex-1 min-h-0">
       <CoachChat />
      </div>
     </div>
    ) : (
     <button
      onClick={() => setChatOpen(true)}
      className="flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105"
     >
      <MessageCircle className="h-4 w-4" />
      Ask Career Coach
     </button>
    )}
   </div>
  </div>
 )
}
