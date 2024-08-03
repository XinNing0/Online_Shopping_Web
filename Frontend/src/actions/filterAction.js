import axios from 'axios';
import {myKey} from "../helper/constants";

export const SET_FILTER = 'SET_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const FETCH_FILTER_DATA_REQUEST = 'FETCH_FILTER_DATA_REQUEST';
export const FETCH_FILTER_DATA_SUCCESS = 'FETCH_FILTER_DATA_SUCCESS';
export const FETCH_FILTER_DATA_FAILURE = 'FETCH_FILTER_DATA_FAILURE';

export const setFilter = (category, name) => {
    console.log("called????????????????????????")
    return {
        type: SET_FILTER,
        payload: { category, name },
    };
};
;

export const clearFilter = () => ({
    type: CLEAR_FILTER,
});

export const fetchFilterDataRequest = () => ({
    type: FETCH_FILTER_DATA_REQUEST,
});

export const fetchFilterDataSuccess = (data) => ({
    type: FETCH_FILTER_DATA_SUCCESS,
    payload: data,
});

export const fetchFilterDataFailure = (error) => ({
    type: FETCH_FILTER_DATA_FAILURE,
    payload: error,
});

export const fetchFilterData = () => {
    return async (dispatch) => {
        dispatch(fetchFilterDataRequest());
        try {
            const response = await axios.get(`http://api-lulu.hibitbyte.com/product/filter?mykey=${myKey}`);
            dispatch(fetchFilterDataSuccess(response.data));
        } catch (error) {
            dispatch(fetchFilterDataFailure(error.message));
        }
    };
};

