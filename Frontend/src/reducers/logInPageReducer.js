const initState ={
    isLogInLoading:false,
    isLoggedIn: !!localStorage.getItem('authToken'), // Initialize based on localStorage
    logInFailureMessage: "",
    token: null
}

export const logInPageReducer = (state = initState, action)=>{
    switch (action.type) {
        case "log_in_loading":
            console.log('log_in_loading action received'); // Debug log
            return { ...state, isLogInLoading: true, logInFailureMessage: "" };
        case "log_in_success":
            console.log('log_in_success action received'); // Debug log
            return { ...state, isLoggedIn: true, isLogInLoading: false };
        case "log_in_failure":
            console.log('log_in_failure action received'); // Debug log
            return { ...state, isLoggedIn: false, isLogInLoading: false, logInFailureMessage: action.payload };
        default:
            return state;
    }
}