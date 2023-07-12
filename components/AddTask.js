import { useState } from "react";
import { useAuth } from "../context/auth";
import { API_URL } from '../utils/constants'
import axios from "../utils/axios";

export default function AddTask() {

	const [task,setTask] = useState("");
	const { token } = useAuth();

	const addTask = () => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to add the task to the backend server.
		 * @todo 2. Add the task in the dom.
		 */
		if(task.length===0) console.log("Enter a task")
		else{
			axios({
				headers:{
					Authorization:'Token '+token
				},
				url:API_URL + 'todo/create/',
				method:'POST',
				data:{
					title: task
				}
			}).then(({data,status}) =>{
				setTask("");
				console.log("Task successfully Added")
			}).catch((err)=>{
				console.log("Task not Added")
			})
		}
	};

	return (
		<div className="flex items-center max-w-sm mt-24">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
				value={task}
				onChange={(e)=>{setTask(e.target.value)}}
			/>
			<button
				type="button"
				className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
				onClick={addTask}>
				Add Task
			</button>
		</div>
	);
}
