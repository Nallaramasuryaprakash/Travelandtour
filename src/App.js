import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from "./details";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Booking from "./booking";
import Payment from "./payment";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import "./app.css"

const App = () => {
    const [username, setUsername] = useState("");

    return (
        <Router>
            <Routes>
                <Route path="/details/:destTitle" element={<DetailsPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login setUsername={setUsername} />} />
                {/* Pass navigate function as a prop to BookingPage */}
                <Route path="/booking" element={<BookingPage setUsername={setUsername} />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/" element={<HomePage username={username} />} />
            </Routes>
        </Router>
    );
};

const HomePage = ({ username }) => (
    <>
        <Navbar username={username} />
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

const BookingPage = ({ setUsername }) => (
    <>
        {/* Pass setUsername and navigate function as props to Booking */}
        <Booking setUsername={setUsername} />
    </>
);

const PaymentPage = () => (
    <>
        <Payment />
    </>
);

export default App;
