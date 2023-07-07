import { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";

export default function AddTask() {

	const [task, setTask] = useState("")
	const { token } = useAuth();

	const addTask = async() => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to add the task to the backend server.
		 * @todo 2. Add the task in the dom.
		 */
		console.log(token)
		const options={
			headers: {
				'Authorization': 'Token ' + token,
				'Content-Type': 'application/json',
			}
		}

		try{
			await axios.post("todo/create/",{title:task},options)
			///note that I am adding window.location.reload() instead of adding tasks in the useEffect hook in the index.js file because it is causing re-renders
			// window.location.reload()
		}
		catch(err){
			console.log(err)
		}

	};

	return (
		<div className="flex items-center max-w-sm mt-24">
			<input
				type="text"
				name="task"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
				value={task}
				onChange={(e)=>setTask(e.target.value)}
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
