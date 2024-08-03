const initialState = {
    singleProduct: {},
    loading:true,
    zoom:false
}

export const fetchOneProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ONE_PRODUCT':
            return {...state, singleProduct: action.payload,loading:false}
        case 'FETCH_ONE_PRODUCT_LOADING':
            return {...state, loading:true}
        case 'ZOOM_IN_PRODUCT':
            return {...state, zoom:action.payload}
        default:
            return state
    }
}