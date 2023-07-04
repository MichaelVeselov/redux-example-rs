import { createSlice } from '@reduxjs/toolkit';
import todoService from '../services/todo.service';
import { setError } from './errors';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const index = state.entities.findIndex(
        (item) => item.id === action.payload.id
      );
      state.entities[index] = { ...state.entities[index], ...action.payload };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload.id
      );
    },
    taskRequested(state, action) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
    add(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { received, update, remove, taskRequested, taskRequestFailed, add } =
  actions;

export const loadAllTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todoService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const createTask = () => async (dispatch) => {
  try {
    const data = await todoService.add();
    dispatch(add(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const getTasks = () => (state) => state.tasks.entities;

export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
