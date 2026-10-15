import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { useFetch } from '../hooks/useFetch';
import { fetchDishById } from '../api/dishes';
import { useCart } from '../context/CartContext';
import { NotFound } from './NotFound';
import './RoyalDoroWat.css';

import { FaArrowLeft, FaShoppingBag } from 'react-icons/fa';

const RoyalDoroWat = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [toasts, setToasts] = useState([]);

    // Fetch the dish by ID from the URL (Day 29 + Day 31 dynamic route)
    const { data: dish, loading, error } = useFetch(
        () => fetchDishById(id),
        [id]
    );

    const showToast = (message, type = 'success') => {
        const toastId = Date.now();
        setToasts((prev) => [...prev, { id: toastId, message, type }]);
    };
    const removeToast = (toastId) => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId));
    };

    const handleAddToCart = () => {
        addToCart(dish);
        showToast(`${dish.name} added to your basket`);
    };

    if (loading) {
        return (
            <div className="product-page">
                <div className="container">
                    <Loader message="Fetching dish details..." />
                </div>
            </div>
        );
    }

    if (error) {
        return <NotFound />;
    }

    return (
        <div className="product-page">
            <div className="container">
                <Link to="/menu" className="back-link">
                    <FaArrowLeft /> Back to Menu
                </Link>

                <div className="product-layout">
                    <div className="product-image">
                        <img src={dish.image} alt={dish.name} />
                    </div>

                    <div className="product-info">
                        {dish.tag && <span className="product-tag">{dish.tag}</span>}
                        <h1>{dish.name}</h1>
                        {dish.amharic && <p className="product-amharic">{dish.amharic}</p>}
                        <p className="product-description">{dish.description}</p>
                        <p className="product-price">ETB {dish.price}</p>

                        <button className="btn-add-to-cart" onClick={handleAddToCart}>
                            <FaShoppingBag /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <Toast toasts={toasts} onClose={removeToast} />
        </div>
    );
};

export default RoyalDoroWat;