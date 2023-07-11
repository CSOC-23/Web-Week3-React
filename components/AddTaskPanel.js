import React, {useEffect} from "react";
import Image from 'next/image';
import { update } from "tar";
import {v4 as uuidv4} from "uuid";

const AddTaskPanel = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
// const AddTaskPanel = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => 
      todo.id === id ? {title, id, completed } : todo
     )
    setTodos(newTodo)
    setEditTodo("")
  }
  useEffect(() => {
    if(editTodo){
      setInput(editTodo.title)
    }
    else{
      setInput("")
    }
  }, [setInput, editTodo  ])

   const onInputChange = (event) => {
      setInput(event.target.value)
   }

   const onFormSubmit = (event) => {
      event.preventDefault()
      if(!editTodo){
        setTodos([...todos, {id: uuidv4(), title: input, completed: false}])
        setInput("")
      }
      else{
        updateTodo(input, editTodo.id, editTodo.completed)
      }
      // setTodos([...todos, {id: uuidv4(), title: input, completed: false}])
      // setInput("")
   }

  return (
    <div className="mt-15">
      <h2 className="flex" style={{ color: "#002765" }}>
        To-Do List{" "}
        <Image
          src="https://www.iconpacks.net/icons/1/free-notebook-icon-1121-thumb.png"
          alt=""
          style={{ height: "5vh" }}
        />
      </h2>
      
      <form className="row g-3 ms-1 my-1" style={{ width: "100%" }} onSubmit={onFormSubmit}>
          <div className="col-auto">
          <input
            type="text" 
            value={input}
            required
            onChange={onInputChange}
            className="form-control me-5"
            className="form-control me-5"
            placeholder="Enter Your Task"
          />
          </div>
          <div className="col-auto">
          <button
            type="submit"
            className="btn btn-outline-success mb-3 me-0 fixed-right float-right"
          >
            {editTodo ? "OK" : "ADD"}
          </button>
          </div>
      </form>

      <span className="badge text-bg-primary mb-4 ms-3">Current Tasks</span>
    </div>
  );
}

export default AddTaskPanel
