import React, { useState, useEffect } from "react";
import './home.css';
import video from '../../Assets/video.mp4';
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { SiTripadvisor } from "react-icons/si";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";

import Aos from "aos";
import 'aos/dist/aos.css';

const Home = () => {
    const [showLocationList, setShowLocationList] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [maxPrice, setMaxPrice] = useState(5000);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const toggleLocationList = () => {
        setShowLocationList(!showLocationList);
    };

    const handleLocationSelect = (location) => {
        setSearchInput(location);
        setShowLocationList(false);
    };

    const locations = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Dubai', 'Rome', 'Moscow', 'Beijing'];

    const handlePriceChange = (e) => {
        setMaxPrice(parseInt(e.target.value));
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
                            <GrLocation className="icon" onClick={toggleLocationList} />
                            {showLocationList && (
                                <div className="locationList" style={{ backgroundColor: "white", color: "black", padding: "5px" }}>
                                    {locations.map((location, index) => (
                                        <div
                                            key={index}
                                            className="locationItem"
                                            onClick={() => handleLocationSelect(location)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {location}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">Select Your Date</label>
                        <div className="input flex">
                            <input type="date" min={new Date().toISOString().split('T')[0]}/>
                        </div>
                    </div>

                    <div className="PriceInput">
                        <div className="label_total flex">
                            <label htmlFor="price">Max Price:</label>
                            <h3 className="total">${maxPrice}</h3>
                        </div>
                        <div className="input flex">
                            <input type="range" max="5000" min="500" value={maxPrice} onChange={handlePriceChange} />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                        <HiFilter className="icon" />
                        <span>MORE FILTERS</span>
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
