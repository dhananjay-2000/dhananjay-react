import TaskItem from "./TaskItem";
import { useContext } from "react";
import { BussinessLogicContext } from "../store/bussiness-logic";
import TaskEmptyMessage from "./TaskEmptyMessage";
import TaskFilter from "./TaskFilter";
import TaskSorter from "./TaskSorter";
import { useEffect } from "react";
import toast from "react-hot-toast";

const TaskList = () => {
  const { addTasks, setFilter, setSortBy, sortedTasks } = useContext(BussinessLogicContext);


  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    // Iterate over tasks and trigger a notification for each task due today
    addTasks.forEach((task) => {
      if (task.dueDate === today && !task.notified) {
        toast(`Task "${task.name}" is due today!`);
        task.notified = true; // Mark task as notified to avoid duplicate notifications
      }
    });
  }, [addTasks]);


  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center fw-bold text-primary mb-4">
          YOUR TASK LIST
        </h2>
        <div className="d-flex justify-content-between mb-3">
          {addTasks.length != 0 && <TaskSorter setSortBy={setSortBy} />}
          {addTasks.length != 0 && <TaskFilter setFilter={setFilter} />}
        </div>
        {addTasks.length > 0 ? (
          <table
            className="table table-striped table-bordered table-hover"
            style={{ width: "100%" }}
          >
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </tbody>
          </table>
        ) : (
          <TaskEmptyMessage />
        )}
      </div>
    </>
  );
};
export default TaskList;
