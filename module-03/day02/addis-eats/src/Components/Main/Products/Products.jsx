import React from 'react'
import Dishes from '../Dishes/Dishes'
import menu from '../Dishes/menuData'
import './Products.css'

const Products = () => {
  const filterCategory = 'Main'

  const filteredMenu = menu.filter(item => item.category === filterCategory)

  return (
    <div className="products-container">
      <h2>Menu - {filterCategory}</h2>
      <div className="dishes-grid">
        {filteredMenu.length > 0 ? (
          filteredMenu.map(dish => (
            <Dishes key={dish.id} name={dish.name} category={dish.category} price={dish.price} spicy={dish.spicy} />
          ))
        ) : (
          <div className="empty-state">
            <p>No dishes available in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products