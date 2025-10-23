import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { applicationSteps } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const applicationId = searchParams.get('application_id');

    // Validate application_id is provided
    if (!applicationId) {
      return NextResponse.json(
        { 
          error: 'application_id query parameter is required',
          code: 'MISSING_APPLICATION_ID'
        },
        { status: 400 }
      );
    }

    // Validate application_id is valid integer
    const parsedApplicationId = parseInt(applicationId);
    if (isNaN(parsedApplicationId)) {
      return NextResponse.json(
        { 
          error: 'application_id must be a valid integer',
          code: 'INVALID_APPLICATION_ID'
        },
        { status: 400 }
      );
    }

    // Query application steps for the given application, ordered by stepOrder
    const steps = await db.select()
      .from(applicationSteps)
      .where(eq(applicationSteps.applicationId, parsedApplicationId))
      .orderBy(asc(applicationSteps.stepOrder));

    return NextResponse.json(steps, { status: 200 });

  } catch (error) {
    console.error('GET application steps error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}