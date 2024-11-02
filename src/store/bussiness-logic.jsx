import { createContext } from "react";
import { useState, useEffect } from "react";
export const BussinessLogicContext = createContext({
  addTask: () => {},
  addTasks: [],
  setFilter: () => {},
  setSortBy: () => {},
  sortedTasks: [],
  deleteTask: () => {},
  updateTask: () => {},
  toggleTaskCompletion: () => {},
});

const BussinessLogicWrapper = ({ children }) => {
  const [addTasks, setAddTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  }, []);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const filteredTasks = addTasks.filter((task) => {
    if (filter === "completed") {
      return task.completed; // Show only completed tasks
    } else if (filter === "incompleted") {
      return !task.completed; // Show only incomplete tasks
    }
    return true; // Show all tasks for "all" filter
  });
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === "priority") {
      return b.priority - a.priority;
    }
    return 0;
  });
  const addTask = (task) => {
    setAddTasks((prevTasks) => [
      ...prevTasks,
      { ...task, id: prevTasks.length + 1, completed: false },
    ]);
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(addTasks));
  }, [addTasks]);

  const handleDeleteTask = (id) => {
    setAddTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const handleUpdateTask = (id, updatedFields) => {
    setAddTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };
  const toggleTaskCompletion = (id) => {
    setAddTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <BussinessLogicContext.Provider
      value={{
        addTask: addTask,
        addTasks: addTasks,
        setFilter:setFilter,
        setSortBy:setSortBy,
        sortedTasks:sortedTasks,
        deleteTask: handleDeleteTask,
        updateTask: handleUpdateTask,
        toggleTaskCompletion: toggleTaskCompletion,
      }}
    >
      {children}
    </BussinessLogicContext.Provider>
  );
};
export default BussinessLogicWrapper;
