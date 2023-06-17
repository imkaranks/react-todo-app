import React from 'react';
import { ACTIONS } from '../App';

function Todo({ todo, dispatch }) {
  return (
    <div className='flex items-center gap-4'>
      <time className='flex-[0.2] text-gray-400' dateTime={`${todo.time.split(' ')[0]}`}>{todo.time}</time>
      <div className='flex flex-[0.8] gap-4 bg-blue-200 px-4 py-2 rounded-full'>
        <span className={`flex-1 ${todo.completed ? 'text-black' : 'text-gray-600'}`}>{todo.todo}</span>
        <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}>
          <span className="sr-only">Toggle</span>
          <i class={`fa-solid ${todo.completed ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo.id } })}>
          <span className="sr-only">Delete</span>
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}

export default Todo;