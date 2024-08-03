const initState ={
    test:0,
    pageParams: [],
    products:[],
    sortingId: 1,
    dropDownOn:false,
    productsSorted:[],
    loading:false

}

export const mainPageReducer = (state = initState, action)=>{
    switch (action.type) {
        case "test":
            return {...state, test: action.payload+state.test}
        case "show_drop_down_from_header":
            return{...state,dropDownOn: !state.dropDownOn}
        case "close_drop_down_anywhere":
            return{...state,dropDownOn: false}
        case "fetch_product_data_request":
            return {...state, loading: true};
        case "fetch_all_with_sorting_123":
            return{...state,products: action.payload.itemList,
                pageParams: action.payload.page,
                sortingId: action.payload.sortingId,
            loading:false}
        default:
            return state
    }

}