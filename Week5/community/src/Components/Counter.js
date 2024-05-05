import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        const newValue = count + 1;
        setCount(newValue);
    };

    const decrement = () => {
        const newValue = count - 1;
        setCount(newValue);
    };

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increase</button>
            <button onClick={decrement}>Decrease</button>
        </div>
    );
}

export default Counter;
