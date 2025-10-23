import { db } from '@/db';
import { notifications } from '@/db/schema';

async function main() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const getDateBetween = (daysAgo: number) => {
        const date = new Date(thirtyDaysAgo.getTime() + daysAgo * 24 * 60 * 60 * 1000);
        return date.toISOString();
    };

    const sampleNotifications = [
        // Application 1 - Software Engineer (4 notifications)
        {
            applicationId: 1,
            message: 'Application received and logged in our system',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(1),
        },
        {
            applicationId: 1,
            message: 'Your profile is under review by our technical team',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(3),
        },
        {
            applicationId: 1,
            message: 'Your application has been shortlisted!',
            type: 'success',
            isRead: true,
            createdAt: getDateBetween(7),
        },
        {
            applicationId: 1,
            message: 'Interview invitation will be sent soon',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(10),
        },

        // Application 2 - Data Scientist (5 notifications)
        {
            applicationId: 2,
            message: 'Thank you for applying to Data Scientist position',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(2),
        },
        {
            applicationId: 2,
            message: 'Your application is being reviewed by our team',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(4),
        },
        {
            applicationId: 2,
            message: 'Action required: Please upload your resume',
            type: 'warning',
            isRead: true,
            createdAt: getDateBetween(6),
        },
        {
            applicationId: 2,
            message: 'Document verification in progress',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(9),
        },
        {
            applicationId: 2,
            message: 'Congratulations! You\'ve moved to the next round',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(12),
        },

        // Application 3 - Product Manager (3 notifications)
        {
            applicationId: 3,
            message: 'Application received and under initial review',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(1),
        },
        {
            applicationId: 3,
            message: 'Interview scheduled - check your email for details',
            type: 'success',
            isRead: true,
            createdAt: getDateBetween(8),
        },
        {
            applicationId: 3,
            message: 'Prepare for your upcoming interview',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(14),
        },

        // Application 4 - UX Designer (4 notifications)
        {
            applicationId: 4,
            message: 'Thank you for applying to UX Designer position',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(2),
        },
        {
            applicationId: 4,
            message: 'Your portfolio is being reviewed',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(5),
        },
        {
            applicationId: 4,
            message: 'Interview completed successfully',
            type: 'success',
            isRead: true,
            createdAt: getDateBetween(11),
        },
        {
            applicationId: 4,
            message: 'Final decision made - check your email',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(16),
        },

        // Application 5 - DevOps Engineer (5 notifications)
        {
            applicationId: 5,
            message: 'Application received and logged in our system',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(1),
        },
        {
            applicationId: 5,
            message: 'Additional documents may be requested soon',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(4),
        },
        {
            applicationId: 5,
            message: 'Missing documents - please submit by end of week',
            type: 'warning',
            isRead: true,
            createdAt: getDateBetween(7),
        },
        {
            applicationId: 5,
            message: 'Background check initiated',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(13),
        },
        {
            applicationId: 5,
            message: 'Congratulations! Offer letter sent',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(18),
        },

        // Application 6 - Marketing Manager (3 notifications)
        {
            applicationId: 6,
            message: 'Application received and under initial review',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(3),
        },
        {
            applicationId: 6,
            message: 'Your application has been shortlisted!',
            type: 'success',
            isRead: true,
            createdAt: getDateBetween(9),
        },
        {
            applicationId: 6,
            message: 'Interview confirmation needed within 24 hours',
            type: 'warning',
            isRead: false,
            createdAt: getDateBetween(15),
        },

        // Application 7 - Business Analyst (4 notifications)
        {
            applicationId: 7,
            message: 'Thank you for applying to Business Analyst position',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(2),
        },
        {
            applicationId: 7,
            message: 'Your profile is under review',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(6),
        },
        {
            applicationId: 7,
            message: 'Please upload additional documents',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(11),
        },
        {
            applicationId: 7,
            message: 'Interview scheduled - check your email for details',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(17),
        },

        // Application 8 - Full Stack Developer (5 notifications)
        {
            applicationId: 8,
            message: 'Application received and logged in our system',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(1),
        },
        {
            applicationId: 8,
            message: 'Your application is being reviewed by our team',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(5),
        },
        {
            applicationId: 8,
            message: 'Technical assessment scheduled',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(10),
        },
        {
            applicationId: 8,
            message: 'Congratulations! You\'ve moved to the next round',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(14),
        },
        {
            applicationId: 8,
            message: 'Final interview invitation will be sent soon',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(19),
        },

        // Application 9 - HR Manager (3 notifications)
        {
            applicationId: 9,
            message: 'Application received and under initial review',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(4),
        },
        {
            applicationId: 9,
            message: 'Your profile matches our requirements',
            type: 'success',
            isRead: true,
            createdAt: getDateBetween(10),
        },
        {
            applicationId: 9,
            message: 'Interview scheduled for next week',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(16),
        },

        // Application 10 - Sales Executive (4 notifications)
        {
            applicationId: 10,
            message: 'Thank you for applying to Sales Executive position',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(3),
        },
        {
            applicationId: 10,
            message: 'Additional documents may be requested soon',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(7),
        },
        {
            applicationId: 10,
            message: 'Action required: Please upload reference letters',
            type: 'warning',
            isRead: false,
            createdAt: getDateBetween(12),
        },
        {
            applicationId: 10,
            message: 'Document verification in progress',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(18),
        },

        // Application 11 - Content Writer (5 notifications)
        {
            applicationId: 11,
            message: 'Application received and logged in our system',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(2),
        },
        {
            applicationId: 11,
            message: 'Your writing samples are being reviewed',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(6),
        },
        {
            applicationId: 11,
            message: 'Your application has been shortlisted!',
            type: 'success',
            isRead: true,
            createdAt: getDateBetween(11),
        },
        {
            applicationId: 11,
            message: 'Writing assessment scheduled',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(15),
        },
        {
            applicationId: 11,
            message: 'Assessment completed successfully',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(20),
        },

        // Application 12 - Financial Analyst (3 notifications)
        {
            applicationId: 12,
            message: 'Application received and under initial review',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(5),
        },
        {
            applicationId: 12,
            message: 'Your profile is under review by finance team',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(11),
        },
        {
            applicationId: 12,
            message: 'Background check initiated',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(17),
        },

        // Application 13 - QA Engineer (4 notifications)
        {
            applicationId: 13,
            message: 'Thank you for applying to QA Engineer position',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(3),
        },
        {
            applicationId: 13,
            message: 'Your application is being reviewed by our team',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(8),
        },
        {
            applicationId: 13,
            message: 'Interview completed successfully',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(14),
        },
        {
            applicationId: 13,
            message: 'Waiting for final decision',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(19),
        },

        // Application 14 - Project Manager (5 notifications)
        {
            applicationId: 14,
            message: 'Application received and logged in our system',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(1),
        },
        {
            applicationId: 14,
            message: 'Your PMP certification is being verified',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(5),
        },
        {
            applicationId: 14,
            message: 'Missing documents - please submit certifications',
            type: 'warning',
            isRead: true,
            createdAt: getDateBetween(9),
        },
        {
            applicationId: 14,
            message: 'Your application has been shortlisted!',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(15),
        },
        {
            applicationId: 14,
            message: 'Interview scheduled - check your email for details',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(21),
        },

        // Application 15 - Graphic Designer (3 notifications)
        {
            applicationId: 15,
            message: 'Application received and under initial review',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(4),
        },
        {
            applicationId: 15,
            message: 'Your portfolio is being reviewed by design team',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(10),
        },
        {
            applicationId: 15,
            message: 'Design challenge invitation sent',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(16),
        },

        // Application 16 - Customer Support (4 notifications)
        {
            applicationId: 16,
            message: 'Thank you for applying to Customer Support position',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(2),
        },
        {
            applicationId: 16,
            message: 'Your profile is under review',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(7),
        },
        {
            applicationId: 16,
            message: 'Phone screening scheduled',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(13),
        },
        {
            applicationId: 16,
            message: 'Prepare for your upcoming interview',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(18),
        },

        // Application 17 - Backend Developer (5 notifications)
        {
            applicationId: 17,
            message: 'Application received and logged in our system',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(1),
        },
        {
            applicationId: 17,
            message: 'Your application is being reviewed by our team',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(6),
        },
        {
            applicationId: 17,
            message: 'Coding assessment scheduled',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(11),
        },
        {
            applicationId: 17,
            message: 'Congratulations! You\'ve moved to the next round',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(16),
        },
        {
            applicationId: 17,
            message: 'Technical interview will be scheduled soon',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(22),
        },

        // Application 18 - Operations Manager (3 notifications)
        {
            applicationId: 18,
            message: 'Application received and under initial review',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(5),
        },
        {
            applicationId: 18,
            message: 'Additional documents may be requested soon',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(12),
        },
        {
            applicationId: 18,
            message: 'Your profile matches our requirements',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(19),
        },

        // Application 19 - Mobile Developer (4 notifications)
        {
            applicationId: 19,
            message: 'Thank you for applying to Mobile Developer position',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(3),
        },
        {
            applicationId: 19,
            message: 'Your GitHub profile is being reviewed',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(9),
        },
        {
            applicationId: 19,
            message: 'Action required: Please share your mobile app portfolio',
            type: 'warning',
            isRead: false,
            createdAt: getDateBetween(14),
        },
        {
            applicationId: 19,
            message: 'Document verification in progress',
            type: 'info',
            isRead: false,
            createdAt: getDateBetween(20),
        },

        // Application 20 - Legal Counsel (5 notifications)
        {
            applicationId: 20,
            message: 'Application received and logged in our system',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(2),
        },
        {
            applicationId: 20,
            message: 'Your bar certification is being verified',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(8),
        },
        {
            applicationId: 20,
            message: 'Background check initiated',
            type: 'info',
            isRead: true,
            createdAt: getDateBetween(13),
        },
        {
            applicationId: 20,
            message: 'Your application has been shortlisted!',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(18),
        },
        {
            applicationId: 20,
            message: 'Interview scheduled - check your email for details',
            type: 'success',
            isRead: false,
            createdAt: getDateBetween(23),
        },
    ];

    await db.insert(notifications).values(sampleNotifications);
    
    console.log('✅ Notifications seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});