import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todoSlice from "./todo-slice";

// Here we configure our store and asssign reducer from todoSlice as our main reducer.
const store = configureStore({
  reducer: { todo: todoSlice.reducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
