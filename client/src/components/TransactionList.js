import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';

const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    /* Since 'getTransactions' is an asynchronous call, we want to call this in the 'useEffect' hook. So if you make any Http requests from 
    your components, you have to do that in 'useEffect' */
    useEffect(() => {
        getTransactions();

        // This will fire off a warning in the console and if you want to quiet that warning, you can add the following line of code:
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction._id} transaction={transaction}/>
                ))}                
            </ul>
        </>
    )
}

export default TransactionList;

