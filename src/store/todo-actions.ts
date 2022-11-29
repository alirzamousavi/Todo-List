import { todoActions } from "./todo-slice";
import { AppDispatch } from "./index";

// This thunk action creator is used for initializing the main list from data that stored in browser local storage on first load.
export const getTasksData = (): ((dispatch: AppDispatch) => void) => {
  return (dispatch: AppDispatch) => {
    // If nothing were already saved in local storage, create an empty array in there.
    if (JSON.parse(localStorage.getItem("tasks")!) === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }

    const list = JSON.parse(localStorage.getItem("tasks")!);

    dispatch(todoActions.updateMainList(list));
  };
};
