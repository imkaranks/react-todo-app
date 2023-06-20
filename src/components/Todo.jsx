import React from 'react';
import { ACTIONS } from '../App';

function Todo({ todo, dispatch, editTodo }) {
  return (
    <div className='flex flex-wrap items-center gap-1 sm:gap-4'>
      <time className='w-full text-gray-400 sm:w-auto sm:flex-[0.2]' dateTime={`${todo.time.split(' ')[0]}`}>{todo.time}</time>
      <div className='flex w-full items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg shadow-lg shadow-black/10 sm:w-auto sm:flex-[0.8]'>
        <span className={`flex-1 ${todo.completed ? 'text-black' : 'text-gray-500'}`}>{todo.todo}</span>
        <button
          onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}
          className='inline-flex self-start justify-center items-center w-8 aspect-square rounded-full transition-colors ease-linear hover:bg-blue-300 active:bg-blue-300'
        >
          <span className="sr-only">Toggle</span>
          <i className={`fa-solid ${todo.completed ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo.id } })}
          className='inline-flex self-start justify-center items-center w-8 aspect-square rounded-full transition-colors ease-linear hover:bg-blue-300 active:bg-blue-300'
        >
          <span className="sr-only">Delete</span>
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <button
          onClick={() => editTodo(todo.id)}
          className='inline-flex self-start justify-center items-center w-8 aspect-square rounded-full transition-colors ease-linear hover:bg-blue-300 active:bg-blue-300'
        >
          <span className="sr-only">Edit</span>
          <i className="fa-solid fa-edit"></i>
        </button>
      </div>
    </div>
  );
}

export default Todo;