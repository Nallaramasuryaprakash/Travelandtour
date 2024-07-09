import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = ({ setUsername, setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        try {
            const response = await fetch("https://json-server-data-1.onrender.com/users");
            const users = await response.json();

            const user = users.find(
                (user) => user.username === username && user.password === password
            );

            if (user) {
                setUsername(username);
                setIsLoggedIn(true);
                localStorage.setItem("username", username); // Save username to local storage
                window.location.href = "/"; // Redirect to homepage
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("An error occurred. Please try again later.");
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
