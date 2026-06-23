"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

type SalaryRow = {
 percentile25: number
 median: number
 percentile75: number
 top10: number
}

const salaryData: Record<string, Record<string, Record<string, SalaryRow>>> = {
 "Data Analyst": {
  "Kuala Lumpur": {
   "0-2 years": { percentile25: 3500, median: 4800, percentile75: 6500, top10: 8500 },
   "2-4 years": { percentile25: 5000, median: 6800, percentile75: 9000, top10: 12000 },
   "4-7 years": { percentile25: 7000, median: 9500, percentile75: 13000, top10: 16000 },
   "7+ years": { percentile25: 10000, median: 14000, percentile75: 18000, top10: 24000 },
  },
  "Penang": {
   "0-2 years": { percentile25: 2800, median: 3900, percentile75: 5200, top10: 7000 },
   "2-4 years": { percentile25: 4000, median: 5500, percentile75: 7500, top10: 10000 },
   "4-7 years": { percentile25: 5500, median: 8000, percentile75: 11000, top10: 14000 },
   "7+ years": { percentile25: 8000, median: 11000, percentile75: 15000, top10: 20000 },
  },
 },
 "Data Scientist": {
  "Kuala Lumpur": {
   "0-2 years": { percentile25: 5000, median: 7000, percentile75: 9500, top10: 13000 },
   "2-4 years": { percentile25: 7000, median: 10000, percentile75: 14000, top10: 18000 },
   "4-7 years": { percentile25: 10000, median: 14000, percentile75: 19000, top10: 25000 },
   "7+ years": { percentile25: 14000, median: 20000, percentile75: 26000, top10: 35000 },
  },
  "Penang": {
   "0-2 years": { percentile25: 4000, median: 5800, percentile75: 8000, top10: 11000 },
   "2-4 years": { percentile25: 5500, median: 8000, percentile75: 11000, top10: 15000 },
   "4-7 years": { percentile25: 8000, median: 11000, percentile75: 16000, top10: 21000 },
   "7+ years": { percentile25: 11000, median: 16000, percentile75: 22000, top10: 29000 },
  },
 },
 "Product Analyst": {
  "Kuala Lumpur": {
   "0-2 years": { percentile25: 3800, median: 5200, percentile75: 7000, top10: 9500 },
   "2-4 years": { percentile25: 5500, median: 7500, percentile75: 10000, top10: 13500 },
   "4-7 years": { percentile25: 7500, median: 10500, percentile75: 14000, top10: 19000 },
   "7+ years": { percentile25: 11000, median: 15000, percentile75: 20000, top10: 27000 },
  },
  "Penang": {
   "0-2 years": { percentile25: 3000, median: 4200, percentile75: 5800, top10: 8000 },
   "2-4 years": { percentile25: 4500, median: 6200, percentile75: 8500, top10: 11500 },
   "4-7 years": { percentile25: 6000, median: 8500, percentile75: 11500, top10: 16000 },
   "7+ years": { percentile25: 9000, median: 12500, percentile75: 17000, top10: 23000 },
  },
 },
}

const roles = ["Data Analyst", "Data Scientist", "Product Analyst"]
const cities = ["Kuala Lumpur", "Penang"]
const experiences = ["0-2 years", "2-4 years", "4-7 years", "7+ years"]

const userCurrentSalary = 5200

const negotiationTips = [
 "Start by saying: \"I have done some research on market rates for this role in Kuala Lumpur. Based on my experience and the data, I was expecting something closer to RM X.\"",
 "Anchor high first. Ask for 15-20% above your target to leave room for negotiation.",
 "If they say no to salary, ask for other benefits: extra leave, remote days, professional development budget.",
]

