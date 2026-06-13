# Career OS iOS 玻璃风格重设计 — 设计文档

**日期：** 2026-06-06
**目标：** 将 Career OS 整体重设计为 Apple iOS 深色玻璃拟态风格，营造奢华而简洁的体验。

---

## 1. 设计方向总览

| 维度 | 选择 |
|------|------|
| 适用范围 | 候选人 + 雇主两侧统一 |
| 强调色 | iOS Blue `#007AFF` |
| 玻璃强度 | 适中 — 卡片、侧边栏、弹窗有可见模糊，背景保持深色 |
| 布局风格 | iOS 设置风格 — 分组列表 + 圆角卡片区域 |
| 奢华表达 | 材质精致 + 排版大气结合 |
| 导航 | 保留左侧边栏，加玻璃材质和 iOS 化排版 |
| 实施方案 | C — 设计系统先行 + 核心页面深度打磨 |

---

## 2. 色彩系统

### 背景色（3 层）

| Token | 色值 | 用途 |
|-------|------|------|
| `--background` | `#08080D` | 页面底层背景 |
| `--elevated` | `#0C0C14` | 侧边栏、卡片表面 |
| `--surface` | `#111118` | 弹窗、Sheet、下拉菜单 |

### 玻璃材质（3 层）

| Token | blur | 背景透明度 | 边框透明度 | 用途 |
|-------|------|-----------|-----------|------|
| Glass-Light | `blur(10px)` | `rgba(255,255,255,0.03)` | `rgba(255,255,255,0.05)` | 卡片 |
| Glass-Mid | `blur(20px)` | `rgba(255,255,255,0.05)` | `rgba(255,255,255,0.07)` | 侧边栏、导航 |
| Glass-Heavy | `blur(30px)` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.10)` | 弹窗、Sheet |

### 语义色（iOS 原生）

| Token | 色值 | 用途 |
|-------|------|------|
| Primary | `#007AFF` | 主操作、选中态、链接 |
| Success | `#34C759` | 成功、已通过 |
| Warning | `#FF9500` | 警告、待处理 |
| Danger | `#FF3B30` | 删除、拒绝 |

### 文字透明度（4 级）

| Token | 透明度 | 用途 |
|-------|--------|------|
| Primary Text | 90% | 标题、重要内容 |
| Secondary Text | 60% | 正文、说明 |
| Tertiary Text | 35% | 辅助信息、标签 |
| Disabled | 18% | 禁用态、占位符 |

---

## 3. 排版系统

### 标题层级

| 级别 | 字号 | 字重 | 间距 | 用途 |
|------|------|------|------|------|
| Hero | 56px | 200 (Thin) | -2px | 仪表盘首页大标题 |
| H1 | 32px | 400 | -0.5px | 页面标题 |
| H2 | 20px | 500 | -0.3px | 区块标题 |
| H3 | 15px | 600 | -0.2px | 小节标题 |

### 正文与数据

| 类型 | 字号 | 字重 | 说明 |
|------|------|------|------|
| 大数字 | 42px | 200 | 统计卡片核心数据 |
| 正文 | 15px | 400 | 行高 1.6 |
| 小字/标签 | 11-12px | 400 | Badge、时间戳 |
| 分组标签 | 10px | 400 | 大写、字间距 1.5px |

### 圆角系统

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | 6px | 按钮、输入框、Badge |
| `--radius-md` | 10px | 小卡片、下拉菜单 |
| `--radius-lg` | 16px | 卡片、分组容器 |
| `--radius-xl` | 24px | 弹窗、Sheet |

### 间距系统

| Token | 值 |
|-------|-----|
| xs | 8px |
| sm | 16px |
| md | 24px |
| lg | 36px |
| xl | 52px |

---

## 4. 布局结构

### 侧边栏（240px 固定）

- **背景：** Glass-Mid — `blur(20px)` + `rgba(255,255,255,0.05)`
- **Logo：** 渐变图标（#007AFF → #5856D6），34×34px，圆角 9px
- **导航：** 分组显示，每组有 10px 大写标签，选中项蓝色高亮
- **用户区：** 底部固定，头像用渐变圆形，显示姓名和角色
- **行为：** 固定不随内容滚动

### 内容区（余下宽度）

- **背景：** Base `#08080D` 纯色
- **页面头部：** 小标签（大写）+ H1 标题 + 问候语
- **内容结构：** iOS 分组列表 — 每组 = 大写标签 + 圆角玻璃容器
- **容器内部：** 行式布局，细分隔线（`rgba(255,255,255,0.04)`）
- **最大内容宽度：** 960px（在大屏幕上居中避免过宽）

---

## 5. 组件改造

### 改样式（功能不变）

- **Card** — 加 Glass-Light，圆角 16px，精致边框
- **Button** — Primary 纯色 `#007AFF`，Secondary 玻璃边框，Ghost 蓝色半透明
- **Input** — 玻璃背景 + 微边框，聚焦时蓝色发光环
- **Badge** — 半透明底色 + 对应语义色文字
- **Progress** — 渐变填充（#007AFF → #5856D6）
- **Separator** — 极细边框 `rgba(255,255,255,0.04)`
- **Tabs** — 下划线指示器用蓝色，非激活态灰色文字

### 加玻璃效果

- **Sidebar** — Glass-Mid 背景
- **Sheet / Dialog** — Glass-Heavy 背景 + 大圆角 24px
- **Dropdown / Popover** — Glass-Heavy 背景 + 12px 圆角
- **HoverCard** — Glass-Light 背景
- **Toast** — Glass-Mid + 模糊

### 基本不动

Checkbox、Radio、Slider、Accordion、Avatar、Skeleton、Tooltip 保持现有实现，只适配暗色。

---

## 6. 实现范围

### 阶段 1：设计系统（globals.css）

- 用本文档的色彩、排版、圆角、间距替换全部 CSS 变量
- 添加玻璃工具类（`.glass-light`、`.glass-mid`、`.glass-heavy`）
- 确保 `.dark` 为默认 + 唯一模式

### 阶段 2：布局组件

- `components/ui/sidebar.tsx` — 玻璃背景 + 分组导航 + 渐变 Logo
- 候选人布局 `app/candidate/dashboard/layout.tsx`
- 雇主布局 `app/employer/dashboard/layout.tsx`

### 阶段 3：UI 组件逐个适配

- Card、Button、Input、Badge、Progress、Separator、Tabs
- Dialog、Sheet、Dropdown、Popover、Toast

### 阶段 4：核心页面深度打磨

- 候选人 Dashboard 首页 `/candidate/dashboard`
- 候选人 Overview `/candidate/dashboard/overview`
- 雇主 Dashboard 首页 `/employer/dashboard`
- 雇主 People 页面 `/employer/dashboard/people`

### 阶段 5：其余页面统一应用

- 所有剩余页面套用新的基础样式和布局

---

## 7. 技术要求

- **CSS：** Tailwind CSS 4 + 自定义 CSS 变量 + `backdrop-filter`
- **浏览器：** 需要 `backdrop-filter` 支持（所有现代浏览器均支持）
- **回退：** 在不支持 `backdrop-filter` 的环境下，回退为纯色半透明背景
- **性能：** 玻璃模糊只在必要的固定元素上使用（侧边栏、弹窗），避免大量 DOM 导致卡顿
