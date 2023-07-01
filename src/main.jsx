import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { initiateStore } from './store/store';
import * as actions from './store/actions';

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));
  };

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  return (
    <>
      <h1>App...</h1>

      {state.map((item) => (
        <li key={item.id}>
          <p>{item.title}</p>
          <p>{`Completed: ${item.completed}`}</p>
          <button onClick={() => completeTask(item.id)}>Complete</button>
          <button onClick={() => changeTitle(item.id)}>Change title</button>
          <button onClick={() => deleteTask(item.id)}>Delete</button>
          <hr />
        </li>
      ))}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
