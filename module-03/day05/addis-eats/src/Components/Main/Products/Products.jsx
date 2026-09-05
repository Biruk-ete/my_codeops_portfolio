import React, { useState, useMemo } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useCart } from '../../Components/Main/cart/CartProvider'
import Dishes from '../Dishes/Dishes'
import './Products.css'

const Products = () => {
    const [category, setCategory] = useState('All')
    
    // Use custom hook
    const { data, loading, error } = useFetch('/dishes.json')
    
    // Use cart context
    const { addItem } = useCart()
    
    // Memoized filtered and sorted dishes
    const filteredDishes = useMemo(() => {
        if (!data) return []
        
        let result = data
        if (category !== 'All') {
            result = result.filter(dish => dish.category === category)
        }
        return result.sort((a, b) => a.price - b.price)
    }, [data, category])

    // Get unique categories
    const categories = useMemo(() => {
        if (!data) return ['All']
        return ['All', ...new Set(data.map(item => item.category))]
    }, [data])

    if (loading) {
        return (
            <div className="products-loading">
                <div className="spinner"></div>
                <p>Loading the Addis Eats menu...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="products-error">
                <p className="error-message">⚠️ {error}</p>
                <button 
                    className="btn-retry"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </div>
        )
    }

    if (filteredDishes.length === 0) {
        return (
            <div className="products-empty">
                <p>No dishes available in <strong>{category}</strong> category.</p>
            </div>
        )
    }

    return (
        <div className="products-container">
            <div className="products-header">
                <h2 className="menu-title">Addis Eats Menu</h2>
            </div>
            
            {/* Category Filter */}
            <div className="filter-container">
                <label>Filter by Category: </label>
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="category-select"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Menu Grid */}
            <div className="menu-grid">
                {filteredDishes.map(dish => (
                    <Dishes 
                        key={dish.id} 
                        name={dish.name} 
                        category={dish.category} 
                        price={dish.price} 
                        spicy={dish.spicy}
                        onAddToCart={() => addItem(dish)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Products