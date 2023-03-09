import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tasksApi } from "../api/taskApi";

export type TTask = {
  id: number;
  content: string;
  completed: boolean;
  createdAt: string;
};

type InitialState = {
  tasks: TTask[];
  status: "pending" | "fulfilled" | "rejected";
  error: string | null;
};

const initialState: InitialState = {
  tasks: [],
  status: "pending",
  error: null,
};

type CreateNewTaskType = {
  content: string;
};

type removeTaskPayloadType = {
  id: number;
};

type toggleTaskStatusPayloadType = {
  id: number;
  content: string;
  completed: boolean;
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTodo",
  async (_, { rejectWithValue }) => {
    try {
      const result = await tasksApi.getTasks();

      return result;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createNewTask = createAsyncThunk(
  "tasks/createNewTask",
  async ({ content }: CreateNewTaskType, { rejectWithValue }) => {
    try {
      const createdAt = new Date().toISOString();
      const result = await tasksApi.createTask({ content, createdAt });

      return result;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  ({ id }: removeTaskPayloadType, { rejectWithValue }) => {
    try {
      tasksApi.removeTask({ id: String(id) });

      return { id };
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "task/toggleTaskStatus",
  async (
    { id, content, completed }: toggleTaskStatusPayloadType,
    { rejectWithValue }
  ) => {
    try {
      const result = await tasksApi.updateTask({ id, content, completed });

      return result;
    } catch (err: any) {
      rejectWithValue(err.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action: any) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(createNewTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(createNewTask.rejected, (state, action: any) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    builder.addCase(removeTask.fulfilled, (state, action: any) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    });
    builder.addCase(toggleTaskStatus.fulfilled, (state, action: any) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (!task) return;

      task.completed = action.payload.completed;
    });
  },
});

export default taskSlice.reducer;
