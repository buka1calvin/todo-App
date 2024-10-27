// Dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

interface DropdownProps {
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
}

const Selection: React.FC<DropdownProps> = ({ options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
        <div className="relative inline-block text-gray-700" ref={dropdownRef}>
            <div
                className="flex items-center gap-1 cursor-pointer text-gray-400 dark:text-gray-200"
                onClick={toggleDropdown}
            >
                <p className="text-sm font-semibold">{selected}</p>
                <RiArrowDownSLine className={`w-5 h-5 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && (
                <div className="absolute z-10 top-full mt-2 w-44 bg-white border border-purple-200 rounded shadow-lg transition-all ease-in-out duration-200">
                    {options.map((option) => (
                        <p
                            key={option}
                            className="p-2 hover:bg-purple-100 cursor-pointer text-xs font-medium"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Selection;
