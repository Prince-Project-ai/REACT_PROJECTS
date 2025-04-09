import React from "react";
import { useTheme } from "../../Contexts/PasswordGenerator/useTheme";

const ToggleThmeButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative px-6 py-2 mx-auto block rounded-full font-medium text-sm uppercase tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${isDarkMode
        ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 hover:from-gray-400 hover:to-gray-500"
        : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 hover:from-gray-800 hover:to-gray-900"
        }`}
    >
      <span className="relative z-10">
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </span>
      <span
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${isDarkMode
          ? "from-orange-500 to-pink-500 opacity-20"
          : "from-indigo-500 to-purple-500 opacity-20"
          } blur-md transition-all duration-300`}
      />
    </button>
  );
};

export default ToggleThmeButton;