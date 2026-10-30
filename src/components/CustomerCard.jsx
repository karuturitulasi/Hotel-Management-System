import React from 'react'

function CustomerCard({ customer, editCustomer, removeCustomer }) {
    return (
        <div className="card">
            <h3>{customer.name}</h3>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <button onClick={() => editCustomer(customer)}>Edit</button>
            <button onClick={() => removeCustomer(customer.id)}> Delete</button>
        </div>
    )
}

export default CustomerCard