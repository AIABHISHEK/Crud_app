const mongoose = require('mongoose');


const connectDB = async () => {
    
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true,
            // useCreateIndex: true
        })
        console.log(`Connected ${con.connection.host}`);
    }
    catch (err) {
        console.log("error " +err);
        // process.exit(1);
    }
}
module.exports = connectDB;