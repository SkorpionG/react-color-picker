import { useState, useRef, useEffect, isValidElement } from 'react';
import { ChevronDownIcon } from '../../assets/icons';
import { node, oneOfType, string, element, func } from 'prop-types';

function Dropdown({ children, label, onToggle, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  // When dropdown opens, recalculate overflow status
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        setIsOverflow(true);
      }
    }
  }, [isOpen]);

  // Recalculate overflow only when the window is resized
  useEffect(() => {
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isOpen && menuRef.current) {
          const rect = menuRef.current.getBoundingClientRect();
          setIsOverflow(rect.bottom > window.innerHeight);
        }
      }, 200); // Delay to prevent multiple recalculations
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.info('click outside');
        setIsOpen(false);
        onToggle?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onToggle]);

  return (
    <div
      className={`inline-flex items-center h-8 relative rounded-lg ${
        className || ''
      }`}
      ref={dropdownRef}
    >
      <span
        className={`${
          isValidElement(label) ? '' : 'px-4'
        } h-full bg-white rounded-l-lg shadow-sm border-r-0 flex items-center select-none`}
      >
        {isValidElement(label) ? label : label || 'Copy'}
      </span>
      <button
        className="h-full aspect-square bg-white rounded-r-lg shadow-sm hover:bg-gray-50 hover:cursor-pointer border-l-0 flex items-center justify-center transition-all duration-200"
        onClick={() => {
          setIsOpen(!isOpen);
          onToggle?.();
        }}
      >
        <span className="w-full h-full flex items-center justify-center">
          <ChevronDownIcon
            className={`w-6 h-6 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-100 min-w-90 bg-white rounded-sm shadow-lg flex flex-col gap-0.5 p-0.5 right-0 hover:cursor-default ${
            isOverflow ? 'bottom-12' : 'top-12'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  children: node.isRequired,
  label: oneOfType([string, node, element]),
  onToggle: func,
  className: string,
};

export default Dropdown;
