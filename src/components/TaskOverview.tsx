import React, { useState, useEffect, useContext } from "react";
import styles from "./TaskOverview.module.scss";
import boxStyles from "./BoxStyle.module.scss";
import ThemeContext from "../context/theme-context";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../store/index";

const TaskOverview = () => {
  const { t } = useTranslation();

  // It counts tasks that are checked.
  const [checkedTasksCounter, setCheckedTasksCounter] = useState<number>(0);

  const tasksList = useSelector((state: RootState) => state.todo.mainList);

  const themeCtx = useContext(ThemeContext);

  // Counts the number of checked tasks.
  useEffect(() => {
    // It counts the number of tasks that are checked.
    let counter: number = 0;

    tasksList.forEach((task) => {
      if (task.checked === true) counter++;
    });

    setCheckedTasksCounter(counter);
  }, [tasksList]);

  return (
    <div className={styles.overview}>
      <div className={`${boxStyles.box} ${styles[themeCtx.theme]}`}>
        <label>{t("total_tasks_overview")}:</label>
        <span>{tasksList.length}</span>
      </div>
      <div className={`${boxStyles.box} ${styles[themeCtx.theme]}`}>
        <label>{t("checked_tasks_overview")}:</label>
        <span>{checkedTasksCounter}</span>
      </div>
    </div>
  );
};

export default TaskOverview;
