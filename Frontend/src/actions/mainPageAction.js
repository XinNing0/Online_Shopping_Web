import axios from "axios";
import {BasicUrl, myKey} from "../helper/constants"
import qs from "qs"
import {FETCH_FILTER_DATA_REQUEST} from "./filterAction";
export const test = ()=> {
    return {
        type: "test",
        payload: 1
    }
}

export const fetchProductDataRequest = () => ({
    type: "fetch_product_data_request",
});


//fetch each page with given info
const axiosFetch = async (page, sortingId,filter) => {
    try {
        const response = await axios.post(BasicUrl, filter, {
            params: {
                page: page,
                sortingId: sortingId,
                mykey: myKey
            },
            paramsSerializer: params => {
                // Prevent double encoding in myKey
                return qs.stringify(params, { encode: false });
            }
        });

        let { data: { rs: { products } } } = response;
        return products;
    } catch (err) {
        console.error('fetch all with sorting and page http error!', err);
        return []; // Return an empty array in case of error
    }
};
//extract price from string
export const extractPrice = (priceStr) => {
    const priceMatch = priceStr.match(/\$([0-9,]+)/);
    if (priceMatch) {
        return parseFloat(priceMatch[1].replace(/,/g, ''));
    }
    return NaN;
};
//initialize fetching all pages with given info
export const fetchAllWithSorting123 = (sortingId,filter)=>(dispatch)=>{
    dispatch(fetchProductDataRequest())
    let itemList = []
    let pageNum = 0
    const fetchPromises = [];
    let sortID = sortingId>3?1:sortingId

    let page

    axios.post(BasicUrl, filter, {
        params: {
            page: 1,
            sortingId: sortID,
            mykey: myKey
        },
        paramsSerializer: params => {
            //prevent double encoding in myKey
            return qs.stringify(params, {encode: false});
        }
    }).then(
        res => {
            let {data: {rs: {pageParams,products}}} = res
            pageNum = pageParams.totalPage
            //pageNum = 1
            fetchPromises.push(products)
            page = pageParams
    }).then(
        async()=> {
            //fetch each page
            for (let i = 2; i <= pageNum; i++) {
                fetchPromises.push(axiosFetch(i,  sortID,filter ));
            }
            //wait until all pages are fetched
            const results = await Promise.all(fetchPromises);
            itemList = results.reduce((acc, curr) => acc.concat(curr), []);
            itemList = itemList.filter(item => item && item.price);
            //sorting Price high to low
            if (sortingId===4){
                itemList.sort((a, b) => {
                                let priceA = extractPrice(a.price.split("-")[0])
                                let priceB = extractPrice(b.price.split("-")[0])
                    console.log( extractPrice(a.price.split("-")[0]));
                                return priceB - priceA
                            })
            }else if(sortingId===5){
                //sorting Price low to high
                itemList.sort((a, b) => {
                    let priceA = extractPrice(a.price.split("-")[0])
                    let priceB = extractPrice(b.price.split("-")[0])
                    console.log( extractPrice(a.price.split("-")[0]));
                    return priceA - priceB
                })
            }
            dispatch({
                type: "fetch_all_with_sorting_123",
                payload: {itemList,page,sortingId}
            })
        }
    ).catch(err => console.log('fetch all with sorting and page http error!', err))
}

export const showDropDownFromHeader = ()=> {
    return {
    type:"show_drop_down_from_header"
    }
}
export const closeDropDownAnywhere = ()=> {
    return {
        type:"close_drop_down_anywhere"
    }
}
export default {
    test,
    showDropDownFromHeader,
    closeDropDownAnywhere,
    fetchAllWithSorting123,
}