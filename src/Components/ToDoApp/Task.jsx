import React, { useContext } from "react";
import { Pencil, Trash2 } from "lucide-react"; // Import Lucide icons
import { ThemeContext } from "../../Contexts/TodoAppContext/ThemeContext";
import SelTag from "./SelTag";

const Task = ({ data, handleDelete, toggleModal }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`task p-4 rounded-lg shadow-md transition-all duration-200 ${isDarkMode
        ? "bg-gray-800 border border-gray-700 hover:bg-gray-750"
        : "bg-white border border-gray-200 hover:bg-gray-50"
        }`}
    >
      <div className="flex justify-between items-start gap-3">
        {/* Task Info */}
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
          >
            {data.todoName}
          </h3>
          {data.selectedTags && data.selectedTags.length > 0 && (
            <div className="mt-2">
              <SelTag name={data.selectedTags} />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleModal(data);
            }}
            className={`p-2 rounded-full ${isDarkMode
              ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
              : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
              } transition-colors duration-150`}
            aria-label="Update Task"
          >
            <Pencil size={18} /> {/* Lucide Pencil icon */}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(data);
            }}
            className={`p-2 rounded-full ${isDarkMode
              ? "text-gray-400 hover:text-red-400 hover:bg-gray-700"
              : "text-gray-500 hover:text-red-500 hover:bg-gray-100"
              } transition-colors duration-150`}
            aria-label="Delete Task"
          >
            <Trash2 size={18} /> {/* Lucide Trash2 icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Task);