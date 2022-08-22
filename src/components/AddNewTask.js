import React, { useState, useRef } from "react";
import styles from "./AddNewTask.module.css";
import boxStyles from "./BoxStyle.module.css";

const AddNewTask = (props) => {
  const taskName = useRef("");
  const [isValid, setIsValid] = useState(true);

  // Submitting the form.
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (taskName.current.value.length === 0) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    const newTask = {
      id: getID(),
      name: taskName.current.value,
      done: false,
    };

    taskName.current.value = "";

    props.onAddTask(newTask);
  };

  // counter: Add up every time random id is equal to
  // one existing task's id. Indicates that the id is duplicated
  function getID() {
    let counter = 0,
      id,
      validID = false;
    while (!validID) {
      id = parseInt(Math.random() * 90 + 10);
      for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].id === id) {
          counter++;
          break;
        }
      }
      if (counter === 0) validID = true;
    }
    return id;
  }

  return (
    <form onSubmit={formSubmitHandler} className={styles["add-task"]}>
      <input
        type="text"
        ref={taskName}
        className={`${boxStyles.box} ${isValid ? "" : styles.invalid}`}
        placeholder="Nome da tarefa"
      />
      <button type="submit">+ Adicionar</button>
    </form>
  );
};

export default AddNewTask;
