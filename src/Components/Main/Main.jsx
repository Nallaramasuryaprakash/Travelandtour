import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import './main.css'
import img1 from '../../Assets/img1.jpg'
import img2 from '../../Assets/img2.jpg'
import img3 from '../../Assets/img3.jpg'
import img4 from '../../Assets/img4.jpg'
import img5 from '../../Assets/img5.jpg'
import img6 from '../../Assets/img6.jpg'
import img7 from '../../Assets/img7.jpg'
import img8 from '../../Assets/img8.jpg'
import img9 from '../../Assets/img9.jpg'
import { BsClipboardCheck } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Aos from "aos";
import 'aos/dist/aos.css'


// Data

const Data = [
    {
        id: 1,
        imgSrc: img1,
        destTitle: 'Bora Bora',
        location: 'New Zealand',
        grade: 'CULTURAL RELAX',
        fees: '$700',
        description: 'Bora Bora is a small island located in French Polynesia, not in New Zealand but in the Pacific Ocean. It is famous for its stunning natural beauty, including crystal-clear turquoise waters, lush greenery, and iconic overwater bungalows. Bora Bora is a popular destination for honeymooners and travelers seeking a luxurious and picturesque tropical getaway '
    },
    {
        id: 2,
        imgSrc: img2,
        destTitle: "Kyoto",
        location: "Japan",
        grade: "CULTURAL EXPERIENCE",
        fees: "$900",
        description: "Kyoto is a historic city in Japan famous for its traditional temples, beautiful gardens, and preserved wooden architecture. It offers a rich cultural experience for travelers interested in Japanese history and traditions."
    },
    {
        id: 3,
        imgSrc: img3,
        destTitle: "Maui",
        location: "Hawaii",
        grade: "BEACH PARADISE",
        fees: "$1500",
        description: "Maui is a picturesque island in Hawaii known for its stunning beaches, scenic drives along the Hana Highway, and breathtaking sunsets. It's a popular destination for beach lovers and outdoor enthusiasts."
    },
    {
        id: 4,
        imgSrc: img4,
        destTitle: "Paris",
        location: "France",
        grade: "CITY OF ROMANCE",
        fees: "$1800",
        description: "Paris is the capital of France and is known worldwide as the City of Love. It's famous for its iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral, making it a romantic destination for couples."
    },
    {
        id: 5,
        imgSrc: img5,
        destTitle: "Bali",
        location: "Indonesia",
        grade: "TROPICAL PARADISE",
        fees: "$1000",
        description: "Bali is an Indonesian island known for its lush rice terraces, volcanic mountains, vibrant culture, and beautiful beaches. It's a popular destination for travelers seeking a tropical paradise experience."
    },
    {
        id: 6,
        imgSrc: img6,
        destTitle: "Rio de Janeiro",
        location: "Brazil",
        grade: "VIBRANT CITY LIFE",
        fees: "$1300",
        description: "Rio de Janeiro is a vibrant city in Brazil known for its lively Carnival festival, Copacabana beach, Sugarloaf Mountain, and iconic Christ the Redeemer statue. It offers a mix of cultural experiences and natural beauty."
    },
    {
        id: 7,
        imgSrc: img7,
        destTitle: "Cape Town",
        location: "South Africa",
        grade: "SCENIC BEAUTY",
        fees: "$1400",
        description: "Cape Town is a coastal city in South Africa known for its stunning natural beauty, including Table Mountain, beautiful beaches, and vibrant waterfront. It's a great destination for nature lovers and outdoor enthusiasts."
    },
    {
        id: 8,
        imgSrc: img8,
        destTitle: "Amsterdam",
        location: "Netherlands",
        grade: "CULTURAL HERITAGE",
        fees: "$1100",
        description: "Amsterdam is the capital of the Netherlands and is famous for its picturesque canals, historic architecture, vibrant art scene, and cycling culture. It offers a rich cultural heritage experience for travelers."
    },
    {
        id: 9,
        imgSrc: img9,
        destTitle: "Dubai",
        location: "United Arab Emirates",
        grade: "MODERN LUXURY",
        fees: "$2000",
        description: "Dubai is a modern city in the United Arab Emirates known for its luxury shopping, futuristic architecture, lively nightlife, and desert adventures. It's a top destination for luxury travelers and those seeking a blend of modernity and tradition."
    }
]

const Main = () => {

    useEffect(() => {
        Aos.init({
            duriation: 2000
        })
    }, [])

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent grid">
                {
                    Data.map(({ id, imgSrc, destTitle, location, grade, fees, description }) => {
                        return (

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
                                    <div className="desc">
                                        <p>{description}</p>
                                    </div>
                                    <a href={`/details/${destTitle}`} target="_blank" rel="noopener noreferrer" className="btn flex">
                                        DETAILS <BsClipboardCheck className="icon" />
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </section>
    )
}
export { Data }
export default Main