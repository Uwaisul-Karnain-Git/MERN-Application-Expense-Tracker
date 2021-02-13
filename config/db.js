const mongoose = require('mongoose');

/* Whenever we make any calls with 'mongoose' to connect or to find from our db or to create or whatever they return a promise.
So we have to use an 'async...await' */
const connectDB = async () => {
    // Usually when we use 'async...await' we use a try, catch block
    try {
        // Here we use an object with some properties as the '2nd parameter' to 'stop some of the warnings that mongoose might give us'
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`Mongoose Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) { 
        console.log(`Error: ${err.message}`.red);
        process.exit(1);    // If you Exit with 'failure', you want the application to shut down
    }
}

module.exports = connectDB;
