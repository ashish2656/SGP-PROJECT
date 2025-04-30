import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4, // Use IPv4, skip trying IPv6
            maxPoolSize: 10,
            keepAlive: true,
            keepAliveInitialDelay: 300000
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
            setTimeout(connectDB, 5000);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            setTimeout(connectDB, 5000);
        });

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL, options);
        console.log("Connected Successfully to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;