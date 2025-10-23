import { db } from '@/db';
import { positions } from '@/db/schema';

async function main() {
    const samplePositions = [
        {
            title: 'Software Engineer',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Frontend Developer',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Backend Developer',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Full Stack Developer',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'DevOps Engineer',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Data Scientist',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Product Manager',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'UI/UX Designer',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'QA Engineer',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
        {
            title: 'Business Analyst',
            isActive: true,
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(positions).values(samplePositions);
    
    console.log('✅ Positions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});