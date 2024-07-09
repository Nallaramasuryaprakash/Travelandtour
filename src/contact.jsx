import React, { useState, useEffect } from "react";
import "./contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setFormData(prevState => ({
                ...prevState,
                name: savedUsername
            }));
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation here
        if (formData.name.trim() === "" || formData.email.trim() === "" || formData.message.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }
        // Check if the user is logged in
        if (isLoggedIn) {
            // If user is logged in, show success message
            alert("Message sent successfully!");
            // Clear form data
            setFormData({
                name: "",
                email: "",
                message: ""
            });
        } else {
            alert("You must be logged in to send a message.");
        }
    };

    return (
        <section className="contact-container">
            <div className="contact-info">
                <h2>Contact Us</h2>
                <p>If you have any questions or need assistance, feel free to contact us:</p>
                <ul>
                    <li>Email: contact@yourtraveldottv.com</li>
                    <li>Phone: +1 123-456-7890</li>
                    <li>Address: 123 Travel Street, City, Country</li>
                </ul>
            </div>
            <div className="contact-form">
                <h3>Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
