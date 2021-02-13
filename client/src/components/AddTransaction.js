// With the Form, we do need some 'Component Level State', because we have some 'input fields' and they need to be part of our state
import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
    // 'Component level state' used with 'Controlled Components'
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        /* We have our 'Component level state' hooked into our inputs and the values are 'text' and the 'amount', and that is what we
        are passing into 'newTransaction' object */
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: +amount // '+' sign will convert the 'string' (amount) into a 'number' (This is similar to 'parseInt(amount)')
        }

        addTransaction(newTransaction);
    };

    return (
        <>
            <h3>Add new transaction</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-control">
                        <label htmlFor="text">Text</label>
                        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount <br />
                            (negative - expense, positive - income)</label>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." />
                    </div>
                    <button className="btn">Add transaction</button>
            </form>
            </>
    )
}

export default AddTransaction;

