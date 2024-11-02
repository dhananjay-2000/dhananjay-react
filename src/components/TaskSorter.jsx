import { BussinessLogicContext } from "../store/bussiness-logic";
import  { useContext } from "react";
const TaskSorter = () => {
  const { setSortBy } = useContext(BussinessLogicContext);
  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <label className="me-2 fw-semibold">Sort By: </label>
        <select onChange={(e) => setSortBy(e.target.value)} className="form-select w-auto">
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </>
  );
};
export default TaskSorter;
