import React, { useState } from 'react'
import './Dishes.css'

const Dishes = ({ name, category, price, spicy, onAddToCart }) => {
    const [count, setCount] = useState(0)
    
    const handleAddToCart = () => {
        setCount(prev => prev + 1)
        if (onAddToCart) {
            onAddToCart()
        }
    }

    const handleRemoveFromCart = () => { 
        setCount(prev => prev > 0 ? prev - 1 : 0)
    }

    return (        
        <div className="dish-card">
            <h3>{name}</h3>
            <p>{price} ETB</p>
            <span className="category-badge">{category}</span>
            {spicy && <span className="spicy-badge">Spicy</span>}
            
            <div className="cartCounter">
                {count > 0 && (
                    <button className='btn btn-decrement' onClick={handleRemoveFromCart}>−</button>
                )}
                <button className='btn btn-add' onClick={handleAddToCart}>
                    {count > 0 ? '+' : 'Add to Cart'}
                </button>
                {count > 0 && <span className="count-display">{count}</span>}
            </div>
        </div>
    )
}

export default Dishes