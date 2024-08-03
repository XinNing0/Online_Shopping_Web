import React, { useEffect, useState } from 'react';
import { fetchOneProduct } from "../actions/fetchOneProductAction";
import './YouMayLike.scss';

// Correct import paths relative to the `YouMayLike.js` file
import DefineLongSleeve from '../assets/images/DefineLongSleeve.jpg';
import EnergyBra from '../assets/images/EnergyBra.jpg';
import EnergyBraLongLine from '../assets/images/EnergyBraLongLine.jpg';
import ShortHottyHot from '../assets/images/ShortHottyHot.jpg';
import ShortSpeedup from '../assets/images/ShortSpeedup.jpg';
import Skirt from '../assets/images/Skirt.jpg';
import SwiftlyShortSleeve from '../assets/images/SwiftlyShortSleeve.jpg';
import SwiftlyTank from '../assets/images/SwiftlyTank.jpg';
import TankTop from '../assets/images/TankTop.jpg';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const allProducts = [
    {
        id: '1',
        image: DefineLongSleeve,
        name: 'Define Long Sleeve'
    },
    {
        id: '2',
        image: EnergyBra,
        name: 'Energy Bra'
    },
    {
        id: '3',
        image: EnergyBraLongLine,
        name: 'Energy Bra Long Line'
    },
    {
        id: '4',
        image: ShortHottyHot,
        name: 'Short Hotty Hot'
    },
    {
        id: '5',
        image: ShortSpeedup,
        name: 'Short Speedup'
    },
    {
        id: '6',
        image: Skirt,
        name: 'Skirt'
    },
    {
        id: '7',
        image: SwiftlyShortSleeve,
        name: 'Swiftly Short Sleeve'
    },
    {
        id: '8',
        image: SwiftlyTank,
        name: 'Swiftly Tank'
    },
    {
        id: '9',
        image: TankTop,
        name: 'Tank Top'
    }
];

export const YouMayLike = () => {
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
        <div className="you-may-like">
            <h2>You may like</h2>
            <div className="similar-products">
                {similarProducts.map(product => (
                    <div key={product.id} className="product">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <p className="product-name">{product.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
