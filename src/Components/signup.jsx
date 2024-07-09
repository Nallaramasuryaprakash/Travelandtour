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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                // Fetch existing users
                const response = await fetch("http://localhost:3001/posts");
                const users = await response.json();
                const nextId = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;

                // Add id to the formData
                const newUser = { ...formData, id: nextId };

                const postResponse = await fetch("http://localhost:3001/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                });
                if (postResponse.ok) {
                    console.log("Form submitted successfully:", newUser);
                    // Redirect to login page after signup using window.location.href
                    window.location.href = "/login";
                } else {
                    console.error("Failed to submit form data");
                }
            } catch (error) {
                console.error("Error submitting form data:", error);
            }
        }
    };

    const validateForm = (data) => {
        let errors = {};

        // Validate username, mobile, email, password here...
        if (!data.username) errors.username = "Username is required";
        if (!data.mobile) errors.mobile = "Mobile number is required";
        if (!data.email) errors.email = "Email is required";
        if (!data.password) errors.password = "Password is required";

        return errors;
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
