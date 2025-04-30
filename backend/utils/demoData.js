import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createDemoData = async () => {
    try {
        // Create demo recruiter
        const hashedPassword = await bcrypt.hash('demo123', 10);
        const demoRecruiter = await User.create({
            fullname: 'Demo Recruiter',
            email: 'demo@jobportal.com',
            password: hashedPassword,
            role: 'recruiter'
        });

        // Create demo company
        const demoCompany = await Company.create({
            name: 'Tech Solutions Inc',
            description: 'Leading technology solutions provider',
            website: 'https://techsolutions.com',
            location: 'Mumbai, India',
            created_by: demoRecruiter._id
        });

        // Create demo jobs
        const demoJobs = [
            {
                title: 'Senior Frontend Developer',
                description: 'Looking for an experienced Frontend Developer with React expertise',
                requirements: ['React', 'JavaScript', 'TypeScript', '5+ years experience'],
                salary: 1800000,
                location: 'Mumbai, India',
                jobType: 'Full-time',
                position: 2,
                experienceLevel: 5,
                company: demoCompany._id,
                created_by: demoRecruiter._id
            },
            {
                title: 'Backend Developer',
                description: 'Node.js developer needed for building scalable APIs',
                requirements: ['Node.js', 'MongoDB', 'Express', '3+ years experience'],
                salary: 1500000,
                location: 'Bangalore, India',
                jobType: 'Full-time',
                position: 3,
                experienceLevel: 3,
                company: demoCompany._id,
                created_by: demoRecruiter._id
            },
            {
                title: 'UI/UX Designer',
                description: 'Creative designer needed for web and mobile applications',
                requirements: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
                salary: 1200000,
                location: 'Remote',
                jobType: 'Full-time',
                position: 1,
                experienceLevel: 2,
                company: demoCompany._id,
                created_by: demoRecruiter._id
            }
        ];

        await Job.insertMany(demoJobs);

        console.log('Demo data created successfully!');
        console.log('Demo Login Details:');
        console.log('Email: demo@jobportal.com');
        console.log('Password: demo123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating demo data:', error);
        process.exit(1);
    }
};

// Connect to MongoDB and create demo data
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        createDemoData();
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }); 