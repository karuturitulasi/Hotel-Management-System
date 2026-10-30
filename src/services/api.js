const API = "http://localhost:3000";

export function getRooms() {
    return fetch(`${API}/rooms`).then(res => res.json());
}

export function addRoom(room) {
    return fetch(`${API}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room)
    });
}

export function updateRoom(id, room) {
    return fetch(`${API}/rooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room)
    });
}

export function deleteRoom(id) {
    return fetch(`${API}/rooms/${id}`, {
        method: "DELETE"
    });
}

// CUSTOMERS
export function getCustomers() {
    return fetch(`${API}/customers`).then(res => res.json());
}

export function addCustomer(customer) {
    return fetch(`${API}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });
}

export function updateCustomer(id, customer) {
    return fetch(`${API}/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });
}

export function deleteCustomer(id) {
    return fetch(`${API}/customers/${id}`, {
        method: "DELETE"
    });
}

export function getBookings() {
    return fetch(`${API}/bookings`).then(res => res.json());
}

export function addBooking(booking) {
    return fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });
}

export function updateBooking(id, booking) {
    return fetch(`${API}/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });
}

export function deleteBooking(id) {
    return fetch(`${API}/bookings/${id}`, {
        method: "DELETE"
    });
}