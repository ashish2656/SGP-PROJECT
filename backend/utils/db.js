import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            keepAlive: true,
        };

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error:', err);
            setTimeout(connectWithRetry, 5000);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(connectWithRetry, 5000);
        });

        await mongoose.connect(process.env.MONGO_URL, options);
        console.log("Connected Successfully to MongoDB");
    } catch (err) {
        console.log("MongoDB connection error:", err);
        setTimeout(connectWithRetry, 5000);
    }
};

const connectWithRetry = async () => {
    try {
        await connectDB();
    } catch (error) {
        console.log("Retrying MongoDB connection...");
        setTimeout(connectWithRetry, 5000);
    }
};

export default connectDB;