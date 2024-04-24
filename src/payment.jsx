import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = ({ itemData, handlePayment }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [upiId, setUpiId] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(true); // State to control the visibility of the Payment modal

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod === 'UPI' && !validateUPI(upiId)) {
            alert("Invalid UPI ID format. Please enter a valid UPI ID.");
            return;
        }
        setShowOtpInput(true); // Show OTP input after payment method selection
    };

    // Function to handle OTP submission
    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            alert("Please enter a 6-digit OTP.");
            return;
        }
        // Add logic for booking confirmation here
        alert("Booking confirmed.");
        navigate('/'); // Redirect to home page
        setShowPaymentModal(false); // Hide the Payment modal after payment completion
    };

    // Function to handle payment method selection
    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
    };

    // Custom validation function for UPI ID format
    const validateUPI = (upi) => {
        const pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+$/;
        return pattern.test(upi);
    };

    // Function to format expiry date with slash automatically
    const handleExpiryDateChange = (e) => {
        const inputDate = e.target.value;
        const formattedDate = inputDate
            .replace(/\D/g, '') // Remove non-numeric characters
            .slice(0, 4) // Limit to MM/YY format
            .replace(/(\d{2})(\d)/, '$1/$2'); // Add slash after the second digit
        setExpiryDate(formattedDate);
    };

    return (
        <div className={`payment-modal ${showPaymentModal ? 'show' : ''}`}>
            <div className="payment-backdrop" onClick={() => setShowPaymentModal(false)}></div>
            <div className="payment-container">
                <h2>Payment Details</h2>
                {/* Display trip details and payment form */}
                <div className="trip-details">
                    <h3>Trip Details</h3>
                    <p>Destination: {itemData?.destTitle}</p>
                    <p>Location: {itemData?.location}</p>
                    <p>Fees: {itemData?.fees}</p>
                </div>
                {/* Payment method selection */}
                <div className="payment-methods">
                    <button onClick={() => handlePaymentMethod('UPI')}>Pay with UPI</button>
                    <button onClick={() => handlePaymentMethod('Card')} style={{marginLeft:"10px"}}>Pay with Card</button>
                </div>
                {/* Payment form */}
                {paymentMethod && !showOtpInput && (
                    <form onSubmit={handleSubmit}>
                        {/* Payment form inputs */}
                        {paymentMethod === 'UPI' && (
                            <div>
                                <label htmlFor="upiId">UPI ID:</label>
                                <input
                                    type="text"
                                    id="upiId"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        {paymentMethod === 'Card' && (
                            <>
                                <div>
                                    <label htmlFor="cardNumber">Card Number:</label>
                                    <input type="text" id="cardNumber" maxLength="12" minLength="12" required />
                                </div>
                                <div>
                                    <label htmlFor="cardHolderName">Cardholder Name:</label>
                                    <input
                                        type="text"
                                        id="cardHolderName"
                                        value={cardHolderName}
                                        onChange={(e) => setCardHolderName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        value={expiryDate}
                                        onChange={handleExpiryDateChange}
                                        maxLength="5" // Limit input to MM/YY format
                                        placeholder="MM/YY"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cvv">CVV:</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        maxLength="3"
                                        minLength="3"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <button type="submit">Pay Now</button>
                    </form>
                )}
                {/* OTP input */}
                {showOtpInput && (
                    <form onSubmit={handleOtpSubmit}>
                        <div>
                            <label htmlFor="otp">Enter OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="6"
                                minLength="6"
                                required
                            />
                        </div>
                        <button type="submit">Confirm Booking</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Payment;
