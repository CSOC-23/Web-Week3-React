import axios from "../utils/axios";
import { useState } from "react";
export default function AddTask({ add, token }) {
	const addTask = async () => {
		/**
		 * @done Complete this function.
		 * @done 1. Send the request to add the task to the backend server.
		 * @done 2. Add the task in the dom.
		 */
		try {
			let id = await axios.post(
				"todo/create/",
				{
					title,
				},
				{
					headers: {
						Authorization: `Token ${token}`,
						"Content-Type": "application/json",
					},
				}
			);//id is not returned by the server

			setTitle("");
			add();
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
				value={title}
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
