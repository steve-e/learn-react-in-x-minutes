import React, {useState, useRef, iseEffect, useEffect} from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const LOCAL_STORAGE_KEY = "todoApp.todos"

  const todoNameRef = useRef()
  const [todos, setTodos] = useState([
  //  {id:1, name: 'Todo 1', complete:false}
  ])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos) 
  },[])

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos), [todos])
    }
  )

  function toggleTodo(id) {
      const newTodos = [...todos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.complete = !todo.complete
      setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === null) return
    setTodos(prevTodos => {
      return [...prevTodos, {id:uuidv4(), name:name, complete:false}]
    })
    todoNameRef.current.value = null
    return null;
  }

  function handleClearTodos() {

    setTodos(prevTodos => {
      return [...prevTodos].filter(t => !t.complete)
    })
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos} >Clear completed</button>
    <div>{todos.filter(t => !t.complete).length} left to do</div>
    </>
  )
}

export default App;
