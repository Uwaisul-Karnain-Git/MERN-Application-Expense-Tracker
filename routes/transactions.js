const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');

router
    .route('/')     // When we make a request to '/', it refers to the '/api/v1/transactions' because it is connected to this file
    .get(getTransactions)  // We can add methods (like 'getTransactions')
    .post(addTransaction);

router
    .route('/:id')
    .delete(deleteTransaction);

module.exports = router;

