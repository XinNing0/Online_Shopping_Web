import axios from "axios";
import {LoginUrl, myKey} from "../helper/constants"
import qs from "qs"

export const logIn = (email,password)=>async(dispatch)=>{
    dispatch({
        type: "log_in_loading",
    })
    const info = {
        email,
        password
    }

    try {

        const response = await axios.post(LoginUrl, info, {
            params: {
                mykey: myKey
            },
            paramsSerializer: params => {
                // Prevent double encoding in myKey
                return qs.stringify(params, { encode: false });
            }
        });

        const token = response.data.data.token; //token
        const tokenTimestamp = Date.now();//record the time
        console.log('Token received:', token); // Log the token
        localStorage.setItem('authToken', token); // Store the token
        localStorage.setItem('authTokenTimestamp', tokenTimestamp); // Store the token timestamp

        dispatch({
            type: "log_in_success",
            payload: token
        })


    } catch (err) {
        let {response:{data:{message}}} = err
        console.error('log in http error!', message);
        message = message.split(".")[0]
        dispatch({
            type: "log_in_failure",
            payload : message
        })
    }

}