import React from "react";
import "./TaskFilter.css";

const TaskFilter = (props) => {
  const inputChangeHandler = (event) => {
    let list = [];

    // If user enter a value in search box, this function runs and filters the tasks list.
    if (event.target.value.length > 0) {
      list = props.tasks.filter((task) => {
        return task.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    } else {
      // If search box is empty, show all tasks.
      list = props.tasks;
    }

    props.onSearchList(list);
  };

  return (
    <div>
      <div className="filter-task">
        <input
          onChange={inputChangeHandler}
          type="text"
          className="box"
          placeholder="Pesquisar uma terfa"
        />
      </div>
    </div>
  );
};

export default TaskFilter;
