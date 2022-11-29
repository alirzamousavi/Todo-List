import React, { useState, useContext, useRef } from "react";
import styles from "./AddNewTask.module.scss";
import boxStyles from "./BoxStyle.module.scss";
import ThemeContext from "../context/theme-context";
import { useSelector } from "react-redux";
import { todoActions } from "../store/todo-slice";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch } from "../store/index";

const AddNewTask = () => {
  const { t } = useTranslation();

  // It holds entered value in the add task input.
  const taskName = useRef<HTMLInputElement | null>(null);

  // It is used for checking the validation of entered value in input.
  const [isValid, setIsValid] = useState(true);

  const mainList = useSelector((state: RootState) => state.todo.mainList);
  const dispatch = useAppDispatch();

  const themeCtx = useContext(ThemeContext);

  // Submitting the form.
  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If input field is empty and user has not entered anything, set isValid to false
    // and don't add a new task with no name.
    if (taskName.current?.value.length === 0) {
      setIsValid(false);
      return;
    }
    // Because an "invalid" class will be added to the input element whenever its invalid,
    // we should set it to true here(when we made sure that the entered value is valid) to remove the "invalid" class from input.
    setIsValid(true);

    const newTask: {
      id: number;
      name: string;
    } = {
      id: getID(),
      name: taskName.current!.value,
    };

    // Clears the input box when the task is added.
    taskName.current!.value = "";

    dispatch(todoActions.addTaskToList(newTask));
  };

  // This function returns a random unique id.
  function getID(): number {
    // flag indicates that the id is duplicated. when it is true, it shows that the random number is equal to one existing task's id.
    let flag: boolean,
      id: number = 0,
      idIsValid = false;

    // It repeatedly searchs between all task's id and if the random number is equal to one, it creates
    // a new random number, till the number is unique.
    while (!idIsValid) {
      flag = false;
      // Creates a random number between 10 - 100.
      id = Math.random() * 90 + 10;
      for (let i = 0; i < mainList.length; i++) {
        if (mainList[i].id === id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        idIsValid = true;
      }
    }

    return id;
  }

  return (
    <form
      onSubmit={formSubmitHandler}
      className={`${styles["add-task"]} ${styles[themeCtx.theme]}`}
    >
      <input
        type="text"
        ref={taskName}
        className={`${boxStyles.box} ${styles[themeCtx.theme]} ${
          isValid ? "" : styles.invalid
        }`}
        placeholder={t("add_task_input")}
      />
      <button className={styles[themeCtx.theme]} type="submit">
        + {t("add_task_button")}
      </button>
    </form>
  );
};

export default AddNewTask;
