export default (state, action) => {
    /* 'Reducer' is a way to change our state and send it down to the components. We can't just change it, and we have to create a 
    'new state' and send it down */
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false, // This means that the transactions were fetched
                transactions: action.payload    /* Populate 'transactions' array with 'action.payload'. 'payload' is going to be the data
                                                we get from the response - 'payload: res.res.data' */
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload] // When we are fetching from the API, the latest should be at the end
                // Here we need to return the 'Transactions' that are already there in addition to the new one which is in the 'payload'
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};