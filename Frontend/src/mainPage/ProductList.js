import './ProductList.scss'
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
// import {products} from "../helper/testData";
import {ProductCard} from "./ProductCard";
import {useEffect, useState} from "react";
import {logDOM} from "@testing-library/react";
import {useNavigate} from "react-router-dom";

const ProductList = ()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // to get products data
    const products = useSelector(state=>state.mainPageReducer.products)
    const pageParams = useSelector(state=>state.mainPageReducer.pageParams)
    const filter = useSelector(state =>state.filterReducer.data)
    const sortingId = useSelector(state=>state.mainPageReducer.sortingId)

    // states for adding new page while retaining the previous loading page
    const [currentPage, setCurrentPage] = useState(1)
    const [loadingProducts, setLoadingProducts] = useState([]);
    // num of products show up each time---> set up 45 products by default
    const [currentProductNum, setCurrentProductNum] = useState(45)

    const totalProducts = products.length
    // to split products into multiple pages
    const numOfProducts = 45;
    let splitProducts = loadingProducts.slice(0, currentProductNum)

    // fetch the following page products
    function fetchNextPage() {
        if (currentProductNum < totalProducts) {
            // console.log('---------->Next page click');
            const nextPage = currentPage + 1;
            const newNumProducts = currentProductNum + numOfProducts
            setCurrentPage(nextPage)
            setCurrentProductNum(newNumProducts)
            // console.log('---------> current page:', currentPage, 'mewNumProducts:', newNumProducts)
            splitProducts = loadingProducts.slice(currentProductNum, newNumProducts)
        }
        // dispatch(actions.mainPageAction.fetchAllWithSortingAndPage(1, nextPage))
    }

    // to fetch all products based on filter
    useEffect(()=>{
        // console.log(sortingId,filter)
        dispatch(actions.mainPageAction.fetchAllWithSorting123(sortingId,filter))
        // to set up num of products show up
        splitProducts = products.slice(0, currentProductNum)
    },[filter])

    // to run the following page depends on products
    let newProducts
    useEffect(() => {
        // to remove empty product in products
        newProducts = products.filter(product => product.length !== 0)
        // to update loadingProducts when products changes
        setLoadingProducts(prev => [...newProducts]);
    }, [products])


    return(
        <>
            {/*Product Card List*/}
            <div className="productCardListContainer">
                {products &&
                    // products.map((item, index) =>
                    // loadingProducts.map((item, index) =>
                        splitProducts.map((item, index) =>
                    <ProductCard
                        images={item.images}
                        // alt={item.images[0]?.mainCarousel?.alt}
                        colorSets={item.swatches}
                        // key={index} ---> this way will cause issues if the list order changes
                        key={`${index}-${Date.now()}`}
                        name={item.name}
                        price={item.price.slice(0, -4)}
                        // price={item.price.slice(0, -4).replace(/\s+-\s+/g, '-')}
                        onClick={()=> navigate(`/single-product/${item.productId}`)}
                    />
                )}
            </div>

            {/*Loading Page Button*/}
            <div className="productCardListLoadingContainer">
                <p className='productCardListLoadingInfo'>
                    Viewing {currentProductNum < totalProducts ? currentProductNum : totalProducts} of {totalProducts}
                </p>
                {
                    products &&
                    currentProductNum < totalProducts &&
                    <button className='productCardListLoadingBtn'
                            onClick={fetchNextPage}
                    >VIEW MORE PRODUCTS</button>
                }
            </div>
        </>
    )
}

export default ProductList