import {useState} from "react";
import './DetailPanel.scss'

const DetailPanel = ({productDetails, activeIndex, panelRefs}) => {

    const [expandedPanelIndex, setExpandedPanelIndex] = useState(null);

    const togglePanel = (index) => {
        setExpandedPanelIndex((prevIndex) => (prevIndex === index ? null : index));
    };


    const cleanTitle = (title) => {
        return title.replace(/\(Click to Expand\)/g, "").trim();
    };


    return (
        <div className="detailPanel">
            <div className="mainDetailContainer">
                {productDetails?.featurePanels?.map((row, index) => (
                    <div className="rowDetailPanel"
                         key={index}
                         ref={el => panelRefs.current[index] = el}
                    >
                        <div className="rowDetailWrapper">
                            <span className="detailHeading">
                                <img className="iconPanel" src={row.iconPath} alt=""/>
                                <span className="descriptionPanel">{cleanTitle(row.title)}
                                </span>
                                {row.isPanel &&
                                    <>
                                        <div className="expandButton" onClick={() => togglePanel(index)}>
                                            {(expandedPanelIndex === index || activeIndex === index) ? (
                                                    <div className="SVGExpand">
                                                        <svg height="24" width="24" viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             className="accordionItemToggleIcon" focusable="false"
                                                             role="presentation" aria-hidden="true">
                                                            <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z"
                                                                  stroke="currentColor"
                                                                  xmlns="http://www.w3.org/2000/svg"></path>
                                                        </svg>
                                                        <svg height="24" width="24" viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             className="accordionItemToggleIcon" focusable="false"
                                                             role="presentation" aria-hidden="true">
                                                            <path d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z"
                                                                  stroke="currentColor"
                                                                  xmlns="http://www.w3.org/2000/svg"></path>
                                                        </svg>
                                                    </div>)
                                                : (
                                                    <div className="SVGClosed">
                                                        <svg height="24" width="24" viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             className="accordionItemToggleIcon" focusable="false"
                                                             role="presentation" aria-hidden="true">
                                                            <path
                                                                d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z"
                                                                stroke="currentColor"
                                                                xmlns="http://www.w3.org/2000/svg"></path>
                                                        </svg>
                                                        <svg height="24" width="24" viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             className="accordionItemToggleIcon" focusable="false"
                                                             role="presentation" aria-hidden="true">
                                                            <path
                                                                d="M21.39 12.75a1 1 0 0 0 1-1v-.5h-19a1 1 0 0 0-1 1v.5Z"
                                                                stroke="currentColor"
                                                                xmlns="http://www.w3.org/2000/svg"></path>
                                                        </svg>


                                                    </div>


                                                )
                                            }

                                        </div>


                                    </>}

                            </span>

                        </div>

                        {(activeIndex === index || expandedPanelIndex === index) && (
                            <div className="expandedContentPanel">
                                <div className="itemPanelContent">
                                    <div className="contentPanelWrapper">
                                        <ul className="productAttributes">
                                            {row?.content?.map((item, index) => (
                                                <li className="productAttributesItem" key={index}>
                                                    <span className="productAttributesItemFlex">
                                                          {item}
                                                    </span>

                                                </li>
                                            ))}
                                        </ul>



                                    </div>


                                </div>



                            </div>

                        )}


                    </div>


                ))}
            </div>
        </div>
    );
};
export default DetailPanel;