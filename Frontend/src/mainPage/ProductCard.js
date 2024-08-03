import './ProductCard.scss'
import {icons} from '../assets/icons'
import {useState} from "react";

export const ProductCard = ({images, index, name, price, colorSets, onClick}) => {

    // number of images url
    const numSplit = 2
    // number of colors in each line
    const numGroup = 7
    // wide of the slider in order to change x-axis
    const SlideWide = 252
    // to round up number in order to know how many color groups
    const totalColorGroups = Math.ceil(colorSets.length / numGroup)

    // states for color group slide
    const [currentColorGroup, setCurrentColorGroup] = useState(1)
    const [SlideColorStyle, setSlideColorStyle] = useState('translateX(0px)')
    const [SlideColorStyleNum, setSlideColorStyleNum] = useState(0)
    // states for color selected
    const [colorIndex, setColorIndex] = useState(0)
    const [isImgHover, setIsImgHover] = useState(0)
    // states for favorite and compare Btns
    const [isFav, setIsFav] = useState(false)
    const [isCompare, setIsCompare] = useState(false)


    // callback function for color group slides to next group
    function cbNextGroup() {
        if (currentColorGroup < totalColorGroups) {
            const position = SlideColorStyleNum - (SlideWide)
            setCurrentColorGroup(currentColorGroup + 1)
            setSlideColorStyleNum(position)
            setSlideColorStyle(`translateX(${position}px)`)
            // console.log('Color clicked Next')
        }
    }
    // callback function for color group slide to the previous group
    function cbPrevGroup() {
        if (currentColorGroup > 1){
            const position = SlideColorStyleNum + (SlideWide)
            setCurrentColorGroup(currentColorGroup - 1)
            setSlideColorStyleNum(position)
            setSlideColorStyle(`translateX(${position}px)`)
            // console.log('Color clicked Prev')
        }
    }


    return <div className="productCardContainers" >

        {/*Product Image Section*/}
        <div className="productCardImageContainer">
            {
                images &&
                <img className="productCardImage"
                     src={images[colorIndex].mainCarousel?.media?.split('|', numSplit)[isImgHover]}
                     alt={images[colorIndex].mainCarousel?.alt}
                     key={index}
                     onMouseEnter={() => setIsImgHover(1)}
                     onMouseLeave={() => setIsImgHover(0)}
                     onClick={onClick}
                />
            }
            <button className="productCardFav" onClick={() => setIsFav(!isFav)}>
                    {
                        isFav ? <icons.FavoriteOutlinedIcon id='AddedFav'/> :
                            <icons.FavoriteBorderOutlinedIcon id='FavBtn'/>
                    }
            </button>
        </div>

        {/*Product Information Section*/}
        <div className="productCardSecondContent">

            {/*Product Color Select Bar*/}
            <div className='productCardColorSelect'>

                {/*if nums of colors are less than 7, don't need carousel*/}
                {
                    colorSets && colorSets.length <= numGroup &&
                    <div className='productCardColorItems'>
                        {colorSets.map((color, index) => (
                            <div
                                className={`productCardColorBorder 
                                ${index === colorIndex && 'productCardColorItemSelect'}`
                            }>
                                <img src={color.swatch}
                                     key={index}
                                     alt={color.swatchAlt}
                                     className={`productCardColorItem`}
                                     onMouseEnter={() => setColorIndex(index)}
                                />
                            </div>
                        ))}
                    </div>
                }

                {/*if nums of colors are over 7, need carousel*/}
                {
                    colorSets && colorSets.length > numGroup && (
                        <div className='productCardColorCarousel'>
                            {/*logic for Prev Nav Arrow*/}
                            {
                                currentColorGroup > 1 ?
                                    (<button className="productCardColorPrev"
                                             onClick={cbPrevGroup}
                                    >
                                        <icons.ArrowBackIosOutlinedIcon/>
                                    </button>)
                                    :
                                    (<button className="productCardColorPrev">
                                        <icons.PrevArrowGrey/>
                                    </button>)
                            }
                            <div className={`productCardColorMoreItems`}>
                                {colorSets.map((color, index) => (
                                    <div
                                        className={`productCardColorBorder 
                                        ${
                                            currentColorGroup === 1 &&
                                            index === colorIndex && 'productCardColorItemSelect'
                                        }
                                        ${
                                            currentColorGroup > 1 &&
                                            // f(i,j)=7i+j 
                                            (numGroup*(currentColorGroup-1)+index) === colorIndex && 'productCardColorItemSelect'
                                        }
                                        `}>
                                        <img src={color.swatch}
                                             key={index}
                                             alt={color.swatchAlt}
                                             className={`productCardColorItem`}
                                             style={{transform: `${SlideColorStyle}`, transitionDuration: '500ms'}}
                                             onMouseEnter={() => setColorIndex(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/*logic for Next Nav Arrow*/}
                            {
                                currentColorGroup < totalColorGroups ?
                                    (<button className="productCardColorNext"
                                             onClick={cbNextGroup}
                                    >
                                        <icons.ArrowForwardIosOutlinedIcon/>
                                    </button>)
                                    :
                                    (<button className="productCardColorNext">
                                        <icons.NextArrayGrey/>
                                    </button>)
                            }
                        </div>
                    )}
            </div>

            {/*Product Name & Price*/}
            <div className='productCardContent'>
                <span className='productCardName'>{name}</span>
                <span className='productCardPrice'>{price}</span>
            </div>

            {/*Product Compare*/}
            <button className='productCardCompare' onClick={() => setIsCompare(!isCompare)}>
                {
                    isCompare ?
                        <>
                            <icons.CheckBoxOutlinedIcon fontSize="small"/>
                            <span className='productCartCompare'>Compare</span>
                        </>
                        :
                        <>
                            <icons.CheckBoxOutlineBlankOutlinedIcon id='checkBox' fontSize="small"/>
                            <icons.CheckBoxOutlinedIcon id='checkOutBox' fontSize="small"/>
                            <span className='productCartCompare'>Compare</span>
                        </>
                }
            </button>
        </div>
    </div>
}
