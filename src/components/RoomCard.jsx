import React from 'react'

function RoomCard({ room, editRoom, removeRoom }) {
    return (
        <div className="card">
            <h3>Room Number: {room.roomNumber}</h3>
            <p>Type: {room.roomType}</p>
            <p>Price: ₹{room.price}</p>
            <p>Status: {room.status}</p>
            <button onClick={() => editRoom(room)}>
                Edit
            </button>
            <button onClick={() => removeRoom(room.id)}>
                Delete
            </button>
        </div>
    )
}

export default RoomCard