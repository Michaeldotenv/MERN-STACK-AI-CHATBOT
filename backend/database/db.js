import mongoose, { connect, disconnect } from "mongoose";

async function connectDB() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
        throw new Error("MongoDB connection error", error);
        
    }
    
}

async function disconnectDB() {
    try {
        await disconnect()
    } catch (error) {
        console.log(error)
        throw new Error("Could not disconnect from MongoDB");
        
    }
}
export{connectDB, disconnectDB}