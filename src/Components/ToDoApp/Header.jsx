import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/TodoAppContext/ThemeContext";

const Header = () => {
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);
  return (
    <header className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300'}`}>
      <div className="row flex justify-between items-center py-2 px-3">
        <div className="logo text-2xl font-semibold">PRINCE</div>
        <div className="Theme"><span className="text-3xl" onClick={toggleTheme}>{isDarkMode ? '☀️' : '🌚'} </span></div>
      </div>
    </header>
  );
};

export default React.memo(Header);
