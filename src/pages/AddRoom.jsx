import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addRoom } from '../services/api'
import './AddRoom.css'

function AddRoom() {

    const navigate = useNavigate()

    const [roomNumber, setRoomNumber] = useState("")
    const [roomType, setRoomType] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        setError("")

        if (!roomNumber.trim() || !roomType || !price) {
            setError("Please fill all fields")
            return
        }

        if (Number(price) <= 0) {
            setError("Price must be greater than zero")
            return
        }

        const room = {
            roomNumber: roomNumber.trim(),
            roomType,
            price: Number(price),
            status: "Available"
        }

        addRoom(room)
            .then(res => {
                if (!res.ok) throw new Error("Failed to add room")
                alert("Room added successfully!")
                navigate('/rooms')
            })
            .catch(() => setError("Unable to add room"))
    }

    return (
        <div className="add-room-page">

            <div className="add-room-form">

                <h1>Add New Room</h1>

                <form onSubmit={handleSubmit}>

                    <label>Room Number</label>
                    <input
                        type="text"
                        placeholder="Example: 101"
                        value={roomNumber}
                        onChange={e => setRoomNumber(e.target.value)}
                    />

                    <label>Room Type</label>
                    <select
                        value={roomType}
                        onChange={e => setRoomType(e.target.value)}
                    >
                        <option value="">Choose Room Type</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Suite">Suite</option>
                    </select>

                    <label>Price Per Day</label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Enter price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />

                    {error && <p className="error">{error}</p>}

                    <button type="submit">Add Room</button>

                </form>

            </div>

        </div>
    )
}

export default AddRoom