import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { interviews } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('application_id');

    // Validate application_id is provided
    if (!applicationId) {
      return NextResponse.json({ 
        error: "application_id query parameter is required",
        code: "MISSING_APPLICATION_ID" 
      }, { status: 400 });
    }

    // Validate application_id is a valid integer
    const parsedApplicationId = parseInt(applicationId);
    if (isNaN(parsedApplicationId)) {
      return NextResponse.json({ 
        error: "application_id must be a valid integer",
        code: "INVALID_APPLICATION_ID" 
      }, { status: 400 });
    }

    // Query interviews for the application, ordered by date and time
    const results = await db.select()
      .from(interviews)
      .where(eq(interviews.applicationId, parsedApplicationId))
      .orderBy(asc(interviews.date), asc(interviews.time));

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId, title, date, time, interviewerName, type, status } = body;

    // Validate required fields
    if (!applicationId) {
      return NextResponse.json({ 
        error: "applicationId is required",
        code: "MISSING_APPLICATION_ID" 
      }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ 
        error: "title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!date) {
      return NextResponse.json({ 
        error: "date is required",
        code: "MISSING_DATE" 
      }, { status: 400 });
    }

    if (!time) {
      return NextResponse.json({ 
        error: "time is required",
        code: "MISSING_TIME" 
      }, { status: 400 });
    }

    if (!interviewerName) {
      return NextResponse.json({ 
        error: "interviewerName is required",
        code: "MISSING_INTERVIEWER_NAME" 
      }, { status: 400 });
    }

    if (!type) {
      return NextResponse.json({ 
        error: "type is required",
        code: "MISSING_TYPE" 
      }, { status: 400 });
    }

    // Validate applicationId is a valid integer
    if (isNaN(parseInt(applicationId))) {
      return NextResponse.json({ 
        error: "applicationId must be a valid integer",
        code: "INVALID_APPLICATION_ID" 
      }, { status: 400 });
    }

    // Validate type is either 'Virtual' or 'In-person'
    const trimmedType = type.trim();
    if (trimmedType !== 'Virtual' && trimmedType !== 'In-person') {
      return NextResponse.json({ 
        error: "type must be either 'Virtual' or 'In-person'",
        code: "INVALID_TYPE" 
      }, { status: 400 });
    }

    // Sanitize string inputs
    const sanitizedData = {
      applicationId: parseInt(applicationId),
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      interviewerName: interviewerName.trim(),
      type: trimmedType,
      status: status ? status.trim() : 'scheduled',
      createdAt: new Date().toISOString()
    };

    // Insert the new interview
    const newInterview = await db.insert(interviews)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newInterview[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}