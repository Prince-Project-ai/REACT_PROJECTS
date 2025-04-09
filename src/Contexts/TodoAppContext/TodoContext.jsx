import { createContext, useCallback, useState } from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const tags = ["HTML 5", "CSS 3", "JavaScript", "Bootstrap 5", "Tailwind CSS", "React js", "Node js", "Express js", "MongoDB", "shadcn", "vs code", "JWT", "Git", "github"];

  const [allTodos, setAllTodos] = useState([]);
  const [checkTag, setCheckTag] = useState([]);
  const [validation, setValidation] = useState(false);

  const [todoData, setTodoData] = useState({
    todoName: "",
    todoCate: "",
    selectedTags: [],
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTodoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleDoMagic = (e) => {
    e.preventDefault();
    if (todoData.todoName.trim().length <= 0 || todoData.todoCate.length <= 0) {
      setValidation(true);
    } else {
      setAllTodos((prevTodos) => [...prevTodos, { ...todoData, selectedTags: checkTag, createdAt: new Date().toISOString() }]);
      setValidation(false);
      setTodoData({
        todoName: "",
        todoCate: "",
        selectedTags: [],
      });
      setCheckTag([]);
    }
  };

  const clickedTag = useCallback((clickTag) => {
    setCheckTag((prevTags) =>
      prevTags.includes(clickTag)
        ? prevTags.filter((tag) => tag !== clickTag)
        : [...prevTags, clickTag]
    );
  }, []);

  const updateItem = (todoName, newValue) => {
    setAllTodos((prevItems) =>
      prevItems.map((item) =>
        item.todoName === todoName ? { ...item, ...newValue } : item
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todoData, allTodos, updateItem, setAllTodos, checkTag, setCheckTag, validation, setValidation, handleChange, setTodoData, clickedTag, handleDoMagic, tags }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;