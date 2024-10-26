// TaskDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';

interface TaskDropdownProps {
    options: string[];
    onSelect: (option: string) => void;
}

const TaskDropdown: React.FC<TaskDropdownProps> = ({ options, onSelect }) => {
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
        <div className="relative flex flex-col items-end" ref={dropdownRef}>
            <div
                className="cursor-pointer text-gray-400"
                onClick={toggleDropdown}
            >
                <span className="text-lg">⋮</span>
            </div>
            {isOpen && (
                <div className="absolute z-10 top-full w-32 bg-white border border-gray-200 rounded shadow-lg">
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

export default TaskDropdown;
