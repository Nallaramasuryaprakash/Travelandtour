import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = ({ setUsername }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = formData;

        // Retrieve data from local storage
        const storedData = JSON.parse(localStorage.getItem("userData")) || [];

        // Check if the entered credentials match with stored data
        const user = storedData.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            localStorage.setItem("username", username); // Store username in local storage
            setUsername(username); // Set username in parent component
            window.location.href = "/"; // Redirect to homepage
        } else {
            setError("Invalid username or password"); // Display error if credentials do not match
        }
    };

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {error && <span className="error">{error}</span>}
                <button type="submit">Login</button>
            </form>
            <p>If not registered, <Link to="/signup">Signup here</Link>.</p>
        </div>
    );
};

export default Login;
