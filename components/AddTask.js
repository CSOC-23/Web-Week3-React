import axios from "../utils/axios";
import { useState } from "react";
export default function AddTask({ add, token }) {
	const addTask = async () => {
		/**
		 * @todo Complete this function.
		 * @done 1. Send the request to add the task to the backend server.
		 * @todo 2. Add the task in the dom.
		 */
		try {
			let id = await fetch(
				"https://todo-api-s7vj.onrender.com/todo/create/",
				{
					method: "POST",
					headers: {
						Authorization: `Token ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: title,
					}),
				}
			).then(k=>k.json());
			console.log(id , " is the id recieved");
			add({title,id});
			setTitle("");
		} catch (err) {
			console.log(err);
		}
	};
	const [title, setTitle] = useState("");
	return (
		<div className="flex items-center max-w-sm mt-24">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<button
				type="button"
				className="todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded"
				onClick={addTask}
			>
				Add Task
			</button>
		</div>
	);
}
