import React from 'react';
import { useDispatch } from 'react-redux';
import { addToBagAction } from './addToBagAction';

const Product = ({ productId, color, size, productDetail }) => {
    const dispatch = useDispatch();

    const handleAddToBag = () => {
        dispatch(addToBagAction(productId, 1, color, size, productDetail));
    };

    return (
        <div>
            <h2>{productDetail.name}</h2>
            <button onClick={handleAddToBag}>Add to Bag</button>
        </div>
    );
};

export default Product;
