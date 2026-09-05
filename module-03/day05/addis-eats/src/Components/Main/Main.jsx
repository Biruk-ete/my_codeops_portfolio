// src/Main.jsx
import React, { useState } from 'react'
import SideBar from './SideBar/SideBar'
import Products from './Products/Products'
import './Main.css'

const Main = () => {
    const [category, setCategory] = useState('All')

    return (
        <div className="main">
            <SideBar category={category} setCategory={setCategory} />
            <Products category={category} />
        </div>
    )
}

export default Main