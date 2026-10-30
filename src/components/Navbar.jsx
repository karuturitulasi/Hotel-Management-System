import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <h2>Hotel Management</h2>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/rooms">Rooms</Link>
                <Link to="/customers">Customers</Link>
                <Link to="/bookings">Bookings</Link>
            </div>
        </div>
    )
}

export default Navbar