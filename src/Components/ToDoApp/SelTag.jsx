import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/TodoAppContext/ThemeContext";

const SelTag = ({ name }) => {
  const { isDarkMode } = useContext(ThemeContext);

  if (!name || name.length === 0) {
    return null;
  }

  return (
    <div
      className={`selected-tag flex flex-wrap gap-2 mt-2`}
    >
      {name.map((tag, i) => (
        <div
          key={i}
          className={`px-3 py-1 rounded-full text-xs font-medium border-2 border-indigo-600 shadow-sm transition-colors duration-150 ${
            isDarkMode
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          }`}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default SelTag;