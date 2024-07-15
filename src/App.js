import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from "./Assets/Datacontext";
import Details from "./details";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Booking from "./booking";
import Payment from "./payment";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import Searched from "./Searched";
import Package from "./package";
import Contact from "./contact";
import About from "./about";
import News from "./news";
import "./app.css";

const App = () => {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
    };
    useEffect(() => {
        document.title = "TravelAndTour";
    }, []);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://localhost:3001/posts');
                const users = await response.json();
                const loggedInUser = users.find(user => user.isLoggedIn);
                if (loggedInUser) {
                    setUsername(loggedInUser.username);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Failed to fetch username:', error);
            }
        };

        fetchUsername();
    }, []);

    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/details/:destTitle" element={<DetailsPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<LoginPage setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/booking" element={<BookingPage setUsername={setUsername} username={username} />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/" element={<HomePage username={username} handleLogout={handleLogout} />} />
                    <Route path="/search" element={<SearchedPage />} />
                    <Route path="/packages" element={<Package />} />
                    <Route path="/contact" element={<ContactPage isLoggedIn={isLoggedIn} username={username} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/news" element={<News />} />
                </Routes>
            </Router>
        </DataProvider>
    );
};

const HomePage = ({ username, handleLogout }) => (
    <>
        <Navbar username={username} handleLogout={handleLogout} />
        <Home />
        <Main />
        <Footer />
    </>
);

const DetailsPage = () => (
    <>
        <Details />
    </>
);

const LoginPage = ({ setUsername, setIsLoggedIn }) => (
    <>
        <Login setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />
    </>
);

const BookingPage = ({ setUsername, username }) => (
    <>
        <Booking setUsername={setUsername} username={username} />
    </>
);

const PaymentPage = () => (
    <>
        <Payment />
    </>
);

const SearchedPage = () => (
    <>
        <Searched />
    </>
);

const ContactPage = ({ isLoggedIn, username }) => (
    <>
        <Contact isLoggedIn={isLoggedIn} username={username} />
    </>
);

export default App;
