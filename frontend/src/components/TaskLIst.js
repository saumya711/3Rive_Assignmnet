import { act} from '@testing-library/react';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { default as axios } from "axios";
import { URL } from "../App";
import loadingImg from "../assets/loader.gif";
import AddTaskForm from "./AddTaskForm";
import Modal from "react-modal";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import SearchFilter from './SearchFilter';

const TaskList = () => {
  const [task, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    status: "",
    statusArray: ["Pending", "In Progress", "Completed", "Overdue"],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { taskName, status, statusArray } = formData;

  const [ keyword, setKeyword] = useState("");
  const [ selectedStatus, setSelectedStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await act(async () => {
        await getTasks();
      });
    };

    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    console.log("xczsfdsd", formData);
    if (formData.taskName === "" || status === "") {
      return toast.error("Input field cannot be empty");
    }

    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("Task Added Successfully");
      setFormData({ taskName: "", status: "" });
      closeModal();
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getSingleTask = async (task) => {
    setIsEditing(true);
    setFormData({
      taskName: task.taskName,
      status: task.status
    });
    setTaskID(task._id);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (formData.taskName === "" || formData.status === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      await axios.put(
        `${URL}/api/tasks/${taskID}`,
        formData
      );

      console.log(taskID);
      setFormData({ taskName: "", status: "" });
      setIsEditing(false);
      closeModal();
      getTasks();
      toast.success("Task Updated Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      toast.success(" Task deleted Succesfully");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const searched = (keyword) => (c) => c.taskName.toLowerCase().includes(keyword);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const updatedTasks = [...task];
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, draggedTask);

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <hr />
      <button className="add-button" onClick={openModal}>
        Add Task
      </button>

      <hr />
      <SearchFilter 
        keyword={keyword}
        setKeyword={setKeyword}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        formData={{ ...formData, statusArray }}
      />

      <Modal 
        className="modal --flex-center"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Task Modal"
      >
        <AddTaskForm
          createTask={createTask}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          updateTask={updateTask}
          getSingleTask={getSingleTask}
          isEditing={isEditing}
          formData={{ ...formData, statusArray }}
          closeModal={closeModal}
        />
      </Modal>

      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="loading" />
        </div>
      )}
      {!isLoading && task.length === 0 ? (
        <p className="--py">No task added. Please add a Task with Category</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th className="last-header">Actions</th>
              </tr>
            </thead>
            <tbody>
            {task
              .filter((val) => {
                if (selectedStatus === "") {
                  return val;
                } else if (val.status == selectedStatus) {
                  return val;
                }
              })
              .filter(searched(keyword))
              .map((task, index) => (
                <tr 
                  key={task._id} 
                  className={"task"}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <td>{task.taskName}</td>
                  <td>{task.status}</td>
                  <td>
                    <div className="task-icons">
                      <FaEdit
                        color="purple"
                        onClick={() => {
                          getSingleTask(task);
                          openModal();
                        }}
                      />
                      <FaRegTrashAlt
                        color="red"
                        onClick={() => deleteTask(task._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TaskList;
