import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
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

// api's
app.use("/api/v1/user",userRout);

// http://localhost:8000/api/v1/user/register
// http://localhost:8000/api/v1/user/login
// http://localhost:8000/api/v1/user/profileUpdate

app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})