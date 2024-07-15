import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { SiYourtraveldottv } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
    const auth = getAuth();
    const [active, setActive] = useState('navBar');
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState('Fetching location...');

    useEffect(() => {
        // Check if user is already authenticated
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                localStorage.setItem('username', user.displayName || user.email);
            } else {
                setUser(null);
                localStorage.removeItem('username');
            }
        });

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

        // Cleanup function
        return () => unsubscribe();
    }, [auth]);

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

    const handleLogoutClick = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem('username');
            // Optionally, you can clear any other user-related state here
            // Redirecting to '/login' is omitted to stay on the same page
        } catch (error) {
            console.error('Error signing out:', error);
        }
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
                            <Link to="/about" className="navLink">About</Link> {/* Added About link */}
                        </li>

                        <li className="navItem">
                            <Link to="/news" className="navLink">News</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/contact" className="navLink">Contact</Link>
                        </li>

                        {user ? (
                            <>
                                <li className="navItem">
                                    <span className="navLink" id="user" onClick={handleUsernameClick}>{user.displayName || user.email}</span>
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
