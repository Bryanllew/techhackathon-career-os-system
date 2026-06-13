# Career OS iOS 玻璃风格重设计 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标:** 将 Career OS 重设计为深色 iOS 玻璃拟态风格，建立设计系统，改造布局和组件，打磨核心页面。

**架构:** 设计系统先行 — 用 CSS 变量 + Tailwind 工具类建立颜色/玻璃/排版体系。然后改造布局组件（侧边栏），再逐个适配 UI 组件，最后打磨页面。所有改动以 `backdrop-filter` 实现玻璃效果。

**技术栈:** Next.js 16、React 19、Tailwind CSS 4、shadcn/ui (Radix)、pnpm

---

### 文件结构规划

| 文件 | 改什么 | 职责 |
|------|--------|------|
| `styles/globals.css` | 全部重写 CSS 变量 + 玻璃工具类 | 设计系统 |
| `app/layout.tsx` | 强制暗色模式 | 根布局 |
| `app/candidate/dashboard/layout.tsx` | 侧边栏玻璃化 + 分组导航 | 候选人布局 |
| `app/employer/dashboard/layout.tsx` | 侧边栏玻璃化 + 分组导航 | 雇主布局 |
| `components/ui/card.tsx` | 玻璃背景 + 大圆角 | 卡片组件 |
| `components/ui/button.tsx` | iOS 风格按钮变体 | 按钮组件 |
| `components/ui/badge.tsx` | 半透明语义色 | 标签组件 |
| `components/ui/input.tsx` | 玻璃背景 + 发光聚焦 | 输入框组件 |
| `components/ui/progress.tsx` | 渐变填充 | 进度条组件 |
| `components/ui/separator.tsx` | 极细边框 | 分隔线 |
| `components/ui/tabs.tsx` | iOS 风格指示器 | 标签页 |
| `components/ui/dialog.tsx` | 玻璃背景 + 大圆角 | 弹窗 |
| `components/ui/sheet.tsx` | 玻璃背景 | 侧滑面板 |
| `components/ui/dropdown-menu.tsx` | 玻璃背景 | 下拉菜单 |
| `components/ui/popover.tsx` | 玻璃背景 | 浮层 |
| `components/ui/toast.tsx` | 玻璃背景 | 提示 |
| `app/candidate/dashboard/page.tsx` | 排版 + 卡片风格打磨 | 候选人首页 |
| `app/candidate/dashboard/overview/page.tsx` | 分组布局 + 大数字 | 候选人概览 |
| `app/employer/dashboard/page.tsx` | 排版 + 卡片风格打磨 | 雇主首页 |
| `app/employer/dashboard/people/page.tsx` | 分组布局 + 卡片 | 人才库 |

---

### Task 1: 重写设计系统 CSS

**文件:**
- 修改: `styles/globals.css`

- [ ] **Step 1: 替换全部 CSS 变量和基础样式**

用以下内容替换 `styles/globals.css` 的全部内容：

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  /* 背景层级 */
  --background: #08080D;
  --elevated: #0C0C14;
  --surface: #111118;

  /* 前景 / 文字 */
  --foreground: rgba(255, 255, 255, 0.9);
  --foreground-secondary: rgba(255, 255, 255, 0.6);
  --foreground-tertiary: rgba(255, 255, 255, 0.35);
  --foreground-disabled: rgba(255, 255, 255, 0.18);

  /* 语义色 — iOS 原生 */
  --primary: #007AFF;
  --primary-foreground: #ffffff;
  --primary-subtle: rgba(0, 122, 255, 0.12);
  --primary-border: rgba(0, 122, 255, 0.25);

  --success: #34C759;
  --success-subtle: rgba(52, 199, 89, 0.12);

  --warning: #FF9500;
  --warning-subtle: rgba(255, 149, 0, 0.12);

  --destructive: #FF3B30;
  --destructive-subtle: rgba(255, 59, 48, 0.12);

  /* 组件色 */
  --card: rgba(255, 255, 255, 0.04);
  --card-foreground: rgba(255, 255, 255, 0.9);
  --card-border: rgba(255, 255, 255, 0.06);

  --popover: var(--surface);
  --popover-foreground: var(--foreground);

  --secondary: rgba(255, 255, 255, 0.06);
  --secondary-foreground: rgba(255, 255, 255, 0.9);

  --muted: rgba(255, 255, 255, 0.04);
  --muted-foreground: rgba(255, 255, 255, 0.35);

  --accent: rgba(0, 122, 255, 0.12);
  --accent-foreground: rgba(0, 122, 255, 0.9);

  --border: rgba(255, 255, 255, 0.06);
  --border-light: rgba(255, 255, 255, 0.04);
  --input: rgba(255, 255, 255, 0.08);
  --ring: rgba(0, 122, 255, 0.4);

  /* 图表色 */
  --chart-1: #007AFF;
  --chart-2: #5856D6;
  --chart-3: #34C759;
  --chart-4: #FF9500;
  --chart-5: #FF3B30;

  /* 圆角系统 */
  --radius: 0.625rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* 侧边栏 — 玻璃材质 */
  --sidebar: rgba(255, 255, 255, 0.05);
  --sidebar-foreground: rgba(255, 255, 255, 0.85);
  --sidebar-primary: #007AFF;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: rgba(0, 122, 255, 0.12);
  --sidebar-accent-foreground: rgba(0, 122, 255, 0.9);
  --sidebar-border: rgba(255, 255, 255, 0.05);
  --sidebar-ring: rgba(0, 122, 255, 0.3);
}

