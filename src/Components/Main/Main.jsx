import React, { useEffect, useContext } from "react";
import './main.css';
import Aos from "aos";
import 'aos/dist/aos.css';
import { BsClipboardCheck } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../Assets/Datacontext';

const Main = () => {
    const data = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({
            duration: 2000
        });
    }, []);

    // Helper function to convert fee string to number
    const convertFeesToNumber = (feeString) => {
        return Number(feeString.replace(/₹|,/g, ''));
    };

    // Function to handle details button click
    const handleDetailsClick = (destTitle) => {
        const username = localStorage.getItem('username');
        if (username) {
            navigate(`/details/${destTitle}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent grid">
                {
                    data.filter(({ fees }) => convertFeesToNumber(fees) <= 3000).map(({ id, imgSrc, destTitle, location, grade, fees, description }) => (
                        <div key={id} data-aos="fade-up" className="singleDestination">
                            <div className="imageDiv">
                                <img src={imgSrc} alt={destTitle} />
                            </div>

                            <div className="cardInfo">
                                <h4 className="destTitle">
                                    {destTitle}
                                </h4>
                                <span className="continent flex">
                                    <HiOutlineLocationMarker className="icon" />
                                    <span className="name">{location}</span>
                                </span>

                                <div className="fees flex">
                                    <div className="grade">
                                        <span>{grade}<small>+1</small></span>
                                    </div>
                                    <div className="price">
                                        <h5>{fees}</h5>
                                    </div>
                                </div>
                                <button onClick={() => handleDetailsClick(destTitle)} className="btn flex">
                                    DETAILS <BsClipboardCheck className="icon" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Main;
