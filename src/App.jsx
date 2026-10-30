import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Customers from './pages/Customers';
import Bookings from './pages/Bookings';
import AddRoom from './pages/AddRoom'
function App() {
    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/add-room" element={<AddRoom />} />
            </Routes>
        </div>
    );
}

export default App;