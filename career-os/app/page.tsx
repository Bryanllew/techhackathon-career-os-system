import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
 return (
  <div className="min-h-screen bg-background">
   {/* Navbar */}
   <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
     <Link href="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
       <span className="text-sm font-bold text-primary-foreground">C</span>
      </div>
      <span className="text-lg font-semibold text-foreground">Career OS</span>
     </Link>
     <div className="flex items-center gap-4">
      <Link 
       href="/candidate/dashboard"
       className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
       For Candidates
      </Link>
      <Link 
       href="/employer/dashboard" 
       className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
       For Employers
      </Link>
      <Button variant="outline" size="sm" asChild>
       <Link href="/candidate/dashboard">Sign In</Link>
      </Button>
     </div>
    </div>
   </nav>

   {/* Hero Section */}
   <main className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16">
    {/* Background gradient effect */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
     <div className="absolute left-1/2 top-1/4 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
    </div>

    <div className="relative z-10 mx-auto max-w-4xl text-center">
     {/* Badge */}
     <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-2 text-sm text-muted-foreground">
      <span className="h-2 w-2 rounded-full bg-primary" />
      Now mapping 50,000+ career trajectories
     </div>

     {/* Headline */}
     <h1 className="mb-6 text-balance text-5xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
      See where your career is{" "}
      <span className="text-primary">actually heading</span>
     </h1>

     {/* Subheadline */}
     <p className="mx-auto mb-12 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
      Career OS maps your trajectory — not just your last job. 
      Discover roles that match where you&apos;re going, not just where you&apos;ve been.
     </p>

     {/* CTA Buttons */}
     <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button size="lg" className="group min-w-[200px]" asChild>
       <Link href="/candidate/dashboard">
        I&apos;m a Candidate
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
       </Link>
      </Button>
      <Button size="lg" variant="outline" className="min-w-[200px]" asChild>
       <Link href="/employer/dashboard">
        I&apos;m an Employer
       </Link>
      </Button>
     </div>

     {/* Trust indicators */}
     <div className="mt-16 flex flex-col items-center gap-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
       Trusted by teams at
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/60">
       <span className="text-sm font-medium">Stripe</span>
       <span className="text-sm font-medium">Notion</span>
       <span className="text-sm font-medium">Linear</span>
       <span className="text-sm font-medium">Vercel</span>
       <span className="text-sm font-medium">Figma</span>
      </div>
     </div>
    </div>

    {/* Features preview */}
    <div className="relative z-10 mx-auto mt-24 grid max-w-5xl gap-6 md:grid-cols-3">
     <div className="rounded-xl border p-6 backdrop-blur-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
       <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
       </svg>
      </div>
      <h3 className="mb-2 font-semibold text-foreground">Trajectory Mapping</h3>
      <p className="text-sm text-muted-foreground">
       See the paths others have taken from roles like yours and where they lead.
      </p>
     </div>

     <div className="rounded-xl border p-6 backdrop-blur-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
       <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg>
      </div>
      <h3 className="mb-2 font-semibold text-foreground">Smart Matching</h3>
      <p className="text-sm text-muted-foreground">
       Get matched with roles based on your trajectory fit, not just keyword overlap.
      </p>
     </div>

     <div className="rounded-xl border p-6 backdrop-blur-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
       <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
       </svg>
      </div>
      <h3 className="mb-2 font-semibold text-foreground">Skills Gap Analysis</h3>
      <p className="text-sm text-muted-foreground">
       Know exactly what skills to develop to reach your target roles faster.
      </p>
     </div>
    </div>
   </main>
  </div>
 )
}
