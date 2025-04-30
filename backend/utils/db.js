import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increased timeout
            socketTimeoutMS: 45000,
            family: 4, // Use IPv4, skip trying IPv6
            maxPoolSize: 10,
            // Removed keepAlive and keepAliveInitialDelay as they're no longer supported
            connectTimeoutMS: 30000,
            heartbeatFrequencyMS: 30000
        };

        // Clear any existing connections
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            // Don't retry immediately, add some delay
            setTimeout(connectDB, 10000);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(connectDB, 10000);
        });

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, options);
        console.log("Connected Successfully to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        // Don't retry immediately, add some delay
        setTimeout(connectDB, 10000);
    }
};

export default connectDB;