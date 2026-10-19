'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import './MenuItem.css';

import { IoMdAdd } from "react-icons/io";

const MenuItem = ({ item, onAdd }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    if (onAdd) onAdd(item);
    else addToCart(item);
  };

  return (
    <div className="menu-item-card">
      <div className="menu-item-image-wrapper">
        <Link href={`/menu/${item.id}`}>
          <img src={item.image} alt={item.name} className="menu-item-image" />
        </Link>

        {/* Top-Left Tag */}
        {item.tag && (
          <span className="menu-item-tag-top">{item.tag}</span>
        )}

        {/* Bottom-Right Spice Badge with Multiple Icons */}
        {item.spiceLevel && (
          <span className={`menu-item-spice-badge spice-badge-${item.theme || "red"}`}>
            {item.spiceIcons && item.spiceIcons.map((Icon, index) => (
              <Icon key={index} className="spice-icon" />
            ))}
            {item.spiceLevel}
          </span>
        )}
      </div>

      <div className="menu-item-content">
        <Link href={`/menu/${item.id}`} className="menu-item-title-link">
          <h3 className="menu-item-title">{item.name}</h3>
        </Link>

        <p className="menu-item-description">{item.description}</p>

        <div className="menu-item-footer">
          <span className="menu-item-price">ETB {item.price}</span>
          <button className="menu-item-add-btn" onClick={handleAdd}>
            <IoMdAdd /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;