import React from 'react'
import PropTypes from 'prop-types'
import './Dishes.css'

const Dishes = ({ name, category, price, spicy }) => {
    return (
        <div className="dish-card">
            <h3>{name}</h3>
            <p>{price} ETB</p>
            <span className="category-badge">{category}</span>
            {spicy && <span className="spicy-badge">🌶️ Spicy</span>}
        </div>
    )
}

Dishes.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    spicy: PropTypes.bool
}


Dishes.defaultProps = {
    category: 'Main',
    spicy: false
}

export default Dishes