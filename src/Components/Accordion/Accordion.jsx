import React, { useState } from 'react';

const Accordion = () => {

  const [toggleAccordion, setToggleAccordion] = useState(null);
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);
  const [isAvailable, setIsAvailable] = useState([]);

  const accordionItems = [
    {
      title: "Item 1",
      content: "A standalone card design with a gradient background and smooth hover effects.",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600"
    },
    {
      title: "Item 2",
      content: "Perfect for multi-open functionality with a luxurious dark theme.",
      color: "bg-gradient-to-r from-red-400 to-pink-500"
    },
    {
      title: "Item 3",
      content: "Tailwind v4.1's best features in a responsive, elegant package.",
      color: "bg-gradient-to-r from-green-400 to-teal-500"
    }
  ];


  const handleOpenAccordion = (e, index) => {
    e.preventDefault();

    if (enableMultiSelect) {
      isAvailable.includes(index) ? setIsAvailable(isAvailable.filter((item) => item !== index)) : setIsAvailable((prev) => ([...prev, index]));
      return;
    }
    setToggleAccordion(index === toggleAccordion ? null : index);
  }


  return (
    <div className="flex p-6 bg-gray-50">
      <div className="w-full border rounded-xl shadow-lg p-4 max-w-md bg-white">
        <h1 className="text-center text-3xl font-bold mb-3 text-gray-800">Accordion</h1>

        <button onClick={() => setEnableMultiSelect((prev) => (!prev))} className='bg-black py-2 mb-3 text-white block mx-auto px-4 rounded'>{enableMultiSelect ? "Disable" : "Enable"} Multi select</button>
        <div className="space-y-4">
          {accordionItems.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 `}
            >
              <button
                onClick={(e) => handleOpenAccordion(e, index + 1)}
                className={`w-full p-4 flex justify-between items-center ${item.color} text-white transition-colors duration-300 hover:opacity-90`}
              >
                <span className="text-base sm:text-lg font-semibold tracking-tight">{item.title}</span>
                <span className="text-white text-xl transition-transform duration-300 border size-8 rounded ">
                  {index + 1 === toggleAccordion ? "-" : "+"}
                </span>
              </button>
              {
                (index + 1 === toggleAccordion || isAvailable.includes(index + 1)) && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-white p-3`}>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;