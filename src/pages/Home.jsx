import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const images = [
    '/hotel1.jpg',
    '/hotel2.jpg',
    '/hotel3.png' ]

function Home() {
    const navigate = useNavigate()
    const [currentImage, setCurrentImage] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % images.length)
        }, 4000)

        return () => clearInterval(timer)
    }, [])
    return (
        <div className="home-page">
            <img
                key={currentImage}
                src={images[currentImage]}
                alt="Hotel"
                className="home-background"/>
            <div className="home-overlay"></div>
            <div className="home-content">
                <h1 className="small-title">WELCOME TO OUR HOTEL</h1>
                <p>Your Comfort, Our Priority</p>
                <p>“Experience exceptional comfort and warm hospitality with our hotel, where every stay is designed to make you feel at home.”</p>
                <button onClick={() => navigate('/rooms')}>Get Started</button>
            </div>
        </div>
    )
}

export default Home
