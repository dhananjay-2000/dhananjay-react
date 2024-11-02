import { BussinessLogicContext } from "../store/bussiness-logic";
import  { useContext } from "react";
const TaskFilter = () => {
  const { setFilter } = useContext(BussinessLogicContext);
    return (
      <>
        <div className="d-flex justify-content-end mb-3">
          <select onChange={(event) => setFilter(event.target.value)} className="form-select w-auto">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incompleted">Incompleted</option>
          </select>
        </div>
      </>
    );
  };
  export default TaskFilter;