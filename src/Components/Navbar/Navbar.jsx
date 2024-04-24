import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { SiYourtraveldottv } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";

const Navbar = ({ handleLogout }) => {
    const [active, setActive] = useState('navBar');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve username from local storage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const showNav = () => {
        setActive('navBar activeNavbar');
    }

    const removeNavbar = () => {
        setActive('navBar');
    }

    const handleUsernameClick = () => {
        // Toggle the active state to show/hide the logout option
        setActive(active === 'navBar' ? 'navBar activeUsername' : 'navBar');
    };

    const handleLogoutClick = () => {
        // Clear username from local storage and log out
        localStorage.clear();
        setUsername(''); // Reset username to empty string
    };

    return (
        <section className="navBarSelection">
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <h1><SiYourtraveldottv />Travel</h1>
                    </Link>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <Link to="/" className="navLink">Home</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/" className="navLink">Packages</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/" className="navLink">Shop</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/" className="navLink">About</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/" className="navLink">Pages</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/" className="navLink">News</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/" className="navLink">Contact</Link>
                        </li>

                        {username ? (
                            <>
                                <li className="navItem">
                                    <span className="navLink" id="user" onClick={handleUsernameClick}>{username}</span>
                                </li>
                                {active === 'navBar activeUsername' && (
                                    <li className="navItem">
                                        <span className="navLink logout" id="logout" onClick={handleLogoutClick}>Logout</span>
                                    </li>
                                )}
                            </>
                        ) : (
                            <li className="navItem">
                                <Link to="/login" className="navLink">Login</Link>
                            </li>
                        )}

                        <button className="btn">
                            <Link to="/book">BOOK NOW</Link>
                        </button>
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
