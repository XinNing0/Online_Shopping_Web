import {sortingArray} from "../helper/constants";
import actions from "../actions";
import {icons} from "../assets/icons";
import {fetchAllWithSorting123} from "../actions/mainPageAction";
import {useDispatch, useSelector} from "react-redux";
import "./SortingDropDown.scss"



export const SortingDropDown =( )=>{
    const dispatch = useDispatch()
    const open = useSelector(state => state.mainPageReducer.dropDownOn)
    const products = useSelector(state => state.mainPageReducer.products)
    const sortingId = useSelector(state =>state.mainPageReducer.sortingId)
    const productLoading = useSelector((state)=>state.mainPageReducer.loading);


    return(
        <div className="SortingDropDownContainers">
            <div className='SortingDropDownLeft'>
                <button className='allItemsButton'>
                    <p>All Items ({products.length})</p>
                </button>
                <button className='StoreNearButton'>
                    <p>Available Near You</p>
                    <icons.ArrowForwardIosOutlinedIcon fontSize="inherit"/>
                </button>
            </div>
            <div className="SortingDropDown">

                <div className="sortingHeader"
                     onClick={() => dispatch(actions.mainPageAction.showDropDownFromHeader())}>
                    <div className="sortingHeaderContent">Sort By </div>
                    <div className="selectedSortingMethod">{sortingArray[sortingId-1]}</div>
                    <icons.KeyboardArrowDownIcon className="sortingHeaderContent"/>

                </div>
                <div>
                    {open ? (
                        <ul className="sortingMenu">
                            {
                                sortingArray.map((content, index) => (
                                        <li className="sortingMenuItem" key={index} onClick={() =>
                                            productLoading?null: dispatch(fetchAllWithSorting123(index + 1))
                                        } >
                                            <button>{content}</button>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    )
}