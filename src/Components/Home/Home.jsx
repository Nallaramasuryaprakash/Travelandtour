import React, { useState, useEffect, useRef } from "react";
import './home.css';
import video from '../../Assets/video.mp4';
import { GrLocation } from "react-icons/gr";
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import { FaTripadvisor } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';

const Home = () => {
    const [showLocationList, setShowLocationList] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [maxPrice, setMaxPrice] = useState(30000);
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [showAllLocations, setShowAllLocations] = useState(false);
    const navigate = useNavigate();
    const locationListRef = useRef(null);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        fetch('https://json-server-data-l9f6.onrender.com/locations')
            .then(response => response.json())
            .then(data => {
                const uniqueLocations = removeDuplicates(data);
                setLocations(uniqueLocations);
            })
            .catch(error => console.error('Error fetching locations:', error));
    }, []);

    useEffect(() => {
        if (searchInput) {
            const filtered = locations.filter(location =>
                location.location.toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilteredLocations(filtered);
            setShowLocationList(true);
        } else {
            setFilteredLocations([]);
            setShowLocationList(false);
        }
    }, [searchInput, locations]);

    const removeDuplicates = (locationsArray) => {
        const uniqueLocations = new Set();
        return locationsArray.filter(location => {
            if (!uniqueLocations.has(location.location)) {
                uniqueLocations.add(location.location);
                return true;
            }
            return false;
        });
    };

    const handleLocationSelect = (location) => {
        setSearchInput(location);
        setShowLocationList(false);
        setShowAllLocations(false);
    };

    const handlePriceChange = (e) => {
        setMaxPrice(parseInt(e.target.value));
    };

    const handleSearch = () => {
        if (!searchInput) {
            alert('Please enter a location name');
            return;
        }
        navigate(`/search?location=${searchInput}&maxPrice=${maxPrice}`);
    };

    const handleLocationIconClick = () => {
        setShowAllLocations(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (locationListRef.current && !locationListRef.current.contains(event.target)) {
            setShowLocationList(false);
            setShowAllLocations(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <section className="home">
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop type="video/mp4"></video>
            <div className="homeContent container">
                <div className="textDiv">
                    <span data-aos="fade-up" className="smallText">
                        Our packages
                    </span>
                    <h1 data-aos="fade-up" className="homeTitle">
                        Search your Holiday
                    </h1>
                </div>

                <div data-aos="fade-up" className="cardDiv grid">
                    <div className="destinationInput">
                        <label htmlFor="city">Search Your Destination</label>
                        <div className="input flex">
                            <input
                                type="text"
                                placeholder="Enter name here..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <GrLocation className="icon" onClick={handleLocationIconClick} />
                        </div>
                        {(showLocationList || showAllLocations) && (
                            <div className="locationList" ref={locationListRef}>
                                {(filteredLocations.length > 0 || showAllLocations) ?
                                    (filteredLocations.length > 0 ? filteredLocations : locations).map((location, index) => (
                                        <div
                                            key={index}
                                            className="locationItem"
                                            onClick={() => handleLocationSelect(location.location)}
                                        >
                                            {location.location}
                                        </div>
                                    )) : (
                                        <div className="locationItem">No locations found</div>
                                    )}
                            </div>
                        )}
                    </div>

                    <div className="PriceInput">
                        <div className="label_total flex">
                            <label htmlFor="price">Max Price:</label>
                            <b className="total">₹{maxPrice}</b>
                        </div>
                        <div className="input flex">
                            <input type="range" max="30000" min="100" value={maxPrice} onChange={handlePriceChange} />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                        <span onClick={handleSearch}>SEARCH</span>
                    </div>
                </div>

                <div data-aos="fade-up" className="homeFooterIcons flex">
                    <div className="rightIcons">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><AiOutlineTwitter className="icon" /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><AiFillYoutube className="icon" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><AiFillInstagram className="icon" /></a>
                        <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer"><FaTripadvisor className="icon" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
