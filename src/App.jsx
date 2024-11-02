import BussinessLogicWrapper from "./store/bussiness-logic";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import UpdateTaskForm from "./components/UpdateTaskForm";
import TaskEmptyMessage from "./components/TaskEmptyMessage";
import DueDateChecker from "./components/DueDateChecker"; // Import the DueDateChecker
import { Toaster } from "react-hot-toast"; // Import for toast notifications

// Example task structure
// const task = {
//   id: 1,
//   name: "Task 1",
//   description: "This is a sample task",
//   priority: "high",
//   dueDate: "2024-10-30",
//   completed: false,
// };
function App() {

  return (

    <BussinessLogicWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TaskList />} />

          <Route path="/add" element={<AddTaskForm />} />
          <Route path="/update" element={<UpdateTaskForm />} />
          <Route path="*" element={<TaskEmptyMessage />} />
        </Routes>
      </Router>
    </BussinessLogicWrapper>
  );
}

export default App;
