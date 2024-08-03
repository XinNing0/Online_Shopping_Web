import React, { useEffect, useState } from 'react';
import { fetchOneProduct } from "../actions/fetchOneProductAction";
import './YouMayAlsoLike.scss';

// Correct import paths relative to the `YouMayLike.js` file
import EvolutionShortSleevePolo from '../assets/images/Evolution Short-Sleeve Polo Shirt.jpg';
import SwiftMidRiseWideLegPant from '../assets/images/Swift Mid-Rise Wide-Leg Pant.jpg';
import DefineHoodedJacket from '../assets/images/Define Hooded Jacket.jpg';
import LoveCurvedHemCrewneckTShirt from '../assets/images/Love Curved-Hem Crewneck T-shirt.jpg';
import lululemonAlignDress from '../assets/images/lululemon Align Dress.jpg';
import HighRisePleatedTennisSkirt from '../assets/images/High-Rise Pleated Tennis Skirt.jpg';
import EbbToStreetCroppedRacerbackTankTop from '../assets/images/Ebb to Street Cropped Raceback Tank Top.jpg';
import SwiftlyTechRaceBackTankTopTwo from '../assets/images/Swiftly Tech RaceBackTankTop Two.jpg';
import SwiftlyTechRacebackTankTop from '../assets/images/Swiftly Tech RacebackTank Top.jpg';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const allProducts = [
    {
        id: '10',
        image: EvolutionShortSleevePolo,
        name: 'Evolution Short-Sleeve Polo Shirt',
        price: '$98 USD'
    },
    {
        id: '11',
        image: SwiftMidRiseWideLegPant,
        name: 'Swift Mid-Rise Wide-Leg Pant',
        price: '$118 USD'
    },
    {
        id: '12',
        image: DefineHoodedJacket,
        name: 'Define Hooded Jacket',
        price: '$118 USD'
    },
    {
        id: '13',
        image: LoveCurvedHemCrewneckTShirt,
        name: 'Love Curved-Hem Crewneck T-shirt',
        price: '$48 USD'
    },
    {
        id: '14',
        image: lululemonAlignDress,
        name: 'lululemon Align Dress',
        price: '$98 USD'
    },
    {
        id: '15',
        image: HighRisePleatedTennisSkirt,
        name: 'High-Rise Pleated Tennis Skirt',
        price: '$68 USD'
    },
    {
        id: '16',
        image: EbbToStreetCroppedRacerbackTankTop,
        name: 'Ebb to Street Cropped Raceback Tank Top',
        price: '$68 USD'
    },
    {
        id: '17',
        image: SwiftlyTechRaceBackTankTopTwo,
        name: 'Swiftly Tech RaceBackTank Top 2.0',
        price: '$48 USD'
    },
    {
        id: '18',
        image: SwiftlyTechRacebackTankTop,
        name: 'Swiftly Tech RacebackTank Top',
        price: '$58 USD'
    }
];

export const YouMayAlsoLike = () => {
    const [similarProducts, setSimilarProducts] = useState([]);
    const {productId} = useParams()
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.fetchOneProductReducer.singleProduct)

    useEffect(() => {
        dispatch(fetchOneProduct(productId))
        const productName = productDetail.name;

        if (productName) {
            fetchRecommendations(productName);
        } else {
            console.error('Product details are missing or incomplete', productDetail );
            fetchRecommendations();
        }
    }, []);


    const fetchRecommendations = (name) => {
        let recommendations;
        if (name) {
            // Filter products by excluding the current product and matching part of the name
            recommendations = allProducts.filter(product => product.name.includes(name) && product.id !== productId);
        }

        // If no recommendations found, shuffle and take the first 4 products
        if (!recommendations || recommendations.length === 0) {
            recommendations = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        }

        setSimilarProducts(recommendations);
    };

    return (
        <div className="you-may-also-like">
            <h2>You May Also Like</h2>
            <div className="similar-products">
                {similarProducts.map(product => (
                    <div key={product.id} className="product">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <p className="product-name">{product.name}</p>
                            <p className="product-price">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
