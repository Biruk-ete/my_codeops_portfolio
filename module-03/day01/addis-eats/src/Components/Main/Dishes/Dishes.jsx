import React from 'react'
import './Dishes.css'

const Dishes = ({ name, category, price, spicy }) => {
    return (
        <div className="dish-card">
            <h3>{name}</h3>
            <p>{price} ETB</p>
            <span className="category-badge">{category}</span>
            {spicy && <span className="spicy-badge">Spicy</span>}
        </div>
    )
}

export default Dishes