import './Reviews.scss'
import {icons} from "../assets/icons";
import {fits, ratingStarts, reviewsData, sort} from '../helper/reviewsData'
import {ReviewsCard} from "./ReviewsCard";
import {useEffect, useState} from "react";

export const Reviews = () => {

    let updateReviews = [...reviewsData].sort((a,b) => b.id -a.id)

    const [sortBy, setSortBy] = useState('Most Recent')
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reviews, setReviews] = useState(updateReviews)
    const [checkedRating, setCheckedRating] = useState({
        5: false,
        4: false,
        3: false,
        2: false,
        1: false,
        0: false,  // for photos
    })

    // to add new page while retaining the previous loading page
    const [currentPage, setCurrentPage] = useState(1)
    // num of reviews show up each time---> set up 16 reviews by default
    const [currentReviewsNum, setCurrentReviewsNum] = useState(16)
    // to split reviews into multiple pages
    const numOfReviews = 16;
    let splitReviews = reviews.slice(0, currentReviewsNum)

    // to fetch reviews based on sortBy or star rating filter
    useEffect(() => {
        // Sorting logic
        switch (sortBy) {
            case 'Most Helpful':
                updateReviews = updateReviews.sort((a,b) => b.helpful - a.helpful);
                break;
            case 'Lowest to Highest Rating':
                updateReviews = updateReviews.sort((a, b) => a.rating - b.rating);
                break;
            case 'Highest to Lowest Rating':
                updateReviews = updateReviews.sort((a, b) => b.rating - a.rating);
                break;
            case 'Most Recent':
            default:
                updateReviews = updateReviews.sort((a, b) => b.id - a.id);
                break
        }

        // Filter logic based on checked ratings
        const selectedRatings = Object.keys(checkedRating).filter(rating => checkedRating[rating]);
        if (selectedRatings.length > 0 && checkedRating[0] === false) {
            updateReviews = updateReviews.filter(review => selectedRatings.includes(String(review.rating)))
        }
        else if (selectedRatings.length > 0 && checkedRating[0] === true) {
            updateReviews = updateReviews.filter(review => selectedRatings.includes(String(review.photos)))
        }

        setReviews(updateReviews)
    }, [reviewsData, sortBy, checkedRating]);

    // callback function to filter reviews by stars rating
    const cbFilterRating = (rating) => {
        setCheckedRating(prev => ({ ...prev, [rating]: !prev[rating] }));
    }

    // to fetch the following page reviews
    function fetchNextPage() {
        if (currentReviewsNum < reviews.length) {
            const nextPage = currentPage + 1;
            const newNumReviews = currentReviewsNum + numOfReviews
            setCurrentPage(nextPage)
            setCurrentReviewsNum(newNumReviews)
            splitReviews = reviews.slice(currentReviewsNum, newNumReviews)
        }
    }


    return <div className="reviews">

        {/*Review Header*/}
        <div className="reviewsHeader">
            <h1>Reviews</h1>
            <div className="reviewsHeaderRating">
                <h3 className='reviewsHeaderRatingRate'>3.9
                    <p>
                        {Array.from({length: 5}, (_, i) =>
                            3 >= i + 1 ? <icons.StarRoundedIcon style={{fontSize: '16px', margin: '0'}} />
                                : <icons.StarOutlineRoundedIcon style={{fontSize: '16px', margin: '0'}} />
                        )}
                    </p>
                </h3>
                <p className='reviewsHeaderRatingContent'>Based on {reviewsData.length} Reviews</p>
            </div>
            <div className="reviewsHeaderFit">
                <h3>Fits true to size</h3>
                <div className="reviewsHeaderFitContainers" >
                    <p>Smaller</p>
                    <div className='reviewsHeaderFitInputContainer'>
                        {fits && fits.map((data) => (
                            <div className="reviewsHeaderInput" key={data.id}>
                                <input type="radio" id={data.id} name='reviewsFitRange'
                                       className="reviewsFitRangeInput"
                                       onChange={() => {}}
                                       checked={data.id === 3}
                                />
                                <span className='reviewsFitRangeLabel'>{data.fit}</span>
                            </div>
                        ))}
                    </div>
                    <p>Large</p>
                </div>
            </div>
            <div className="reviewsHeaderBtnContainer">
                <button className="reviewsHeaderBtn">WRITE A REVIEW</button>
            </div>
        </div>

        {/*Review Main Containers*/}
        <div className="reviewsContainers">

            {/*Review Filter Section*/}
            <div className="reviewsFilters">
                {/*1) Review Filter - Header*/}
                <div className="reviewsFiltersHeader">Filter Reviews</div>
                {/*2) Review Filter - Search*/}
                <div className="reviewsFiltersInputContainer">
                    <icons.SearchOutlinedIcon fontSize='inherit' style={{margin: '0'}}/>
                    <input type='text' placeholder='Search Reviews' className="reviewsFiltersInputBtn" />
                </div>

                {/*3 & 4 Review Filter - Rating & Photo*/}
                <div className="reviewsFiltersContainer">
                    {/*3) Review Filter - Rating*/}
                    <div className="reviewsFiltersRating">
                    <div className='reviewsFiltersRatingHeader'>Rating</div>
                        {
                            ratingStarts.length > 0 && ratingStarts.map((value, index) => (
                                <label className='reviewsFiltersRatingContainers' key={index}>
                                    <input type='checkbox' className='reviewsFiltersRatingInput'
                                           value={value}
                                           onChange={() => cbFilterRating(value)}
                                           checked={checkedRating[value]}   // checkedRating[value] === true
                                    />
                                    {value}{value > 1 ? ' starts' : ' start'}
                                    <p>{reviewsData.filter(data => data.rating === value).length}</p>
                                    <span className="reviewsFiltersRatingInputCheckmark"></span>
                                </label>
                            ))
                        }
                    </div>

                    {/*4) Review Filter - Photo*/}
                    <div className="reviewsFiltersRating" style={{borderBottom: 'none', margin: '0', padding: '0'}}>
                        <div className='reviewsFiltersRatingHeader'>Photos</div>
                        <div className="reviewsFiltersPhotosContainer">
                                <label className='reviewsFiltersRatingContainers'>
                                    <input type='checkbox' className='reviewsFiltersRatingInput'
                                           onChange={() => cbFilterRating(0)}
                                           checked={checkedRating[0]}   // checkedRating[value] === true
                                    />
                                    <p style={{margin: '0', color: 'black'}}>Only show posts with images</p>
                                    <span className="reviewsFiltersRatingInputCheckmark"></span>
                                </label>
                        </div>
                    </div>
                </div>
            </div>

            {/*Review Content Section*/}
            <div className="reviewsContentsContainers">

                {/*Review Contents Header*/}
                <div className="reviewsContentsInfo">
                    <div
                        className='reviewsContentsResults'>Showing {currentReviewsNum < reviews.length ? currentReviewsNum : reviews.length} of {reviews.length} results
                    </div>
                    <div className='reviewsContentsSort'>
                        <button className='reviewsSortSelect'
                                onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <span className='reviewsSortSelectValue'>Sort by:&nbsp; <strong>{sortBy}</strong></span>
                            <span className={`reviewsSortSelectArrow ${dropdownOpen ? 'active' : ''}`}></span>
                        </button>
                        <ul className={`reviewsSortSelectDropdown ${dropdownOpen ? 'active' : ''}`}>
                            {sort && sort.map((value) =>
                                <li role='option' key={value}>
                                    <input type="radio" id={value} name="sortByRange" value={value}
                                           onChange={(e) => {
                                               setSortBy(e.target.value);
                                               setDropdownOpen(!dropdownOpen)}}/>
                                    <label htmlFor={value}
                                           className={`reviewsSortOption ${sortBy === value ? 'textBold' : ''}`}
                                           style={value === 'Lowest to Highest Rating' ? {borderBottom: 'none'} : {}}
                                    >{value}
                                    </label>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/*Reviews List*/}
                {
                    splitReviews.map((review) => (
                        <ReviewsCard index={review.id} review={review} key={review.id}/>
                    ))
                }

                {/*loading part*/}
                {
                    currentReviewsNum < reviews.length &&
                    <button className="reviewsListLoadingBtn"
                            onClick={fetchNextPage}>
                        LOAD MORE REVIEWS
                    </button>
                }
                <div className='reviewsListViewingShowup'>
                    Viewing {currentReviewsNum < reviews.length ? currentReviewsNum : reviews.length} of {reviews.length}
                </div>
            </div>
        </div>
    </div>
}
