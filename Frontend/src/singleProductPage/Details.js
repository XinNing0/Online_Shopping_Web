import {stringify} from "qs";
import {useSelector} from "react-redux";

import './Details.scss'
import {useState} from "react";
export const Details = ({productDetails, toggleDetail}) => {


        return (
            <div className = "productDetailContainer">
                <p className = "detailHeaderContainer">
                    Details
                </p>
                <div className ="detailContainer">
                    {productDetails?.featureTitles?.map((row, index) => (
                        <div className = "rowDetail" key={index}>
                            <img className = "iconContainer" src={row.iconPath} alt=""/>
                            <button className = "descriptionContainer"
                                    onClick={() => toggleDetail(index)}>
                                {row.title}
                            </button>
                        </div>

                    ))}
                </div>
            </div>
        )
    //
    // console.log(
    //     JSON.stringify(productDetails.featureTitles)
    //
    // )

}

export default Details;