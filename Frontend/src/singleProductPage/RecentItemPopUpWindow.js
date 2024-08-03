import React from 'react';
import { useSelector } from 'react-redux';
import "./RecentItemPopUpWindow.scss";
import {useNavigate} from "react-router-dom";

const RecentItemPopUpWindow = ({ show, onClose, productDetails, colorIndex, link }) => {
    const navigate = useNavigate()
    const recentItem = useSelector(state => state.addToBagReducer.recentAddedItem);
    const bag = useSelector(state=>state.addToBagReducer.bag)
    let totalPrice = 0;
    totalPrice = bag.map(item => parseFloat(item.productDetail.price.slice(1, item.productDetail.price.indexOf(' '))) * item.quantity).reduce((c,a)=>c+a,0)
    let urls = ""
    if (colorIndex !== -1) {
        urls = productDetails?.images[colorIndex].mainCarousel.media
    }
    const url = urls.slice(0, urls.indexOf('|'))
    const quantities = bag.map(item => item.quantity);
    let totalQuantity = 0;
    quantities.forEach(quantity => {totalQuantity += quantity;});
    console.log(productDetails)
    console.log("totalPrice", totalPrice)
    // const [showMyBagLink, setShowMyBagLink] = React.useState(false);

    if (!show || !recentItem) {
        return null;
    }


    return (
        <div className="popup">

            <div className="popupInner">
                <button className="closeBtn" onClick={()=>onClose(false)}>
                    <span className="closeLink">
                        <img className="svgCloseIcon"
                             src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-5227a0.svg#close-nav-usage"
                             title="Close"/>

                    </span>

                </button>
                <div className="popUpHeader">
                    <h2 className="headerTitleCapitalize">Added to Your Bag</h2>
                    <div className="bagContainer">
                    <svg height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                             className="bag-icon" focusable="false" role="img" aria-hidden="true">
                            <path
                                d="M20 6.25h-3.25c-.68-3.62-2.53-6-4.75-6s-4.07 2.38-4.75 6H4a.76.76 0 0 0-.75.75v12A4.75 4.75 0 0 0 8 23.75h8A4.75 4.75 0 0 0 20.75 19V7a.76.76 0 0 0-.75-.75zm-8-4.5c1.38 0 2.66 1.84 3.22 4.5H8.78c.56-2.66 1.84-4.5 3.22-4.5zM19.25 19A3.26 3.26 0 0 1 16 22.25H8A3.26 3.26 0 0 1 4.75 19V7.75H7l-.24 2.16.49.06a1 1 0 0 0 1.12-.87l.17-1.35h6.92l.17 1.35a1 1 0 0 0 1.12.87l.49-.06L17 7.75h2.28L19.25 19z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                        <div className="bagItemQuantity">
                            {totalQuantity} Items
                        </div>
                    </div>
                </div>

                <div className="productContainer">
                    <div className="productInfoBoxContainer">
                        <div className="productInfoImage">
                            <img loading="lazy" src={url} alt="Swiftly Tech Short-Sleeve Shirt 2.0 *Hip Length"
                                 className="productImage" data-testid="lazy-image"/>

                        </div>
                        <div className="productBasicInfoContainer">
                            <h3 className="productTitleInfo">{recentItem.productDetail.name}</h3>
                            <div className="productInfo">
                                <p className="productInfoSize">Size: {recentItem.size}</p>
                                <p className="productInfoPrice">{recentItem.productDetail.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bagDetails">
                        <div className="bagDetailsInfo">
                            <span className="bagDetailsInfoSubtotal">Subtotal</span>
                            <span className="bagDetailsTotalPrice">
                                ${totalPrice} CAD
                            </span>
                        </div>
                        <div className="checkoutWrapper">

                            <div className="checkoutContainer"
                                 onClick={()=> navigate(`/cart`)}
                                 onMouseEnter={() => link(true)}
                                 onMouseLeave={() => link(false)}
                            >
                                <p className="buttonCheckout">VIEW BAG & CHECKOUT</p>
                            </div>
                            <div className="continueShoppingLinkContainer">
                                <button className="continueShoppingBtn" onClick={()=>onClose(false)}>
                                    <span>CONTINUE SHOPPING</span>
                                    <svg height="16" width="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                                         className="continueShoppingLinkIcon" focusable="false" role="img"
                                         aria-hidden="true"
                                         data-testid="link-arrow-icon">
                                        <path
                                            d="m10.53 2.47 5 5a.75.75 0 0 1 .01 1.04l-5 5-.35-.35a1 1 0 0 1 0-1.42l3-3H5a1 1 0 0 1-1-1v-.5h9.18l-3-3a1 1 0 0 1 0-1.42l.35-.35ZM2 7.25a1 1 0 0 1 1 1v.5H1a1 1 0 0 1-1-1v-.5Z"
                                            fill="currentColor" fill-rule="evenodd"></path>
                                    </svg>
                                </button>


                            </div>
                        </div>

                    </div>

                </div>
                <div className="productRecommendationContainer">
                    <div className="recommendationHeader">
                        <h2 className="headlineContainer">
                            Goes well with
                        </h2>
                    </div>
                    <div className="storyCarouselWrapper">
                        <div className="storyCarouselContainer">
                            <div className="swiperWrapper">
                                <div className="swiperFirstItem">
                                    <img
                                        sizes="(min-width: 1372px) 312px, (min-width: 981px) 23vw, (min-width: 641px) 31vw, 46vw"
                                        srcSet="https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=320&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 320w,
https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=750&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 750w,
https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=1080&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1080w,
https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=1125&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1125w,
https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=1280&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1280w,
https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=1440&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1440w,
https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=1600&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1600w,
https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=2420&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 2420w,
https://images.lululemon.com/is/image/lululemon/LW2EB3S_033068_1?$story_carousel$&amp;wid=2644&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 2644w"
                                        loading="lazy" src="data:," alt=""
                                        className="image__default story-product-tile-image" data-testid="lazy-image"/>
                                    <h3 className="productName">
                                        lululemon Energy Bra
                                        Medium Support, B-D
                                        Cups
                                    </h3>
                                    <span className = "priceContainer">
                                        $52 CAD

                                    </span>

                                </div>
                                <div className="swiperSecondItem">
                                    <img
                                        sizes="(min-width: 1372px) 312px, (min-width: 981px) 23vw, (min-width: 641px) 31vw, 46vw"
                                        srcSet="https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=320&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 320w,
https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=750&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 750w,
https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=1080&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1080w,
https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=1125&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1125w,
https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=1280&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1280w,
https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=1440&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1440w,
https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=1600&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1600w,
https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=2420&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 2420w,
https://images.lululemon.com/is/image/lululemon/LW2AUYS_031382_1?$story_carousel$&amp;wid=2644&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 2644w"
                                        loading="lazy" src="data:," alt=""
                                        className="image__default story-product-tile-image" data-testid="lazy-image"/>
                                    <h3>lululemon Energy Longline Bra Medium Support B-D</h3>
                                    <span className="priceContainer">
                                        $58 CAD
                                    </span>
                                </div>
                                <div className="swiperThirdItem">
                                    <img
                                        sizes="(min-width: 1372px) 312px, (min-width: 981px) 23vw, (min-width: 641px) 31vw, 46vw"
                                        srcSet="https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=320&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 320w,
https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=750&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 750w,
https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=1080&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1080w,
https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=1125&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1125w,
https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=1280&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1280w,
https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=1440&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1440w,
https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=1600&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1600w,
https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=2420&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 2420w,
https://images.lululemon.com/is/image/lululemon/LW6CDQS_0001_1?$story_carousel$&amp;wid=2644&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 2644w"
                                        loading="lazy" src="data:," alt=""
                                        className="image__default story-product-tile-image" data-testid="lazy-image"/>
                                    <h3>Dance Studio Mid-Rise Cropped Pant</h3>
                                    <span className="priceContainer">
                                        $88 CAD
                                    </span>

                                </div>
                                <div className="swiperFourthItem">
                                    <img
                                        sizes="(min-width: 1372px) 312px, (min-width: 981px) 23vw, (min-width: 641px) 31vw, 46vw"
                                        srcSet="https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=320&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 320w,
https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=750&amp;op_usm=0.8,1,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 750w,
https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=1080&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1080w,
https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=1125&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1125w,
https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=1280&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1280w,
https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=1440&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1440w,
https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=1600&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 1600w,
https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=2420&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 2420w,
https://images.lululemon.com/is/image/lululemon/LW5FZAS_0001_1?$story_carousel$&amp;wid=2644&amp;op_usm=0.5,2,10,0&amp;fmt=jpeg&amp;qlt=75,1&amp;fit=constrain,0&amp;op_sharpen=0&amp;resMode=sharp2&amp;iccEmbed=0&amp;printRes=72 2644w"
                                        loading="lazy" src="data:," alt=""
                                        className="image__default story-product-tile-image" data-testid="lazy-image"/>
                                    <h3>License to Train Mid-Rise Lightweight Jogger</h3>
                                    <span className="priceContainer">
                                        $148 CAD
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecentItemPopUpWindow;
