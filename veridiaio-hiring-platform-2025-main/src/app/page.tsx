"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, LayoutDashboard, Briefcase, Users, CheckCircle, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/logo-1759832488043.jpg"
              alt="Veridia.io"
              className="h-12 w-auto"
            />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/apply" className="text-sm font-medium hover:text-primary transition-colors">
              Apply Now
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </Link>
            <Button asChild>
              <Link href="/apply">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Veridia.io
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The leading hiring platform connecting talented professionals with amazing opportunities.
            Streamline your recruitment process with our comprehensive HR management system.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/apply">
                <FileText className="mr-2 h-5 w-5" />
                Apply for a Position
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Platform Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a seamless hiring experience
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle>Easy Application</CardTitle>
              <CardDescription>
                Submit your application with our user-friendly form. Upload your resume, fill in your details,
                and apply for your dream position in minutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0" asChild>
                <Link href="/apply">Apply Now →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <CardTitle>Track Your Progress</CardTitle>
              <CardDescription>
                Monitor your application status in real-time. View progress steps, upcoming interviews,
                and receive notifications about your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0" asChild>
                <Link href="/dashboard">View Dashboard →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <CardTitle>Admin Management</CardTitle>
              <CardDescription>
                Powerful admin dashboard for recruiters. Manage applications, schedule interviews,
                and analyze hiring metrics with interactive charts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="px-0" asChild>
                <Link href="/admin">Admin Panel →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Companies</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Join thousands of successful candidates and recruiters using Veridia.io
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,284+</div>
              <div className="text-purple-100">Total Applications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24</div>
              <div className="text-purple-100">Active Positions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">68%</div>
              <div className="text-purple-100">Hiring Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-purple-100">Successful Hires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Veridia.io?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make hiring simple, efficient, and effective
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Streamlined Process</h3>
            <p className="text-muted-foreground">
              From application to hiring, everything in one place. No more scattered emails or lost documents.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
            <p className="text-muted-foreground">
              Make informed decisions with comprehensive analytics and reporting on your hiring pipeline.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Candidate Experience</h3>
            <p className="text-muted-foreground">
              Provide candidates with transparency and communication throughout their application journey.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="text-center pb-12 pt-12">
            <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
            <CardDescription className="text-lg">
              Join Veridia.io today and transform your hiring experience
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4 pb-12">
            <Button size="lg" className="bg-primary" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/admin">Admin Access</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/logo-1759832488043.jpg"
                alt="Veridia.io"
                className="h-10 w-auto"
              />
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <Link href="/apply" className="hover:text-primary transition-colors">
                Apply
              </Link>
              <Link href="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/admin" className="hover:text-primary transition-colors">
                Admin
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Veridia.io. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}