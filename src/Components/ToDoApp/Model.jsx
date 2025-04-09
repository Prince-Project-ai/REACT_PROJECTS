import React, { useContext, useEffect, useState } from "react";
import { X } from "lucide-react"; // Import the X icon from lucide-react
import { TodoContext } from "../../Contexts/TodoAppContext/TodoContext";
import { ThemeContext } from "../../Contexts/TodoAppContext/ThemeContext";

const Model = ({ isOpen, toggleModal, data }) => {
  const { updateItem, tags } = useContext(TodoContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [checkTag, setCheckTag] = useState(data.selectedTags || []);
  const [todoData, setTodoData] = useState({
    todoName: data.todoName,
    todoCate: data.todoCate,
  });

  useEffect(() => {
    if (data) {
      setTodoData({ todoName: data.todoName, todoCate: data.todoCate });
      setCheckTag(data.selectedTags || []);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickedTag = (tag) => {
    setCheckTag((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...todoData,
      selectedTags: checkTag,
    };
    updateItem(data.todoName, updatedData);
    toggleModal();
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`rounded-xl shadow-xl p-6 w-full max-w-md transform transition-all duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold">Update Todo</h3>
          <button
            onClick={toggleModal}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 ${
              isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white"
                : "bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
            aria-label="Close Modal"
          >
            <X size={20} /> {/* Lucide X icon */}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="todoName"
            value={todoData.todoName}
            onChange={handleInputChange}
            className={`w-full mb-4 px-4 py-2.5 rounded-lg border-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
            placeholder="Enter Todo Name"
          />
          <select
            name="todoCate"
            value={todoData.todoCate}
            onChange={handleInputChange}
            className={`w-full mb-4 px-4 py-2.5 rounded-lg border-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Select Category</option>
            <option value="TO_DO">To Do</option>
            <option value="DOING">Doing</option>
            <option value="DONE">Done</option>
          </select>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map((tag, i) => (
              <div
                key={i}
                onClick={() => clickedTag(tag)}
                className={`cursor-pointer px-3 py-1.5 rounded-full text-sm font-medium border-2 shadow-sm transition-all duration-150 ${
                  checkTag.includes(tag)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : isDarkMode
                    ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 font-medium"
          >
            Update Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Model;