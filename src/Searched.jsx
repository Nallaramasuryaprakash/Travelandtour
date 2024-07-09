import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from "./Assets/Datacontext";
import './Searched.css';

const Searched = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchLocation = searchParams.get('location');
    const maxPrice = parseInt(searchParams.get('maxPrice')) || Infinity;
    const navigate = useNavigate();
    
    const data = useContext(DataContext);

    const filteredData = data.filter(item => {
        const locationMatch = searchLocation ? item.location.toLowerCase().includes(searchLocation.toLowerCase()) : true;
        const priceMatch = item.fees ? parseInt(item.fees.replace('₹', '')) <= maxPrice : true;
        return locationMatch && priceMatch;
    });

    const handleBookNow = (itemData) => {
        navigate('/booking', { state: { itemData } });
    };

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="searched-container">
            {filteredData.length === 0 ? (
                <div className="no-data">
                    <h2>No data found</h2>
                    <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
                </div>
            ) : (
                filteredData.map(item => (
                    <div key={item.id} className="card">
                        <img src={item.imgSrc} alt={item.destTitle} />
                        <div className="card-content">
                            <h2>{item.destTitle}</h2>
                            <p>{item.description}</p>
                            <div className="card-info">
                                <span>{item.location}</span>
                                <span>{item.grade}</span>
                                <span>{item.fees}</span>
                            </div>
                            <button className="book-now-button" onClick={() => handleBookNow(item)}>Book Now</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Searched;
