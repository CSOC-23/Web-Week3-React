/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";

export default function TodoListItem({ title, id, updateTasks }) {
	const [editTitle, setEditTitle] = useState()
	const [isEditing, setIsEditing] = useState(false) // Added state to track editing mode
	const backendUrl = "https://todo-api-s7vj.onrender.com"
	const { token } = useAuth();

	const editTask = (task_id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Update the dom accordingly
		 */

		setIsEditing(true); // Set isEditing state to true when the button is clicked
	};

	const deleteTask = (task_id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to delete the task to the backend server.
		 * @todo 2. Remove the task from the dom.
		 */

		axios
			.delete(`${backendUrl}/todo/${task_id}/`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then(response => {
				console.log('Task deleted successfully:', response);
				updateTasks()
			})
			.catch(error => {
				console.error('Error deleting task:', error);
			});
	};

	const updateTask = (task_id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to update the task to the backend server.
		 * @todo 2. Update the task in the dom.
		 */

		// Send the PUT request
		axios
			.put(`${backendUrl}/todo/${task_id}/`, { title: editTitle }, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then((response) => {
				setIsEditing(false);
				const updatedTask = response.data;
				updateTasks()
				console.log('Task updated successfully:', updatedTask);
			})
			.catch((error) => {
				console.error('Error updating task:', error);
			});
	};

	return (
		<>
		
			<li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-3">
				<input
					id="input-button-1"
					type="text"
					className={`${isEditing ? "" : "hideme"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
					placeholder="Edit The Task"
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
				/>
				<div id="done-button-1" className={`${isEditing ? "" : "hideme"}`}>
					<button
						className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
						type="button"
						onClick={() => {
							updateTask(id);
						}}>
						Done
					</button>
				</div>
				<div id="task-1" className="todo-task text-gray-600">
					{title}
				</div>
				<span id="task-actions-1" className="">
					<button
						style={{ marginRight: "5px" }}
						type="button"
						onClick={() => editTask(id)}
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
						onClick={() => deleteTask(id)}>
						<img
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
							width="18px"
							height="22px"
							alt="Delete"
						/>
					</button>
				</span>
			</li>
		</>
	);
}
