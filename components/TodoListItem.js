/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react"; 
import Image from 'next/image';
import { event } from "jquery";

const TodoListItem = ({ todos, setTodos, setEditTodo }) => {

  const editTask = ({id}) => {
    /**
     * @todo Complete this function.
     * @todo 1. Update the dom accordingly
     */
    const findTodo = todos.find((todo) => todo.id === id)
    setEditTodo(findTodo)
  };

  const deleteTask = ({id}) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
    setTodos(todos.filter((todo) => todo.id !== id))
  };

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
  };

  return (
    <>

      {todos.map((todo) => (
        <li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2" key={todo.id}>
        {/* <li className="border flex rounded px-2 py-2 justify-between items-center mb-2" key={todo.id}> */}

				<input className="todo-task  text-gray-600 {`list ${todo.completed ? 'complete' : ''}`}" type="text" value={todo.title} onChange={(event) => event.preventDefault()}/>
				<span>
					<button
						style={{ marginRight: "5px" }}
						type="button"
						onClick={() => editTask(todo)}
						className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2">
						<Image
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
							width="18px"
							height="20px"
							alt="Edit"
						/>
					</button>
					<button
						type="button"
						className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
						onClick={() => deleteTask(todo)}>
						<Image
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
							width="18px"
							height="22px"
							alt="Delete"
						/>
					</button>
				</span>
			</li>

      // <li key={todo.id}>
      //   <input type="text" value={todo.title} onChange={(event) => event.preventDefault()}/>
      //   <div>
      //     <button
			// 			type="button"
			// 			className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
			// 			onClick={() => deleteTask(todo)}>
			// 			<img
			// 				src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
			// 				width="18px"
			// 				height="22px"
			// 				alt="Delete"
			// 			/>
			// 		</button>
      //   </div>
      // </li>
      ))}

      {/* {todos.map((todo) => (
        <li key={todo.id}>
          <input type="text" value={todo.title} onChange={(event) => event.preventDefault()}/>
        </li>
      ))} */}
    </>
  );
}

export default TodoListItem
