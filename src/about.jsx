import React from "react";
import "./about.css";
import Navbar from "./Components/Navbar/Navbar";

const About = () => {
    return (
        <>
        <Navbar/>
        <div className="aboutContainer">
            <h2>About Us</h2>
            <p>Welcome to our travel and tour services!</p>
            <p>
                We are dedicated to providing you with unforgettable travel experiences
                that create lasting memories. Whether you're looking for a relaxing beach
                getaway, an adventurous trek through nature, or a culturally rich city tour,
                we have the perfect packages to suit your desires.
            </p>
            <p>
                Our team of experienced travel experts is committed to ensuring your trip
                is seamless from start to finish. From personalized itinerary planning to
                24/7 customer support during your journey, we are here to make your travel
                dreams a reality.
            </p>
            <p>
                Explore our website to discover a wide range of travel destinations,
                accommodations, activities, and more. Let us take you on a journey of
                discovery and relaxation as you explore the world with us.
            </p>
            <h3>Our Mission</h3>
            <p>
                Our mission is to inspire and enable people to explore the world by
                providing exceptional travel experiences that exceed expectations,
                promote cultural understanding, and create lifelong memories.
            </p>
            <h3>Contact Us</h3>
            <p>
                Have questions or need assistance? Feel free to reach out to our friendly
                customer support team at <a href="tel:+123456789">+1 (234) 567-89</a> or
                email us at <a href="mailto:info@travelandtour.com">info@travelandtour.com</a>.
                We're here to help make your travel dreams come true.
            </p>
        </div>
        </>
    );
};

export default About;
