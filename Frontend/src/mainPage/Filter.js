import React, { useEffect, useState } from 'react';
// import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { thunk } from 'redux-thunk';
// import filterReducer from '../reducers/filterReducer';
import { fetchFilterData, setFilter, clearFilter } from '../actions/filterAction';
import './Filter.scss';

// const store = createStore(filterReducer, applyMiddleware(thunk));

const FilterComponent = () => {
    const dispatch = useDispatch();
    const filterData = useSelector((state) => state.filterReducer.data);
    const filters = useSelector((state) => state.filterReducer.filters);
    const loading = useSelector((state) => state.filterReducer.loading);
    const error = useSelector((state) => state.filterReducer.error);
    const productLoading = useSelector((state)=>state.mainPageReducer.loading);


    useEffect(() => {
        dispatch(fetchFilterData());
    }, [dispatch]);

    const [collapsedSections, setCollapsedSections] = useState({
        Gender: true,
        Category: true,
        Type: true,
        Activity: true,
        SizeType: true,
        Size: true,
        Colour: true,
        Collection: true,
        Features: true,
        Climate: true,
        Fabric: true,
    });

    const [showMore, setShowMore] = useState({
        Category: false,
        Type: false,
        Activity: false,
        Size: false,
        Colour: false,
        Collection: false,
        Features: false,
        Fabric: false,
    });

    // const [selectedSizeType, setSelectedSizeType] = useState([]);

    // console.log('loading ====>',loading)


    const toggleSection = (section) => {
        setCollapsedSections({
            ...collapsedSections,
            [section]: !collapsedSections[section],
        });
    };

    const toggleShowMore = (section) => {
        setShowMore({
            ...showMore,
            [section]: !showMore[section],
        });
    };

    const handleFilterChange = (category, value) => {
        console.log('Before changing filter:', filters);
        dispatch(setFilter(category, value));
        setTimeout(() => console.log('After changing filter:', filters), 500);
    };

    const handleOptionClick = (category, item) => {
        handleFilterChange(category, item.name);
    };

    const handleSizeTypeChange = (sizeType) => {

        dispatch(setFilter('SizeType', sizeType));
    };

    const handleColorChange = (color) => {
        dispatch(setFilter('Colour', color));
    };

    const getFilteredSizes = () => {
        if (!filters.SizeType||filters.SizeType.length ===0) return filterData.Size;
        console.log("hello???????")

        const sizeMapping = {
            'Plus Size': ['16', '18', '20'],
            'Tall': ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '28', '29', '30', '31', '32', '33', '34', '35', '36', '38', '40', '42', '44', '46', 'XS', 'S', 'M', 'L', 'XL'],
            'Short': ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '28', '29', '30', '31', '32', '33', '34', '35', '36', '38', '40', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
        };

        return filterData.Size.filter(size => {
            let isChecked = false
            filters.SizeType.forEach((type)=>(isChecked = isChecked||(sizeMapping[type].includes(size.name))))

            return isChecked
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const maxVisibleOptions = 5;

    const getFilteredData = () => {
        return Object.keys(filters).reduce((filtered, category) => {
            if (filters[category]?.length > 0) {
                filtered[category] = filterData[category]?.filter(item =>
                    filters[category].includes(item.name || item.alt)
                ) || [];
            } else {
                filtered[category] = filterData[category] || [];
            }
            return filtered;
        }, {});
    };

    const filteredData = getFilteredData();

    return (
        <div className="filter-container lulu-filter" style = {productLoading?{backgroundColor: "#fafafa",color:"lightgray"}:null}>
            <h1 className="lulu-heading">What's New</h1>
            {Object.keys(filterData).map((category) => (
                <div key={category} className="filter-category lulu-category">
                    <div className="filter-header lulu-header" onClick={() => toggleSection(category)}>
                        <h2 className="lulu-category-name">{category}</h2>
                        <span className="lulu-toggle-icon">{collapsedSections[category] ? '+' : '-'}</span>
                    </div>
                    {!collapsedSections[category] && (
                        <div className="filter-options lulu-options">
                            {Array.isArray(filterData[category]) &&
                                (category === 'Size' ? getFilteredSizes() : filterData[category])
                                    .slice(0, showMore[category] ? filterData[category].length : maxVisibleOptions)
                                    .map((item) => (
                                        <div key={item.name || item.alt} className={`filter-option lulu-option ${category === 'Size' ? 'size-option lulu-size-option' : ''} ${item.isChecked ? 'selected lulu-selected' : ''}`}>
                                            {category === 'Colour' ? (
                                                <div className={`color-option lulu-color-option ${filters['Colour']?.includes(item.alt) ? 'selected lulu-color-selected' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        id={`${category}-${item.alt}`}
                                                        checked={filters['Colour']?.includes(item.alt) || false}
                                                        onChange={() => productLoading?null:handleColorChange(item.alt)}
                                                    />
                                                    <label htmlFor={`${category}-${item.alt}`} className="lulu-color-label">
                                                        <img src={item.swatch} alt={item.alt} title={item.alt} className="lulu-color-swatch" />
                                                        <span className="lulu-color-name">{item.alt}</span>
                                                    </label>
                                                </div>
                                            ) : category === 'SizeType' ? (
                                                <div className="size-type-option lulu-size-type-option">
                                                    <input
                                                        type="checkbox"
                                                        id={`${category}-${item.name}`}
                                                        checked={filters['SizeType'] && filters['SizeType'].includes(item.name)}
                                                        onChange={() => productLoading?null:handleSizeTypeChange(item.name)}
                                                    />
                                                    <label htmlFor={`${category}-${item.name}`} className="lulu-size-type-label">{item.name}</label>
                                                </div>
                                            ) : category === 'Size' ? (
                                                <div
                                                    className={`size-block lulu-size-block ${item.isChecked ? 'selected lulu-size-selected' : ''}`}
                                                    onClick={() => productLoading?null:handleOptionClick(category, item)}
                                                >
                                                    {item.name}
                                                </div>
                                            ) : (
                                                <div className="checkbox-option lulu-checkbox-option">
                                                    <input
                                                        type="checkbox"
                                                        id={`${category}-${item.name}`}
                                                        checked={filters[category]?.includes(item.name) || false}
                                                        onChange={() => productLoading?null:handleOptionClick(category, item)}
                                                    />
                                                    <label htmlFor={`${category}-${item.name}`} className="lulu-checkbox-label">{item.name}</label>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            {filterData[category].length > maxVisibleOptions && (
                                <div className="show-more lulu-show-more" onClick={() => toggleShowMore(category)} style = {productLoading?{color:"lightgray"}:null}>
                                    {showMore[category] ? 'View Less -' : 'View More +'}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
            {/*<button className="lulu-clear-filters" onClick={() => dispatch(clearFilter())}>Clear Filters</button>*/}
            {/*<h2 className="lulu-filtered-products">Filtered Products</h2>*/}
            {/* Render the filtered products here */}
        </div>
    );
};

export const Filter = () => (
    // <Provider store={store}>
    <FilterComponent />
    // </Provider>
);

export default FilterComponent;
