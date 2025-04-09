import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchEngine = ({ getDataFromChild }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchBtn = () => {
    getDataFromChild(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchBtn();
    }
  };

  return (
    <>
      <div className="searchBox w-full md:w-1/2 relative">
        <input
          type="search"
          className=" w-full p-3 outline-none rounded-full
          focus:ring-4 bg-white focus:ring-blue-600 focus:ring-offset-2 
          transition duration-300 ease-in-out"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          value={searchTerm}
          placeholder="Search any type of images..."
        />

        <button className="text-white absolute right-2 top-[6px] md:right-2 md:top-[6px] bg-indigo-600  size-9 flex items-center justify-center rounded-full leading-[35px] cursor-pointer"
          onClick={searchBtn}>
          <Search size={15} />
        </button>

      </div>
    </>
  );
};

export default SearchEngine;
