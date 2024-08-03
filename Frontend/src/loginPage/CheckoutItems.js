import React from "react";
import './CheckoutItems.scss'

export const CheckoutItems = ({item, selectedImage}) => {

    return <div className='checkoutOrderSummaryDetailsContainer'>
        <div className='checkoutOrderSummaryDetailsImg'>
            <img
                src={selectedImage || 'default-image-url.jpg'}
                alt={item.productDetail?.name || 'Product Image'}
                className='checkoutOrderSummaryDetailsItemImg'
            />
        </div>
        <div className='checkoutOrderSummaryDetailsInfo'>
            <h5>{item.productDetail?.name || 'Product Name'}</h5>
            <p>{item.color.swatchAlt}</p>
            <p>Size: {item.size}</p>
            <div className='checkoutOrderSummaryDetailsPrice'>
                <p>Quantity: {item.quantity}</p>
                <p>${(item.productDetail?.price.replace(/[^0-9.-]+/g, "") * item.quantity).toFixed(2) || 'Price not available'}</p>
            </div>
        </div>
    </div>
}