import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice";

const Store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default Store;
