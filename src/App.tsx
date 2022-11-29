import { useState, useEffect, useContext } from "react";
import styles from "./App.module.scss";
import AddNewTask from "./components/AddNewTask";
import TaskOverview from "./components/TaskOverview";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import ThemeContext from "./context/theme-context";
import { useSelector } from "react-redux";
import { todoActions } from "./store/todo-slice";
import { getTasksData } from "./store/todo-actions";
import Heading from "./UI/Heading";
import Menu from "./UI/Menu";
import useLanguage from "./Hooks/useLanguage";
import { RootState, useAppDispatch } from "./store/index";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme")!);

  const { language } = useLanguage();

  // This state is used to update the App component and re-render it when the language changed. Without this, the language
  // will change, but the styles will not be applied until the page is refreshed again.
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const tasksList = useSelector((state: RootState) => state.todo.mainList);
  const dispatch = useAppDispatch();

  const themeCtx = useContext(ThemeContext);

  useEffect(() => {
    dispatch(getTasksData());
  }, [dispatch]);

  // Whenever theme changes, sets the current theme to the context(Theme Context)
  // and saves it in local storage.
  useEffect(() => {
    themeCtx.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme, themeCtx]);

  // Updates the browser local storage and auxiliary tasks list whenever a change happens like add,
  // delete or changing the state of a task to checked or not checked).
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
    dispatch(todoActions.auxiliaryListAssignment());
  }, [tasksList, dispatch]);

  // It updates the theme state to the selected theme. If the current theme was light, sets it to dark and vice versa.
  const changeThemeHandler = () => {
    if (themeCtx.theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        onChangeTheme: changeThemeHandler,
      }}
    >
      <Menu onReload={setCurrentLanguage} />
      <div
        className={`${styles.container} ${styles[theme]}`}
        lang={currentLanguage}
      >
        <Heading />
        <AddNewTask />
        <TaskFilter />
        <TaskList />
        <TaskOverview />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
