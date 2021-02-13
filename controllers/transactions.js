// Here we are going to have all of our methods that will use the 'model' to interact with our database

const transaction = require('../models/Transaction');
const Transaction = require('../models/Transaction');

// @desc - Get all Transactions
// @route - GET /api/v1/transactions
// @access - Pulic 
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();

        // Return status - 200 (everything is OK) and attach some json data to it
        return res.status(200).json({
            success: true,
            count: transactions.length,  // If we are getting multiple pieces of data, we can send a count
            data: transactions  // actual data

        });
    } catch (err) {
        // status - 500 - 'Sever Error'
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc - Add all Transactions
// @route - POST /api/v1/transaction
// @access - Pulic 
exports.addTransaction = async (req, res, next) => {
    // When we send data from client, it is going to come in like 'req.body.amount'
    // In order for us to use 'req.body' we need to add the 'body parser' middleware in our 'server.js'

    try { 
        // Set the data that will be sent to create a Transaction
        const { text, amount } = req.body;  // Pullout 'text' and 'amount' from 'req.body' using 'Object destructuring'

        const transaction = await Transaction.create(req.body); // This will only accept the fields that are in our model - 'Transaction.js'

        // When you create something and if it's successful, the 'Http response state' will be - 201
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        //console.log(error); // This will not return a response and instead it'll just print the error in the console

        // Check for the 'Validation Error'
        if(err.name == 'ValidationError') {
            // Here we need to pull out the messages that we created in our model
            const messages = Object.values(err.errors).map(val => val.message);

            // Status - 400 is a 'Client Error' because client didn't send what it supposed to
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            // Return a Generic Server error
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// @desc -  Delete all Transactions
// @route - DELETE /api/v1/transaction/:id
// @access - Pulic 
exports.deleteTransaction = async (req, res, next) => {
    try {
        //'req.params.id' - This allows us to access whatever is passed in as the 'id'
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction)
        {
            // Http status - 404 means 'Not Found'
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await transaction.remove();

        // Some methods are called on the actual model - 'Transaction' like 'findById'
        // Some methods are called on the resource - 'transaction' like 'remove'

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

