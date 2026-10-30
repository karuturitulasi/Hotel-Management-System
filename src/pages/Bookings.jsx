import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    getRooms,
    getCustomers,
    getBookings,
    addBooking,
    updateBooking
} from '../services/api'

function Bookings() {
    const [rooms, setRooms] = useState([])
    const [customers, setCustomers] = useState([])
    const [bookings, setBookings] = useState([])
    const [roomId, setRoomId] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")

    function loadData() {
        getRooms().then(data => setRooms(data))
        getCustomers().then(data => setCustomers(data))
        getBookings().then(data => setBookings(data))
    }

    useEffect(() => {
        loadData()
    }, [])

    // Find selected customer
    const selectedCustomer = customers.find(
        c => String(c.id) === String(customerId)
    )

    function handleBooking() {
        const room = rooms.find(r => String(r.id) === String(roomId))

        if (!room || !selectedCustomer || !checkIn || !checkOut) {
            alert("Please fill all details")
            return
        }

        const days = Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
            (1000 * 60 * 60 * 24)
        )

        if (days <= 0) {
            alert("Check-out must be after check-in")
            return
        }

        const conflict = bookings.some(b =>
            String(b.roomId) === String(roomId) &&
            b.status === "Confirmed" &&
            checkIn < b.checkOut &&
            checkOut > b.checkIn
        )

        if (conflict) {
            alert("Room is already booked for these dates")
            return
        }

        const booking = {
            roomId,
            customerId,
            checkIn,
            checkOut,
            totalAmount: days * Number(room.price),
            status: "Confirmed"
        }

        addBooking(booking).then(() => {
            alert("Booking successful")
            loadData()
            setRoomId("")
            setCustomerId("")
            setCheckIn("")
            setCheckOut("")
        })
    }

    function cancelBooking(booking) {
        if (window.confirm("Cancel this booking?")) {
            updateBooking(booking.id, {
                ...booking,
                status: "Cancelled"
            }).then(() => loadData())
        }
    }

    return (
        <div>
            <h1>Booking Management</h1>

            <h2>Create Booking</h2>

            <label>Select Customer</label>
            <select
                value={customerId}
                onChange={e => setCustomerId(e.target.value)}
            >
                <option value="">Select Customer</option>
                {customers.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            {customers.length === 0 && (
                <p>
                    No customers available.
                    <Link to="/customers"> Add Customer</Link>
                </p>
            )}

            {selectedCustomer && (
                <div className="selected-customer">
                    <h3>Selected Customer Details</h3>
                    <p>Name: {selectedCustomer.name}</p>
                    <p>Email: {selectedCustomer.email}</p>
                    <p>Phone: {selectedCustomer.phone}</p>
                </div>
            )}

            <label>Select Room</label>
            <select
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
            >
                <option value="">Select Room</option>
                {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                        {r.roomNumber} - {r.roomType} - ₹{r.price}
                    </option>
                ))}
            </select>

            <label>Check-in</label>
            <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
            />

            <label>Check-out</label>
            <input
                type="date"
                value={checkOut}
                min={checkIn || undefined}
                onChange={e => setCheckOut(e.target.value)}
            />

            <button
                onClick={handleBooking}
                disabled={customers.length === 0}
            >
                Book Room
            </button>

            <h2>Booking Details</h2>

            {bookings.map(b => {
                const room = rooms.find(r => String(r.id) === String(b.roomId))
                const customer = customers.find(
                    c => String(c.id) === String(b.customerId)
                )

                return (
                    <div className="card" key={b.id}>
                        <h3>Booking ID: {b.id}</h3>
                        <p>Customer: {customer?.name || "Customer not found"}</p>
                        <p>Room: {room?.roomNumber || "Room not found"}</p>
                        <p>Check-in: {b.checkIn}</p>
                        <p>Check-out: {b.checkOut}</p>
                        <p>Total Amount: ₹{b.totalAmount}</p>
                        <p>Status: {b.status}</p>

                        {b.status === "Confirmed" && (
                            <button onClick={() => cancelBooking(b)}>
                                Cancel Booking
                            </button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Bookings