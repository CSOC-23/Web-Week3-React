/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";


export default function TodoListItem({tasks}) {

	const { token } = useAuth();
	const [id, setId] = useState()
	const [hide, setHide] = useState(true)
	const [titleValue, setTitle] = useState("")

	const options={
		headers: {
			'Authorization': 'Token ' + token,
			'Content-Type': 'application/json',
		}
	}

	const editTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Update the dom accordingly
		 */
		setHide(false)

	};

	const deleteTask = async(id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to delete the task to the backend server.
		 * @todo 2. Remove the task from the dom.
		 */

		await axios.delete(`todo/${id}/`,options)
	};

	const updateTask = async(id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to update the task to the backend server.
		 * @todo 2. Update the task in the dom.
		 */

		axios.put(`todo/${id}/`,{title: titleValue},options).then(()=>{
			setTitle("")
		}).catch((err)=>console.log(err))
		
	};

	return (
		<>
				<input
					id="input-button-1"
					name="taskEdit"
					type="text"
					className={`${hide ? "hideme":""} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
					placeholder="Edit The Task"
					value={titleValue}
					onChange={(e)=>setTitle(e.target.value)}
				/>
				<div id="done-button-1" className={`${hide ? "hideme":""}`}>
					<button
						className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
						type="button"
						onClick={()=>{
							updateTask(id)
							setHide(true)
						}}
					>
						Done
					</button>
				</div>

				{tasks.map((i)=>{
					return (
						<div className="todo-task  text-gray-600 " key={i.id}>
					<div >
					<li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
						{i.title}
					<span id="task-actions-1" className="flex">
					<button
						style={{ marginRight: "5px" }}
						type="button"
						onClick={()=>{
							setId(i.id)
							editTask(i.id)
						}}
						className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2">
						<img
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
							width="18px"
							height="20px"
							alt="Edit"
						/>
					</button>
					<button
						type="button"
						className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
						onClick={()=>deleteTask(i.id)}>
						<img
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
							width="18px"
							height="22px"
							alt="Delete"
						/>
					</button>
				</span>
					</li>
					</div>

	
				</div>
					)
				})
				}
		</>
	);
}
