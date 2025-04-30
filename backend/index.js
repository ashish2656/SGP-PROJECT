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

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174", "https://sgp-project.netlify.app", "https://sgp-project.netlify.com"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    exposedHeaders: ['*', 'Authorization']
}

app.use(cors(corsOptions));

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// api's
app.use("/api/v1/user", userRout);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

let server;

const startServer = async () => {
    try {
        await connectDB();
        server = app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Graceful shutdown
const gracefulShutdown = () => {
    console.log('Received shutdown signal. Starting graceful shutdown...');
    if (server) {
        server.close(async () => {
            console.log('HTTP server closed.');
            try {
                await mongoose.connection.close();
                console.log('MongoDB connection closed.');
                process.exit(0);
            } catch (err) {
                console.error('Error during shutdown:', err);
                process.exit(1);
            }
        });
    }
};

// Handle process events
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    gracefulShutdown();
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown();
});

startServer();