import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface listType {
  id: number;
  name: string;
  checked: boolean;
}

type sliceType = {
  mainList: listType[];
  auxiliaryList: listType[];
};

const initialState: sliceType = {
  mainList: [],
  auxiliaryList: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Updates the main list with the tasks in local storage on first load.
    updateMainList(state, action: PayloadAction<listType[]>): void {
      state.mainList = action.payload;
    },
    // Adds new added task to the tasks list
    addTaskToList(
      state,
      action: PayloadAction<{ id: number; name: string }>
    ): void {
      const newTask = action.payload;
      // The reason for using unshift is to add the new task to the beginning of the list.
      // Therefore, when displaying tasks, the new task is placed at the top of the list.
      state.mainList.unshift({
        id: newTask.id,
        name: newTask.name,
        checked: false,
      });
    },
    // Updates the tasks list, when user delete a task.
    removeTaskFromList(state, action: PayloadAction<number>): void {
      state.mainList = state.mainList.filter(
        (task) => task.id !== action.payload
      );
    },
    // This function filters tasks list according to what user searched.
    searchInList(state, action: PayloadAction<listType[]>): void {
      const list = action.payload;
      state.auxiliaryList = list;
    },
    // Changes the state of a task to checked/not checked and updates the tasks list
    checkTask(state, action: PayloadAction<number>): void {
      const taskIndex = state.mainList.findIndex(
        (task) => task.id === action.payload
      );
      state.mainList[taskIndex].checked = !state.mainList[taskIndex].checked;
    },
    // This function is called when a change occurs in the main list. It is used to sync the auxiliary list with the main list,
    // because we use the second list for displaying tasks.
    auxiliaryListAssignment(state): void {
      state.auxiliaryList = state.mainList;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
