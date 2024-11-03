import { BussinessLogicContext } from "../store/bussiness-logic";
import { useContext } from "react";
const TaskItem = ({ task }) => {

    const { deleteTask, updateTask, toggleTaskCompletion } = useContext(BussinessLogicContext);
    const currentDate = new Date();
    const formattedCurrentDate = [
        currentDate.getFullYear(),
        String(currentDate.getMonth() + 1).padStart(2, "0"),
        String(currentDate.getDate()).padStart(2, "0"),
    ].join("-");
    const isOverdue = (task.dueDate) < formattedCurrentDate && !task.completed;

    return (
        <>
            <tr>
                <td style={{
                    backgroundColor: isOverdue ? "#f8d7da" : "inherit",
                    textDecoration: task.completed ? "line-through" : "none",
                }}>{task.name}</td>
                <td style={{
                    backgroundColor: isOverdue ? "#f8d7da" : "inherit",
                    textDecoration: task.completed ? "line-through" : "none",
                }}>{task.description}</td>
                <td style={{
                    backgroundColor: isOverdue ? "#f8d7da" : "inherit",
                    textDecoration: task.completed ? "line-through" : "none",
                }}>{task.dueDate}</td>
                <td style={{
                    backgroundColor: isOverdue ? "#f8d7da" : "inherit",
                    textDecoration: task.completed ? "line-through" : "none",
                }}>{task.priority}</td>
                <td style={{
                    backgroundColor: isOverdue ? "#f8d7da" : "inherit",
                    textDecoration: task.completed ? "line-through" : "none",
                }}>
                    <button
                        className={`btn btn-sm ${task.completed ? "btn-warning" : "btn-success"}`}
                        onClick={() => toggleTaskCompletion(task.id)}
                        disabled={isOverdue}
                    >
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                </td>
                <td style={{
                    backgroundColor: isOverdue ? "#f8d7da" : "inherit",
                    textDecoration: task.completed ? "line-through" : "none",
                }}>
                    <button
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => deleteTask(task.id)}
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => updateTask(task.id)}
                        disabled={task.completed}
                    >
                        Update
                    </button>
                </td>
            </tr>
        </>
    );
};
export default TaskItem;