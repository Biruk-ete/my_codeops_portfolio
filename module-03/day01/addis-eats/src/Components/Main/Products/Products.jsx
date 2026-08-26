import React from 'react'
import './Products.css'
import Dishes from '../Dishes/Dishes'
import Menu from '../Dishes/menuData'

const Products = () => {
  return (
    <div className="menu-grid">
      {Menu.map(dish => (
            <Dishes key={dish.id} name={dish.name} category={dish.category} price={dish.price} spicy={dish.spicy}/>
          ))}
    </div>
  )
}

export default Products