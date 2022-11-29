import React, { useContext } from "react";
import styles from "./TaskFilter.module.scss";
import boxStyles from "./BoxStyle.module.scss";
import ThemeContext from "../context/theme-context";
import { useSelector } from "react-redux";
import { todoActions } from "../store/todo-slice";
import { useTranslation } from "react-i18next";
import { RootState, useAppDispatch } from "../store/index";
import { listType } from "../store/todo-slice";

const TaskFilter = () => {
  const { t } = useTranslation();

  const tasksList = useSelector((state: RootState) => state.todo.mainList);
  const dispatch = useAppDispatch();

  const themeCtx = useContext(ThemeContext);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // list has the all tasks that match with the searched value.
    let list: listType[] = [];

    // If user enters a value in search box, this function runs and filters the tasks list.
    if (event.target.value.length > 0) {
      list = tasksList.filter((task) => {
        return task.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    } else {
      // If search box is empty, show all tasks.
      list = tasksList;
    }

    dispatch(todoActions.searchInList(list));
  };

  return (
    <div className={`${styles["filter-task"]} ${styles[themeCtx.theme]}`}>
      <input
        onChange={inputChangeHandler}
        type="text"
        className={`${boxStyles.box} ${styles[themeCtx.theme]}`}
        placeholder={t("search_task_input")}
      />
    </div>
  );
};

export default TaskFilter;
