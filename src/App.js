import "./App.css";
import Header from "./UI/Header";
import AddNewTask from "./components/AddNewTask";
import TaskOverview from "./components/TaskOverview";
import { useState, useEffect } from "react";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

const TASKS_LIST = [
  {
    id: 1,
    name: "nova tarefa",
    checked: false,
  },
  {
    id: 2,
    name: "estudor react",
    checked: true,
  },
  {
    id: 3,
    name: "lavar carro",
    checked: true,
  },
  {
    id: 4,
    name: "dormir as 22h",
    checked: false,
  },
  {
    id: 5,
    name: "limpar o quarto",
    checked: true,
  },
  {
    id: 6,
    name: "meditar",
    checked: false,
  },
];

function App() {
  const [mainTasksList, setMainTasksList] = useState(TASKS_LIST);
  const [tasksList, setTasksList] = useState(TASKS_LIST);

  useEffect(() => {
    setTasksList(mainTasksList);
  }, [mainTasksList]);

  //Adding new added task to the tasks list
  const addTaskHandler = (addedTask) => {
    setMainTasksList((prevList) => {
      return [addedTask, ...prevList];
    });
  };

  //This function filters tasks list according to what user searched
  const searchListHandler = (filteredList) => {
    setTasksList(filteredList);
  };

  // Updating the tasks list, when user delete a task
  const deleteTaskHandler = (id) => {
    const tasksListCopy = mainTasksList.filter((task) => {
      return task.id !== id;
    });

    setMainTasksList(tasksListCopy);
  };

  // Changing the state of a task to checked/not checked and updating the tasks list
  const onCheckedTask = (id) => {
    const tasksListCopy = [...mainTasksList];
    for (let i = 0; i < tasksListCopy.length; i++) {
      if (tasksListCopy[i].id === id) {
        tasksListCopy[i].checked = !tasksListCopy[i].checked;
      }
    }

    setMainTasksList(tasksListCopy);
  };

  return (
    <div className="container">
      <Header />
      <AddNewTask onAddTask={addTaskHandler} tasks={mainTasksList} />
      <TaskFilter onSearchList={searchListHandler} tasks={mainTasksList} />
      <TaskList
        onDelete={deleteTaskHandler}
        onCheck={onCheckedTask}
        tasks={tasksList}
      />
      <TaskOverview tasks={mainTasksList} />
    </div>
  );
}

export default App;
