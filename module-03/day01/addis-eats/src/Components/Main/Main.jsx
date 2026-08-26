import React from 'react'
import SideBar from './SideBar/SideBar'
import Products from './Products/Products'


import './Main.css'

const Main = () => {
    return (
        <div className="main">
            <SideBar/>
            <Products/>
        </div>
    )
}

export default Main