/* 暗色 = 默认，.dark 与 :root 保持一致 */
.dark {
  --background: #08080D;
  --elevated: #0C0C14;
  --surface: #111118;
  --foreground: rgba(255, 255, 255, 0.9);
  --foreground-secondary: rgba(255, 255, 255, 0.6);
  --foreground-tertiary: rgba(255, 255, 255, 0.35);
  --foreground-disabled: rgba(255, 255, 255, 0.18);
  --primary: #007AFF;
  --primary-foreground: #ffffff;
  --primary-subtle: rgba(0, 122, 255, 0.12);
  --card: rgba(255, 255, 255, 0.04);
  --card-foreground: rgba(255, 255, 255, 0.9);
  --card-border: rgba(255, 255, 255, 0.06);
  --popover: var(--surface);
  --popover-foreground: var(--foreground);
  --secondary: rgba(255, 255, 255, 0.06);
  --secondary-foreground: rgba(255, 255, 255, 0.9);
  --muted: rgba(255, 255, 255, 0.04);
  --muted-foreground: rgba(255, 255, 255, 0.35);
  --accent: rgba(0, 122, 255, 0.12);
  --accent-foreground: rgba(0, 122, 255, 0.9);
  --destructive: #FF3B30;
  --destructive-subtle: rgba(255, 59, 48, 0.12);
  --border: rgba(255, 255, 255, 0.06);
  --border-light: rgba(255, 255, 255, 0.04);
  --input: rgba(255, 255, 255, 0.08);
  --ring: rgba(0, 122, 255, 0.4);
  --chart-1: #007AFF;
  --chart-2: #5856D6;
  --chart-3: #34C759;
  --chart-4: #FF9500;
  --chart-5: #FF3B30;
  --sidebar: rgba(255, 255, 255, 0.05);
  --sidebar-foreground: rgba(255, 255, 255, 0.85);
  --sidebar-primary: #007AFF;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: rgba(0, 122, 255, 0.12);
  --sidebar-accent-foreground: rgba(0, 122, 255, 0.9);
  --sidebar-border: rgba(255, 255, 255, 0.05);
  --sidebar-ring: rgba(0, 122, 255, 0.3);
}

@theme inline {
  --font-sans: 'Inter', 'Inter Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';

  /* 背景色 */
  --color-background: var(--background);
  --color-elevated: var(--elevated);
  --color-surface: var(--surface);

  /* 前景色 */
  --color-foreground: var(--foreground);
  --color-foreground-secondary: var(--foreground-secondary);
  --color-foreground-tertiary: var(--foreground-tertiary);
  --color-foreground-disabled: var(--foreground-disabled);

  /* 语义色 */
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-subtle: var(--primary-subtle);
  --color-primary-border: var(--primary-border);
  --color-success: var(--success);
  --color-success-subtle: var(--success-subtle);
  --color-warning: var(--warning);
  --color-warning-subtle: var(--warning-subtle);
  --color-destructive: var(--destructive);
  --color-destructive-subtle: var(--destructive-subtle);

  /* 组件色 */
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-card-border: var(--card-border);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-border-light: var(--border-light);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* 图表色 */
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  /* 半径 */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* 侧边栏 */
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* ====== 玻璃工具类 ====== */
@utility glass-light {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@utility glass-mid {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

@utility glass-heavy {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.10);
}

/* ====== 排版工具类 ====== */
@utility text-hero {
  font-size: 3.5rem;        /* 56px */
  font-weight: 200;
  letter-spacing: -0.05em;
  line-height: 1.05;
}

@utility text-data {
  font-size: 2.625rem;      /* 42px */
  font-weight: 200;
  letter-spacing: -0.04em;
}

@utility text-section-label {
  font-size: 0.625rem;       /* 10px */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--foreground-tertiary);
}

/* ====== iOS 分组容器 ====== */
@utility ios-group {
  background: var(--card);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

@utility ios-group-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-light);
}

