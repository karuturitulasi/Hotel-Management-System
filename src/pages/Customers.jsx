import React, { useEffect, useState } from 'react'
import {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
} from '../services/api'

import CustomerCard from '../components/CustomerCard'

function Customers() {
    const [customers, setCustomers] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [editId, setEditId] = useState(null)

    function loadCustomers() {
        getCustomers().then(data => setCustomers(data))
    }
    useEffect(() => {
        loadCustomers()
    }, [])

    function handleSubmit() {
        const customer = { name, email, phone }

        if (editId) {
            updateCustomer(editId, customer).then(() => {
                loadCustomers()
                clearForm()
            })
        }
        else {
            addCustomer(customer).then(() => {
                loadCustomers()
                clearForm()
            })
        }
    }

    function editCustomer(customer) {
        setEditId(customer.id)
        setName(customer.name)
        setEmail(customer.email)
        setPhone(customer.phone)
    }

    function removeCustomer(id) {
        deleteCustomer(id).then(() => loadCustomers())
    }

    function clearForm() {
        setName("")
        setEmail("")
        setPhone("")
        setEditId(null)
    }
    return (
        <div>
            <h1>Customer Management</h1>
            <input
                placeholder="Customer Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            <input
                placeholder="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}/>
            <button onClick={handleSubmit}>
                {editId ? "Update Customer" : "Add Customer"}
            </button>
            <h2>Customer Details</h2>
            {customers.map(customer => (
                <CustomerCard
                    key={customer.id}
                    customer={customer}
                    editCustomer={editCustomer}
                    removeCustomer={removeCustomer} />
            ))}
        </div>
    )
}

export default Customers