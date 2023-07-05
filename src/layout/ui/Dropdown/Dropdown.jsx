import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ children, userImg }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown relative" ref={dropdownRef}>
            <button className="dropdown-toggle rounded" onClick={toggleDropdown}>
                {userImg ? (<img className="w-8" src={userImg}/>) : (<div>DropDown</div>)}
            </button>
            {isOpen && (
                <ul className="flex flex-col w-full dropdown-menu absolute right-10 bg-white shadow top-full py-2 px-3">
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            onSelect: selectOption,
                        });
                    })}
                </ul>
            )}
            {selectedOption && <p>Selected Option: {selectedOption}</p>}
        </div>
    );
};

export default Dropdown;
