import React, { useState, useEffect, useRef } from 'react';
import './CustomSelect.scss';

export const CustomSelect = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-select-container" ref={selectRef}>
            <div className={`selected-value ${isOpen ? 'shadow' : ''}`} onClick={toggleDropdown}>
                {value}
                <span
                    className="arrow"
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(90deg)',
                        margin: '0px',
                        paddingBottom: '3px',

                    }}
                >
                    {isOpen ? 'v' : '>'}
                </span>
            </div>
            {isOpen && (
                <ul className={`options-list ${isOpen ? 'shadow' : ''}`}>
                    {options.map(option => (
                        <li key={option} onClick={() => handleOptionClick(option)} className="option">
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

