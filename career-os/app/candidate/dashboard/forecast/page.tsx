"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CloudSun, Sun, Cloud, CloudRain, Snowflake, TrendingUp, TrendingDown, Minus } from "lucide-react"

type Climate = "hot" | "warm" | "cloudy" | "rainy" | "cold"

const climateConfig: Record<Climate, {
 icon: React.ElementType
 label: string
 color: string
 bgColor: string
 description: string
}> = {
 hot: { icon: Sun, label: "Very Hot", color: "text-amber-500", bgColor: "bg-amber-500/10", description: "High demand, low supply of candidates. Great time to apply." },
 warm: { icon: CloudSun, label: "Warm", color: "text-yellow-500", bgColor: "bg-yellow-500/10", description: "Strong demand, moderate competition. Good opportunity window." },
 cloudy: { icon: Cloud, label: "Stable", color: "text-slate-400", bgColor: "bg-slate-500/10", description: "Steady market. Roles available but competition is consistent." },
 rainy: { icon: CloudRain, label: "Competitive", color: "text-blue-400", bgColor: "bg-blue-500/10", description: "More candidates than roles. Differentiation matters most now." },
 cold: { icon: Snowflake, label: "Declining", color: "text-cyan-400", bgColor: "bg-cyan-500/10", description: "Demand shrinking. Consider pivoting or upskilling in adjacent areas." },
}

const skillForecasts: { skill: string; climate: Climate; trend: "up" | "stable" | "down"; demand: number; note: string }[] = [
 { skill: "Python", climate: "hot", trend: "up", demand: 92, note: "AI/ML boom is driving demand across all industries." },
 { skill: "SQL", climate: "hot", trend: "stable", demand: 88, note: "Core skill — consistently high demand everywhere." },
 { skill: "Machine Learning", climate: "hot", trend: "up", demand: 85, note: "GenAI wave is creating massive demand for ML practitioners." },
 { skill: "Tableau", climate: "warm", trend: "stable", demand: 68, note: "Still widely used, but Power BI is gaining share." },
 { skill: "Excel", climate: "cloudy", trend: "down", demand: 52, note: "Still needed, but being replaced by modern BI tools." },
 { skill: "VBA", climate: "rainy", trend: "down", demand: 28, note: "Steadily declining. Consider Python automation as a substitute." },
]

const industryClimate = {
 overall: 74,
 label: "warm" as Climate,
 sixMonth: "The hiring market for data roles in Malaysia is expected to remain warm through Q4 2026. The banking and fintech sectors are seeing the biggest surge in data science hiring, while traditional industries are slower. Remote work options are increasing from international companies — this is a real opportunity for senior roles.",
}

const futureSkills = [
 { skill: "dbt (data build tool)", urgency: "high", why: "Becoming the standard for analytics engineering. 3x salary boost for those who know it." },
 { skill: "LLM Fine-tuning", urgency: "high", why: "Companies are building internal AI tools — they need people who can customise LLMs." },
 { skill: "Spark / Databricks", urgency: "medium", why: "As datasets grow, batch SQL is not enough. Distributed computing skills are rising." },
]

export default function ForecastPage() {
 return (
  <div className="min-h-screen p-8">
   <div className="mb-8">
    <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground mb-1">Career Weather Forecast</h1>
    <p className="text-sm text-foreground-secondary">
     The hiring climate for your skills — right now and in the next 6 months.
    </p>
   </div>

   {/* 整体气候 */}
   <Card className="mb-8 border-yellow-500/30 bg-yellow-500/5">
    <CardContent className="p-6">
     <div className="flex items-center gap-4 mb-4">
      <div className="h-14 w-14 rounded-2xl bg-yellow-500/15 flex items-center justify-center">
       <CloudSun className="h-8 w-8 text-yellow-500" />
      </div>
      <div>
       <p className="text-xs text-foreground-tertiary mb-0.5">Overall market climate for your profile</p>
       <p className="text-2xl font-semibold text-foreground">Warm — Good Time to Move</p>
       <Progress value={industryClimate.overall} className="mt-2 h-1.5 w-48" />
       <p className="text-xs text-foreground-tertiary mt-1">Market temperature: {industryClimate.overall}/100</p>
      </div>
     </div>
     <p className="text-sm text-foreground-secondary leading-relaxed">{industryClimate.sixMonth}</p>
    </CardContent>
   </Card>

   {/* 技能天气卡 */}
   <div className="mb-8">
    <p className="text-section-label mb-4">Your Skills — Market Temperature</p>
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
     {skillForecasts.map((sf) => {
      const config = climateConfig[sf.climate]
      const Icon = config.icon
      const TrendIcon = sf.trend === "up" ? TrendingUp : sf.trend === "down" ? TrendingDown : Minus
      const trendColor = sf.trend === "up" ? "text-primary" : sf.trend === "down" ? "text-amber-500" : "text-foreground-tertiary"

      return (
       <Card key={sf.skill} className={`border ${sf.climate === "hot" ? "border-amber-500/30" : "border-card-border"}`}>
        <CardContent className="p-4">
         <div className="flex items-center justify-between mb-3">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${config.bgColor}`}>
           <Icon className={`h-4 w-4 ${config.color}`} />
          </div>
          <Badge className={`text-xs ${config.bgColor} ${config.color} border-0`}>{config.label}</Badge>
         </div>
         <p className="font-medium text-foreground mb-1">{sf.skill}</p>
         <div className="flex items-center gap-1.5 mb-2">
          <TrendIcon className={`h-3 w-3 ${trendColor}`} />
          <span className={`text-xs ${trendColor}`}>
           {sf.trend === "up" ? "Trending up" : sf.trend === "down" ? "Declining" : "Stable"}
          </span>
         </div>
         <Progress value={sf.demand} className="h-1.5 mb-2" />
         <p className="text-xs text-foreground-tertiary">{sf.note}</p>
        </CardContent>
       </Card>
      )
     })}
    </div>
   </div>

   {/* 建议学习技能 */}
   <Card>
    <CardHeader>
     <CardTitle className="flex items-center gap-2 text-base">
      <TrendingUp className="h-4 w-4 text-primary" />
      Skills to Add in the Next 6 Months
     </CardTitle>
    </CardHeader>
    <CardContent>
     <div className="space-y-4">
      {futureSkills.map((fs) => (
       <div key={fs.skill} className="flex items-start gap-3">
        <Badge className={`flex-shrink-0 text-xs ${fs.urgency === "high" ? "bg-primary/10 text-primary border-primary/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}>
         {fs.urgency === "high" ? "High priority" : "Medium priority"}
        </Badge>
        <div>
         <p className="text-sm font-medium text-foreground">{fs.skill}</p>
         <p className="text-xs text-foreground-secondary">{fs.why}</p>
        </div>
       </div>
      ))}
     </div>
    </CardContent>
   </Card>
  </div>
 )
}
