import React, { useState, useContext } from "react";
import styles from "./TaskItem.module.scss";
import boxStyles from "./BoxStyle.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import ThemeContext from "../context/theme-context";
import { todoActions } from "../store/todo-slice";
import { useAppDispatch } from "../store/index";

const TaskItem: React.FC<{ id: number; name: string; checked: boolean }> = (
  props
) => {
  // It is used to clarify that a task is getting deleted and when it has a true value,
  // a specific class will be added to that task.
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useAppDispatch();

  const themeCtx = useContext(ThemeContext);

  // Execute checkTask function and passes task id to it to change the task from checked to unchecked and vice versa.
  const checkTaskHandler = (): void => {
    dispatch(todoActions.checkTask(props.id));
  };

  // This function dispatches an action (removeTaskFromList function) after 750ms (when the task delete animation finished).
  const deleteTaskHandler = (): void => {
    setIsDeleting(true);

    setTimeout(() => {
      dispatch(todoActions.removeTaskFromList(props.id));
    }, 750);
  };

  return (
    <div
      className={`${styles.item} ${boxStyles.box} ${
        props.checked ? styles.checked : ""
      } 
      ${isDeleting ? styles.deleted : ""} ${styles[themeCtx.theme]}`}
    >
      <input
        onClick={checkTaskHandler}
        type="checkbox"
        className={styles[themeCtx.theme]}
        defaultChecked={props.checked}
        id={`todo ${props.id}`}
      />
      <label htmlFor={`todo ${props.id}`}>{props.name}</label>
      <FaTrashAlt
        onClick={deleteTaskHandler}
        className={styles["delete-btn"]}
      />
    </div>
  );
};

export default TaskItem;
