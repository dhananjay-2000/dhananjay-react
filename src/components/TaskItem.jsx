import { BussinessLogicContext } from "../store/bussiness-logic";
import  { useContext } from "react";
const TaskItem = ({ task }) => {

    const { deleteTask, updateTask, toggleTaskCompletion } = useContext(BussinessLogicContext);
    return (
        <>
            <tr style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>
                    <button
                        className={`btn btn-sm ${task.completed ? "btn-warning" : "btn-success"}`}
                        onClick={() => toggleTaskCompletion(task.id)}
                    >
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                </td>
                <td>
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