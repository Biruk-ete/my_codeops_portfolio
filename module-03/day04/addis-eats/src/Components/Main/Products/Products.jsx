// src/Products/Products.jsx
import React, { useState, useEffect, useRef } from 'react'
import './Products.css'
import Dishes from '../Dishes/Dishes'
import menuData from '../Dishes/menuData'

const Products = () => {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Load dishes when component mounts
    useEffect(() => {
        let isMounted = true
        setLoading(true)
        setError(null)

        // Simulate loading delay
        const timer = setTimeout(() => {
            if (isMounted) {
                try {
                    // Load all dishes
                    setDishes(menuData)
                } catch (err) {
                    setError('Failed to load menu items')
                } finally {
                    setLoading(false)
                }
            }
        }, 500)

        return () => {
            isMounted = false
            clearTimeout(timer)
        }
    }, [])

    // Loading state
    if (loading) {
        return (
            <div className="products-loading">
                <div className="spinner"></div>
                <p>Loading the Addis Eats menu...</p>
            </div>
        )
    }

    // Error state
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

    // Empty state
    if (dishes.length === 0) {
        return (
            <div className="products-empty">
                <p>No dishes available.</p>
            </div>
        )
    }

    // Success state - render dishes
    return (
        <div className="products-container">
            <h2 className="menu-title">Addis Eats Menu</h2>
            <div className="menu-grid">
                {dishes.map(dish => (
                    <Dishes 
                        key={dish.id} 
                        name={dish.name} 
                        category={dish.category} 
                        price={dish.price} 
                        spicy={dish.spicy}
                    />
                ))}
            </div>
        </div>
    )
}

export default Products