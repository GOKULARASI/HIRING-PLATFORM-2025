import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    const notificationId = parseInt(id);

    // Parse request body
    const body = await request.json();
    const { isRead } = body;

    // Validate isRead field
    if (typeof isRead !== 'boolean') {
      return NextResponse.json(
        { 
          error: 'isRead must be a boolean value',
          code: 'INVALID_IS_READ'
        },
        { status: 400 }
      );
    }

    // Check if notification exists
    const existingNotification = await db.select()
      .from(notifications)
      .where(eq(notifications.id, notificationId))
      .limit(1);

    if (existingNotification.length === 0) {
      return NextResponse.json(
        { 
          error: 'Notification not found',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Update notification read status
    const updated = await db.update(notifications)
      .set({
        isRead: isRead
      })
      .where(eq(notifications.id, notificationId))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error
      },
      { status: 500 }
    );
  }
}