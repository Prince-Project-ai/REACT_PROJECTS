import React, { useEffect, useState } from "react";

const ResultImages = ({ passImageObject, changePage }) => {
  const [currPage, setCurrPage] = useState(1);

  const chucks = passImageObject.reduce((prevImg, currImg, index) => {
    if (index % 7 === 0) {
      prevImg.push([currImg]);
    } else {
      prevImg[prevImg.length - 1].push(currImg);
    }
    return prevImg;
  }, []);

  // Handle download functionality
  const handleDownload = (imageUrl, imageId) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.classList.add("cursor-pointer");
        a.href = url;
        a.download = `image-${imageId}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading image:', error));
  };

  // get the page height
  useEffect(() => {
    window.addEventListener("scroll", handleInfinity);
    return () => window.removeEventListener("scroll", handleInfinity);
  }, [currPage]);

  const handleInfinity = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setCurrPage((prev) => prev + 1);
        changePage(currPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chucks.map((column, columnIndex) => (
            <div className="grid gap-4" key={columnIndex}>
              {column.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    className="h-full max-w-full rounded-lg"
                    src={image.urls["small"]}
                    alt=""
                  />
                  {/* Download button that appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 bg-opacity-30 rounded-lg">
                    <button
                      onClick={() => handleDownload(image.urls.regular, image.id)}
                      className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultImages;