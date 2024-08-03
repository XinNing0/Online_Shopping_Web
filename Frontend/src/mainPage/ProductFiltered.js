import './ProductFiltered.scss'
import {useDispatch, useSelector} from "react-redux";
import {setFilter} from "../actions/filterAction";

export const ProductFiltered = () => {
    const dispatch = useDispatch();
    const filtered = useSelector((state) => state.filterReducer.filters);
    const productLoading = useSelector((state)=>state.mainPageReducer.loading);

    const handleFilterChange = (category, item) => {
        if (category === 'SizeType') {
            console.log('click')
            // const isItemIncluded = filtered[category]?.includes(item);
            // const newFiltered = isItemIncluded && filtered[category].filter(itemName => itemName !== item)
            // console.log('----isItemIncluded', isItemIncluded)
            // console.log('----newValue', newFiltered[0])
            console.log('---category', category,'----item', item)
            dispatch(setFilter('SizeType', item));
            console.log('----filtered inside ---', filtered)
        } else {
            console.log('click')
            dispatch(setFilter(category, item));
        }
    };

    // console.log('----filtered', filtered)

    return (
        <div className="ProductFilteredContainers">
            {filtered &&
                Object.keys(filtered).map((category) =>
                    (Array.isArray(filtered[category]) ?
                            filtered[category].map((item) =>
                                // console.log('-----------------', category, 'item', item)
                                <button key={item}
                                        className='ProductFilteredItem'
                                        onClick={() => productLoading?null:handleFilterChange(category, item)}
                                >
                                    {item}
                                    <div>x</div>
                                </button>
                            )
                            : (category === 'SizeType' &&
                                Object.entries(filtered).map(([key, value]) =>
                                    value.length !== 0 && key === 'SizeType' &&
                                    // console.log('||-----------------', typeof category.name, '------', value)
                                    <button
                                        className='ProductFilteredItem'
                                        onClick={() => productLoading?null:handleFilterChange(key, value)}
                                    >
                                        {value}
                                        <div>x</div>
                                    </button>
                                )
                            )
                    ))
            }
        </div>
    )
}
