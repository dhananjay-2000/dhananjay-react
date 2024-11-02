import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BussinessLogicContext } from "../store/bussiness-logic";
const TaskEmptyMessage = () => {
  const { addTasks } = useContext(BussinessLogicContext);
  const navigate = useNavigate();
  return (
    <>
      {addTasks.length === 0 && (
        <div className="alert alert-primary text-center">
          <h2>Please Add Your Task</h2>
          <div className="d-flex">
            <button className="btn btn-success ms-auto float-end" onClick={() => navigate("/add")}>
              Add Task

            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default TaskEmptyMessage;
