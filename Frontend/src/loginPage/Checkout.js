import './Checkout.scss'
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {icons} from '../assets/icons'
import {LogIn} from "./LogIn";
import {CheckoutItems} from "./CheckoutItems";


export const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLogInOpen, setIsLogInOpen] = useState(false)
    const [isSignUpChecked, setIsSignUpChecked] = useState(true)
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(true)
    const [email, setEmail] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)

    const isLoggedIn = useSelector(state=>state.logInPageReducer.isLoggedIn)
    const bag = useSelector(state => state.addToBagReducer.bag)


    const subtotal = bag.reduce((acc, item) => {
        const itemPrice = parseFloat(item.productDetail?.price.replace(/[^0-9.-]+/g, "") || 0);
        return acc + (itemPrice * item.quantity);
    }, 0);
    const shipping = 'FREE';
    const tax = 'Calculated at next step';
    const total = subtotal; // Update this calculation as needed


    useEffect(()=>{
        if (isLoggedIn){
            console.log('User is logged in, closing modal');
            handleCloseModal()
            setModalBCHidden()

            navigate('/cart')
        }
    },[isLoggedIn])


    const handleValidateEmail = (event) => {
        const newEmail = event.target?.value
        const isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        // console.log('Check email:', newEmail, 'Is valid:', isValid.test(newEmail));
        setEmail(newEmail)
        setIsValidEmail(isValid.test(newEmail))
    }

    const handleLogInClick = () =>  {
        setIsLogInOpen(true)
        setModalBCHidden()
    }

    const handleCloseModal = () => {
        setIsLogInOpen(false)
    }


    // disable background scroll when a modal is showing
    const setModalBCHidden = () => {
        // console.log("document.body.style.overflow:", document.body.style.overflow);
        if (!isLogInOpen) {
            document.body.style.overflow = "hidden";
            // console.log('inside 1:', document.body.style.overflow);
        } else {
            document.body.style.overflow = "auto";
            // console.log('inside 2:', document.body.style.overflow);
        }
    }


    // to close a modal by clicking anywhere outside of modal
    const handleClickOutside = (event) => {
        if (event.target.classList.contains('checkoutModal')){
            handleCloseModal()
        }
        //console.log("event.target.classList",event.target.classList)
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // style of the user information header icons
    const checkoutInfoHeaderIcons = {
        margin: '0 6px 0 0'
    }

    // style of the LogIn modal box
    const logInModalStyle = {
        width:'424px',
        minHeight:'530px',
    }



    return <div className='checkoutContainers'>
        <div className="checkoutHeader"><h1>Checkout</h1></div>

        <div className='checkoutBody'>

            {/*Left Section : User Information*/}
            <div className='checkoutInfoContainers'>
                <div className='checkoutInfoContainer'>

                    {/*block - Contact information*/}
                    <div className="checkoutInfoBlock">
                        <h2 className="checkoutInfoHeader">
                            {isValidEmail && email.length > 0 && <icons.CheckCircleOutlinedIcon style={checkoutInfoHeaderIcons}/>}
                            Contact information
                        </h2>
                        <div className="checkoutInfoBody">
                            <div className="checkoutInfoInputContainer">
                                <label className='checkoutInfoInputLabel'>Email address (for order notification)</label>
                                <input type='email'
                                       className={isValidEmail ? 'checkoutInfoInputBtn' : 'checkoutInfoInputBtnError'}
                                       value={email}
                                       onChange={(e) => handleValidateEmail(e)} />
                                {!isValidEmail && (<>
                                    <span className='checkoutInfoInputBtnErrorMark'><icons.ClearOutlinedIcon/></span>
                                    {email.length > 0 ?
                                        <p className='checkoutInfoInputValidation'>
                                            Please enter an email address in the format xxx@yyy.zzz</p>
                                        : <p className='checkoutInfoInputValidation'>Please enter your email address.</p>
                                    }
                                </>)}
                            </div>
                            <label htmlFor="signupCheckbox" className="checkoutInfoCheckboxContainer">
                                <input type="checkbox" id="signupCheckbox" className='checkoutInfoCheckboxInput'
                                       onChange={() => setIsSignUpChecked(!isSignUpChecked)}
                                       checked={isSignUpChecked} />
                                <span className="reviewsFiltersRatingInputCheckmark"></span>
                                <span className='checkoutInfoCheckboxLabel'>Sign me up for lululemon emails (you can
                                    unsubscribe at any time). See our <a
                                        href='https://info.lululemon.com/legal/privacy-policy' target='_blank'
                                        rel="noreferrer" className='checkoutInfoCheckboxLabelLink'>privacy policy</a> for details.</span>
                            </label>
                        </div>
                    </div>

                    {/*block - have an account*/}
                    <div className="checkoutInfoBlock">
                        <h2 className='checkoutInfoHeader'>
                            <icons.AccountCircleOutlinedIcon style={checkoutInfoHeaderIcons}/>
                            Have an account?
                        </h2>
                        <div className="checkoutInfoBody">
                            <div className='checkoutInfoLogInContainer'>
                                <button className='checkoutInfoLogInBtn'
                                   onClick={handleLogInClick}>
                                    <div className='checkoutInfoLogInBtnInfo'>
                                        <span>Log in</span>
                                        <span>&nbsp;to checkout more quickly and easily</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/*Right Section : Order Summary*/}
            <div className="checkoutOrderSummaryContainers">
                <h2 className='checkoutOrderSummaryHeader'>Order summary</h2>
                <button className="checkoutOrderSummaryBtn">
                    <div className="checkoutOrderSummaryBagHeader">
                        <icons.ShoppingBagOutlinedIcon style={{margin: '0 5px 0 0'}}/>
                        <span className='checkoutOrderSummaryBagItem'>
                            {bag.length > 0 && bag.length > 1 ? `${bag.length} items` : `${bag.length} item`}
                        </span>
                        <span className="checkoutOrderSummaryBagToggle" onClick={() => setIsOrderDetailsOpen(!isOrderDetailsOpen)}>
                            {isOrderDetailsOpen ? <icons.KeyboardArrowUpOutlinedIcon/> : <icons.KeyboardArrowDownOutlinedIcon/>}
                        </span>
                    </div>
                    <span className='checkoutOrderSummaryBagValue'>${subtotal.toFixed(2)}</span>
                </button>
                {isOrderDetailsOpen && bag.length > 0 &&
                    <div className="checkoutOrderSummaryDetails">
                        {
                            bag.map((item) => {
                                    const selectedImageObj = item.productDetail.images.find(image => image.colorId === item.color.colorId);
                                    const selectedImage = selectedImageObj?.mainCarousel?.media.split(" | ")[0];
                                    return <CheckoutItems item={item} key={item.date} selectedImage={selectedImage} />
                                }
                            )
                        }
                    </div>
                }
                <div className="checkoutOrderSummaryCalculator">
                    <div className="checkoutOrderSummaryCalculatorBlock">
                        <p className="checkoutOrderSummaryCalculatorInfo">Subtotal</p>
                        <p className="checkoutOrderSummaryCalculatorInfo">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="checkoutOrderSummaryCalculatorBlock">
                        <p className="checkoutOrderSummaryCalculatorInfo">Shipping</p>
                        <p className="checkoutOrderSummaryCalculatorInfo">{shipping}</p>
                    </div>
                    <div className="checkoutOrderSummaryCalculatorBlock">
                        <p className="checkoutOrderSummaryCalculatorInfo">Tax</p>
                        <p className="checkoutOrderSummaryCalculatorInfo">{tax}</p>
                    </div>
                    <div className="checkoutOrderSummaryCalculatorSum">
                        <p className="checkoutOrderSummaryCalculatorSumInfo">Order total</p>
                        <p className="checkoutOrderSummaryCalculatorSumInfo">USD ${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>

        {/*modal boxes*/}
        {isLogInOpen && <div className='checkoutModal'>
            <div className="checkoutModalContainer" style={logInModalStyle}>
                <LogIn/>
                <span className="checkoutModalClose" onClick={handleCloseModal}>&times;</span>
            </div>
        </div>}
   </div>
}