@utility ios-group-row-last {
  border-bottom: none;
}
```

- [ ] **Step 2: 构建并验证编译**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

期望: ✓ Compiled successfully，22 条路由通过

---

### Task 2: 强制暗色模式

**文件:**
- 修改: `app/layout.tsx`

- [ ] **Step 1: 在 `<html>` 标签上添加 `.dark` 类**

将 `app/layout.tsx` 中的 `<html lang="en" className="bg-background">` 改为：

```tsx
<html lang="en" className="dark bg-background">
```

完整改动：找到第 48 行，修改 `<html>` 标签。

- [ ] **Step 2: 构建验证**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

期望: ✓ Compiled successfully

---

### Task 3: 候选人侧边栏 iOS 化

**文件:**
- 修改: `app/candidate/dashboard/layout.tsx`

- [ ] **Step 1: 重写侧边栏结构**

用以下内容替换整个 `app/candidate/dashboard/layout.tsx`：

```tsx
"use client"

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
} from "lucide-react"
import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "主要",
    items: [
      { name: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
      { name: "Explore", href: "/candidate/dashboard/explore", icon: Search },
      { name: "Jobs", href: "/candidate/dashboard/jobs", icon: Briefcase },
      { name: "Smart Apply", href: "/candidate/dashboard/smart-apply", icon: Sparkles },
    ],
  },
  {
    label: "个人",
    items: [
      { name: "Resume", href: "/candidate/dashboard/resume", icon: FileText },
      { name: "Skills", href: "/candidate/dashboard/skills", icon: TrendingUp },
      { name: "Trajectory", href: "/candidate/dashboard/trajectory", icon: CalendarDays },
      { name: "Profile", href: "/candidate/dashboard/profile", icon: User },
    ],
  },
]

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* 玻璃侧边栏 */}
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

        {/* 导航 */}
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

        {/* 用户区 */}
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

      {/* 内容区 */}
      <main className="flex-1 pl-60">
        <div className="mx-auto max-w-[960px] px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: 构建验证**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

期望: ✓ Compiled successfully

---

### Task 4: 雇主侧边栏 iOS 化

**文件:**
- 修改: `app/employer/dashboard/layout.tsx`

- [ ] **Step 1: 重写侧边栏结构**

用以下内容替换整个 `app/employer/dashboard/layout.tsx`：

```tsx
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
    label: "人才",
    items: [
      { name: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
      { name: "Talent Search", href: "/employer/dashboard/search", icon: Search },
      { name: "People Signals", href: "/employer/dashboard/people", icon: Users },
      { name: "Saved", href: "/employer/dashboard/saved", icon: Bookmark },
    ],
  },
  {
    label: "运营",
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
      {/* 玻璃侧边栏 */}
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

        {/* 导航 */}
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

        {/* 用户区 */}
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

      {/* 内容区 */}
      <main className="flex-1 pl-60">
        <div className="mx-auto max-w-[960px] px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: 构建验证**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

期望: ✓ Compiled successfully

---

### Task 5: UIKit 组件适配

**文件:**
- 修改: `components/ui/card.tsx`、`button.tsx`、`badge.tsx`、`input.tsx`、`progress.tsx`、`separator.tsx`、`tabs.tsx`

- [ ] **Step 1: Card 组件 — 玻璃卡片风格**

修改 `components/ui/card.tsx` 中 `<div>` 的 className：

```tsx
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-card-border py-6 backdrop-blur-[10px]',
        className,
      )}
      {...props}
    />
  )
}
```

- [ ] **Step 2: Button 组件 — 添加 ios 变体**

修改 `components/ui/button.tsx` 中的 buttonVariants。在 variants.variant 对象里添加 `ios` 和修改 default：

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-none',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline:
          'border border-input bg-transparent text-foreground hover:bg-secondary',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'text-foreground-secondary hover:bg-secondary hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-11 rounded-lg px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
```

- [ ] **Step 3: Badge 组件 — 半透明语义色**

修改 `components/ui/badge.tsx` 中的 badgeVariants：

