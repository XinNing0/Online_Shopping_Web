import './NewProduct.scss'
import {useDispatch, useSelector} from "react-redux";
import actions from "../actions";
import ProductContent from "./ProductContent";
import {Filter} from "./Filter";
import {useEffect} from "react";


const NewProduct = () => {
    const index = useSelector(state => state.mainPageReducer.test)
    const open = useSelector(state=>state.mainPageReducer.dropDownOn)
    const dispatch = useDispatch()

    return (
        // for closing the dropdown with a click anywhere in this page
        <div onClick={()=>(open?dispatch(actions.mainPageAction.closeDropDownAnywhere()):null)}>

            <div className='MainProductContainers'>
                <Filter />
                <ProductContent/>
            </div>

        </div>
    )
}

export default NewProduct