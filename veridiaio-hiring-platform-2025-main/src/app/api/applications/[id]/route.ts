import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { applications, workExperiences, interviews, notifications, applicationSteps } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const applicationId = parseInt(id);

    // Fetch the main application
    const application = await db.select()
      .from(applications)
      .where(eq(applications.id, applicationId))
      .limit(1);

    if (application.length === 0) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Fetch all related data
    const [workExperiencesData, interviewsData, notificationsData, applicationStepsData] = await Promise.all([
      db.select()
        .from(workExperiences)
        .where(eq(workExperiences.applicationId, applicationId)),
      db.select()
        .from(interviews)
        .where(eq(interviews.applicationId, applicationId)),
      db.select()
        .from(notifications)
        .where(eq(notifications.applicationId, applicationId)),
      db.select()
        .from(applicationSteps)
        .where(eq(applicationSteps.applicationId, applicationId))
        .orderBy(asc(applicationSteps.stepOrder))
    ]);

    // Construct the response with nested arrays
    const response = {
      ...application[0],
      workExperiences: workExperiencesData,
      interviews: interviewsData,
      notifications: notificationsData,
      applicationSteps: applicationStepsData
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const applicationId = parseInt(id);
    const body = await request.json();

    // Check if application exists
    const existingApplication = await db.select()
      .from(applications)
      .where(eq(applications.id, applicationId))
      .limit(1);

    if (existingApplication.length === 0) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Update the application with new data and auto-generate updatedAt
    const updated = await db.update(applications)
      .set({
        ...body,
        updatedAt: new Date().toISOString()
      })
      .where(eq(applications.id, applicationId))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}