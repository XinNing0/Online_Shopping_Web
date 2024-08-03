import {icons} from "../assets/icons";
import {logIn} from "../actions/logInPageAction";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./LogIn.scss"


export const LogIn = ()=>{
    const dispatch = useDispatch()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const isLoggedIn = useSelector(state=>state.logInPageReducer.isLoggedIn)
    const message = useSelector(state => state.logInPageReducer.logInFailureMessage)
    const isLogInLoading= useSelector(state=>state.logInPageReducer.isLogInLoading)
    const [showPassword, setShowPassword] = useState(false)
    const [emailClicked, setEmailClicked] = useState(false)
    const [passwordClicked,setPasswordClicked] = useState(false)
    const [insideEmailClicked,setInsideEmailClicked] = useState(false)
    const [signInClicked,setSignInClicked] = useState(false)
    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickInside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickInside);
    //     };
    // }, []);
    //
    // const handleClickInside = (event) => {
    //
    //     if (!event.target.classList.contains('checkoutModal')){
    //         console.log(event.target.classList, emailClicked,insideEmailClicked)
    //         setInsideEmailClicked(emailClicked)
    //
    //     }
    //     //console.log("event.target.classList",event.target.classList)
    // };

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    return(     <div className="logInComponentContainer">
        <div className="logInComponentEasy">Make shopping even easier.</div>
        <div className="logInComponentSpeedy">Speedy checkout, easy returns & more await.</div>
        <div className="logInComponentSign">Sign in to your member account</div>
        {((!signInClicked && message) || !message) && <div className="logInComponentRedDash"></div>}

        {!isLoggedIn && message && signInClicked && <div className="logInComponentFailureMsg" >
            <icons.ErrorOutlineIcon sx={{color:"#d20014"}}/>
            <div>{message}</div>
        </div>}
    <div className="logInComponentEmail">Email address</div>

        <div className="logInComponentEmailInputContainer">

    <input type="text" onChange={(evt)=>{
        setEmail(evt.target.value)
    }} className="logInComponentEmailInput" onClick={()=>{setEmailClicked(true)
    }} style = {emailClicked&&(email && !validateEmail(email)||!email)? {border:"1px solid #d20014", borderRadius: "0.25rem"}:null}/>
            {(emailClicked&&(email && !validateEmail(email)||!email ))&& <span className = "logInComponentEmailCross">&times;</span> }
        </div>
        {emailClicked && email && !validateEmail(email) && <div style={{color:"#d20014",fontSize:"13px",marginBottom:"14px"}}>Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address
        </div>}
        {emailClicked && !email && <div style={{color:"#d20014",fontSize:"13px",marginBottom:"14px"}}>Please enter an email address</div>}
        {/*{(emailClicked&&(email && !validateEmail(email)||!email ))&& <span className = "logInComponentEmailCross">&times;</span> }*/}

    <div className = "logInComponentPassword">Password</div>
    {/*<div>{password}</div>*/}

        <div className="logInComponentPasswordInputContainer">



    <input type={showPassword?"text":"password"} onChange={(evt)=>{
        setPassword(evt.target.value)
    }} className="logInComponentPasswordInput" onClick={()=>setPasswordClicked(true)}
           style = {passwordClicked && !password? {border:"1px solid #d20014", borderRadius: "0.25rem"}:null}/>
    <button className="logInComponentPasswordToggle" style ={passwordClicked && !password? {left:"306px"}:null}
    >{showPassword ? <icons.VisibilityOffIcon onClick={()=>setShowPassword(false)}/>:
        <icons.VisibilityIcon onClick={()=>setShowPassword(true)}/>}

    </button>
            {passwordClicked && !password && <span className = "logInComponentPasswordCross">&times;</span> }
        </div>
        {passwordClicked && !password && <div style={{color:"#d20014",fontSize:"13px",marginBottom:"14px"}}>Please enter your password</div>}
        <div className="logInComponentForget">Forgot your password?</div>

    <button onClick={()=>{
        if (validateEmail(email)&&password) {
            dispatch(logIn(email, password))
            setSignInClicked(true)
        }
    }
    } style = {validateEmail(email)&&password?null:{backgroundColor:"#8d9196",cursor:"not-allowed"}}
            className = "logInComponentSignIn">SIGN IN</button>
        <div className = "logInComponentStatement">By signing in, you agree to the <a>Terms of Use</a> and acknowledge
            the <a>Privacy Policy</a>. California consumers, see our <a>Notice of Financial Incentives</a>.</div>
        <div className = "logInComponentContinue">Continue as a guest</div>
    </div>  )
}