```tsx
const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden border',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary-subtle text-primary',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive-subtle text-destructive',
        outline:
          'border-border text-foreground-secondary',
        success:
          'border-transparent bg-success-subtle text-success',
        warning:
          'border-transparent bg-warning-subtle text-warning',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
```

- [ ] **Step 4: Input 组件 — 玻璃背景 + 蓝色发光聚焦**

修改 `components/ui/input.tsx`：

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'bg-muted/50 border border-input text-foreground placeholder:text-foreground-disabled',
        'flex h-10 w-full min-w-0 rounded-lg px-3.5 py-2 text-sm',
        'transition-all duration-150',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'focus-visible:outline-none focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
```

- [ ] **Step 5: Progress 组件 — 渐变填充**

修改 `components/ui/progress.tsx` 中指示器 div 的 className。找到指示器：
```tsx
className={cn(
  'h-full w-full flex-1 rounded-full transition-all',
  'bg-gradient-to-r from-primary to-[#5856D6]',
)}
```

- [ ] **Step 6: Separator 组件 — 极细边框**

修改 `components/ui/separator.tsx`：

```tsx
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<'hr'>) {
  return (
    <hr
      data-slot="separator"
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'shrink-0 border-t border-border-light',
        orientation === 'horizontal' ? 'w-full' : 'h-full border-l',
        className,
      )}
      {...props}
    />
  )
}
```

- [ ] **Step 7: Tabs 组件 — iOS 风格指示器**

修改 `components/ui/tabs.tsx` 中 TabsList 和 TabsTrigger。找到 TabsList：
```tsx
className={cn(
  'inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-foreground-tertiary',
  className,
)}
```

找到 TabsTrigger：
```tsx
className={cn(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
  'disabled:pointer-events-none disabled:opacity-50',
  'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
  className,
)}
```

- [ ] **Step 8: 构建验证**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

期望: ✓ Compiled successfully

---

### Task 6: 玻璃浮层组件

**文件:**
- 修改: `components/ui/dialog.tsx`、`sheet.tsx`、`dropdown-menu.tsx`、`popover.tsx`、`toast.tsx`

- [ ] **Step 1: Dialog — 玻璃背景 + 24px 圆角**

修改 `components/ui/dialog.tsx`，找到 DialogContent 的 `<div>` 或 Primitive Content：

```tsx
className={cn(
  'bg-surface/90 backdrop-blur-[30px] border border-white/10',
  'rounded-2xl shadow-2xl',
  // ... 保留现有的尺寸和定位类
)}
```

- [ ] **Step 2: Sheet — 玻璃背景**

修改 `components/ui/sheet.tsx`，找到 SheetContent：

```tsx
className={cn(
  'bg-surface/90 backdrop-blur-[30px] border-white/10',
  // ... 保留现有类
)}
```

- [ ] **Step 3: DropdownMenu — 玻璃背景 + 12px 圆角**

修改 `components/ui/dropdown-menu.tsx`，找到 Content：

```tsx
className={cn(
  'bg-surface/95 backdrop-blur-[20px] border border-white/10 rounded-xl',
  // ... 保留现有类
)}
```

- [ ] **Step 4: Popover — 玻璃背景**

修改 `components/ui/popover.tsx`，找到 Content：

```tsx
className={cn(
  'bg-surface/95 backdrop-blur-[20px] border border-white/10 rounded-xl',
  // ... 保留现有类
)}
```

- [ ] **Step 5: Toast — 玻璃背景**

修改 `components/ui/toast.tsx`，找到 toast 容器：

```tsx
className={cn(
  'group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-xl border border-white/10 p-6 shadow-2xl transition-all',
  'bg-surface/90 backdrop-blur-[20px]',
  // ... 保留现有类
)}
```

- [ ] **Step 6: 构建验证**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

期望: ✓ Compiled successfully

---

### Task 7: 候选人 Dashboard 首页深度打磨

**文件:**
- 修改: `app/candidate/dashboard/page.tsx`

- [ ] **Step 1: 重写页面头部和布局结构**

这是最大的改动。需要重写页面的主要结构。查阅当前文件结构（约 500 行），保留数据逻辑，替换 UI 样式。

**关键改动：**

1. 页面头部用 iOS 风格：
```tsx
<div className="mb-8">
  <p className="text-section-label mb-1">Candidate</p>
  <h1 className="text-h1 text-foreground">Dashboard</h1>
  <p className="text-foreground-secondary text-sm mt-1">周二下午好，Jordan</p>
