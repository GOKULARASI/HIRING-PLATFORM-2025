import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const applicationId = searchParams.get('application_id');

    // Validate application_id is provided
    if (!applicationId) {
      return NextResponse.json(
        { 
          error: 'Application ID is required',
          code: 'MISSING_APPLICATION_ID'
        },
        { status: 400 }
      );
    }

    // Validate application_id is a valid integer
    const parsedApplicationId = parseInt(applicationId);
    if (isNaN(parsedApplicationId)) {
      return NextResponse.json(
        { 
          error: 'Application ID must be a valid integer',
          code: 'INVALID_APPLICATION_ID'
        },
        { status: 400 }
      );
    }

    // Query notifications for the application, ordered by createdAt descending
    const results = await db.select()
      .from(notifications)
      .where(eq(notifications.applicationId, parsedApplicationId))
      .orderBy(desc(notifications.createdAt));

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}