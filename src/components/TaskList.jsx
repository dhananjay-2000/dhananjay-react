import TaskItem from "./TaskItem";
import { useContext, useState } from "react";
import { BussinessLogicContext } from "../store/bussiness-logic";
import TaskEmptyMessage from "./TaskEmptyMessage";
import TaskFilter from "./TaskFilter";
import TaskSorter from "./TaskSorter";
import { useEffect } from "react";
import toast from "react-hot-toast";

const TaskList = () => {
  const { addTasks, setFilter, setSortBy, sortedTasks } = useContext(BussinessLogicContext);
  const [notifiedTasks, setNotifiedTasks] = useState(new Set());

  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = [
      currentDate.getFullYear(),
      String(currentDate.getMonth() + 1).padStart(2, '0'),
      String(currentDate.getDate()).padStart(2, '0'),
    ].join('-');

    // Check for tasks with a due date matching the current date
    const dueTasks = sortedTasks.filter(task => task.dueDate === formattedCurrentDate);

    // Show a notification for each task due today if it hasn't been notified yet
    dueTasks.forEach(task => {
      if (!notifiedTasks.has(task.id)) {
        toast(`Reminder: Task "${task.name}" is due today!`, {
          duration: 6000, // Duration for the notification
          icon: '📅',
        });
        // Add the task ID to the notified set
        notifiedTasks.add(task.id);
      }
    });

    // Update the notifiedTasks state to trigger a re-render
    setNotifiedTasks(new Set(notifiedTasks)); // Force state update to refresh the component

  }, [sortedTasks]); // Runs every time sortedTasks change



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
