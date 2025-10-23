"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Plus, Trash2 } from "lucide-react";

const jobPositions = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "QA Engineer",
  "Business Analyst",
];

interface WorkExperience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export default function ApplyPage() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    { id: "1", position: "", company: "", startDate: "", endDate: "", description: "" },
  ]);

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      { id: Date.now().toString(), position: "", company: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const removeWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id));
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Candidate Application Form</h1>
          <p className="text-muted-foreground mt-2">
            Fill in your details to apply for a position at Veridia.io
          </p>
        </div>

        <form className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Enter your basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
            </CardContent>
          </Card>

          {/* Position & Resume */}
          <Card>
            <CardHeader>
              <CardTitle>Position & Resume</CardTitle>
              <CardDescription>Select the position and upload your resume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position Applying For</Label>
                <Select>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobPositions.map((position) => (
                      <SelectItem key={position} value={position.toLowerCase().replace(/\s+/g, "-")}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Resume/CV</Label>
                <div className="flex items-center gap-2">
                  <Input id="resume" type="file" accept=".pdf,.doc,.docx" className="cursor-pointer" />
                  <Button type="button" size="icon" variant="outline">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Tell us about your educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Highest Degree</Label>
                <Select>
                  <SelectTrigger id="degree">
                    <SelectValue placeholder="Select your degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University/Institution</Label>
                <Input id="university" placeholder="University name" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input id="field" placeholder="Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduation">Graduation Year</Label>
                  <Input id="graduation" type="number" placeholder="2025" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your relevant work experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {workExperiences.map((experience, index) => (
                <div key={experience.id} className="space-y-4 border-b pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Experience {index + 1}</h4>
                    {workExperiences.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWorkExperience(experience.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input placeholder="Software Engineer" />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input placeholder="Tech Corp" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="month" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="month" placeholder="Present" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Describe your responsibilities and achievements..." rows={3} />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addWorkExperience} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Another Experience
              </Button>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Save Draft
            </Button>
            <Button type="submit" size="lg" className="bg-primary">
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}