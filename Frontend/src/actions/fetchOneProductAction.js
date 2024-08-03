import * as logger from "react-dom/test-utils";
import axios from "axios";
import {BasicUrl, myKey, OneProductUrl} from "../helper/constants";

const fetchOneProductAction = {
    'FETCH_ONE_PRODUCT_LOADING': 'FETCH_ONE_PRODUCT_LOADING',
    'FETCH_ONE_PRODUCT': 'FETCH_ONE_PRODUCT',
}

export const fetchOneProduct = productId => async dispatch => {
    dispatch({
        type:fetchOneProductAction.FETCH_ONE_PRODUCT_LOADING
    })
    try {
        const url = `${OneProductUrl}/${productId}?mykey=${myKey}`;
        const response = await axios.get(url)
        let {data: {rs: productDetails, status}} = response
        if(status === 'Success') {
            dispatch({
                type: fetchOneProductAction.FETCH_ONE_PRODUCT,
                payload: productDetails
            })
        }
    } catch (e) {
        console.log('error fetchOneProduct', e);
        return e
    }
}
export const zoomInProduct = (zoom)=>{
    return ({
        type: "ZOOM_IN_PRODUCT",
        payload:zoom

    })
}