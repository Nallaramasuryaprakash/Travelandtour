import React from "react";
import "./news.css";

const News = () => {
    return (
        <div className="newsContainer">
            <h2>Latest News</h2>
            <div className="newsItem">
                <h3>Tour Packages Announcement</h3>
                <p>We are excited to announce our new range of tour packages covering exotic destinations. Explore breathtaking landscapes and cultural wonders with our expert guides.</p>
            </div>
            <div className="newsItem">
                <h3>Enhanced Tour Facilities</h3>
                <p>Our company is committed to providing top-notch tour facilities, including luxury accommodations, transportation, and guided tours, ensuring a memorable travel experience for our customers.</p>
                <ul>
                    <li>Luxury hotels and resorts</li>
                    <li>Comfortable transportation options</li>
                    <li>Expert-guided tours with multilingual guides</li>
                    <li>Customizable itineraries</li>
                    <li>Special access to cultural sites and events</li>
                </ul>
            </div>
            <div className="newsItem">
                <h3>Company Ranking</h3>
                <p>We are proud to announce that our company has been ranked among the top travel and tour providers globally, reflecting our dedication to excellence and customer satisfaction.</p>
                <p>Recent Awards:</p>
                <ul>
                    <li>Best Tour Operator - Global Travel Awards</li>
                    <li>Top Sustainable Tourism Company - EcoTourism Awards</li>
                    <li>Outstanding Customer Service - Travel Excellence Awards</li>
                </ul>
            </div>
            <div className="newsItem">
                <h3>Media Coverage</h3>
                <p>Our website and services have been featured on leading news channels and publications:</p>
                <ul>
                    <li>CNN Travel</li>
                    <li>National Geographic Traveler</li>
                    <li>Travel + Leisure</li>
                    <li>Lonely Planet</li>
                </ul>
            </div>
        </div>
    );
};

export default News;
