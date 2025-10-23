import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { applications, positions, interviews, workExperiences } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Calculate Total Applications Count
    const totalApplicationsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(applications);
    const totalApplications = Number(totalApplicationsResult[0]?.count || 0);

    // Calculate Active Positions Count
    const activePositionsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(positions)
      .where(eq(positions.isActive, true));
    const activePositions = Number(activePositionsResult[0]?.count || 0);

    // Calculate Interviews Today Count
    const interviewsTodayResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(interviews)
      .where(eq(interviews.date, today));
    const interviewsToday = Number(interviewsTodayResult[0]?.count || 0);

    // Calculate Hiring Rate
    const finalDecisionResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(applications)
      .where(eq(applications.status, 'final_decision'));
    const finalDecisionCount = Number(finalDecisionResult[0]?.count || 0);
    const hiringRate = totalApplications > 0 
      ? `${Math.round((finalDecisionCount / totalApplications) * 100)}%` 
      : '0%';

    // Work Experience Distribution (top 10 companies)
    const workExperienceDistributionResult = await db
      .select({
        company: workExperiences.company,
        count: sql<number>`count(*)`
      })
      .from(workExperiences)
      .groupBy(workExperiences.company)
      .orderBy(sql`count(*) DESC`)
      .limit(10);
    
    const workExperienceDistribution = workExperienceDistributionResult.map(row => ({
      company: row.company,
      count: Number(row.count)
    }));

    // Hiring Pipeline by Status
    const statusList = ['received', 'under_review', 'interview_scheduled', 'document_upload', 'final_decision'];
    const hiringPipelineResult = await db
      .select({
        status: applications.status,
        count: sql<number>`count(*)`
      })
      .from(applications)
      .groupBy(applications.status);
    
    const hiringPipelineMap = new Map(
      hiringPipelineResult.map(row => [row.status, Number(row.count)])
    );
    
    const hiringPipeline = statusList.map(status => ({
      status,
      count: hiringPipelineMap.get(status) || 0
    }));

    // Monthly Interview Trends (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

    const monthlyInterviewTrendsResult = await db
      .select({
        month: sql<string>`substr(${interviews.date}, 1, 7)`,
        count: sql<number>`count(*)`
      })
      .from(interviews)
      .where(sql`${interviews.date} >= ${sixMonthsAgoStr}`)
      .groupBy(sql`substr(${interviews.date}, 1, 7)`)
      .orderBy(sql`substr(${interviews.date}, 1, 7) ASC`);
    
    const monthlyInterviewTrends = monthlyInterviewTrendsResult.map(row => ({
      month: row.month,
      count: Number(row.count)
    }));

    // Applications by Position
    const applicationsByPositionResult = await db
      .select({
        position: applications.position,
        count: sql<number>`count(*)`
      })
      .from(applications)
      .groupBy(applications.position)
      .orderBy(sql`count(*) DESC`);
    
    const applicationsByPosition = applicationsByPositionResult.map(row => ({
      position: row.position,
      count: Number(row.count)
    }));

    // Return comprehensive dashboard statistics
    return NextResponse.json({
      totalApplications,
      activePositions,
      interviewsToday,
      hiringRate,
      workExperienceDistribution,
      hiringPipeline,
      monthlyInterviewTrends,
      applicationsByPosition
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}