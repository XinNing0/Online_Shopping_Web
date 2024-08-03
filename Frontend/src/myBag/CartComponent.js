import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CartComponent.scss';
import { OrderSummary } from './OrderSummary';
import { moveToCartFromSaved, removeFromBag, removeFromSave, saveForLater, updateQuantity } from "../actions/addToBagAction";
import { EditItem } from "./EditItem";
import { CustomSelect } from "./CustomSelect";
import { Link } from "react-router-dom";
import {IsRemoveItem} from "./IsRemoveItem";

export const CartComponent = () => {
    const cart = useSelector(state => state.addToBagReducer.bag);
    const save = useSelector(state => state.addToBagReducer.latersave);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    // for remove pop up window
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);

    const handleSaveForLater = (productId, colorId, size) => {
        dispatch(saveForLater(productId, colorId, size));
    };

    const handleMoveToCart = (productId, colorId, size) => {
        dispatch(moveToCartFromSaved(productId, colorId, size));
    };

    const handleEditClick = (item, index) => {
        setCurrentItem({ ...item, index });
        setIsModalOpen(true);
    };

    const handleRemoveClick = (item, index) => {
        setIsRemoveOpen(true);
        setCurrentItem({...item, index});
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsRemoveOpen(false)
        setCurrentItem(null);
    };

    const handleClickOutside = (event) => {

        if (event.target.classList.contains('modal')){
            handleCloseModal()
        }
        //console.log("event.target.classList",event.target.classList)

    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const handleQuantityChange = (index, productId, colorId, size, quantity) => {
        dispatch(updateQuantity(index, Number(quantity)));
    };

    // Check if both cart and save for later are empty
    if (cart.length === 0 && save.length === 0) {
        return (
            <div className="empty-bag">
                <h1>Give your bag some love!</h1>
                <Link to="/" className="shop-button">
                    SHOP WHAT'S NEW
                </Link>
            </div>
        );
    }

    const removeWindowStyle = {
        margin: '0 auto',
        padding: '36px 20px 32px 20px',
        width: '424px',
        height: '235px',
        display: 'flex',
        flexDirection: 'column',
    }


    return (
        <div className="cart-page">
            <div className="cart-saved">
                {cart.length > 0 && (
                    <div className="cart-items">
                        <h1 style={{marginLeft: '122px', textAlign: 'left'}}>My Bag ({totalQuantity} Items)</h1>
                        <div className="notification-box">
                            <i className="fas fa-shipping-fast"></i>
                            <span className="these-items">These items are going fast! Checkout now to make them yours.</span>
                        </div>
                        {cart.map((item, index) => {
                            const selectedImageObj = item.productDetail.images.find(image => image.colorId === item.color.colorId);
                            const selectedImage = selectedImageObj?.mainCarousel?.media.split(" | ")[0];

                            return (
                                <div key={`${item.productId}-${item.size}-${item.color.colorId}`} className="cart-item">
                                    <img
                                        src={selectedImage || 'default-image-url.jpg'}
                                        alt={item.productDetail?.name || 'Product Image'}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h2>{item.productDetail?.name || 'Product Name'}</h2>
                                        <p>Color: {item.color.swatchAlt}</p>
                                        <p>Size: {item.size}</p>
                                        <a onClick={() => handleEditClick(item, index)} className="edit-link">Edit</a>
                                        <p className="free">Free Shipping + Free Returns</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="actions-direction">
                                            <div className="item-price">
                                                <p>Item Price</p>
                                                <p>{item.productDetail?.price || 'NaN'}</p>
                                            </div>
                                            <div className="quantity-section">
                                                <label htmlFor={`quantity-${item.productId}`}>Quantity</label>
                                                <CustomSelect
                                                    options={[1, 2, 3, 4, 5]} // Adjust options as needed
                                                    value={item.quantity}
                                                    onChange={(value) =>
                                                        handleQuantityChange(index, item.productId, item.color.colorId, item.size, value)
                                                    }
                                                />
                                            </div>
                                            <div className="total-price">
                                                <p>Total Price</p>
                                                <p>${(item.productDetail?.price.replace(/[^0-9.-]+/g, "") * item.quantity).toFixed(2) || 'Price not available'}</p>
                                            </div>
                                        </div>
                                        <div className="p-section">
                                            <a className="underline"
                                               onClick={() => handleSaveForLater(item.productId, item.color.colorId, item.size)}>Save for Later</a>
                                            <a className="underline"
                                               onClick={()=> handleRemoveClick(item, index)}>Remove</a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {save.length > 0 && (
                    <div className="saved-items">
                        <h1 className="save-left" style={{margin: '0', textAlign: 'left'}}>Saved for Later</h1>
                        {save.map((item, index) => {
                            const selectedImageObj = item.productDetail.images.find(image => image.colorId === item.color.colorId);
                            const selectedImage = selectedImageObj?.mainCarousel?.media.split(" | ")[0];

                            return (
                                <div key={`${item.productId}-${item.size}-${item.color.colorId}`} className="cart-item">
                                    <img
                                        src={selectedImage || 'default-image-url.jpg'}
                                        alt={item.productDetail?.name || 'Product Image'}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h2>{item.productDetail?.name || 'Product Name'}</h2>
                                        <p>Color: {item.color.swatchAlt}</p>
                                        <p>Size: {item.size}</p>
                                        <div className="item-price">
                                            <p>Item Price</p>
                                            <p>{item.productDetail?.price || 'NaN'}</p>
                                        </div>
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="actions-direction">
                                            <div className="item-price">
                                                <p>Item Price</p>
                                                <p>{item.productDetail?.price || 'NaN'}</p>
                                            </div>
                                            <div className="quantity-section">
                                                <label htmlFor={`quantity-saved-${item.productId}`}>Quantity</label>
                                                <CustomSelect
                                                    options={[]} // Adjust options as needed
                                                    value={item.quantity}
                                                    onChange={(value) =>
                                                        handleQuantityChange(item.productId, item.color.colorId, item.size, value)
                                                    }
                                                />
                                            </div>
                                            <div className="total-price">
                                                <p>Total Price</p>
                                                <p>${(item.productDetail?.price.replace(/[^0-9.-]+/g, "") * item.quantity).toFixed(2) || 'Price not available'}</p>
                                            </div>
                                        </div>
                                        <div className="p-section">
                                            <a className="underline"
                                               onClick={() =>
                                                   handleMoveToCart(item.productId, item.color.colorId, item.size)}
                                            >Add to Bag</a>
                                            <a className="underline"
                                               onClick={() => {
                                                   dispatch(removeFromSave(item.productId, item.color.colorId, item.size));
                                               }}>
                                                Remove
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <OrderSummary />
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal} style={{zIndex: '104'}}>&times;</span>
                        <EditItem item={currentItem} onClose={handleCloseModal} />
                    </div>
                </div>
            )}
            {isRemoveOpen && (
                <div className="modal">
                    <div className="modal-content" style={removeWindowStyle}>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <IsRemoveItem item={currentItem} onClose={handleCloseModal}/>
                    </div>
                </div>
            )}
        </div>
    );
};
