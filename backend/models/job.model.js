import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Fixed typo
    },
    description: {
        type: String,
        required: true, // Fixed typo
    },
    requirements: [{
        type: String,
    }],
    salary: {
        type: Number,
        required: true, // Fixed typo
    },
    location: {
        type: String,
        required: true, // Fixed typo
    },
    jobType: {
        type: String,
        required: true, // Fixed typo
    },
    position: {
        type: Number,
        required: true, // Fixed typo
    },
    experienceLevel: {
        type: Number,
        required: true, // Fixed typo
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true, // Fixed typo
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Fixed typo
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        }
    ]
}, { timestamps: true });

export const Job = mongoose.model("Job",jobSchema);