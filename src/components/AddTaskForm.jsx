import { useState } from "react";
import { useContext } from "react";
import { BussinessLogicContext } from "../store/bussiness-logic";
import { useNavigate } from "react-router-dom";
const AddTaskForm = () => {
  const { addTask } = useContext(BussinessLogicContext);
  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "high",
  });
  const [errors, setError] = useState({});
  const navigate = useNavigate();
  const validationForm = () => {
    const newErrors = {};
    if (!task.name) {
      newErrors.name = "Required";
    }
    if (!task.dueDate) {
      newErrors.dueDate = "Required";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (validationForm()) {
      addTask(task);
      setTask({
        name: "",
        description: "",
        dueDate: "",
        priority: "high",
      });
    }
  };
  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center fw-bold text-primary mb-4">
          ADD YOUR WISHLIST
        </h2>
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-success"
            onClick={() => navigate("/tasks")}
          >
            Dashboard
          </button>
        </div>
        <form
          onSubmit={handleSubmitForm}
          className="p-4 border rounded shadow-sm bg-light"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              placeholder="Enter your task"
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter your description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              className="form-control"
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              placeholder="Enter your dueDate"
            />
            {errors.dueDate && <span>{errors.dueDate}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              className="form-select"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default AddTaskForm;