export default function SalaryPage() {
 const [role, setRole] = useState("Data Analyst")
 const [city, setCity] = useState("Kuala Lumpur")
 const [experience, setExperience] = useState("2-4 years")

 const data = salaryData[role]?.[city]?.[experience]

 const userPercentile = data
  ? data.percentile25 >= userCurrentSalary
   ? 20
   : data.median >= userCurrentSalary
   ? 45
   : data.percentile75 >= userCurrentSalary
   ? 70
   : 90
  : null

 const gap = data ? data.median - userCurrentSalary : null

 return (
  <div className="min-h-screen p-8">
   <div className="mb-8">
    <h1 className="text-3xl font-light tracking-[-0.02em] text-foreground mb-1">Fair Pay Engine</h1>
    <p className="text-sm text-foreground-secondary">
     See what the market is actually paying — and whether you are being paid fairly.
    </p>
   </div>

   {/* 选择器 */}
   <Card className="mb-8">
    <CardContent className="p-5">
     <div className="grid gap-4 md:grid-cols-3">
      <div>
       <label className="text-xs text-foreground-tertiary mb-1.5 block">Your role</label>
       <Select value={role} onValueChange={setRole}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
       </Select>
      </div>
      <div>
       <label className="text-xs text-foreground-tertiary mb-1.5 block">City</label>
       <Select value={city} onValueChange={setCity}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
       </Select>
      </div>
      <div>
       <label className="text-xs text-foreground-tertiary mb-1.5 block">Experience</label>
       <Select value={experience} onValueChange={setExperience}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{experiences.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
       </Select>
      </div>
     </div>
    </CardContent>
   </Card>

   {data && (
    <>
     {/* 薪资范围图 */}
     <Card className="mb-6">
      <CardHeader>
       <CardTitle className="flex items-center gap-2 text-base">
        <DollarSign className="h-4 w-4 text-primary" />
        Market Salary Range — {role} in {city}
       </CardTitle>
      </CardHeader>
      <CardContent>
       <div className="grid grid-cols-4 gap-4 mb-6 text-center">
        {[
         { label: "Bottom 25%", value: data.percentile25, dim: true },
         { label: "Median", value: data.median, highlight: true },
         { label: "Top 25%", value: data.percentile75, dim: false },
         { label: "Top 10%", value: data.top10, dim: true },
        ].map((item) => (
         <div key={item.label} className={`rounded-xl border p-4 ${item.highlight ? "border-primary/40 bg-primary/5" : "border-card-border bg-card/60"}`}>
          <p className={`text-xl font-semibold mb-0.5 ${item.highlight ? "text-primary" : "text-foreground"}`}>
           RM {item.value.toLocaleString()}
          </p>
          <p className="text-xs text-foreground-tertiary">{item.label}</p>
         </div>
        ))}
       </div>

       {/* 你的位置 */}
       <div className="mb-2">
        <div className="flex justify-between text-xs text-foreground-tertiary mb-1.5">
         <span>RM {data.percentile25.toLocaleString()}</span>
         <span className="font-medium text-foreground">Your salary: RM {userCurrentSalary.toLocaleString()}</span>
         <span>RM {data.top10.toLocaleString()}</span>
        </div>
        <div className="relative h-3 rounded-full bg-secondary">
         <div
          className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-primary"
          style={{ width: `${userPercentile}%` }}
         />
         <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary shadow"
          style={{ left: `calc(${userPercentile}% - 8px)` }}
         />
        </div>
        <p className="text-xs text-foreground-tertiary mt-1.5 text-center">
         You are in the <span className="font-medium text-foreground">bottom {userPercentile}th percentile</span> for this role and city.
        </p>
       </div>
      </CardContent>
     </Card>

     {/* 结论 */}
     {gap !== null && gap > 0 ? (
      <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
       <CardContent className="p-5 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
         <p className="font-medium text-foreground mb-1">You may be underpaid by RM {gap.toLocaleString()} per month</p>
         <p className="text-sm text-foreground-secondary">
          The market median for a {role} in {city} with {experience} of experience is RM {data.median.toLocaleString()}/month. Your current salary is RM {userCurrentSalary.toLocaleString()}/month.
         </p>
        </div>
       </CardContent>
      </Card>
     ) : (
      <Card className="mb-6 border-green-500/30 bg-green-500/5">
       <CardContent className="p-5 flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
        <div>
         <p className="font-medium text-foreground mb-1">Your salary is at or above the market median</p>
         <p className="text-sm text-foreground-secondary">Well positioned for this role and city.</p>
        </div>
       </CardContent>
      </Card>
     )}

     {/* 谈判建议 */}
     <Card>
      <CardHeader>
       <CardTitle className="flex items-center gap-2 text-base">
        <TrendingUp className="h-4 w-4 text-primary" />
        How to Ask for More
       </CardTitle>
      </CardHeader>
      <CardContent>
       <div className="space-y-4">
        {negotiationTips.map((tip, i) => (
         <div key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-medium">
           {i + 1}
          </span>
          <p className="text-sm text-foreground-secondary">{tip}</p>
         </div>
        ))}
       </div>
      </CardContent>
     </Card>
    </>
   )}
  </div>
 )
}
