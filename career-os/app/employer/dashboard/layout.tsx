"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
 LayoutDashboard,
 Search,
 Users,
 Briefcase,
 BarChart3,
 RotateCcw,
 Bookmark,
 LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navGroups = [
 {
  label: "Talent",
  items: [
   { name: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
   { name: "Talent Search", href: "/employer/dashboard/search", icon: Search },
   { name: "People Signals", href: "/employer/dashboard/people", icon: Users },
   { name: "Saved", href: "/employer/dashboard/saved", icon: Bookmark },
  ],
 },
 {
  label: "Operations",
  items: [
   { name: "Active Roles", href: "/employer/dashboard/roles", icon: Briefcase },
   { name: "Workforce", href: "/employer/dashboard/workforce", icon: BarChart3 },
   { name: "Re-engagement", href: "/employer/dashboard/reengagement", icon: RotateCcw },
  ],
 },
]

export default function EmployerLayout({
 children,
}: {
 children: React.ReactNode
}) {
 const pathname = usePathname()

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
      Employer
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
         (item.href !== "/employer/dashboard" &&
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
       <span className="text-xs font-medium text-white">ST</span>
      </div>
      <div className="flex-1 min-w-0">
       <p className="text-[13px] font-medium text-sidebar-foreground truncate">
        Sarah Thompson
       </p>
       <p className="text-[11px] text-sidebar-foreground/50 truncate">
        Talent Lead, Stripe
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
  </div>
 )
}
