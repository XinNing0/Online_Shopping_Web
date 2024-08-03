import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CartComponent} from "../myBag/CartComponent";

export const ShoppingCartContent = (id, productDetails) => {

    const cart = useSelector(state=>state.addToBagReducer.bag)
    return <div>

        {/*<h1>Bag Content</h1>*/}
        {/*{JSON.stringify(cart)}*/}
        <CartComponent/>
        {/*<Link to="/"> Back to Home</Link>*/}


    </div>
}

export default ShoppingCartContent;