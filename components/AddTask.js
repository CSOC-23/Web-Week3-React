import axios from "../utils/axios";
import { useState } from "react";
export default function AddTask({ add, token }) {
	const addTask = async () => {
	try {let id = await axios.post(
		"todo/create/",{title,},
				{headers: {Authorization: `Token ${token}`,"Content-Type": "application/json",},
				}
			);
setTitle("");add();
		} catch (err) {console.log(err);}
	};
	const [title, setTitle] = useState("");
	return (
		<div className= "flex items-center max-w-sm mt-24">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
				onChange={(e) => {setTitle(e.target.value);}}
				value={title}
			/>
			<button type="button" className="todo-add-task bg-transparent hover:bg-yellow-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded" onClick={addTask}>Add Task</button></div>
	);
}
