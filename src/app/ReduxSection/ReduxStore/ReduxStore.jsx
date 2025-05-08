// store.js
import { configureStore } from '@reduxjs/toolkit';
import TaskRaducer from '../TaskReducer/TaskReducer';

export const store = configureStore({
    reducer: { TaskData: TaskRaducer },
});