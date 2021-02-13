const mongoose = require('mongoose');

// Create a Schema for our model
// When we make a request and when we send the data, it is only going to accept 'text' and 'amount'
const TransactionSchema = new mongoose.Schema({
    // This is where we have the fields we want
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']    // We can also use - required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);  // 2nd parameter is the schema




