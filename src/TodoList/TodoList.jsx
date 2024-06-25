// src/TodoList/TodoList.jsx
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { addTodo, editTodo, deleteTodo, clearTodos, toggleTodoStatus } from '../todoSlice';
import './styles.css';

function TodoList() {
  const inputText = useRef();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputText.current.value.trim();
    if (value) {
      if (editIndex !== null) {
        dispatch(editTodo({ index: editIndex, text: value }));
        setEditIndex(null);
      } else {
        dispatch(addTodo(value));
      }
      inputText.current.value = '';
    } else {
      alert("error");
    }
  };

  const handleEdit = (index) => {
    inputText.current.value = todos[index].text;
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    dispatch(deleteTodo(index));
  };

  const clearAll = () => {
    dispatch(clearTodos());
  };

  const toggleStatus = (index) => {
    dispatch(toggleTodoStatus(index));
  };

  // Sort todos so that active ones are on top
  const sortedTodos = [...todos].sort((a, b) => a.status === 'inactive' ? 1 : -1);

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='  w-[500px] h-[500px] bg-white rounded-sm ml-auto mr-auto mt-[100px] p-7'>
          <h1 className='font-bold text-3xl'>Todo App</h1>
          <div className='flex gap-2 mt-5'>
            <input ref={inputText} className='outline-none border w-[80%] h-[40px] border-gray-300 p-3' type="text" placeholder='Enter text...' />
            <button type="submit" className='w-12 h-10 text-center bg-purple-600 font-bold text-2xl text-white cursor-pointer'>+</button>
          </div>
          <div className='mt-6'>
            {sortedTodos.map((todo, index) => (
              <div key={index} className={`flex mt-2 ${todo.status === 'inactive' ? 'opacity-50' : ''}`}>
                <div className={`w-[80%] bg-slate-100 rounded-sm p-3 ${todo.status === 'inactive' ? 'line-through' : ''}`}>
                  <h2 onClick={() => toggleStatus(index)} className='cursor-pointer'>{todo.text}</h2>
                </div>
                <div className='flex gap-2 ml-2'>
                  <MdModeEditOutline onClick={() => handleEdit(index)} className='text-green-600 w-7 h-7 mt-2 cursor-pointer' />
                  <MdDelete onClick={() => handleDelete(index)} className='text-red-600 w-7 h-7 mt-2 cursor-pointer' />
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between mt-8 items-center'>
            <h3 className='text-[18px]'>You have pending {sortedTodos.filter(todo => todo.status === 'active').length} tasks</h3>
            <button type="button" onClick={clearAll} className='w-[80px] h-[35px] text-white font-semibold bg-purple-600'>Clear all</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoList;
