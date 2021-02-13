const path = require('path');
const express = require('express');
const dotenv = require('dotenv');   // 'dotenv' allows us to create our 'Global Variables' (eg:- Ports, Database urls, etc)
const colors = require('colors');   // This will allow us to have colors in our console
const morgan = require('morgan');   // This will allow us to do 'Logging'
const transactions = require('./routes/transactions');
const connectDB = require('./config/db');

// To access 'config.env' file
dotenv.config({ path: './config/config.env'});

connectDB();

const app = express();  // Initialize 'express'

app.use(express.json());    // This will allow us to use the 'body parser'

// Implement 'morgan'
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')); // We can pass in diffrent parameter to morgan(). 'dev' will just give us the 'method' and stuff like that
}

// Mount the 'transactions' router
app.use('/api/v1/transactions', transactions);  // Whenever we make a request to '', it will then should route to the 'transactions.js' file

// This code should be written below your API route and also make sure to set 'NODE_ENV=production' in  config.env
if(process.env.NODE_ENV === 'production'){
    // Set a static folder
    app.use(express.static('client/build'));

    /* We want to have a route basically for anything aside from our API routes - '/api/v1/transactions'. If we hit then we want to load 
    the 'index.html' that is in that build folder, since that is the 'Entry Point' to our 'React App' in 'Production' */
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Access the global variable - 'PORT' declared in our 'config.env'
const PORT = process.env.PORT || 5000;

// Listening from Port a port ('5000' in this case), to be able to run the server
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));    // To print this in 'yellow'





