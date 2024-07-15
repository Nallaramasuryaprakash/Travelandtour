import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    auth.signOut();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    document.title = "TravelAndTour";
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/details/:destTitle" element={<DetailsPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/" element={<HomePage handleLogout={handleLogout} isLoggedIn={isLoggedIn} />} />
          <Route path="/search" element={<SearchedPage />} />
          <Route path="/packages" element={<Package />} />
          <Route path="/contact" element={<ContactPage isLoggedIn={isLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

const HomePage = ({ handleLogout, isLoggedIn }) => (
  <>
    <Navbar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
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

const LoginPage = () => (
  <>
    <Login />
  </>
);

const BookingPage = () => (
  <>
    <Booking />
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

const ContactPage = ({ isLoggedIn }) => (
  <>
    <Contact isLoggedIn={isLoggedIn} />
  </>
);

export default App;
