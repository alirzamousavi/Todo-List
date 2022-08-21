import React from "react";
import "./TaskOverview.css";
import "./BoxStyle.css";

const TaskOverview = (props) => {
  let checkedTaskCounter = 0;

  // Counts the number of checked tasks.
  props.tasks.forEach((task) => {
    if (task.checked === true) checkedTaskCounter++;
  });

  return (
    <div className="overview">
      <div className="box">
        <label>total de tarefas:</label>
        <span>{props.tasks.length}</span>
      </div>
      <div className="box">
        <label>total de tarefas concluidas:</label>
        <span>{checkedTaskCounter}</span>
      </div>
    </div>
  );
};

export default TaskOverview;
