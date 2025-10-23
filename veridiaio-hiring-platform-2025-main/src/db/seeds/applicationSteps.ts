import { db } from '@/db';
import { applicationSteps } from '@/db/schema';

async function main() {
    const stepNames = [
        'Application Received',
        'Under Review',
        'Interview',
        'Document Upload',
        'Final Decision'
    ];

    const applicationStatuses = {
        1: 'received',
        2: 'received',
        3: 'received',
        4: 'received',
        5: 'under_review',
        6: 'under_review',
        7: 'under_review',
        8: 'under_review',
        9: 'interview_scheduled',
        10: 'interview_scheduled',
        11: 'interview_scheduled',
        12: 'interview_scheduled',
        13: 'document_upload',
        14: 'document_upload',
        15: 'document_upload',
        16: 'document_upload',
        17: 'final_decision',
        18: 'final_decision',
        19: 'final_decision',
        20: 'final_decision'
    };

    const sampleApplicationSteps = [];
    const currentDate = new Date().toISOString();

    for (let appId = 1; appId <= 20; appId++) {
        const appStatus = applicationStatuses[appId];
        const baseDate = new Date(2024, 0, appId);

        for (let stepOrder = 1; stepOrder <= 5; stepOrder++) {
            let status = 'pending';
            let stepDate = '';

            if (appStatus === 'received') {
                if (stepOrder === 1) {
                    status = 'completed';
                    stepDate = baseDate.toISOString();
                }
            } else if (appStatus === 'under_review') {
                if (stepOrder === 1) {
                    status = 'completed';
                    stepDate = baseDate.toISOString();
                } else if (stepOrder === 2) {
                    status = 'current';
                    const reviewDate = new Date(baseDate);
                    reviewDate.setDate(reviewDate.getDate() + 2);
                    stepDate = reviewDate.toISOString();
                }
            } else if (appStatus === 'interview_scheduled') {
                if (stepOrder === 1) {
                    status = 'completed';
                    stepDate = baseDate.toISOString();
                } else if (stepOrder === 2) {
                    status = 'completed';
                    const reviewDate = new Date(baseDate);
                    reviewDate.setDate(reviewDate.getDate() + 2);
                    stepDate = reviewDate.toISOString();
                } else if (stepOrder === 3) {
                    status = 'current';
                    const interviewDate = new Date(baseDate);
                    interviewDate.setDate(interviewDate.getDate() + 7);
                    stepDate = interviewDate.toISOString();
                }
            } else if (appStatus === 'document_upload') {
                if (stepOrder === 1) {
                    status = 'completed';
                    stepDate = baseDate.toISOString();
                } else if (stepOrder === 2) {
                    status = 'completed';
                    const reviewDate = new Date(baseDate);
                    reviewDate.setDate(reviewDate.getDate() + 2);
                    stepDate = reviewDate.toISOString();
                } else if (stepOrder === 3) {
                    status = 'completed';
                    const interviewDate = new Date(baseDate);
                    interviewDate.setDate(interviewDate.getDate() + 7);
                    stepDate = interviewDate.toISOString();
                } else if (stepOrder === 4) {
                    status = 'current';
                    const docDate = new Date(baseDate);
                    docDate.setDate(docDate.getDate() + 10);
                    stepDate = docDate.toISOString();
                }
            } else if (appStatus === 'final_decision') {
                status = 'completed';
                const daysToAdd = (stepOrder - 1) * 3;
                const completedDate = new Date(baseDate);
                completedDate.setDate(completedDate.getDate() + daysToAdd);
                stepDate = completedDate.toISOString();
            }

            sampleApplicationSteps.push({
                applicationId: appId,
                stepName: stepNames[stepOrder - 1],
                status: status,
                stepDate: stepDate,
                stepOrder: stepOrder,
                createdAt: currentDate
            });
        }
    }

    await db.insert(applicationSteps).values(sampleApplicationSteps);
    
    console.log('✅ Application steps seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});