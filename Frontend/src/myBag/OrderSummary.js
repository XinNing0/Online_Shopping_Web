import React, {useEffect, useRef, useState} from 'react';
import './OrderSummary.scss';
import {useDispatch, useSelector} from "react-redux";
import lululemonLogo from "../assets/images/lululemonLogo.png"
import {useNavigate} from "react-router-dom";
import {clearBagAction} from "../actions/addToBagAction";
import jwtDecode from 'jwt-decode';
import { LogIn } from '../loginPage/LogIn';



export const OrderSummary = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [showShippingInfo, setShowShippingInfo] = useState(false);
    const [showTaxInfo, setShowTaxInfo] = useState(false);
    const [showKlarnaInfo, setShowKlarnaInfo] = useState(false);
    const [isLogInOpen, setIsLogInOpen] = useState(false);
    const cart = useSelector(state => state.addToBagReducer.bag);
    const shippingTooltipRef = useRef(null);
    const taxTooltipRef = useRef(null);
    const klarnaTooltipRef = useRef(null);
    const isLoggedIn = useSelector(state=>state.logInPageReducer.isLoggedIn)

    console.log('OrderSummary rendered');
    console.log('isLoggedIn state:', isLoggedIn); // Debug log



    const subtotal = cart.reduce((acc, item) => {
        const itemPrice = parseFloat(item.productDetail?.price.replace(/[^0-9.-]+/g, "") || 0);
        return acc + (itemPrice * item.quantity);
    }, 0);

    const shipping = 'FREE';
    const tax = 'Calculated at checkout';
    const total = subtotal; // Update this calculation as needed

    const toggleShippingInfo = () => {
        setShowShippingInfo(prev => !prev);
        if (showShippingInfo === false) {
            setShowTaxInfo(false);
            setShowKlarnaInfo(false);
        }
    };

    const toggleTaxInfo = () => {
        setShowTaxInfo(prev => !prev);
        if (showTaxInfo === false) {
            setShowShippingInfo(false);
            setShowKlarnaInfo(false);
        }
    };

    const toggleKlarnaInfo = () => {
        setShowKlarnaInfo(prev => !prev);
        if (showKlarnaInfo === false) {
            setShowShippingInfo(false);
            setShowTaxInfo(false);
        }
    };

    const handleClickOutside = (event) => {
        if (!shippingTooltipRef.current?.contains(event.target) && !event.target.classList.contains('info-icon')) {
            setShowShippingInfo(false);
        }
        if (!taxTooltipRef.current?.contains(event.target) && !event.target.classList.contains('info-icon')) {
            setShowTaxInfo(false);
        }
        if (!klarnaTooltipRef.current?.contains(event.target) && !event.target.classList.contains('info-icon')) {
            setShowKlarnaInfo(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        if (isLoggedIn) {
            console.log('User is logged in, closing modal');
            handleCloseModal();
        }
    }, [isLoggedIn]);

    //check token
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const tokenTimestamp = localStorage.getItem('authTokenTimestamp');
        const tenSeconds = 10 * 1000; // Ten seconds in milliseconds
        console.log('Checking token validity');
        if (token && tokenTimestamp) {
            const currentTime = Date.now();
            if ((currentTime - tokenTimestamp) <= tenSeconds) {
                console.log('Token is valid, dispatching log_in_success');
                dispatch({ type: "log_in_success" });
            } else {
                console.log('Token has expired, removing from localStorage');
                localStorage.removeItem('authToken');
                localStorage.removeItem('authTokenTimestamp');
            }
        }
    }, [dispatch]);

    const isTokenExpired = () => {
        const tokenTimestamp = localStorage.getItem('authTokenTimestamp');
        const oneHour = 10 * 1000; // One hour in milliseconds
        if (!tokenTimestamp) {
            return true;
        }
        const currentTime = Date.now();
        return (currentTime - tokenTimestamp) > oneHour;
    };

    const handlePayPalClickToken = () => {
        const token = localStorage.getItem('authToken'); // Retrieve the token
        if (!token || isTokenExpired()) {
            console.error('Token is expired or not found');
            localStorage.removeItem('authToken'); // Remove expired token
            localStorage.removeItem('authTokenTimestamp'); // Remove token timestamp
            // setIsLogInOpen(true); // Open login modal
            window.location.reload(); // to hard refresh page
            return;
        }

        // Proceed with PayPal checkout process
        console.log('Proceed with PayPal checkout');
        // PayPal checkout logic here
        navigate("/paymentSuccess")
        dispatch(clearBagAction())
        localStorage.setItem('bag', JSON.stringify([]))
    };

    const handleCloseModal = () => {
        console.log('Closing login modal');
        setIsLogInOpen(false);
    };

    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
                <div className="summary-item">
                    <span className="label">Subtotal</span>
                    <span className="value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <span className="label">
                        Shipping <i onClick={toggleShippingInfo} className="fas fa-info-circle info-icon"></i>
                        {showShippingInfo && (
                            <div className="tooltip">
                                We offer Free Standard Shipping on all orders within the United States. If you’d like to expedite shipping or ship to a different country, you can do so in checkout.
                            </div>
                        )}
                    </span>
                    <span className="value">{shipping}</span>
                </div>
                <div className="summary-item">
                   <span className="label">
                        Tax <i onClick={toggleTaxInfo} className="fas fa-info-circle info-icon"></i>
                       {showTaxInfo && (
                           <div className="tooltip">
                               Taxes are based on your shipping location’s state and local sales tax.
                           </div>
                       )}
                    </span>
                    <span className="value">{tax}</span>
                </div>
                <div className="summary-total">
                    <span className="label">Estimated Total</span>
                    <span className="value">CAD ${total.toFixed(2)}</span>
                </div>
                <div className="payment-options">
                <span className="label">
                    or 4 payments of ${(total / 4).toFixed(2)} with <b>afterpay</b> or <b>Klarna</b>
                    <i onClick={toggleKlarnaInfo} className="fas fa-info-circle info-icon"></i>
                    {showKlarnaInfo && (
                        <div className="tooltip">
                            Buy items now and pay later - in 4 payments, with no additional fees when you pay on time. Learn more
                        </div>
                    )}
                </span>
                </div>
            </div>

            {/*<button className="paypalButton" onClick={() => {*/}
            {/*    navigate("/paymentSuccess")*/}
            {/*    dispatch(clearBagAction())*/}
            {/*    localStorage.setItem('bag', JSON.stringify([]))*/}
            {/*}}>*/}
            {/*    PayPal*/}
            {/*</button>*/}

            {isLoggedIn ?
                // <button className="checkout-button paypal-button" onClick={handlePayPalClickToken}>
                //     PayPal
                // </button>
                <button className="checkout-button paypal-button" onClick={() => {
                    handlePayPalClickToken()
                    // navigate("/paymentSuccess")
                    // dispatch(clearBagAction())
                    // localStorage.setItem('bag', JSON.stringify([]))
                }}>
                    PayPal
                </button>
                :
                <button className="checkout-button" onClick={() => navigate(`/checkout`)}>
                    <img src={lululemonLogo} alt="Lululemon Logo" className="checkout-logo"/>
                    CHECKOUT
                </button>
            }
            {isLogInOpen && <div className='checkoutModal'>
                <div className="checkoutModalContainer" style={{ width:'424px', minHeight:'530px',  padding: '0'}}>
                    <LogIn/>
                    <span className="checkoutModalClose" onClick={handleCloseModal}>&times;</span>
                </div>
            </div>}

        </div>
    );
};

