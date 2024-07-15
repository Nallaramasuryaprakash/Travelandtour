import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./login.css";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = () => {
    setErrors(""); // Clear errors when any input field is focused
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User logged in successfully:", user);

      setIsLoggedIn(true);

      // Redirect to home page after a short delay to ensure the state is updated
      setTimeout(() => {
        window.location.href = "/";
      }, 1000); // 1 second delay

    } catch (error) {
      setErrors(error.message);
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
          onFocus={handleFocus}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {errors && <span className="error">{errors}</span>}
        <button type="submit">Login</button>
        <p>If not registered, <Link to="/signup">signup here</Link>.</p>
      </form>
    </div>
  );
};

export default Login;
