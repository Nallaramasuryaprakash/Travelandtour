import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./booking.css";
import Payment from "./payment";

const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { itemData } = location.state || {};
    const [showPayment, setShowPayment] = useState(false); // State to control Payment component visibility
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: new Date().toISOString().split('T')[0], // Default to today's date
    });

    // Handle form input change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Handle form submission for booking
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, date } = formData;

        // Validate form data
        if (!name.trim() || !email.trim() || !date.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const isLoggedIn = localStorage.getItem('username'); // Check if user is logged in

        if (!isLoggedIn) {
            alert("Please login to proceed with booking.");
            navigate('/login'); // Redirect to the login page
            return;
        }

        // Add logic to process booking data or perform other actions
        setShowPayment(true); // Show the Payment component after booking
    };

    return (
        <div style={{ backgroundImage: `url(${itemData?.imgSrc})`}} className="background">
            <div className="booking-container">
                <h2>Booking Details</h2>
                <div className="booking-details">
                    <div>
                        <label htmlFor="destTitle">Destination:</label>
                        <span id="destTitle">{itemData?.destTitle}</span>
                    </div>
                    <div>
                        <label htmlFor="location">Location:</label>
                        <span id="location">{itemData?.location}</span>
                    </div>
                    <div>
                        <label htmlFor="fees">Fees:</label>
                        <span id="fees">{itemData?.fees}</span>
                    </div>
                    <div>
                        <label htmlFor="date">Select Date:</label>
                        <input type="date" id="date" value={formData.date} min={new Date().toISOString().split('T')[0]} onChange={handleChange} required />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <button type="submit">Book Now</button>
                </form>
                {showPayment && (
                    <div className="modal-container">
                        <div className="modal">
                            <Payment itemData={itemData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;
