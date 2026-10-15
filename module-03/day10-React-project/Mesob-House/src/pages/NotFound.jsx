import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import MenuItem from '../components/MenuItem';
import { menuItems } from '../data/menuData';
import NotFoundImage from '../Assets/404/4004.png';
import './NotFound.css';

import { FaClipboardList } from 'react-icons/fa';
import { MdMenuBook, MdDateRange, MdLocalPhone, MdArrowForward } from 'react-icons/md';
import { GoDotFill } from "react-icons/go";
import { GiKnifeFork } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";

export const NotFound = () => {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  // Check if the user has items in their cart
  const hasItems = cart.length > 0;

  // Fetch the first 3 dishes from the real menu data
  const featuredDishes = menuItems.slice(0, 3);

  // Handler: Add dish to cart and go to the cart page
  const handleOrderNow = (dish) => {
    addToCart(dish);
    navigate('/cart');
  };

  return (
    <div className="notfound-page">

      {/* Hero section */}
      <section className="error-hero">
        <div className="container">

          <div className="empty-mesob-wrapper">
            <img src={NotFoundImage} alt="Empty Mesob" />
            <span className="empty-mesob-label">Empty Mesob</span>
          </div>

          <div className="error-code">404</div>
          <div className="error-subtitle">TABLE NOT SET <GoDotFill /> ERROR</div>

          <p className="error-message">
            Looks like this dish has already been enjoyed or never made it to the kitchen!
          </p>

          <div className="error-explanation">
            <p>
              <span className="highlight-red">Even the best Gursha sometimes slips!</span> Don't let your appetite wait — our Addis kitchen has hot clay pot wats and freshly rolled teff injera ready for your table right now.
            </p>
          </div>

          <div className="error-actions">
            <Link to="/" className="btn-back-specials">
              <GiKnifeFork /> Return to Today's Specials
            </Link>
            <Link to="/menu" className="btn-explore-menu">
              <MdMenuBook /> Explore Full Menu
            </Link>

            {/* Conditionally render — only if cart has items */}
            {hasItems && (
              <Link to="/cart" className="btn-check-order">
                <FaClipboardList /> Check Current Order
              </Link>
            )}
          </div>

        </div>
      </section>

      {/* Soecial menu */}
      <section className="house-favorites">
        <div className="container">

          <div className="favorites-header">
            <div>
              <span className="favorites-label"><GoDotFill /> HOUSE FAVORITES</span>
              <h2>Hungry? Here's What Our Guests Love Today</h2>
            </div>
            <Link to="/menu" className="view-all-link">
              View {menuItems.length} Traditional Dishes <MdArrowForward />
            </Link>
          </div>

          <div className="notfound-menu-data">
            {featuredDishes.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>

        </div>
      </section>

      {/* Banner */}
      <section className="concierge-banner-section">
        <div className="container">
          <div className="concierge-banner">
            <div className="concierge-left">
              <span className="concierge-icon">
                <RiCustomerService2Line />
              </span>
              <div>
                <strong>
                  Lost your table or need personalized dietary recommendations?
                </strong>
                <p>
                  Our concierge in Bole Medhanialem is delighted to prepare your banquet.
                </p>
              </div>
            </div>
            <div className="concierge-actions">
              <a href="tel:+251911234567" className="btn-phone-concierge">
                <MdLocalPhone /> +251 911 234 567
              </a>
              <button className="btn-reserve-concierge">
                <MdDateRange /> Reserve
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};