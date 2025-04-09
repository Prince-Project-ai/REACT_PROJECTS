import { useState } from "react";

const useToDo = () => {
    const [todoData, setTodoData] = useState({
        todoName: "",
        todoCate: "",
        selectedTags: [],
    });

    const [validation, setValidation] = useState(false);
    const [tags] = useState(["work", "personal", "urgent", "study"]);
    const [checkTag, setCheckTag] = useState([]);

    const [allTodos, setAllTodos] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const clickedTag = (tag) => {
        const updatedTags = checkTag.includes(tag)
            ? checkTag.filter((t) => t !== tag)
            : [...checkTag, tag];

        setCheckTag(updatedTags);
    };

    const handleDoMagic = () => {
        if (!todoData.todoName.trim() || !todoData.todoCate) {
            setValidation(true);
            return;
        }

        const newTodo = {
            todoName: todoData.todoName.trim(),
            todoCate: todoData.todoCate,
            tags: checkTag,
            createdAt: new Date().toISOString(),
        };

        setAllTodos((prev) => [...prev, newTodo]);

        setTodoData({
            todoName: "",
            todoCate: "",
            selectedTags: [],
        });
        setCheckTag([]);
        setValidation(false);
    };

    return {
        handleChange,
        validation,
        todoData,
        handleDoMagic,
        clickedTag,
        tags,
        setTodoData,
        checkTag,
        allTodos,
        setAllTodos,
    };
};

export default useToDo;
