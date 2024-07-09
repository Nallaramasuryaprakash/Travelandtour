import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./payment.css";

const Payment = ({ itemData, fees }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod === 'UPI' && !validateUPI(upiId)) {
            alert("Invalid UPI ID format. Please enter a valid UPI ID.");
            return;
        }
        if (paymentMethod === 'UPI') {
            alert(`Booking confirmed. Total amount: ₹${fees}.`);
            navigate('/');
            setShowPaymentModal(false);
        } else {
            setShowOtpInput(true);
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            alert("Please enter a 6-digit OTP.");
            return;
        }
        alert(`Booking confirmed. Total amount: ₹${fees}.`);
        navigate('/');
        setShowPaymentModal(false);
    };

    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
    };

    const validateUPI = (upi) => {
        return true; // You can implement UPI validation logic here
    };

    const handleCancel = () => {
        setShowPaymentModal(false);
        navigate(-1);
    };

    const handleExpiryDateChange = (e) => {
        const inputDate = e.target.value;
        const formattedDate = inputDate
            .replace(/\D/g, '')
            .slice(0, 4)
            .replace(/(\d{2})(\d)/, '$1/$2');
        setExpiryDate(formattedDate);
    };

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        const formattedInput = input.replace(/(.{4})/g, '$1 ').trim();
        setCardNumber(formattedInput);
    };

    return (
        <div className={`payment-modal ${showPaymentModal ? 'show' : ''}`}>
            <div className="payment-backdrop" onClick={handleCancel}></div>
            <div className="payment-container">
                <h2>Payment Details</h2>
                <div className="trip-details">
                    <h3>Trip Details</h3>
                    <p>Destination: {itemData?.destTitle}</p>
                    <p>Location: {itemData?.location}</p>
                    <p>Fees: ₹{fees}</p>
                    <p>Number of Persons: {itemData?.numberOfPersons}</p>
                </div>
                {!paymentMethod && (
                    <div className="payment-methods">
                        <button onClick={() => handlePaymentMethod('UPI')}>Pay with UPI</button>
                        <button onClick={() => handlePaymentMethod('Card')} style={{ marginLeft: "10px" }}>Pay with Card</button>
                    </div>
                )}
                {paymentMethod && !showOtpInput && (
                    <form onSubmit={handleSubmit}>
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
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        maxLength="19"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        required
                                    />
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
                                        maxLength="5"
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
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div className="payment-buttons">
                            <button type="submit">Pay Now</button>
                            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                        </div>
                    </form>
                )}
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
                                required
                            />
                        </div>
                        <div className="payment-buttons">
                            <button type="submit">Confirm Booking</button>
                            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Payment;
