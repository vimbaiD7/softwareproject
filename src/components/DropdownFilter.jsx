import React, { useState, useRef, useEffect } from "react";

export default function DropdownFilter({ label, options, onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center hover:bg-gray-100"
      >
        {selected || label}
        <svg
          className="ml-2 h-4 w-4 fill-current text-gray-600"
          viewBox="0 0 20 20"
        >
          <path d="M5.516 7.548l4.484 4.482 4.484-4.482L15.998 9l-5.998 5.998L4.002 9l1.514-1.452z" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 bg-white border border-gray-200 rounded-md mt-2 w-48">
          <ul className="py-2">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
