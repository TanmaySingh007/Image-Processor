'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      {children.map(child => {
        if (child.type === SelectTrigger) {
          return {
            ...child,
            props: {
              ...child.props,
              onClick: () => setIsOpen(!isOpen),
              isOpen
            }
          };
        }
        if (child.type === SelectContent) {
          return {
            ...child,
            props: {
              ...child.props,
              isOpen,
              onSelect: (selectedValue) => {
                onValueChange(selectedValue);
                setIsOpen(false);
              },
              currentValue: value
            }
          };
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger = ({ children, className = '', onClick, isOpen }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-between w-full px-3 py-2 text-sm
        bg-white border border-gray-300 rounded-md shadow-sm
        hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${className}
      `}
    >
      {children}
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

export const SelectValue = ({ placeholder }) => {
  return <span className="text-gray-700">{placeholder}</span>;
};

export const SelectContent = ({ children, isOpen, onSelect, currentValue }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
      {children.map(child => {
        if (child.type === SelectItem) {
          return {
            ...child,
            props: {
              ...child.props,
              onSelect,
              isSelected: child.props.value === currentValue
            }
          };
        }
        return child;
      })}
    </div>
  );
};

export const SelectItem = ({ children, value, onSelect, isSelected }) => {
  return (
    <div
      onClick={() => onSelect(value)}
      className={`
        px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
        ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
      `}
    >
      {children}
    </div>
  );
};