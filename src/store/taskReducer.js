import { taskUpdated, taskDeleted } from './actionTypes';

export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskUpdated: {
      const newArray = [...state];
      const index = newArray.findIndex((item) => item.id === action.payload.id);
      newArray[index] = { ...newArray[index], ...action.payload };
      return newArray;
    }

    case taskDeleted: {
      const newArray = [...state].filter(
        (item) => item.id !== action.payload.id
      );
      return newArray;
    }

    default:
      return state;
  }
}
