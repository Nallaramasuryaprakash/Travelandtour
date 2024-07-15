import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { SiYourtraveldottv } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";

const Navbar = () => {
    const [active, setActive] = useState('navBar');
    const [location, setLocation] = useState('Fetching location...');
    const [username, setUsername] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        // Retrieve username from localStorage if available
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                        .then(response => response.json())
                        .then(data => {
                            const { city, principalSubdivision } = data;
                            setLocation(`${city}, ${principalSubdivision}`);
                        })
                        .catch(() => setLocation('Location not available'));
                },
                () => setLocation('Location access denied')
            );
        } else {
            setLocation('Geolocation not supported');
        }
    }, []);

    const showNav = () => {
        setActive('navBar activeNavbar');
    }

    const removeNavbar = () => {
        setActive('navBar');
        setShowOptions(false); // Hide options when closing navbar
    }

    const handleUsernameClick = () => {
        setShowOptions(!showOptions); // Toggle showOptions state
    };

    const handleLogoutClick = () => {
        // Clear username from localStorage and reset state
        localStorage.removeItem('username');
        setUsername('');
        setShowOptions(false); // Hide options after logout
        // Additional logout logic if needed
        // For example: redirecting to login page
        // window.location.href = '/login';
    };

    const scrollToTop = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <section className="navBarSelection">
            <header className="header flex">
                <div className="locationDiv">
                    <p>{location}</p>
                </div>
                <div className="logoDiv">
                    <Link to="/" className="logo flex" onClick={scrollToTop}>
                        <h1><SiYourtraveldottv />Travel</h1>
                    </Link>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <Link to="/" className="navLink" onClick={scrollToTop}>Home</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/packages" className="navLink">Packages</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/about" className="navLink">About</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/news" className="navLink">News</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/contact" className="navLink">Contact</Link>
                        </li>

                        {username ? (
                            <>
                                <li className="navItem">
                                    <span className="navLink" id="user" onClick={handleUsernameClick}>{username}</span>
                                </li>
                                {showOptions && (
                                    <li className="navItem logoutOption" onClick={handleLogoutClick}>
                                        Logout
                                    </li>
                                )}
                            </>
                        ) : (
                            <li className="navItem">
                                <Link to="/login" className="navLink">Login</Link>
                            </li>
                        )}
                    </ul>
                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots id="dot" />
                </div>
            </header>
        </section>
    );
}

export default Navbar;
