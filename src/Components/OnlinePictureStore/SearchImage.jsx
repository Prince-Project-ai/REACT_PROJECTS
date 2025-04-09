import React, { useEffect, useState } from "react";
import SearchEngine from "./SearchEngine";
import ResultImages from "./ResultImages";
import Spinner from "./Spinner";


const SearchImage = () => {
  const API_KEY = "igR-ehEEFbypmvHbzQhxXem8ix8bqdxirvdFEtcEKJo";

  const [Query, setQuery] = useState(null)
  const [dataImage, setDataImage] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [massage, setMessage] = useState(false);
  const [page, setPage] = useState(1);


  const getDataFromChild = (Query) => {
    setQuery(Query);
    fetchQueryByImage(Query);
  };

  const changePage = (getchildPage) => {
    setPage(getchildPage);
  };

  const fetchQueryByImage = async (Query) => {
    setIsLoding(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${Query}&per_page=28&page=${page}&client_id=${API_KEY}`
      );

      if (!response.ok) throw new Error("Faild to Fetch data");
      const data = await response.json();
      console.log(data);
      if (data.total === 0) {
        setMessage(true);
      } else {
        setMessage(false);
      }
      setDataImage(data.results);
    } catch (Error) {
      console.error(Error);
    } finally {
      setIsLoding(false);
    }
  };
  useEffect(() => {
    setDataImage((prev) => [...prev, ...dataImage]);
  }, [page]);
  useEffect(() => {
    if (Query != null) {
      fetchQueryByImage(Query);
    }
  }, [Query]);
  return (
    <>
      <main className="container mx-auto my-3 px-4 md:px-0">
        <div className="bg-sky-600 rounded-lg gap-3 grid p-3">
          <div className="heading">
            <h3 className="text-center text-indigo-700 text-2xl">
              Online Free Picture Store
            </h3>
            <h1 className="text-1xl font-bold px-3 md:text-4xl text-white text-center md:px-0">
              Search any image in your mind
            </h1>
          </div>
          <div className="search_Engine flex justify-center flex-col items-center relative">
            <SearchEngine getDataFromChild={getDataFromChild} />
            <h3 className="text-2xl text-white text-center font-normal mt-3">
              {isLoding && <Spinner />}
              {massage && "No Image Found"}
            </h3>
          </div>
        </div>
      </main>
      <div className="resultImages">
        <ResultImages passImageObject={dataImage} changePage={changePage} />
      </div>
    </>
  );
};
export default SearchImage;
