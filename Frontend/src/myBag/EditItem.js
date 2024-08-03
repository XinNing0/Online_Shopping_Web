import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {editItem} from "../actions/addToBagAction";
import "./EditItem.scss"
import {zoomInProduct} from "../actions/fetchOneProductAction";
import {icons} from "../assets/icons";
import {useNavigate} from "react-router-dom";

export const EditItem = ({item, index, onClose}) => {
    const dispatch = useDispatch();
    let colorIndex

    item.productDetail.swatches.forEach((color,index)=>{
        if (color.colorId === item.color.colorId){
            colorIndex = index
        }
    })
    console.log("colorIndex",colorIndex)
    const navigate = useNavigate()

    const [selectColor, setSelectColor] = useState(colorIndex);
    const [selectSize, setSelectSize] = useState(item.size);
    // const images = item.productDetail.images[colorIndex].mainCarousel.media.split('|')
    // console.log(images)
    const [images,setImages] = useState(item.productDetail.images[colorIndex].mainCarousel.media.split('|'))
    const SlideWide = 548
    const [SlideImageStyle, setSlideImageStyle] = useState(`translateX(0px)`)
    const [SlideImageStyleNum, setSlideImageStyleNum] = useState(0)
    const [imageIndex, setImageIndex] = useState(0)
    const colorSet = item.productDetail.swatches
    const SizeSet = item.productDetail.sizes[0].details
    useEffect(()=>{
        setImages(item.productDetail.images[selectColor].mainCarousel.media.split('|'))
        setTimeout(()=>{        setSlideImageStyle(`translateX(0px)`)
            setSlideImageStyleNum(0)
            setImageIndex(0)},80)

    },[selectColor])

    function cbNextImage() {

        const position = SlideImageStyleNum - (SlideWide)

        setSlideImageStyleNum(position)
        setSlideImageStyle(`translateX(${position}px)`)

        setImageIndex((prev)=>{

                return prev+1
        })

        // console.log('Color clicked Next')
    }
    // callback function for color group slide to the previous group
    function cbPrevImage() {
        const position = SlideImageStyleNum + (SlideWide)

        setSlideImageStyleNum(position)
        setSlideImageStyle(`translateX(${position}px)`)

        setImageIndex((prev)=>{

                return prev -1

        })
        // console.log('Color clicked Prev')

    }


    function handleSubmit(e) {
        // disable default of the page to load of html
        e.preventDefault();
        dispatch(editItem(item.index, item.productId, colorSet[selectColor], selectSize));
        onClose()
    }

    console.log('item', item)

    return (<form className = "editContainer"
                 onSubmit={handleSubmit}>
        <div className = "editCarouselImage">

            <div className="editImageContainer" >



                {
                    images.map((image,index)=>{

                        return (
                            <img className="editImage"
                                 src={image}
                                 style={{transform: `${SlideImageStyle}`, transitionDuration: `500ms`}}
                                // alt={product.images[colorIndex].mainCarousel?.alt}
                                 key={index}
                                // onMouseEnter={() => setIsImgHover(1)}
                                // onMouseLeave={() => setIsImgHover(0)}
                            />
                        )
                    })

                }



            </div>
            {imageIndex!==0 && <button className="editImagePrev"
                    onClick={cbPrevImage}
            >
                <icons.ArrowBackIosOutlinedIcon  fontSize="small"/>
            </button>}
            {imageIndex !== images.length-1 && <button className="editImageNext"
                    onClick={cbNextImage}
            >
                <icons.ArrowForwardIosOutlinedIcon  fontSize="small"/>
            </button>}
        </div>
        <div className="editInfo">
            <div className="editProductName">{item.productDetail.name}</div>
            <div className="editPrice">{item.productDetail.price}</div>
            <div className="editColorAlt">Colour: {item.productDetail.swatches[selectColor].swatchAlt}</div>


        <p className="editColor">{colorSet.map((color, index) =>
            <div type='button'
                 className={`editColorBorder
                                         ${
                     index === selectColor && 'editColorItemSelect'
                 }`}
                    key={index}
                    value={color.colorId}
                    onClick={() => {setSelectColor(index)

                        // console.log(color)
                    }}>
                <img
                    className="editColorItem"
                     src={color.swatch}
                     alt={color.swatchAlt}
                />
            </div>)}</p>
        <p>Size: {selectSize}</p>
        <p className="editSizeItems">{SizeSet.map((size, index) =>
            <button type='button'  key={index}
                    className="editSizeButton"
                    value={size}
                    style ={size === selectSize?{backgroundColor:"black",color:"white"}:null}
                    onClick={() => {setSelectSize(size)

                        // console.log(size)
                    }}>
                {size}
            </button>
        )}</p>

        <button type='submit' className="editUpdateButton"
                // onClick={ ()=>{
            // dispatch(editItem(item.index, item.productId, colorSet[selectColor], selectSize));
            // onClose()}}
        >UPDATE ITEM</button>
            <div className="editProductDetails" onClick={()=> navigate(`/single-product/${item.productDetail.productId}`)}>View product details</div>
        </div>
    </form>)
}