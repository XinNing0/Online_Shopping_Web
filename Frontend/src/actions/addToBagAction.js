
// define type of the action
export const addToBagActionType =
    {'ADD_TO_BAG': 'ADD_TO_BAG',
        'REMOVE_BAG_ITEM': 'REMOVE_BAG_ITEM',
        'REMOVE_SAVE_ITEM': 'REMOVE_SAVE_ITEM',
        'EDIT_ITEM': 'EDIT_ITEM',
        'UPDATE_QUANTITY':'UPDATE_QUANTITY',
        'SAVE_FOR_LATER':'SAVE_FOR_LATER',
        'MOVE_TO_CART_FROM_SAVED':'MOVE_TO_CART_FROM_SAVED',
        'CLEAR_BAG': 'CLEAR_BAG'

    };

// action creator
export function addToBagAction(productId, quantity, color, size = 'One Size', productDetail) {
    return {
        type: addToBagActionType.ADD_TO_BAG,
        payload: {
            productId,
            quantity,
            color,
            size,
            productDetail}

    }
};


export const removeFromBag = (itemIndex) => dispatch => {
    //console.log(`[action] ${addToBagActionType.REMOVE_BAG_ITEM}`);
    dispatch ({
        type: addToBagActionType.REMOVE_BAG_ITEM,
        payload: {
            itemIndex
        }
    })
}

export const removeFromSave = (productId, colorId, size) => dispatch => {
    //console.log(`[action] ${addToBagActionType.REMOVE_SAVE_ITEM}`);
    dispatch ({
        type: addToBagActionType.REMOVE_SAVE_ITEM,
        payload: {
            productId, colorId, size
        }
    })
}

export const updateQuantity = (itemIndex, quantity) => dispatch => {
    // console.log(`[action] ${addToBagActionType.UPDATE_QUANTITY}`);
    dispatch ({
        type: addToBagActionType.UPDATE_QUANTITY,
        payload: {
            itemIndex,quantity
        }
    })
}

export const editItem = (itemIndex, productId, color, size) => dispatch => {
    // console.log(`[action] ${addToBagActionType.EDIT_ITEM}`);
    dispatch ({
        type: addToBagActionType.EDIT_ITEM,
        payload: {
            itemIndex, productId, color, size
        }
    })
}

export const saveForLater = (productId, colorId, size) => ({
    type: 'SAVE_FOR_LATER',
    payload: { productId, colorId, size }
});

export const moveToCartFromSaved = (productId, colorId, size) => dispatch => {
    console.log("Dispatching MOVE_TO_CART_FROM_SAVED action", productId, colorId, size);
    dispatch({
        type: 'MOVE_TO_CART_FROM_SAVED',
        payload: { productId, colorId, size }
    });
};

export const clearBagAction = () => ({
    type: addToBagActionType.CLEAR_BAG,
    payload: []
});



