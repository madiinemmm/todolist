// src/store/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({ text: action.payload, status: 'active' });
    },
    editTodo: (state, action) => {
      const { index, text } = action.payload;
      state.items[index].text = text;
    },
    deleteTodo: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    clearTodos: (state) => {
      state.items = [];
    },
    toggleTodoStatus: (state, action) => {
      const todo = state.items[action.payload];
      todo.status = todo.status === 'active' ? 'inactive' : 'active';
    }
  },
});

export const { addTodo, editTodo, deleteTodo, clearTodos, toggleTodoStatus } = todoSlice.actions;

export default todoSlice.reducer;
