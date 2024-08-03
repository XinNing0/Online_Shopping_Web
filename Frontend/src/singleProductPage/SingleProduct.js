// import {json, useParams} from "react-router-dom";
// import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {fetchOneProductReducer} from "../reducers/fetchOneProductReducer";
// import {fetchOneProduct} from "../actions/fetchOneProductAction";
//
// export const SingleProduct = () => {
//     const {productId} = useParams()
//     const dispatch = useDispatch()
//     const productDetail = useSelector(state => state.fetchOneProductReducer.singleProduct)
//
//     useEffect(() => {
//         dispatch(fetchOneProduct(productId))
//     }, []);
//     return <div>
//         {JSON.stringify(productDetail)}
//     </div>
// }
import {json, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneProduct} from "../actions/fetchOneProductAction";
import {SingleCarousel} from "./SingleCarousel";
import {YouMayLike} from "./YouMayLike";
import {YouMayAlsoLike} from "./YouMayAlsoLike";
import {Reviews} from "./Reviews";
import Details from "./Details";
import DetailPanel from "./DetailPanel";

export const SingleProduct = () => {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.fetchOneProductReducer.singleProduct)
    const [activeIndex, setActiveIndex] = useState(null);
    const panelRefs = useRef([]);
    const viewZoomIn = useSelector(state=>state.fetchOneProductReducer.zoom)

    const toggleDetail = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
        const element = panelRefs.current[index];
        if (element) {
            const yOffset = -300; // 偏移量，调整到合适的位置
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }

    }


    useEffect(() => {
        dispatch(fetchOneProduct(productId))
    }, []);

    if (!productDetail) {
        return <div>Loading...</div>;
    }


    return <div>

        {/*{JSON.stringify(productDetail)}*/}
        <SingleCarousel id = {productId} productDetails = {productDetail} toggleDetail = {toggleDetail}/>
        {/*<div>*/}
            {/*<YouMayLike/>*/}
            {/*<YouMayAlsoLike/>*/}
        {/*</div>*/}
        {/*<Details productDetails = {productDetail} toggleDetail = {setActiveIndex} />*/}
        {
            !viewZoomIn &&
            <>
                <DetailPanel productDetails = {productDetail} activeIndex = {activeIndex} panelRefs={panelRefs}/>
                <YouMayAlsoLike/>
                <Reviews />
            </>
        }

    </div>
}

