import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import callAPI from '../axios/axios'

// First, create the thunk
export const fetchAsyncCategories = createAsyncThunk(
  'todo/fetchAsyncCategories',
  async (arg) => {
    const res = await callAPI("/api/categories", "get", null)
    return res.data
  }
)

export const fetchAsyncGetTasks = createAsyncThunk(
  'todo/fetchAsyncGetTasks',
  async (arg) => {
    const res = await callAPI("/api/tasks", "get", null)
    return res.data
  }
)

export const fetchAsyncPostTasks = createAsyncThunk(
  'todo/etchAsyncPostTasks',
  async (arg) => {
    const res = await callAPI("/api/tasks", "post", arg)
    return res.data
  }
)

export const fetchAsyncDeleteTasks = createAsyncThunk(
  'todo/fetchAsyncDeleteTasks',
  async (id) => {
    await callAPI(`/api/tasks/${id}`, "delete", null)
    return id;
  }
)

export const fetchAsyncPatchTasks = createAsyncThunk(
  'todo/fetchAsyncPatchTasks',
  async (arg) => {
    const res = await callAPI(`api/tasks/${arg.id}`, "PATCH", arg.data)
    return {response:res.data, arg};
  }
)

export const fetchAsyncSearchTasks = createAsyncThunk(
  'todo/fetchAsyncSearchTasks',
  async (arg) => {
    const res = await callAPI(`/api/tasks?title=${arg}`, "get", null)
    return res.data
  }
)

export const fetchAsyncScrollTasks = createAsyncThunk(
  'todo/fetchAsyncScrollTasks',
  async (arg) => {
    const res = await callAPI(`/api/tasks?limit=10&page=${arg}`, "get", null)
    return res.data
  }
)

const initialState = {
  categories: [],
  tasks: []
};

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  extraReducers: {
    [fetchAsyncCategories.fulfilled]: (state, action) => {
      return { ...state, categories: action.payload.data }
    },
    [fetchAsyncPostTasks.fulfilled]: (state, action) => {
      const newTasks = [...state.tasks];
      newTasks.push(action.payload.data);
      return { ...state, tasks: newTasks}
    },
    [fetchAsyncGetTasks.fulfilled]: (state, action) => {
      return { ...state, tasks: action.payload.data }
    },
    [fetchAsyncDeleteTasks.fulfilled]: (state, action) => {
      const newTasks = [...state.tasks];
      const arr = newTasks.filter((item) => item.id !== action.payload)
      return { ...state, tasks: arr}
    },
    [fetchAsyncPatchTasks.fulfilled]: (state, action) => {
      const newTasks = [...state.tasks];
      const arr = newTasks.map((todo) => {
      if(Object.keys(action.payload.response.data).length !== 0){
        if (todo.id === action.payload.arg.id) {
          return {
            ...todo,
            title: action.payload.arg.data.title,
            categories: action.payload.response.data.categories
          };
        } else {
          return todo;
        }
        }
        else {
          return todo
        }
      })
      
      return { ...state, tasks: arr};
    },
    [fetchAsyncSearchTasks.fulfilled]: (state, action) => {
      return { ...state, tasks: action.payload.data}
    },
    [fetchAsyncScrollTasks.fulfilled]: (state, action) => {
      const newTasks = [];
      action.payload.data.forEach((task) => newTasks.push(task));
      return { ...state, tasks: [...state.tasks, ...newTasks]}
    }
}
})

export const reducer = addTodoReducer.reducer;