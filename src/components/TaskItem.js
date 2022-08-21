import React, { useState } from "react";
import "./TaskItem.css";
import { FaTrashAlt } from "react-icons/fa";

const TaskItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.checked);
  const [isDeleted, setIsDeleted] = useState(false);

  // This function calls the onCheck method in parent component for changing the state of a task.
  const checkTaskHandler = () => {
    if (isChecked) {
      setIsChecked(false);
      props.onCheck(props.id);
    } else {
      setIsChecked(true);
      props.onCheck(props.id);
    }
  };

  // This function calls the onDelete method in parent component for deleting a task.
  const deleteTaskHandler = () => {
    setIsDeleted(true);
    setTimeout(() => {
      props.onDelete(props.id);
    }, 750);
  };

  return (
    <div
      className={`item box ${isChecked ? "checked" : ""} 
      ${isDeleted ? "deleted" : ""}`}
    >
      <input
        onClick={checkTaskHandler}
        type="checkbox"
        defaultChecked={`${isChecked ? "checked" : ""}`}
        id={`todo ${props.id}`}
      />
      <label htmlFor={`todo ${props.id}`}>{props.name}</label>
      <FaTrashAlt onClick={deleteTaskHandler} className="delete-btn" />
    </div>
  );
};

export default TaskItem;
