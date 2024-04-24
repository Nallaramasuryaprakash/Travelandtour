import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Data } from "./Components/Main/Main.jsx";
import "./details.css";

const Details = () => {
    const { destTitle } = useParams();
    const item = Data.find(item => item.destTitle === destTitle);
    const navigate = useNavigate();

    const handleContinue = () => {
        // Navigate to the Booking page with itemData as state
        navigate("/booking", { state: { itemData: item } });
    };

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div className="Single">
            <div className="imgDiv">
                <img src={item.imgSrc} alt={item.destTitle} />
            </div>
            <div className="Info">
                <h4 className="Title">{item.destTitle}</h4>
                <span className="place">
                    <span className="locate">Location: {item.location}</span>
                </span>
                <div className="fee">
                    <div className="grades">
                        <span>{item.grade}<small>+1</small></span>
                    </div>
                    <div className="prices">
                        <h5>Price: {item.fees}</h5>
                    </div>
                </div>
                <div className="description">
                    <p>{item.description}</p>
                </div>
            </div>
            <button id="con" onClick={handleContinue}>Continue</button>
        </div>
    );
};

export default Details;
