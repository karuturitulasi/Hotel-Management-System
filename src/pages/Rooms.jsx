import React, { useEffect, useState } from 'react'
import { getRooms, updateRoom, deleteRoom } from '../services/api'
import { useNavigate } from 'react-router-dom'
import './Rooms.css'

function Rooms() {
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([])
    const [roomNumber, setRoomNumber] = useState("")
    const [roomType, setRoomType] = useState("")
    const [price, setPrice] = useState("")
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const [editId, setEditId] = useState(null)
    const [error, setError] = useState("")

    function loadRooms() {
        getRooms()
            .then(data => {
                if (Array.isArray(data)) {
                    setRooms(data)
                } else {
                    setRooms([])
                    setError("Invalid room data")
                }
            })
            .catch(() => setError("Unable to load rooms"))
    }
    useEffect(() => {
        loadRooms()
    }, [])

    function clearForm() {
        setRoomNumber("")
        setRoomType("")
        setPrice("")
        setEditId(null)
        setError("")
    }

    function handleSubmit(e) {
        e.preventDefault()
        setError("")
        if (!roomNumber.trim() || !roomType || !price) {
            setError("Please fill all the fields")
            return
        }
        if (Number(price) <= 0) {
            setError("Price must be greater than zero")
            return
        }
        const duplicate = rooms.some(room =>
            String(room.roomNumber).toLowerCase() === roomNumber.trim().toLowerCase() && room.id !== editId
        )
        if (duplicate) {
            setError("Room number already exists")
            return
        }
        const updatedRoom = {
            roomNumber: roomNumber.trim(),
            roomType: roomType,
            price: Number(price),
            status: rooms.find(room => room.id === editId)?.status || "Available"
        }
        updateRoom(editId, updatedRoom)
            .then(res => {
                if (!res.ok) throw new Error("Update failed")
                clearForm()
                loadRooms()
            })
            .catch(() => setError("Unable to update room"))
    }

    function handleEdit(room) {
        setRoomNumber(room.roomNumber)
        setRoomType(room.roomType)
        setPrice(room.price)
        setEditId(room.id)
        setError("")
    }

    function handleDelete(id) {
        if (window.confirm("Do you want to delete this room?")) {
            deleteRoom(id)
                .then(res => {
                    if (!res.ok) throw new Error("Delete failed")
                    loadRooms()
                })
                .catch(() => setError("Unable to delete room"))
        }
    }
    const filteredRooms = rooms.filter(room =>
        String(room.roomNumber || "").toLowerCase().includes(search.toLowerCase()) &&
        (filter === "" || room.roomType === filter)
    )
    return (
        <div className="rooms-page">
            <div className="rooms-header">
                <div>
                    <h1>Room Management</h1>
                    <p>Manage your hotel rooms easily</p>
                </div>
                <div className="header-actions">
                    <h3>Total Rooms: {rooms.length}</h3>
                    <button className="add-room-icon" onClick={() => navigate('/add-room')} title="Add New Room">+</button>
                </div>
            </div>
            {error && <p className="error">{error}</p>}
            {editId !== null && (
                <div className="form-section">
                    <h2>Edit Room</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Room Number</label>
                        <input type="text" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} required />
                        <label>Room Type</label>
                        <select value={roomType} onChange={e => setRoomType(e.target.value)} required>
                            <option value="">Choose Room Type</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Suite">Suite</option>
                        </select>
                        <label>Price Per Day</label>
                        <input type="number" min="1" value={price} onChange={e => setPrice(e.target.value)} required />
                        <button type="submit" className="save-button">Save Changes</button>
                        <button type="button" className="cancel-button" onClick={clearForm}>Cancel</button>
                    </form>
                </div>
            )}
            <div className="list-section">
                <h2>Room Details</h2>
                <div className="search-section">
                    <input type="text" placeholder="Search room..." value={search} onChange={e => setSearch(e.target.value)} />
                    <select value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Suite">Suite</option>
                    </select>
                </div>
                <div className="room-grid">
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map(room => (
                            <div className="room-box" key={room.id}>
                                <div className="room-top">
                                    <h3>Room {room.roomNumber}</h3>
                                    <span>{room.status}</span>
                                </div>
                                <p>Type: {room.roomType}</p>
                                <h2>₹{room.price}</h2>
                                <small>Per day</small>
                                <div className="actions">
                                    <button onClick={() => handleEdit(room)}>Edit</button>
                                    <button onClick={() => handleDelete(room.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No rooms available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Rooms
