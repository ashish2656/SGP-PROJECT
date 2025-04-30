import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./utils/db.js";
import userRout from "./routes/user.rout.js"
import companyRoute from "./routes/company.rout.js"
import jobRoute from "./routes/job.rout.js"
import applicationRoute from "./routes/application.rout.js"

dotenv.config();

const app = express();

// Increase the payload size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://sgp-project.netlify.app",
    "https://onlinejo.netlify.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'],
    preflightContinue: true,
    optionsSuccessStatus: 204
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Enable pre-flight requests
app.options('*', cors(corsOptions));

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 8000;

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use("/api/v1/user", userRout);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            message: 'CORS Error: Origin not allowed',
            success: false
        });
    }
    res.status(500).json({ 
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('Server closed.');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        });
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});