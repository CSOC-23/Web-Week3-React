import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";

export default function AddTask({ updateTasks }) {
	const backendUrl = "https://todo-api-s7vj.onrender.com"
	const { token } = useAuth();
	const [taskData, setTaskdata] = useState()

	const addTask = () => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to add the task to the backend server.
		 * @todo 2. Add the task in the dom.
		 */
		console.log("Token :", token)

		axios.post(`${backendUrl}/todo/create/`, { title: taskData }, {
			headers: {
				Authorization: `Token ${token}`, 
			},
			})
			.then(response => {
				console.log('Todo created successfully:', response);
				// updateTasks will call the getTasks() function defined in index.js which will rerender all the tasks including the newer task which is just added
				updateTasks() 
			})
			.catch(error => {
				console.error('Error creating todo:', error);
			});

	};

	return (
		<div className="flex items-center max-w-lg mt-2 mb-8 justify-center">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
				onChange={(e) => { setTaskdata(e.target.value) }}
			/>
			<button
				type="button"
				className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-md hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
				onClick={addTask}>
				Add Task
			</button>
		</div>
	);
}
