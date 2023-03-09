import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  taskslist: [],
  selectedtask: {},
  isLoading: false,
  error: "",
};

const BASE_URL = "http://localhost:8000/tasks";

// GET
export const getTasksFromServer = createAsyncThunk(
  "tasks/getTasksFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "no task found" });
    }
  }
);

//POST

export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Added" });
    }
  }
);

//PATCH

export const updateTaskInServer = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Updated" });
    }
  }
);
//DELETE

export const deleteTaskInServer = createAsyncThunk(
  "tasks/deleteTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Task Not Deleted" });
    }
  }
);

const tasksSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTaskToList: (state, action) => {
      const id = Math.random() * 100;
      let task = { ...action.payload, id };
      state.taskslist.push(task);
    },

    removeTaskList: (state, action) => {
      state.taskslist = state.taskslist.filter(
        (task) => task.id !== action.payload.id
      );
    },

    updateTaskList: (state, action) => {
      state.taskslist = state.taskslist.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },

    setSelectedTask: (state, action) => {
      state.selectedtask = action.payload;
      console.log(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTasksFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.taskslist = action.payload;
      })
      .addCase(getTasksFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.taskslist = [];
      });
    builder
      .addCase(addTaskToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.taskslist.push(action.payload);
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });

    builder
      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.taskslist = state.taskslist.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
    builder
      .addCase(deleteTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteTaskInServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const {
  addTaskToList,
  removeTaskList,
  updateTaskList,
  setSelectedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