</div>
```

2. 快捷操作改为 iOS 分组列表：
```tsx
<div className="mb-8">
  <p className="text-section-label mb-3">快捷操作</p>
  <div className="ios-group">
    {quickActions.map((action, i) => (
      <Link
        key={action.label}
        href={action.href}
        className={cn(
          "ios-group-row text-primary text-sm font-medium",
          i === quickActions.length - 1 && "ios-group-row-last"
        )}
      >
        <span className="flex items-center gap-3">
          <action.icon className="h-4 w-4 opacity-70" />
          {action.label}
        </span>
        <span className="text-foreground-disabled">→</span>
      </Link>
    ))}
  </div>
</div>
```

3. 统计卡片改为大数字风格：
```tsx
<div className="ios-group p-6 mb-8">
  <p className="text-section-label mb-4">月度洞察</p>
  <div className="flex gap-12">
    <div>
      <p className="text-data text-foreground">142</p>
      <p className="text-foreground-tertiary text-xs mt-1">新匹配岗位</p>
    </div>
    <div>
      <p className="text-data text-primary">87%</p>
      <p className="text-foreground-tertiary text-xs mt-1">技能匹配度</p>
    </div>
    <div>
      <p className="text-data text-foreground">+18%</p>
      <p className="text-foreground-tertiary text-xs mt-1">薪资涨幅</p>
    </div>
  </div>
</div>
```

4. 活动列表用 iOS 分组行：
```tsx
<div className="mb-8">
  <p className="text-section-label mb-3">即将到来</p>
  <div className="ios-group">
    {upcomingEvents.map((event, i) => (
      <div
        key={event.title}
        className={cn(
          "ios-group-row flex-col items-start gap-1",
          i === upcomingEvents.length - 1 && "ios-group-row-last"
        )}
      >
        <span className="text-foreground text-sm font-medium">{event.title}</span>
        <span className="text-foreground-tertiary text-xs">
          {event.date}{event.time ? ` · ${event.time}` : ""}
        </span>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 2: 构建验证**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

---

### Task 8: 雇主 Dashboard 首页深度打磨

**文件:**
- 修改: `app/employer/dashboard/page.tsx`

- [ ] **Step 1: 应用相同的 iOS 分组 + 大数字风格**

与 Task 7 相同的方式处理雇主首页。页面头部改为：
```tsx
<div className="mb-8">
  <p className="text-section-label mb-1">Employer</p>
  <h1 className="text-h1 text-foreground">Dashboard</h1>
  <p className="text-foreground-secondary text-sm mt-1">周三上午好，Sarah</p>
</div>
```

统计卡片、职位列表、最近活动都套用 `ios-group` + `ios-group-row` 结构。

- [ ] **Step 2: 构建验证**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

---

### Task 9: 其余页面统一样式 + 最终验证

**文件:**
- 修改: 所有其余 dashboard 页面（overview, explore, jobs, resume, skills, smart-apply, trajectory, profile, onboarding、employer 下的 search, people, roles, saved, reengagement, workforce, candidate/[id], roles/[id]/applicants）
- 修改: `app/page.tsx`（首页）

- [ ] **Step 1: 逐页统一处理**

每个页面的改动模式相同：
1. 替换 `Card` 用到的 shadow/背景为 iOS 风格
2. 将列表项改为 `ios-group-row` 结构
3. 统计数字用 `text-data`
4. 区块标题用 `text-section-label`

逐页运行 `pnpm build` 确保不引入错误。

- [ ] **Step 2: 开发服务器验证**

```bash
cd "C:/Cursor claude code/career-os" && pnpm dev
```

打开 `http://localhost:3000`，手动检查每个页面：
- 侧边栏玻璃效果是否可见
- 卡片是否有磨砂感
- 颜色是否统一暗色
- 排版是否清晰

---

### Task 10: 最终构建 + Git 提交

- [ ] **Step 1: 最终生产构建**

```bash
cd "C:/Cursor claude code/career-os" && pnpm build 2>&1
```

期望: ✓ Compiled successfully，22 条路由全部通过，零错误零警告

- [ ] **Step 2: 提交**

```bash
cd "C:/Cursor claude code" && git add career-os/ && git commit -m "feat: iOS glass morphism dark redesign for Career OS

- New dark iOS color system with glass utilities
- Frosted glass sidebars with grouped navigation
- iOS Settings-style grouped list layout
- Glass-adapted UI components (card, button, badge, input, progress)
- Luxury typography scale with thin-weight data numbers
- Polished candidate and employer dashboard pages
- Glass overlays on dialog, sheet, dropdown, popover, toast"
```
