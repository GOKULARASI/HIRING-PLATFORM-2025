import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { applications, workExperiences } from '@/db/schema';
import { eq, like, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status');
    const position = searchParams.get('position');

    let query = db.select().from(applications);

    const conditions = [];
    if (status) {
      conditions.push(eq(applications.status, status));
    }
    if (position) {
      conditions.push(like(applications.position, `%${position}%`));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      resumeUrl,
      degree,
      university,
      fieldOfStudy,
      graduationYear,
      status,
      workExperiences: workExperiencesArray = []
    } = body;

    // Validate required fields
    if (!firstName) {
      return NextResponse.json(
        { error: 'firstName is required', code: 'MISSING_FIRST_NAME' },
        { status: 400 }
      );
    }
    if (!lastName) {
      return NextResponse.json(
        { error: 'lastName is required', code: 'MISSING_LAST_NAME' },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { error: 'email is required', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { error: 'phone is required', code: 'MISSING_PHONE' },
        { status: 400 }
      );
    }
    if (!position) {
      return NextResponse.json(
        { error: 'position is required', code: 'MISSING_POSITION' },
        { status: 400 }
      );
    }
    if (!resumeUrl) {
      return NextResponse.json(
        { error: 'resumeUrl is required', code: 'MISSING_RESUME_URL' },
        { status: 400 }
      );
    }
    if (!degree) {
      return NextResponse.json(
        { error: 'degree is required', code: 'MISSING_DEGREE' },
        { status: 400 }
      );
    }
    if (!university) {
      return NextResponse.json(
        { error: 'university is required', code: 'MISSING_UNIVERSITY' },
        { status: 400 }
      );
    }
    if (!fieldOfStudy) {
      return NextResponse.json(
        { error: 'fieldOfStudy is required', code: 'MISSING_FIELD_OF_STUDY' },
        { status: 400 }
      );
    }
    if (!graduationYear || typeof graduationYear !== 'number') {
      return NextResponse.json(
        { error: 'graduationYear is required and must be a number', code: 'MISSING_GRADUATION_YEAR' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Create application
    const newApplication = await db.insert(applications)
      .values({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        position: position.trim(),
        resumeUrl: resumeUrl.trim(),
        degree: degree.trim(),
        university: university.trim(),
        fieldOfStudy: fieldOfStudy.trim(),
        graduationYear,
        status: status?.trim() || 'received',
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      .returning();

    const createdApplication = newApplication[0];

    // Create work experiences if provided
    const createdWorkExperiences = [];
    if (workExperiencesArray.length > 0) {
      for (const experience of workExperiencesArray) {
        const newWorkExperience = await db.insert(workExperiences)
          .values({
            applicationId: createdApplication.id,
            position: experience.position.trim(),
            company: experience.company.trim(),
            startDate: experience.startDate.trim(),
            endDate: experience.endDate.trim(),
            description: experience.description.trim(),
            createdAt: timestamp,
          })
          .returning();
        
        createdWorkExperiences.push(newWorkExperience[0]);
      }
    }

    // Return application with nested work experiences
    const response = {
      ...createdApplication,
      workExperiences: createdWorkExperiences
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}