import React, { useContext } from "react";
import { TodoContext } from "../../Contexts/TodoAppContext/TodoContext";
import { ThemeContext } from "../../Contexts/TodoAppContext/ThemeContext";
import Task from "./Task";

const TaskCategory = ({ toggleModal }) => {
  const { allTodos, setAllTodos } = useContext(TodoContext);
  const { isDarkMode } = useContext(ThemeContext);

  const handleDelete = (clickData) => {
    setAllTodos(allTodos.filter((task) => task.todoName !== clickData.todoName));
  };

  return (
    <div className="task-category-container my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* TO_DO Category */}
        <div className="to-do-category">
          <div
            className={`rounded-lg py-3 px-4 mb-4 text-white text-center font-semibold shadow-md ${isDarkMode ? "bg-blue-600" : "bg-blue-500"
              }`}
          >
            To Do
          </div>
          <div className="todo space-y-4">
            {allTodos
              .filter((tag) => tag.todoCate === "TO_DO")
              .map((todoCate, i) => (
                <Task
                  key={i}
                  handleDelete={handleDelete}
                  data={todoCate}
                  toggleModal={toggleModal}
                />
              ))}
          </div>
        </div>

        {/* DOING Category */}
        <div className="doing">
          <div
            className={`rounded-lg py-3 px-4 mb-4 text-white text-center font-semibold shadow-md ${isDarkMode ? "bg-amber-600" : "bg-amber-500"
              }`}
          >
            Doing
          </div>
          <div className="data space-y-4">
            {allTodos
              .filter((tag) => tag.todoCate === "DOING")
              .map((todoCate, i) => (
                <Task
                  key={i}
                  handleDelete={handleDelete}
                  data={todoCate}
                  toggleModal={toggleModal}
                />
              ))}
          </div>
        </div>

        {/* DONE Category */}
        <div className="done">
          <div
            className={`rounded-lg py-3 px-4 mb-4 text-white text-center font-semibold shadow-md ${isDarkMode ? "bg-green-600" : "bg-green-500"
              }`}
          >
            Done
          </div>
          <div className="data space-y-4">
            {allTodos
              .filter((tag) => tag.todoCate === "DONE")
              .map((todoCate, i) => (
                <Task
                  key={i}
                  handleDelete={handleDelete}
                  data={todoCate}
                  toggleModal={toggleModal}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskCategory);