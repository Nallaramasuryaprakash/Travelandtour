import React from "react";
import "./package.css";

const Package = () => {
    const packages = [
      {
          id: 1,
          name: "Adventure Explorer Package",
          destination: "Himalayas, India",
          grade: "Extreme Adventure",
          fees: "₹40000 per person",
          image : "https://cdn.britannica.com/39/76239-050-DE5FCF36/Climbers-side-Nepali-Mount-Everest.jpg",
          description: "Experience the thrill of trekking through the majestic Himalayan mountains, camping under the stars, and exploring hidden valleys and glaciers."
      },
      {
          id: 2,
          name: "Tropical Paradise Package",
          destination: "Maldives",
          grade: "Luxury Beach Retreat",
          fees: "₹67486 per person",
          image : "https://travellingbee.in/wp-content/uploads/2024/04/image-1.jpeg",
          description: "Relax in luxury overwater bungalows, enjoy pristine white-sand beaches, indulge in spa treatments, and savor gourmet cuisine by the turquoise waters of the Indian Ocean."
      },
      {
          id: 3,
          name: "Cultural Heritage Package",
          destination: "Rome, Italy",
          grade: "Historical Exploration",
          fees: "₹54129 per person",
          image : "https://miro.medium.com/v2/resize:fit:1000/1*jswG4xW10FqoB_6iINMWAg.jpeg",
          description: "Immerse yourself in the rich history and culture of Rome, visit iconic landmarks like the Colosseum and Vatican City, and savor authentic Italian cuisine."
      },
      {
          id: 4,
          name: "Wildlife Safari Package",
          destination: "Serengeti National Park, Tanzania",
          grade: "Wildlife Adventure",
          fees: " ₹40000 per person",
          image : "https://www.tanzania-experience.com/wp-content/uploads/2024/01/serengeti-national-park.jpg",
          description: "Embark on thrilling game drives to witness the Big Five and other exotic wildlife in their natural habitat, stay in luxury safari lodges, and experience the African wilderness."
      },
      {
          id: 5,
          name: "Urban Escape Package",
          destination: "New York City, USA",
          grade: "City Exploration",
          fees: "₹44000 per person",
          description: "Explore the vibrant streets of New York City, visit world-famous attractions like Times Square and Central Park, enjoy Broadway shows, and dine at top-rated restaurants.",
          image : "https://www.nyhabitat.com/blog/wp-content/uploads/2013/01/Times-square-manhattan-new-york-nyc-crossroads-world.jpg"
      },
      {
          id: 6,
          name: "Wellness Retreat Package",
          destination: "Bali, Indonesia",
          grade: "Mindful Relaxation",
          fees: "₹22000 per person",
          description: "Rejuvenate your mind, body, and soul in Bali's tranquil surroundings, practice yoga on serene beaches, indulge in spa therapies, and discover the island's spiritual essence.",
          image : "https://www.holidaymonk.com/wp-content/uploads/2019/03/WELLNESS-RETREATS-IN-INDIA.jpg"
      }
  ];

    return (
        <section className="package-container">
            {packages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                    <img src={pkg.image} alt={pkg.name} className="package-image" />
                    <h3 className="package-title">{pkg.name}</h3>
                    <p className="package-description">{pkg.description}</p>
                    <p className="package-price">{pkg.fees}</p>
                </div>
            ))}
        </section>
    );
};

export default Package;
