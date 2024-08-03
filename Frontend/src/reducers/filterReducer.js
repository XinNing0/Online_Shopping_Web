import {
    FETCH_FILTER_DATA_REQUEST,
    FETCH_FILTER_DATA_SUCCESS,
    FETCH_FILTER_DATA_FAILURE,
    SET_FILTER,
    CLEAR_FILTER,
} from '../actions/filterAction';

const initialState = {
    loading: false,
    data: {},
    filters: {},
    error: '',
};

const sizeMapping = {
    'Plus Size': ['16', '18', '20'],
    Tall: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '28', '29', '30', '31', '32', '33', '34', '35', '36', '38', '40', '42', '44', '46', 'XS', 'S', 'M', 'L', 'XL'],
    Short: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '28', '29', '30', '31', '32', '33', '34', '35', '36', '38', '40', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

const filterReducer = (state = initialState, action) => {
    //console.log('Before action', action.type, ':', JSON.stringify(state, null, 2));

    switch (action.type) {
        case FETCH_FILTER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_FILTER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.rs,
            };
        case FETCH_FILTER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_FILTER: {
            const { category, name } = action.payload;
            console.log('SET_FILTER payload:', action.payload);

            let newFilters = { ...state.filters };
            let newData = { ...state.data };


            if (category === 'SizeType') {
                let sizeType = state.filters[category]
                if (sizeType){
                    if (sizeType.includes(name)){
                        sizeType = sizeType.filter(item=>item!==name)
                        console.log("first branch",sizeType)
                    }else{
                        sizeType.push(name)
                        console.log("second branch",sizeType)
                    }

                }else{
                    sizeType = []
                    sizeType.push(name)
                    console.log("third branch",sizeType)
                }
                newFilters = {
                    ...state.filters,
                    [category]:sizeType
                    // [category]: state.filters[category]?
                    //     ((state.filters[category].includes(name))?state.filters[category].filter(item=>item!==name):
                    //         (
                    //             state.filters[category].push(name))):[name]
                };


                // Update the sizes based on the selected size type
                const selectedSizes = sizeMapping[name];

                newData = {
                    ...state.data,
                    SizeType: state.data.SizeType.map(type =>
                        type.name === name ? { ...type, isChecked: !type.isChecked } : type
                    ),
                    // Size: state.data.Size.map(size => ({
                    //     ...size,
                    //     isChecked: selectedSizes.includes(size.name)
                    // }))
                };
            } else {
                newFilters = {
                    ...state.filters,
                    [category]: state.filters[category]?.includes(name)
                        ? state.filters[category].filter(item => item !== name)
                        : [...(state.filters[category] || []), name],
                };

                newData = {
                    ...state.data,
                    [category]: state.data[category]?.map(item =>
                        (item.name === name || item.alt === name) ? { ...item, isChecked: !item.isChecked } : item
                    ),
                };
            }

            const newState = {
                ...state,
                data: newData,
                filters: newFilters,
            };

            //console.log('After SET_FILTER:', JSON.stringify(newState, null, 2));
            return newState;
        }
        case CLEAR_FILTER:
            const resetData = {};
            Object.keys(state.data).forEach(category => {
                resetData[category] = state.data[category].map(item => ({
                    ...item,
                    isChecked: false
                }));
            });
            const resetFilters = {};
            Object.keys(state.filters).forEach(category => {
                resetFilters[category] = [];
            });
            return {
                ...state,
                data: resetData,
                filters: resetFilters,
            };
        default:
            return state;
    }
};

export default filterReducer;
