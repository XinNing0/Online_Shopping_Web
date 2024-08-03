import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchOneProduct, zoomInProduct} from "../actions/fetchOneProductAction";
import "./SingleCarousel.scss"
import {icons} from "../assets/icons";
import {useLocation} from "react-router-dom";
// import extractPrice from "../actions/mainPageAction";
import {extractPrice} from "../actions/mainPageAction";
import Details from "./Details";
import {YouMayLike} from "./YouMayLike";
import { addToBagAction } from '../actions/addToBagAction';
import RecentItemPopUpWindow from "./RecentItemPopUpWindow";

export const SingleCarousel = ({id, productDetails, toggleDetail})=>{
    // useEffect(() => {
    //     dispatch(fetchOneProduct(id))
    // }, []);
    const SlideWide = 649
    const product = useSelector(state=>state.fetchOneProductReducer.singleProduct)
    const loading = useSelector(state=>state.fetchOneProductReducer.loading)
    const [colorIndex, setColorIndex] = useState(-1)
    const [SlideImageStyle, setSlideImageStyle] = useState(`translateX(-${SlideWide}px)`)
    const [SlideImageStyleNum, setSlideImageStyleNum] = useState(-SlideWide)
    const [images,setImages] = useState([])
    const [menuImages,setMenuImages] = useState([])
    const [transitionTime,setTransitionTime] = useState(500)
    const viewZoomIn = useSelector(state=>state.fetchOneProductReducer.zoom)
    const [shipChecked,setShipChecked] = useState(true)//not reseted
    const [collapsed,setCollapsed] = useState(true)//not reseted
    const [isFav, setIsFav] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)
    const [colorClicked, setColorClicked] = useState(false)//not reseted
    const [sizeSelected, setSizeSelected] = useState(-1)
    const [showToolTip,setShowToolTip] = useState(false)
    const [isSizeSelected, setIsSizeSelected] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch();
    const [showPopUp, setShowPopUp] = useState(false);
    const [showMyBagLink, setShowMyBagLink] = React.useState(false);

    const addToBagCart = useSelector((state)=>state.addToBagReducer.bag)
    //console.log("addToBagCart", addToBagCart)
    //console.log(sizeSelected)

    const handleAddToBag = () => {
        if (isSizeSelected && sizeSelected !== -1) {
            dispatch(addToBagAction(product.productId, 1, product.swatches[colorIndex], sizeSelected, productDetails));
            setShowPopUp(true); //popup window show when item is added to cart
        }
        if (isSizeSelected && sizeSelected === -1) {
            dispatch(addToBagAction(product.productId, 1, product.swatches[colorIndex], 'One Size', productDetails));
            setShowPopUp(true); //popup window show when item is added to cart
        }
    };

    const handleClosePopUpWindow = () => {
        setShowPopUp(false);
    }

    // useEffect(()=> {
    //     setColorIndex(-1)
    //     setSlideImageStyle(`translateX(-${SlideWide}px)`)
    //     setSlideImageStyleNum(-SlideWide)
    //     setImages([])
    //     setMenuImages([])
    //     setTransitionTime(500)
    //     setIsFav(false)
    //     setImageIndex(0)
    //     setSizeSelected(-1)
    //     console.log(location)
    // },[location])
    // useEffect(()=>{
    //     return(setColorIndex(-1))
    // },[])
    // useEffect(() => {
    //     const unlisten = history.listen(() => {
    //         console.log("route changed!!");
    //         setColorIndex(-1)
    //         // apply business logic to set any component state
    //     });
    //     console.log("ModelFormsContainer mounted");
    //
    //     return unlisten;
    // }, []);
