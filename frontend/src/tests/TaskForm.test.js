import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/AddTaskForm';

  const createTask = jest.fn();
  const updateTask = jest.fn();
  const taskName = 'Task Name';
  const status = 'Task Status';
  const handleInputChange = jest.fn();
  const handleSelectChange = jest.fn();
  const isEditing = false;
  const formData = { taskName: '', status: '' };

  describe("TaskForm", () => {
    it('should render same text passed into title prop', async () => {
      render(
        <TaskForm
          createTask={createTask}
          taskName={taskName}
          status={status}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          updateTask={updateTask}
          formData={formData}
        />
      );
      const inputElement = screen.getByPlaceholderText(/Add a Task/i);
      expect(inputElement).toBeInTheDocument();
    });

    it('should be able to type in input', async () => {
      render(
        <TaskForm
          createTask={createTask}
          taskName={taskName}
          status={status}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          updateTask={updateTask}
          formData={formData}
        />
      );
      const inputElement = screen.getByPlaceholderText(/Add a Task/i);
      fireEvent.change(inputElement, { target: { value: "Task Name"} })
      expect(inputElement.value).toBe("Task Name");
    });

    it('should be able to select a status from the dropdown', () => {
      render(
        <TaskForm
          createTask={createTask}
          taskName={taskName}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          isEditing={isEditing}
          updateTask={updateTask}
          formData={formData}
        />
      );
  
      const selectElement = screen.getByRole('combobox', { name: /status/i });
      fireEvent.change(selectElement, { target: { value: "In Progress" } });
      expect(selectElement.value).toBe("In Progress");
    });
  })