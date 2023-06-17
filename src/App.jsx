import React, { useState, useEffect, useReducer } from 'react';
import Todo from './components/Todo';
import './App.css'

export const ACTIONS = {
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
  TOGGLE_TODO: "toggle-todo"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...state, newTodo(action.payload.todo)];
    case ACTIONS.REMOVE_TODO:
      return state.filter(item => {
        return item.id !== action.payload.id;
      });
    case ACTIONS.TOGGLE_TODO:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {...item, completed: !item.completed};
        }
        return item;
      });
    default:
      return state;
  }
}

const date = new Date();
const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function newTodo(todo) {
  return { id: Date.now(), todo, completed: false, time: date.toLocaleTimeString() };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')) || []);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const completedAmt = todos.reduce((count, todo) => {
    if (todo.completed) return count + 1;
    return count;
  }, 0);
  const todosAmt = todos.length;
  const styles = {
    '--completed': completedAmt,
    '--total': todosAmt
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: {todo} })
    setTodo('');
  }

  return (
    <div className='w-11/12 max-w-4xl mx-auto'>
      <header>
        <h1 className='text-xl py-4 font-semibold text-center'>Todays Task</h1>
        <div className='flex items-center'>
          <div className='flex-1'>
            <time className='text-2xl font-bold'>{day[date.getDay()]} {date.getDate()}</time>
            <p className='text-gray-400'>{todosAmt} task{todosAmt > 1 && 's'} today</p>
          </div>
          <div className='bg-green-400 flex justify-center items-center w-10 aspect-square rounded-full'>
            <i className="fa-regular fa-calendar"></i>
          </div>
        </div>
      </header>

      <form className='flex gap-4 my-8' onSubmit={handleSubmit}>
        <label className='sr-only' htmlFor="todo">Add Notes</label>
        <input
          type="text"
          name='todo'
          id='todo'
          value={todo}
          onChange={(ev) => setTodo(ev.target.value)}
          className='w-full flex-1 px-4 py-2 rounded-full focus:outline-blue-400'
          placeholder='Add Notes...'
        />
        <button className='h-[2.625rem] aspect-square bg-red-400 rounded-full' type="submit">
          <span className="sr-only">Add Todo</span>
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>

      <section>
        <h2 className='font-semibold'>
          {completedAmt}
          {" "}
          Out Of {todosAmt} Completed
        </h2>
        <div className={`track relative ${todosAmt ? 'w-full' : 'w-0'} flex justify-between items-center py-4 before:content-[''] before:absolute before:-z-20 before:w-full before:h-1 before:bg-red-200`} style={styles}>
          <span className='bg-red-400 w-2 aspect-square rounded-full'></span>
          {
            todos.map(todo => (
              <span key={todo.id} className='bg-red-400 w-2 aspect-square rounded-full'></span>
            ))
          }
        </div>
      </section>

      <section className='grid gap-4 sm:gap-6'>
        {
          todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              dispatch={dispatch}
            />
          ))
        }
      </section>
    </div>
  );
}

export default App;