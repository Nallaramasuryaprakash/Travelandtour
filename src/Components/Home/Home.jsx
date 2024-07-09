import React, { useState, useEffect } from "react";
import './home.css';
import video from '../../Assets/video.mp4';
import { GrLocation } from "react-icons/gr";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { SiTripadvisor } from "react-icons/si";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
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

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/locations')
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
        navigate(`/search?location=${searchInput}&maxPrice=${maxPrice}`);
    };

    const handleLocationIconClick = () => {
        setShowAllLocations(prevState => !prevState);
    };

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
                            <div className="locationList">
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
                            <h3 className="total">₹{maxPrice}</h3>
                        </div>
                        <div className="input flex">
                            <input type="range" max="5000" min="500" value={maxPrice} onChange={handlePriceChange} />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                        <span onClick={handleSearch}>SEARCH</span>
                    </div>
                </div>

                <div data-aos="fade-up" className="homeFooterIcons flex">
                    <div className="rightIcons">
                        <FiFacebook className="icon" />
                        <AiOutlineInstagram className="icon" />
                        <SiTripadvisor className="icon" />
                    </div>
                    <div className="leftIcons">
                        <BsListTask className="icon" />
                        <TbApps className="icon" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
