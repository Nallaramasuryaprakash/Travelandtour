// src/Components/Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./login.css";

const Login = ({ setUsername, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUsername(user.email);
      setIsLoggedIn(true);
      window.location.href = "/";
    } catch (error) {
      setError("Invalid credentials");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
