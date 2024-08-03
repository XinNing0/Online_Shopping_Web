import './IsRemoveItem.scss'
import {removeFromBag} from "../actions/addToBagAction";
import {useDispatch} from "react-redux";

export const IsRemoveItem = ({item, onClose}) => {

    const dispatch = useDispatch();

    return <div className='isRemoveItemContainer'>
        <h1 className='isRemoveItemHeader'>Are you sure you want to remove this item from your bag?</h1>
        <button className='isRemoveItemRemoveBtn'
                onClick={() => {
                    dispatch(removeFromBag(item.index))
                    onClose()
                }}>
            YES, REMOVE THIS ITEM
        </button>
        <div className='isRemoveItemClose'>
            <button className='isRemoveItemCloseBtn' onClick={onClose}>No, keep this item</button>
        </div>
    </div>
}