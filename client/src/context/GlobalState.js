/* If this is a larger application and if we had multiple resources, we better have separate States for those resources instead of 
having a 'Global State' */

import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial State
const initialState = {
    transactions: [],
    error: null,    // Put this in 'state' in case if you want to use them in your application components with 'alert' or something like that
    loading: true   // To display a 'spinner' if it is still loading

}

// Create our 'Global Context', using the 'createContext'
export const GlobalContext = createContext(initialState);

/* In order for other components to have access to our 'Global State', we need to have a 'Provider'.
What a 'Provider' does is, it provides our 'State', it provides any 'actions' and stuff like that to the components that are 
wrapped around */

// Provider Component
export const GlobalProvider = ({ children }) => {
    // Reducer Function
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions - that are going to make calls to our 'reducer'
    const getTransactions = async () => {   // We have to make this 'async' since we are using 'axios' which returns a 'promise'
        try {
            // state.loading = true;    // We can set 'loading' to 'true' here and set its initial value to 'false' also

            /* Here we don't need to include 'http://localhost:5000/' part of our Get url because we have added a 'Proxy' to include that
            (in the 'package.json' file under 'client' folder) */
            const res = await axios.get('/api/v1/transactions');

            // 'res.data' will return the entire response object including 'success', 'count' and 'data'
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data   // This will be the 'transactions' from our back end
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error  // Here we want to send the actual error
            });
        }
    };

    const deleteTransaction = async id => {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    };

    const addTransaction = async transaction => {
        // Since we are sending data, we need to specify a 'Content-Type'
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }        
    };

    return (<GlobalContext.Provider value={
        {
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction, // In order for us to use this action, we have to pass it down in our 'Provider'
            addTransaction
        }
    }>
        {/* This 'children' prop is going to be whatever we wrap inside our 'GlobalProvider' */}
        { children }    
    </GlobalContext.Provider>);
};


