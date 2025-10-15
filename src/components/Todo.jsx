import { useForm } from "react-hook-form";
import { useState } from "react";
import './todo.css';

const Todo = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [tasks, setTasks] = useState([]);

  const executedBySelf = watch("executedBySelf"); // To show/hide "Assign To" field

  const onSubmit = (data) => {

    // Get any existing tasks from localStorage, if key doesn't exist, initialize as empty array
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Add the new task to the array
    const updatedTasks = [...existingTasks, data];

    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Update local state for immediate UI reflection
    setTasks(updatedTasks);

    // Reset the form after submission
    reset();
  };

  return (
    <div className="task-form-container">
      <h2>Create Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="task-form">
        <div className="form-group">
          <label>Task Name</label>
          <input {...register("taskName", { required: true })} placeholder="Enter task name" />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea {...register("description", { required: true })} placeholder="Enter task description"></textarea>
        </div>

        <div className="form-group checkbox">
          <input type="checkbox" {...register("executedBySelf")} id="executedBySelf" />
          <label htmlFor="executedBySelf">Executed by self?</label>
        </div>

        {!executedBySelf && (
          <div className="form-group">
            <label>Assign To</label>
            <input {...register("assignTo")} placeholder="Enter username or email" />
          </div>
        )}

        <div className="form-group">
          <label>Due Date</label>
          <input type="date" {...register("dueDate", { required: true })} />
        </div>

        <div className="form-group">
          <label>Completed Date</label>
          <input type="date" {...register("completedDate")} />
        </div>

        <button type="submit" className="submit-task">Save Task</button>
      </form>

      {/* Optional: Display saved tasks */}
      <div className="task-list">
        <h3>Saved Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <strong>{task.taskName}</strong> — {task.description}  
                <br />
                Due: {task.dueDate || "N/A"} | Completed: {task.completedDate || "Not yet"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todo;
