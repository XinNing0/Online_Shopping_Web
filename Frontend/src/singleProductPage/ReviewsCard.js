import './ReviewsCard.scss'
import {icons} from "../assets/icons";
import {fits} from "../helper/reviewsData";

export const ReviewsCard = ({review}) => {

    const today = new Date();
    const date = new Date(review.date)
    // to calculate tune difference
    const timeDifference = today.getTime() - date.getTime()
    // to calculate tune difference
    const hoursDifference = Math.round(timeDifference / (1000 * 60 * 60))
    const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24))   // by dividing total milliseconds in a day
    const yearsDifference = Math.round(today.getFullYear() - date.getFullYear())

    const handleDateDifference = () => {
        if (hoursDifference < 2) {
            return `${hoursDifference} hour ago`
        } else if (hoursDifference < 24) {
            return `${hoursDifference} hours ago`
        } else if (daysDifference < 2) {
            return `${daysDifference} day ago`
        } else if (daysDifference < 365) {
            return `${daysDifference} days ago`
        } else if (yearsDifference < 2) {
            return `${yearsDifference} year ago`
        } else {
            return `${yearsDifference} years ago`
        }
    }

    return <div className="reviewsCard">

        {/*Person who provides a review*/}
        <div className="reviewsCardPerson">
            <div className='reviewsCardLogo'><p>{review.name.slice(0,1).toUpperCase()}</p></div>
            <p className='reviewsCardName'>{review.name}</p>
            <p className='reviewsCardTime'>
                {handleDateDifference()}
            </p>
        </div>

        {/*Rating*/}
        <div className='reviewsCardRatingStars'>
            <p>
                {Array.from({length: 5}, (_, i) =>
                    review.rating >= i + 1 ? <icons.StarRoundedIcon style={{fontSize: '16px', margin: '0'}} />
                        : <icons.StarOutlineRoundedIcon style={{fontSize: '16px', margin: '0'}}/>
                )}
            </p>
        </div>

        {/*info of review*/}
        <h3 className='reviewsCardContentsHeader'>{review.title}</h3>
        <div className='reviewsCardContentsText'>{review.review}</div>

        {/*part for Size and Fit*/}
        <div className="reviewsCardFitsInfo">
            {
                (review.size !== undefined && review.size !== null)
                    ? <div className='reviewsCardSizeFit'>Size Purchased:&nbsp;<p>{review.size}</p></div>
                    : <></>
            }
            {
                fits && fits.map((fit) =>
                    review.fit === fit.id
                        ? <div className='reviewsCardSizeFit'>Fits:&nbsp;<p>{fit.fit}</p></div>
                        : <></>
            )}
        </div>

        {/*part for replying reviews*/}
        <div className="reviewsCardReply">
            <div className='reviewsCardAgree'>
                <icons.ThumbUpOffAltIcon/>
                <p>{review.helpful !== 0 && review.helpful}</p>
            </div>
            <div className='reviewsCardQuestion'>
                <icons.QuestionAnswerIcon/>
                <p>Leave a comment</p>
            </div>
        </div>
    </div>
}