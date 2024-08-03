import './ProductContentBanner.scss'
import {bannerNew} from "../helper/constants";
import "./ProductContentBanner.scss"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearFilter, setFilter} from "../actions/filterAction";
export const ProductContentBanner = ()=>{
    const [index,setIndex] = useState(0)
    const productLoading = useSelector(state=>state.mainPageReducer.productLoading)
    const dispatch = useDispatch()
    const checkBold = (i) =>{
        return index === i?{ fontWeight: 'bold' } : { fontWeight: 'normal' }
    }
    return(
    <div className="ProductContentBanner">
        <div className = "ProductContentBannerPicture"
        >
            {

                <img src={bannerNew[index]}></img>
            }
        </div>
        <div className = "ProductContentBannerMenu">
            <div>
                <div onClick={() => {setIndex(0);
                    if (!productLoading){
                        dispatch(clearFilter())
                    }} }style={checkBold(0)} className={index === 0 && 'selected'}

                >All What's New</div>
            </div>
            <div>
                <div onClick={() => {setIndex(1);
                    if (!productLoading){
                        dispatch(clearFilter())
                        dispatch(setFilter("Gender", "Women"))
                }}} style={checkBold(1)} className={index === 1 && 'selected'}>Women's What's New</div>
            </div>
            <div>
                <div onClick={() => {setIndex(2)
                    if (!productLoading){
                        dispatch(clearFilter())
                        dispatch(setFilter("Gender", "Men"))
                }}
                } style={checkBold(2)} className={index === 2 && 'selected'}>Men's What's New</div>
            </div>
            <div>
                <div onClick={() => {setIndex(3)
                    if (!productLoading){
                        dispatch(clearFilter())
                        dispatch(setFilter("Category", "Accessories"))
                    }}
                } style={checkBold(3)} className={index === 3 && 'selected'}>Accessories What's New</div>
            </div>
        </div>


    </div>
    )
}
