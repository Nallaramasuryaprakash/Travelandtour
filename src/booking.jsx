import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./booking.css";
import Payment from "./payment";

const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { itemData } = location.state || {};
    const [showPayment, setShowPayment] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        date: new Date().toISOString().split('T')[0],
        persons: 1,
        personsNames: [""]
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handlePersonsChange = (change) => {
        const newPersons = formData.persons + change;
        if (newPersons >= 1 && newPersons <= 3) { // Updated limit to 3 persons
            const newPersonsNames = [...formData.personsNames];
            if (change > 0) {
                newPersonsNames.push("");
            } else {
                newPersonsNames.pop();
            }
            setFormData((prevData) => ({
                ...prevData,
                persons: newPersons,
                personsNames: newPersonsNames
            }));
        }
    };

    const handlePersonNameChange = (index, e) => {
        const newPersonsNames = [...formData.personsNames];
        newPersonsNames[index] = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            personsNames: newPersonsNames
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, date, personsNames } = formData;

        if (!email.trim() || !date.trim() || personsNames.some(personName => !personName.trim())) {
            alert("Please fill in all fields.");
            return;
        }

        const isLoggedIn = localStorage.getItem('username');

        if (!isLoggedIn) {
            alert("Please login to proceed with booking.");
            navigate('/login');
            return;
        }

        setShowPayment(true);
    };

    const totalAmount = (Number(itemData?.fees.replace(/[^0-9.-]+/g,"")) * formData.persons).toFixed(2);

    return (
        <div style={{ backgroundImage: `url(${itemData?.imgSrc})` }} className="background">
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
                    <div>
                        <label htmlFor="persons">Number of Persons:</label>
                        <div>
                            <button type="button" onClick={() => handlePersonsChange(-1)} disabled={formData.persons === 1}>-</button>
                            <span id="persons">{formData.persons}</span>
                            <button type="button" onClick={() => handlePersonsChange(1)} disabled={formData.persons === 3}>+</button>
                        </div>
                    </div>
                    {formData.personsNames.map((personName, index) => (
                        <div key={index}>
                            <label htmlFor={`personName${index}`}>{index === 0 ? "Person Name 1:" : `Person ${index + 1} Name:`}</label>
                            <input
                                type="text"
                                id={`personName${index}`}
                                value={personName}
                                onChange={(e) => handlePersonNameChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Your Email:</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Total Amount:</label>
                        <span>₹{totalAmount}</span>
                    </div>
                    <button type="submit">Book Now</button>
                </form>
                {showPayment && (
                    <div className="modal-container">
                        <div className="modal">
                        <Payment itemData={itemData} fees={totalAmount} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;