useEffect(()=>{
    if(!loading){
        //change time? TODO
       setTimeout(()=>{ setColorIndex(0)},1000)


        console.log("set color index to zero")
    }
},[loading])
    useEffect(()=>{
        let position
        setTimeout(()=>{ if (SlideImageStyleNum===0){
            position = -SlideWide * (images.length-2)
            setSlideImageStyleNum(position)
            setSlideImageStyle(`translateX(${position}px)`)
            setTransitionTime(0)
        } else if (SlideImageStyleNum===-SlideWide*(images.length-1)){
           position = -SlideWide
            setSlideImageStyleNum(position)
            setSlideImageStyle(`translateX(${position}px)`)
            setTransitionTime(0)

        }

        },500)
    },[SlideImageStyleNum])

    useEffect(()=>{
       if (product.images && colorIndex!==-1) {
           console.log(colorIndex)
           let nonExtendedImages = product.images[colorIndex].mainCarousel?.media?.split('|')
           setMenuImages(nonExtendedImages)
           let extended = [...nonExtendedImages]
           extended.unshift(extended[extended.length-1])
           extended.push(extended[1])

           setImages(extended)
           setSlideImageStyleNum(-SlideWide)
           setSlideImageStyle(`translateX(-${SlideWide}px)`)
       }





    },[colorIndex])



    function cbNextImage() {

            const position = SlideImageStyleNum - (SlideWide)

            setSlideImageStyleNum(position)
            setSlideImageStyle(`translateX(${position}px)`)
        setTransitionTime(500)
        setImageIndex((prev)=>{
            if (prev ===menuImages.length-1 ){
                return 0
            }else{
                return prev+1
            }
        })
        console.log()
            // console.log('Color clicked Next')
    }
    // callback function for color group slide to the previous group
    function cbPrevImage() {
        const position = SlideImageStyleNum + (SlideWide)

        setSlideImageStyleNum(position)
        setSlideImageStyle(`translateX(${position}px)`)
        setTransitionTime(500)
        setImageIndex((prev)=>{
            if (prev === 0){
                return menuImages.length-1
            }else{
                return prev -1
            }
        })
            // console.log('Color clicked Prev')

    }
    return( <div className='SingleProductContainers'>

        <div className="singleProductImageAndInfo">
            {viewZoomIn && <div className="singleProductZoomIn" >
               <div className = "singleProductZoomInMenu">
                   <div className = "singleProductZoomBack" onClick={()=> dispatch(zoomInProduct(false))}><icons.ArrowBackIosOutlinedIcon/>
                       <div>Back to Product</div></div>

                   <div className="singleProductZoomName">{product.name}</div>
                   <div onClick={()=> dispatch(zoomInProduct(false))}
                   className="singleProductZoomCloseIcon">
                       <icons.CloseIcon/>
                       </div>
               </div>
                <div className = "singleProductZoomInPicture">
                {menuImages.map((image,index)=>{
                    return (
                        <img className="singleProductMenuItem"
                             src={image}


                            // alt={product.images[colorIndex].mainCarousel?.alt}
                             key={index}
                            // onMouseEnter={() => setIsImgHover(1)}
                            // onMouseLeave={() => setIsImgHover(0)}
                        />
                    )
                })}
            </div>
            </div>}
            {!viewZoomIn && <div className = "singleProductCarousel">


            <div className = "singleProductCarouselImage">

            <div className="singleProductImageContainer" onClick={()=>{
               dispatch(zoomInProduct(true))

            }}>



                {!loading &&


                    images.map((image,index)=>{

                        return (
                            <img className="singleProductImage"
                                 src={image}
                                 style={{transform: `${SlideImageStyle}`, transitionDuration: `${transitionTime}ms`}}
                                 // alt={product.images[colorIndex].mainCarousel?.alt}
                                 key={index}
                                // onMouseEnter={() => setIsImgHover(1)}
                                // onMouseLeave={() => setIsImgHover(0)}
                            />
                        )
                    })

                }



            </div>
                <button className="singleProductImagePrev"
                        onClick={cbPrevImage}
                >
                    <icons.ArrowBackIosOutlinedIcon  fontSize="small"/>
                </button>
            <button className="singleProductImageNext"
                    onClick={cbNextImage}
            >
                <icons.ArrowForwardIosOutlinedIcon  fontSize="small"/>
            </button>
                <button className="singleProductFav" onClick={() => setIsFav(!isFav)}>
                    {
                        isFav ? <icons.FavoriteOutlinedIcon id='AddedFav' fontSize="large"/> :

                            <icons.FavoriteBorderOutlinedIcon id='FavBtn'  fontSize="large"/>
                    }
                </button>
                <button className="singleProductZoomIcon">
                    <icons.ZoomInRoundedIcon/>
                </button>

            </div>
                <div className="singleProductCarouseMenu">
                    {menuImages.map((image,index)=>{
                        return (
                            <img className="singleProductMenuItem"
                                 src={image}
                                 onClick={()=>{
                                     let position = -(index+1) * SlideWide
                                     setSlideImageStyleNum(position)
                                     setSlideImageStyle(`translateX(${position}px)`)
                                     setImageIndex(index)
                                 }
                            }
                                 style={imageIndex === index? {borderBottom:"2px solid black"}: null}

                                // alt={product.images[colorIndex].mainCarousel?.alt}
                                 key={index}
                                // onMouseEnter={() => setIsImgHover(1)}
                                // onMouseLeave={() => setIsImgHover(0)}
                            />
                        )
                    })}
                </div>

            </div>}


            {!viewZoomIn && <div className={`singleProductInfo`}>
                <div className="topLinkContainer">
                    <div className="womenLink">Women's Clothes</div>
                    <div className="slashLink">/</div>
                    <div className="skirtLink">Skirts</div>
                </div>
                <div className="singleProductName">
                    {!loading && product.name}
                </div>
                <div className="singleProductPrice">
                    {!loading && product.price.slice(0,-3)}
                    <div>CAD</div>
                </div>

                <div className="singleProductColorDescription">
                    {/*// colorClicked?*/}
                    {/*    // <div>Colour</div>:<div>Colours</div>}*/}
                        Colour <div>{!loading && product.swatches[colorIndex]?.swatchAlt}</div>
                        {/*// <div>Colours</div>*/}
                </div>
                <div className={`singleProductColor`}>

        {!loading && product.swatches.map((color, index) => (
            <div
                className={`singleProductColorBorder
                                         ${
                     index === colorIndex && 'productCardColorItemSelect'
                 }`}>
                {/*//                         ${*/}
                {/*//     currentColorGroup > 1 &&*/}
                {/*//     // f(i,j)=7i+j */}
                {/*//     (numGroup*(currentColorGroup-1)+index) === colorIndex && 'productCardColorItemSelect'*/}
                {/*// }*/}

                <img src={color.swatch}
                     key={index}
                     alt={color.swatchAlt}
                     className={`singleProductColorItem`}
                     // style={{transform: `${SlideColorStyle}`, transitionDuration: '500ms'}}
                    onMouseEnter={()=>setColorIndex(index)}
                     onClick={() => {
                         setColorIndex(index);
                         console.log('color index', colorIndex)
                         // setColorClicked(true)
                     }
                     }
                />
            </div>
        ))}

    </div>
                {!collapsed && sizeSelected ===-1 &&<div className="singleProductSizeNotSelectedError">
                    <icons.ErrorOutlineIcon fontSize="large" sx={{color:"#d20014"}}/>
                    <div>Please select a size</div>
                </div>}
                {/*<div className="singleProductSizeNotSelectedError">*/}
                {/*    <icons.ErrorOutlineIcon fontSize="large" sx={{color:"#d20014"}}/>*/}
                {/*    <div>Please select a size</div>*/}
                {/*</div>*/}
                <div className="singleProductSizeContainer">
                    <div className="singleProductSizeMenu">
                        <div>{sizeSelected===-1?<div>Select Size</div>:<div id="singleProductSizeSelected">Size <div>{sizeSelected}</div></div>} </div>
                        <div className="singleProductSizeGuide">Size Guide</div>
                    </div>
                    <div className="singleProductSizeItems">
                        {!loading && product.sizes[0].details.length > 0 &&
                            product.sizes[0].details.map((size, index) => (<button className="singleProductSizeButton"
                            key = {index} onClick={()=> {setIsSizeSelected(true); setSizeSelected(size)}} style ={size === sizeSelected?{backgroundColor:"black",color:"white"}:null}>
                            {size}
                        </button>))}
                        {!loading && product.sizes[0].details.length === 0 &&
                            (<button className="singleProductSizeButton"
                            onClick={()=> setIsSizeSelected(true)} style ={isSizeSelected ? {backgroundColor:"black",color:"white"}:null}>
                                {'One Size'}
                        </button>)}
                    </div>
                </div>
                <div className="singleProductAddBag">

                    <div className="singleProductShip">

                        <div className="singleProductShipIcon">
                            {shipChecked?<icons.RadioButtonCheckedIcon sx={{color:"#d20014"}}/>:<icons.RadioButtonUncheckedIcon  onClick={()=>{setShipChecked(true)}}/>}</div>
                        <div className="singleProductShipText">
                            <div>Ship it to me</div>
                            Free Shipping and Returns
                        </div>


                    </div>
                    <div className="singleProductPickUp">
                        <div className= "singleProductPickUpMenu">

                        <icons.StoreIcon id = "singleProductStoreIcon"/>
                        <div>Pick up in store</div>
                        <span className="singleProductPickUpIcon"
                        onClick={()=>setCollapsed(!collapsed)}>{collapsed ? '+' : '-'}</span>

                        </div>
                        {!collapsed && sizeSelected ===-1 && <div className="singleProductSizeNotSelected">Please select a size to see product availability at a store near you.</div>}
                        {!collapsed && sizeSelected !== -1 &&
                        <div>

                                <div className="singleProductPickupInformationAvailable">
                                    Available for Buy & Pick-Up at these locations in
                                </div>
                                <div className="singleProductPickupInformation singleProductPickUpLocation">
                                Jersey City, New Jersey <div>Change Locations</div>
                                </div>
                                <div className="singleProductPickupInformation">
                                Pick up in-store within 2 hours.
                                </div>
                                <div className="singleProductPickUpOptionBox">

                                <div className="singleProductPickUpOptionIcon">
                            {!shipChecked?<icons.RadioButtonCheckedIcon sx={{color:"#d20014"}}/>:<div
                                onClick={()=>{setShipChecked(false);console.log("setShipChecked toFAlse")}}>
                                <icons.RadioButtonUncheckedIcon
                                /></div>}</div>
                                <div className="singleProductPickUpText">
                                <div>The Shoppes at DePiero Farm (22.1 miles)</div>
                                1 item available in size {sizeSelected}
                                </div>


                                </div>
                        </div>}
                    </div>
                    <div className = "singleProductAddBagButtonContainer">
                        <button onClick={handleAddToBag}>ADD TO BAG</button>
                        {sizeSelected!==-1 && <div>Check All Store Inventory</div>}
                    </div>
                    <div className = "popUpWindowContainer">
                        <RecentItemPopUpWindow show={showPopUp} onClose={setShowPopUp} productDetails={productDetails} colorIndex={colorIndex} link={setShowMyBagLink}/>
                    </div>

                </div>
                <div className="singleProductPaymentMethod">
                    {!loading && product.price &&<div>4 payments of ${extractPrice(product.price.split("-")[0])/4} available with AfterPay or Klarna</div>}
                    <icons.ErrorOutlineIcon fontSize={"small"} onClick={()=>{setShowToolTip((prev)=>!prev)}}/>
                    {showToolTip && <div className="singleProductPaymentTooltip">
                        Buy items now and pay later - in 4 payments, with no additional fees when you pay on time. Learn more
                    </div>}
                </div>

                <div className="singleProductInfoHeader">
                    <div>
                        <icons.FavoriteBorderOutlinedIcon id='FavBtn'/>
                        <div>Add to Wish List</div>
                    </div>
                    <div>
                        <icons.StarBorderRoundedIcon id = 'StarBtn'/>
                        <div>Reviews (36)</div>
                    </div>

                </div>
                <Details productDetails = {productDetails} toggleDetail = {toggleDetail} />
            </div>}

        </div>

        {!viewZoomIn && <YouMayLike />}
            {!viewZoomIn && showMyBagLink && (
                <div className="myBagLinkContent">
                    {/*<a href="/cart"></a>*/}
                    <p className='popUpShoppingCartLine'>http://localhost:3000/cart</p>
                </div>
            )}
        </div>
        )

}