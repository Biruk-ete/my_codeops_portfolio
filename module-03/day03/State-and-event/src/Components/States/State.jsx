import React, { useState } from 'react'
import './State.css'

const State = () => {
    const [count, setCount] = useState(0)
    
    const handlecount = (prev) => { 
        setCount(prev + 1)
        return count
    }

    return (
        <div className='state'>
            <h1>State</h1>
            <p>Count: {count}</p>
            <button className='btn' onClick={() => handlecount(count)}>Increment</button>
        </div>
    )        
}

export default State