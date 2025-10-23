"use client";

import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, CheckCircle2, Clock, AlertCircle, Upload } from "lucide-react";

const applicationSteps = [
  { id: 1, name: "Application Received", status: "completed", date: "Jan 15, 2025" },
  { id: 2, name: "Under Review", status: "completed", date: "Jan 17, 2025" },
  { id: 3, name: "Interview Scheduled", status: "current", date: "Jan 22, 2025" },
  { id: 4, name: "Document Upload", status: "pending", date: "Pending" },
  { id: 5, name: "Final Decision", status: "pending", date: "Pending" },
];

const upcomingInterviews = [
  {
    id: 1,
    title: "Technical Interview",
    date: "Jan 22, 2025",
    time: "10:00 AM",
    interviewer: "Sarah Johnson",
    type: "Virtual",
  },
  {
    id: 2,
    title: "HR Round",
    date: "Jan 25, 2025",
    time: "2:00 PM",
    interviewer: "Michael Chen",
    type: "In-person",
  },
];

const notifications = [
  {
    id: 1,
    message: "Your application has been shortlisted for the next round",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: 2,
    message: "Interview scheduled for Jan 22, 2025 at 10:00 AM",
    time: "1 day ago",
    type: "info",
  },
  {
    id: 3,
    message: "Please upload your documents before the interview",
    time: "2 days ago",
    type: "warning",
  },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applicant Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track your application status and upcoming interviews
          </p>
        </div>

        {/* Application Status */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Software Engineer Position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-6 top-8 h-[calc(100%-4rem)] w-0.5 bg-muted" />
              <div className="space-y-6">
                {applicationSteps.map((step, index) => (
                  <div key={step.id} className="relative flex items-start gap-4">
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                        step.status === "completed"
                          ? "border-primary bg-primary text-primary-foreground"
                          : step.status === "current"
                          ? "border-primary bg-background text-primary"
                          : "border-muted bg-background text-muted-foreground"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : step.status === "current" ? (
                        <Clock className="h-6 w-6" />
                      ) : (
                        <div className="h-3 w-3 rounded-full bg-muted" />
                      )}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{step.name}</h3>
                        <Badge
                          variant={
                            step.status === "completed"
                              ? "default"
                              : step.status === "current"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {step.status === "completed"
                            ? "Completed"
                            : step.status === "current"
                            ? "In Progress"
                            : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Interviews
              </CardTitle>
              <CardDescription>Your scheduled interview sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{interview.title}</h4>
                      <p className="text-sm text-muted-foreground">with {interview.interviewer}</p>
                    </div>
                    <Badge variant="outline">{interview.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{interview.date}</span>
                    <span>•</span>
                    <span>{interview.time}</span>
                  </div>
                  <Button size="sm" className="w-full mt-2">
                    Join Meeting
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Recent updates on your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${
                      notification.type === "success"
                        ? "bg-green-500"
                        : notification.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your application</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Documents
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Update Resume
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}