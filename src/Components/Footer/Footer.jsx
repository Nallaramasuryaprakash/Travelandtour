import React, { useState, useEffect } from 'react';
import './footer.css';
import video2 from '../../Assets/video2.mp4';
import { FiSend, FiChevronRight } from 'react-icons/fi';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { FaTripadvisor } from 'react-icons/fa';
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      alert('We sent an email for update.');
      setEmail(''); // Clear the email input
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos="fade-up" className="text">
            <small>KEEP IN TOUCH</small>
            <h2>Travel with us</h2>
          </div>

          <div className="inputDiv flex">
            <input 
              data-aos="fade-up" 
              type="text" 
              placeholder="Enter Email Address" 
              value={email}
              onChange={handleEmailChange}
            />
            <button 
              data-aos="fade-up" 
              className="btn flex" 
              type="submit"
              onClick={handleSubmit}
            >
              SEND <FiSend className="icon" />
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <button
                className="logo flex"
                onClick={() => {
                  // Add your click handling logic here, e.g., navigating to a home page
                }}
                style={{
                  background: 'none',
                  color: 'inherit',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                <MdOutlineTravelExplore className="icon" /> Travel
              </button>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
              With our user-friendly interface, you can effortlessly plan your trips, manage bookings, and stay updated with real-time travel information. Get access to exclusive deals, discounts, and insider tips to make the most out of your travels.
            </div>

            <div data-aos="fade-up" className="footerSocials flex">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><AiOutlineTwitter className="icon" /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><AiFillYoutube className="icon" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><AiFillInstagram className="icon" /></a>
              <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer"><FaTripadvisor className="icon" /></a>
            </div>
          </div>

          <div className="footerLinks grid">
            {/* Group one */}
            <div data-aos="fade-up" data-aos-duration="3000" className="linkGroup">
              <span className="groupTitle">OUR AGENCY</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://youragency.com/services" target="_blank" rel="noopener noreferrer">Services</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://youragency.com/insurance" target="_blank" rel="noopener noreferrer">Insurance</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://youragency.com/agency" target="_blank" rel="noopener noreferrer">Agency</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://youragency.com/tourism" target="_blank" rel="noopener noreferrer">Tourism</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://youragency.com/payment" target="_blank" rel="noopener noreferrer">Payment</a>
              </li>
            </div>

            {/* Group two */}
            <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup">
              <span className="groupTitle">PARTNERS</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourpartners.com/bookings" target="_blank" rel="noopener noreferrer">Bookings</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourpartners.com/rentcars" target="_blank" rel="noopener noreferrer">Rent Cars</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourpartners.com/hostelworld" target="_blank" rel="noopener noreferrer">Hostel World</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourpartners.com/trivago" target="_blank" rel="noopener noreferrer">Trivago</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourpartners.com/tripadvisor" target="_blank" rel="noopener noreferrer">TripAdvisor</a>
              </li>
            </div>

            {/* Group three */}
            <div data-aos="fade-up" data-aos-duration="5000" className="linkGroup">
              <span className="groupTitle">LAST MINUTE</span>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourdestinations.com/london" target="_blank" rel="noopener noreferrer">London</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourdestinations.com/california" target="_blank" rel="noopener noreferrer">California</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourdestinations.com/indonesia" target="_blank" rel="noopener noreferrer">Indonesia</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourdestinations.com/europe" target="_blank" rel="noopener noreferrer">Europe</a>
              </li>

              <li className="footerList flex">
                <FiChevronRight className="icon" />
                <a href="https://yourdestinations.com/oceania" target="_blank" rel="noopener noreferrer">Oceania</a>
              </li>
            </div>
          </div>

          <div className="footerDiv flex">
            <small>BEST TRAVEL WEBSITE THEME</small>
            <small>COPYRIGHTS-RESERVED</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
