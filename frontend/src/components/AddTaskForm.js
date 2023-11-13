import React from "react";

const TaskForm = ({
  createTask,
  taskName,
  handleInputChange,
  handleSelectChange,
  isEditing,
  updateTask,
  formData,
  closeModal,
}) => {

  const statusArray = ["Pending", "In Progress", "Completed", "Overdue"];

  return (
    <form
      className="task-form"
      onSubmit={isEditing ? updateTask : createTask}
    >
      <div>
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          placeholder="Add a Task"
          name="taskName"
          value={isEditing ? formData.taskName : taskName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select name="status" onChange={handleSelectChange} value={isEditing ? formData.status : ''}>
          <option>Please Select</option>
          {statusArray.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="add-task-button">
        {isEditing ? "Edit" : "Add"}
      </button>
      <button onClick={closeModal} className="close-task-button">
        Close
      </button>
    </form>
  );
};

export default TaskForm;
