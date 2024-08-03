import {useNavigate} from "react-router-dom";
import './PaypalSuccess.scss'

export const PaypalSuccess = () => {
    const navigate = useNavigate();
    return <div className="thankYouContainer">
        <div className="thankYouMessage">
            Thank you for your business !

        </div>
        <div className="goBackToMainPage" onClick = {()=>navigate('/')}>
            Go Back to Main Page
        </div>
    </div>;
}