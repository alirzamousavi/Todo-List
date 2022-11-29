import React, { useContext } from "react";
import styles from "./TaskList.module.scss";
import TaskItem from "./TaskItem";
import ThemeContext from "../context/theme-context";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../store/index";

const TaskList = () => {
  const { t } = useTranslation();

  const tasksList = useSelector((state: RootState) => state.todo.auxiliaryList);

  const themeCtx = useContext(ThemeContext);

  if (tasksList.length === 0) {
    return (
      <div className={`${styles["tasks-list"]} ${styles[themeCtx.theme]}`}>
        <p className={styles.message}>{t("empty_tasks_list")}</p>
      </div>
    );
  }

  return (
    <div className={`${styles["tasks-list"]} ${styles[themeCtx.theme]}`}>
      {tasksList.map((task) => {
        return (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.name}
            checked={task.checked}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
