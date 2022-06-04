const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Success");
    } catch (error) {
        console.log("Fail");
    }
}

module.exports = connectDB;