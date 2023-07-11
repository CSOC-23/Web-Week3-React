import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import React, { useState } from "react";

export default function AddTask() {

	const [inputData, setInputData] = useState("")

	const [items, setItems] = useState([])

	const addTask = () => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to add the task to the backend server.
		 * @todo 2. Add the task in the dom.
		 */
		if(inputData){
			setItems([...items, inputData])
			setInputData('')
		}
	};


	return (
		<div className="flex items-center max-w-sm mt-24">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Your Task"
				value={inputData}
				onChange={(e) => setInputData(e.target.value)}
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

