import React, { useState } from "react";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="bg-indigo-500 py-3">
        <nav className="container px-4 md:px-0 mx-auto flex justify-between items-center">
          <h4 className="text-white">All thing homemade</h4>
          <ul className="hidden md:flex items-center gap-5 text-white">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
          <ul className="md:hidden">
            <li
              onClick={handleClick}
              className="px-2 py-1 bg-white rounded-md active:bg-slate-300"
            >
              <a href="#">
                <i className="ri-menu-3-line"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <nav
        className={`${
          toggle
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } bg-indigo-400 container overflow-hidden transition-all duration-4 00 ease-in-out px-4 mx-auto md:hidden border-t-2 border-white`}
      >
        <ul className="gap-y-3 flex flex-col text-center py-3">
          <li className="bg-white rounded-md p-3 active:bg-slate-300">
            <a href="#">Home</a>
          </li>
          <li className="bg-white rounded-md p-3 active:bg-slate-300">
            <a href="#">About Us</a>
          </li>
          <li className="bg-white rounded-md p-3 active:bg-slate-300">
            <a href="#">Contact Us</a>
          </li>
          <li className="bg-white rounded-md p-3 active:bg-slate-300">
            <a href="#">Login</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
