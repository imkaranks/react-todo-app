import React, { useState, useEffect, useReducer, useRef } from 'react';
import { motion } from 'framer-motion';
import Todo from './components/Todo';
import './App.css'

export const ACTIONS = {
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
  TOGGLE_TODO: "toggle-todo",
  EDIT_TODO: "edit-todo"
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
    case ACTIONS.EDIT_TODO:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, todo: action.payload.todo };
        }
        return item;
      });
    default:
      return state;
  }
}

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function newTodo(todo) {
  const date = new Date();
  return { id: Date.now(), todo, completed: false, time: date.toLocaleTimeString() };
}

export const variant = {
  hide: {
    opacity: 0,
    y: -50
  },
  show: {
    opacity: 1,
    y: 0
  }
}

function App() {
  const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, dispatch] = useReducer(reducer, (existingTodos.length && existingTodos) || [{
    completed: false,
    id: 1687111562467,
    time: "11:36:02 PM",
    todo: "Hey there👋, Feel free to take quick notes📝"
  }]);
  const [todo, setTodo] = useState('');
  const [editMode, setEditMode] = useState({
    status: false,
    id: null
  });
  const inputRef = useRef(null);
  const date = new Date();

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
    if (editMode.status) {
      dispatch({ type: ACTIONS.EDIT_TODO, payload: {id: editMode.id, todo} });
      setEditMode({
        status: false,
        id: null
      });
      setTodo('')
    }
    else if (todo.trim()) {
      dispatch({ type: ACTIONS.ADD_TODO, payload: {todo} })
      setTodo('');
    }
  }

  function editTodo(id, todo) {
    inputRef.current.focus();
    setTodo(todo);
    setEditMode({
      status: true,
      id
    });
  }

  return (
    <div className='w-11/12 max-w-4xl mx-auto'>
      <motion.header
        initial="hide"
        whileInView="show"
        transition={{type: "spring", staggerChildren: 0.3}}
        viewport={{once: true}}
      >
        <motion.h1
          className='text-xl py-4 font-semibold text-center'
          variants={variant}
        >Todays Task</motion.h1>
        <motion.div
          className='flex items-center'
          initial="hide"
          whileInView="show"
          transition={{type: "spring", staggerChildren: 0.3}}
          viewport={{once: true}}
        >
          <motion.div
            className='flex-1 grid gap-2'
            variants={variant}
          >
            <time className='text-3xl font-bold'>{day[date.getDay()]} {date.getDate()}</time>
            <p className='text-gray-400'>{todosAmt} task{todosAmt > 1 && 's'} today</p>
          </motion.div>
          <motion.div
            className='bg-green-300 shadow-lg shadow-green-200 text-white flex justify-center items-center w-[2.625rem] aspect-square rounded-full'
            variants={variant}
          >
            <i className="fa-regular fa-calendar"></i>
          </motion.div>
        </motion.div>
      </motion.header>

      <motion.form
        className='flex gap-4 my-8' onSubmit={handleSubmit}
        variants={variant}
        initial="hide"
        whileInView="show"
        transition={{type: "spring", delay: 1}}
        viewport={{once: true}}
      >
        <label className='sr-only' htmlFor="todo">Add Notes</label>
        <input
          type="text"
          name='todo'
          id='todo'
          value={todo}
          onChange={(ev) => setTodo(ev.target.value)}
          className='w-full flex-1 px-4 py-2 rounded-full shadow-lg shadow-black/10 focus:outline-blue-400'
          placeholder='Add Notes...'
          ref={inputRef}
        />
        <button className='h-[2.625rem] aspect-square text-white bg-red-400 rounded-full shadow-lg shadow-red-200 hover:bg-red-300 active:bg-red-300' type="submit">
          <span className="sr-only">Add Todo</span>
          {
            editMode.status
            ? <i className="fa-solid fa-edit"></i>
            : <i className="fa-solid fa-plus"></i>
          }
        </button>
      </motion.form>

      <section>
        <motion.h2
          className='font-semibold'
          variants={variant}
          initial="hide"
          whileInView="show"
          viewport={{once: true}}
          transition={{type: "spring", delay: 1.5}}
        >
          {completedAmt}
          {" "}
          Out Of {todosAmt} Completed
        </motion.h2>
        <motion.div
          className={`track relative ${todosAmt ? 'w-full' : 'w-0'} flex justify-between items-center py-4 before:content-[''] before:absolute before:-z-20 before:w-full before:h-1 before:bg-red-200`} aria-hidden="true" style={styles}
          initial="hide"
          animate="show"
          transition={{type: "spring", delayChildren: 2, staggerChildren: 0.3}}
        >
          <motion.span
            variants={variant}
            className='bg-red-400 w-2 aspect-square rounded-full'
          ></motion.span>
          {
            todos.map(todo => (
              <motion.span
                variants={variant}
                key={todo.id}
                className='bg-red-400 w-2 aspect-square rounded-full'
              ></motion.span>
            ))
          }
        </motion.div>
      </section>

      <section className='grid gap-4 sm:gap-6'>
        {
          todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              dispatch={dispatch}
              editTodo={editTodo}
            />
          ))
        }
      </section>
    </div>
  );
}

export default App;