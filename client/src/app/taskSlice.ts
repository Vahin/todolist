import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  error?: string | null;
};

const initialState: InitialState = {
  tasks: [],
  status: "pending",
  error: null,
};

type CreateNewTaskPayloadType = {
  content: string;
};

type RemoveTaskPayloadType = {
  id: number;
};

type toggleTaskStatusPayloadType = {
  id: number;
  content: string;
  completed: boolean;
};

export const fetchTasks = createAsyncThunk<
  TTask[],
  undefined,
  { rejectValue: string }
>("tasks/fetchTodo", async (_, { rejectWithValue }) => {
  try {
    const result = await tasksApi.getTasks();

    return result;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const createNewTask = createAsyncThunk<
  TTask,
  CreateNewTaskPayloadType,
  { rejectValue: string }
>("tasks/createNewTask", async ({ content }, { rejectWithValue }) => {
  try {
    const createdAt = new Date().toISOString();
    const result = await tasksApi.createTask({ content, createdAt });

    return result;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const removeTask = createAsyncThunk<
  RemoveTaskPayloadType,
  RemoveTaskPayloadType,
  { rejectValue: string }
>("tasks/removeTask", async ({ id }, { rejectWithValue }) => {
  try {
    await tasksApi.removeTask({ id: String(id) });

    return { id };
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const toggleTaskStatus = createAsyncThunk<
  TTask,
  toggleTaskStatusPayloadType,
  { rejectValue: string }
>(
  "tasks/toggleTaskStatus",
  async ({ id, content, completed }, { rejectWithValue }) => {
    try {
      const result = await tasksApi.updateTask({ id, content, completed });

      return result;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (!task) return;

        task.completed = action.payload.completed;
      });
  },
});

export default taskSlice.reducer;
