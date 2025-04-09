import React, { useContext, useEffect, useState } from "react";
import TaskCategory from "../../Components/ToDoApp/TaskCategory";
import Model from "../../Components/ToDoApp/Model";
import Header from "../../Components/ToDoApp/Header";
import { ThemeContext } from "../../Contexts/TodoAppContext/ThemeContext";
import { TodoContext } from "../../Contexts/TodoAppContext/TodoContext";

const ToDoApp = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const {
        handleChange,
        validation,
        todoData,
        handleDoMagic,
        clickedTag,
        tags,
        setTodoData,
        checkTag,
    } = useContext(TodoContext);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        setTodoData((prevData) => ({ ...prevData, selectedTags: checkTag }));
    }, [checkTag, setTodoData]);

    const toggleModal = (todo = null) => {
        setSelectedTodo(todo);
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Header />
            <section
                className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"
                    } px-4 py-8`}
            >
                <div className="max-w-4xl mx-auto">
                    <h1
                        className={`text-4xl font-bold text-center mb-8 ${isDarkMode ? "text-white" : "text-indigo-700"
                            }`}
                    >
                        To-Do App
                    </h1>

                    {/* Input Row */}
                    <div className="input-row flex flex-col sm:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            autoFocus
                            name="todoName"
                            value={todoData.todoName}
                            onChange={handleChange}
                            className={`flex-1 px-4 py-3 rounded-lg shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode
                                ? "bg-gray-800 text-white border-gray-700"
                                : "bg-white text-gray-900 border-gray-300"
                                } ${validation ? "border-red-500" : "border-indigo-500"}`}
                            placeholder="Enter Todo Here..."
                        />
                        <select
                            name="todoCate"
                            value={todoData.todoCate}
                            onChange={handleChange}
                            className={`w-full sm:w-40 px-4 py-3 rounded-lg shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDarkMode
                                ? "bg-gray-800 text-white border-gray-700"
                                : "bg-white text-gray-900 border-gray-300"
                                } ${validation ? "border-red-500" : "border-indigo-500"}`}
                        >
                            <option value="">Select Category</option>
                            <option value="TO_DO">To Do</option>
                            <option value="DOING">Doing</option>
                            <option value="DONE">Done</option>
                        </select>
                        <button
                            onClick={handleDoMagic}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 font-medium"
                        >
                            Do Magic 💫
                        </button>
                    </div>

                    {/* Tags */}
                    <div className="tags flex flex-wrap gap-2 mb-8">
                        {tags.map((tag, i) => (
                            <div
                                key={i}
                                onClick={() => clickedTag(tag)}
                                className={`cursor-pointer px-4 py-2 rounded-full font-medium text-sm shadow-sm transition-all duration-200 ${checkTag.includes(tag)
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : isDarkMode
                                        ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                                        : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                                    } border-2`}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>

                    {/* Task Category Section */}
                    <TaskCategory toggleModal={toggleModal} />
                    {isOpen && (
                        <Model isOpen={isOpen} toggleModal={toggleModal} data={selectedTodo} />
                    )}
                </div>
            </section>
        </>
    );
};

export default ToDoApp;
