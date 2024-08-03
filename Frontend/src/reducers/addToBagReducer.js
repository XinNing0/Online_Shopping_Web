
const initialState = {
    bag: JSON.parse(localStorage.getItem('bag')) || [],
    latersave: JSON.parse(localStorage.getItem('latersave')) || [],
    recentAddedItem: null
}

export function addToBagReducer(state = initialState, action) {
    //console.log('Current State:', state);
    //console.log('Action Received:', action);

    let updateBag = [...state.bag]
    let updateSave =[...state.latersave]

    switch (action.type) {
        case "ADD_TO_BAG":
            const existingProduct = state.bag.findIndex(
                item => item.productId === action.payload.productId
                    && item.size === action.payload.size &&
                    item.color.colorId === action.payload.color.colorId
            );

            let newBag;

            if (existingProduct !== -1) {
                newBag = state.bag.map((item, index) => {
                    if (index === existingProduct) {
                        return {
                            ...item,
                            quantity: item.quantity + action.payload.quantity,
                            date: Date.now(),
                        };
                    }
                    return item;
                });
            } else {
                newBag = [
                    ...state.bag,
                    {
                        productId: action.payload.productId,
                        quantity: action.payload.quantity,
                        color: action.payload.color,
                        size: action.payload.size,
                        productDetail: action.payload.productDetail,
                        date: Date.now(),
                    }
                ];
            }
            localStorage.setItem('bag', JSON.stringify(newBag));

            newBag = newBag.sort((a, b) => b.date - a.date);

            return {
                ...state,
                bag: newBag,
                recentAddedItem: {
                    productId: action.payload.productId,
                    quantity: action.payload.quantity,
                    color: action.payload.color,
                    size: action.payload.size,
                    productDetail: action.payload.productDetail,
                    date: Date.now(),
                }
            };

        case 'REMOVE_BAG_ITEM':
            // console.log(`[reducer] ${'REMOVE_FROM_BAG'}`, action.payload)
            const updatedBag = updateBag.filter((items, index) => !(index === action.payload.itemIndex))
            // to update local storage after filtering
            localStorage.setItem('bag', JSON.stringify(updatedBag));
            return {...state, bag: updatedBag};

        case 'UPDATE_QUANTITY':
            // console.log(`[reducer] ${'UPDATE_QUANTITY'}`, action.payload)
            const updatedQuantity = updateBag.map((items, index) => (index === action.payload.itemIndex)
                ? {...items, quantity: action.payload.quantity} : items)
            // to update local storage after updating quantity
            localStorage.setItem('bag', JSON.stringify(updatedQuantity));
            return {...state, bag: updatedQuantity};

        case 'EDIT_ITEM':
            // console.log(`[reducer] ${'EDIT_ITEM'}`, action.payload)
            // to update the item at the specified index if the productId matches
            let editedItem = updateBag.map((item, index) =>
                (index === action.payload.itemIndex && item.productId === action.payload.productId)
                    ? {...item, color: action.payload.color, size: action.payload.size, date: Date.now()} : item)

            // to group items by productId, color, and size, and sum the quantities
            const groupedItems = editedItem.reduce((acc, item) => {
                let key = `${item.productId}-${item.color}-${item.size}`;
                acc[key] ? acc[key].quantity += item.quantity : acc[key] = {...item}
                return acc
            }, {})

            // to convert the groupItems into an array and sort by recent
            editedItem = Object.values(groupedItems);
            editedItem = editedItem.sort((a, b) => b.date - a.date);

            // console.log(editedItem);
            // to update local storage after editing
            localStorage.setItem('bag', JSON.stringify(editedItem));
            return {...state, bag: editedItem}

        case 'SAVE_FOR_LATER': {
            const itemIndex = state.bag.findIndex(item =>
                item.productId === action.payload.productId &&
                item.color?.colorId === action.payload.colorId &&
                item.size === action.payload.size
            );

            if (itemIndex === -1) return state;  // No item found in the cart, do nothing

            const itemToSave = { ...state.bag[itemIndex], quantity: 1 };  // Reset quantity for saved item
            const existingSaveIndex = state.latersave.findIndex(item =>
                item.productId === itemToSave.productId &&
                item.color?.colorId === itemToSave.color?.colorId &&
                item.size === itemToSave.size
            );

            let newSave = [...state.latersave];
            let newBag = [...state.bag];

            if (existingSaveIndex !== -1) {
                // Item already exists in the saved list, replace it with the new item with quantity 1
                newSave[existingSaveIndex] = itemToSave;
            } else {
                // Add the item with quantity 1 to the saved list
                newSave.push(itemToSave);
            }

            // Remove the item from the bag
            newBag.splice(itemIndex, 1);  // Remove the item entirely from the bag

            localStorage.setItem('bag', JSON.stringify(newBag));
            localStorage.setItem('latersave', JSON.stringify(newSave));

            return { ...state, bag: newBag, latersave: newSave };
        }

        case 'MOVE_TO_CART_FROM_SAVED': {
            const { productId, colorId, size } = action.payload;
            const itemToMoveIndex = state.latersave.findIndex(item =>
                item.productId === productId &&
                item.color?.colorId === colorId &&
                item.size === size
            );

            if (itemToMoveIndex === -1) return state;  // No item found in saved, exit early

            const itemToMove = state.latersave[itemToMoveIndex];
            const existingCartItemIndex = state.bag.findIndex(item =>
                item.productId === productId &&
                item.color?.colorId === colorId &&
                item.size === size
            );

            let newBag = [...state.bag];
            let newSave = [...state.latersave];

            // Adjust the quantity or remove the item from the saved list
            if (itemToMove.quantity > 1) {
                newSave[itemToMoveIndex].quantity -= 1;
            } else {
                newSave.splice(itemToMoveIndex, 1);  // Remove the item entirely if the quantity is 1
            }

            if (existingCartItemIndex !== -1) {
                // Item exists in cart, update quantity
                newBag[existingCartItemIndex] = {
                    ...newBag[existingCartItemIndex],
                    quantity: newBag[existingCartItemIndex].quantity + 1
                };
            } else {
                // Item does not exist in cart, add it
                newBag.push({ ...itemToMove, quantity: 1 });
            }

            // Update local storage for bag and saved items
            localStorage.setItem('bag', JSON.stringify(newBag));
            localStorage.setItem('latersave', JSON.stringify(newSave));
            console.log("Updated state:", { bag: newBag, latersave: newSave });

            return {
                ...state,
                bag: newBag,
                latersave: newSave
            };
        }

        case 'REMOVE_SAVE_ITEM':
            const newSaveLater = state.latersave.filter(item =>
                !(item.productId === action.payload.productId &&
                    item.color.colorId === action.payload.colorId &&
                    item.size === action.payload.size));
            console.log('Updated Save Later:', newSaveLater);
            return {
                ...state,
                latersave: newSaveLater
            };

        case 'CLEAR_BAG' :
            return {
                ...state,
                bag:action.payload
            };

        default:
            return state;
    }
}

export default addToBagReducer;
