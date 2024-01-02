// ../backend/db.js

import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://harshb15003:harsh1510@cluster0.gr6iatu.mongodb.net/WatchAppUsers", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        throw error;
    }
};

export default connect;
