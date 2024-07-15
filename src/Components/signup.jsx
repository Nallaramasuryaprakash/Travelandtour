import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import "../signup.css";

const Signup = () => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email,
        // Avoid storing passwords in Firestore
      });

      console.log("User signed up successfully:", user);

      // Show alert for successful signup
      alert("Signup successful!");

      // Redirect to login page after a short delay to ensure the alert is shown
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); // 1 second delay

    } catch (error) {
      setErrors(error.message);
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="signupContainer">
      <h2>Signup</h2>
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
        <button type="submit">Signup</button>
        <p>If already registered, <Link to="/login">login here</Link>.</p>
      </form>
    </div>
  );
};

export default Signup;
