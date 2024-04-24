import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        mobile: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear previous errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Submit the form or perform further actions
            console.log("Form submitted successfully:", formData);
            saveDataToLocalStorage(formData);
            // Redirect to login page after signup using Link component
            window.location.href = "/login";
        }
    };

    const validateForm = (data) => {
        let errors = {};

        // Validate username, mobile, email, password here...

        return errors;
    };

    const saveDataToLocalStorage = (formData) => {
        // Fetch existing data from local storage
        const storedData = JSON.parse(localStorage.getItem('userData')) || [];

        // Add new data to the existing array
        storedData.push(formData);

        // Save updated array back to local storage
        localStorage.setItem('userData', JSON.stringify(storedData));
    };

    return (
        <div className="signupContainer">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <span className="error">{errors.username}</span>}
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                />
                {errors.mobile && <span className="error">{errors.mobile}</span>}
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
                <button type="submit">Signup</button>
                {/* Use Link component for navigation */}
                <p>If already registered, <Link to="/login">login here</Link>.</p>
            </form>
        </div>
    );
};

export default Signup;
