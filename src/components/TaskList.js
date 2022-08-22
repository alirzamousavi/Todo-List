import React from "react";
import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";

const TaskList = (props) => {
  if (props.tasks.length !== 0) {
    // This function calls the onDelete method in parent component for deleting a task.
    const deleteTaskHandler = (id) => {
      props.onDelete(id);
    };

    // This function calls the onCheck method in parent component for changing the state of a task.
    const checkTaskHandler = (id) => {
      props.onCheck(id);
    };

    return (
      <div className={styles["tasks-list"]}>
        {props.tasks.map((task) => {
          return (
            <TaskItem
              onDelete={deleteTaskHandler}
              onCheck={checkTaskHandler}
              key={task.id}
              id={task.id}
              name={task.name}
              checked={task.checked}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles["tasks-list"]}>
        <p className={styles.message}>No task to show!</p>
      </div>
    );
  }
};

export default TaskList;
