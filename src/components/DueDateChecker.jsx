import { useEffect, useContext } from "react";
import { BussinessLogicContext } from "../store/bussiness-logic";
import toast from "react-hot-toast";

const DueDateChecker = () => {
    const { addTasks } = useContext(BussinessLogicContext);

    const checkDueDates = () => {
        const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
        addTasks.forEach((task) => {
            if (task.dueDate === today && !task.notified) {
                toast(`Task "${task.name}" is due today!`);
                task.notified = true; // Flag to prevent multiple notifications for the same task
            }
        });
    };

    useEffect(() => {
        checkDueDates(); // Initial check when the component mounts
        const interval = setInterval(checkDueDates, 60 * 1000); // Check every 24 hours
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [addTasks]);

    return null; // This component doesn't render anything
};

export default DueDateChecker;
