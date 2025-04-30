import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createDemoData = async () => {
    try {
        // Find or create demo recruiter
        let recruiter = await User.findOne({ email: 'demo@jobportal.com' });
        if (!recruiter) {
            const hashedPassword = await bcrypt.hash('demo123', 10);
            recruiter = await User.create({
                fullname: 'Demo Recruiter',
                email: 'demo@jobportal.com',
                password: hashedPassword,
                phoneNumber: '1234567890',
                role: 'recruiter'
            });
        }

        // Create or update demo companies
        const companyData = [
            {
                name: 'Tech Solutions Inc',
                description: 'Leading software development company',
                website: 'https://techsolutions.com',
                location: 'San Francisco',
                created_by: recruiter._id
            },
            {
                name: 'Digital Innovations',
                description: 'Digital transformation and consulting',
                website: 'https://digitalinnovations.com',
                location: 'New York',
                created_by: recruiter._id
            }
        ];

        const companies = await Promise.all(
            companyData.map(async (company) => {
                const existingCompany = await Company.findOne({ name: company.name });
                if (existingCompany) {
                    return existingCompany;
                }
                return await Company.create(company);
            })
        );

        // Clear existing jobs
        await Job.deleteMany({ created_by: recruiter._id });

        // Create new demo jobs
        await Job.create([
            {
                title: 'Senior Frontend Developer',
                description: 'Looking for an experienced frontend developer with React expertise',
                requirements: ['5+ years React experience', 'TypeScript', 'UI/UX knowledge'],
                salary: 120000,
                location: 'San Francisco',
                jobType: 'Full-time',
                experienceLevel: 5,
                position: 2,
                company: companies[0]._id,
                created_by: recruiter._id
            },
            {
                title: 'Backend Developer',
                description: 'Backend developer with Node.js and MongoDB experience',
                requirements: ['Node.js', 'MongoDB', 'API Design'],
                salary: 110000,
                location: 'New York',
                jobType: 'Full-time',
                experienceLevel: 3,
                position: 3,
                company: companies[1]._id,
                created_by: recruiter._id
            },
            {
                title: 'UI/UX Designer',
                description: 'Creative designer with modern design principles knowledge',
                requirements: ['Figma', 'Adobe XD', 'User Research'],
                salary: 95000,
                location: 'Remote',
                jobType: 'Full-time',
                experienceLevel: 2,
                position: 1,
                company: companies[0]._id,
                created_by: recruiter._id
            }
        ]);

        console.log('Demo data created successfully');
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