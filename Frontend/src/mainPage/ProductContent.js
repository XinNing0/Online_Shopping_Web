import ProductList from "./ProductList";
import "./ProductContent.scss"
import {SortingDropDown} from "./SortingDropDown";
import {ProductContentBanner} from "./ProductContentBanner";
import {ProductFiltered} from "./ProductFiltered";

const ProductContent = ()=>{
    return(
        <div className="ProductContentContainers">
            <ProductContentBanner/>
            <div className="ProductContentFiltersContainers">
                <div className="ProductContentFiltersSort">
                    <SortingDropDown/>
                </div>

               <ProductFiltered />
            </div>
            <ProductList/>
        </div>
    )
}

export default ProductContent
