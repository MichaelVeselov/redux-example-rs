import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider, useSelector, useDispatch } from 'react-redux';

import configureStore from './store/store';

import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadAllTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask,
} from './store/task';

import { getError } from './store/errors';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());

  const dispatch = useDispatch();

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  useEffect(() => {
    dispatch(loadAllTasks());
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App...</h1>

      <button onClick={() => dispatch(createTask())}>Add task</button>

      {state.map((item) => (
        <li key={item.id}>
          <p>{item.title}</p>
          <p>{`Completed: ${item.completed}`}</p>
          <button onClick={() => dispatch(completeTask(item.id))}>
            Complete
          </button>
          <button onClick={() => changeTitle(item.id)}>Change title</button>
          <button onClick={() => deleteTask(item.id)}>Delete</button>
          <hr />
        </li>
      ))}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
