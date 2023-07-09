/* eslint-disable @next/next/no-img-element */
import axios from "../utils/axios";
import React, { useState } from "react";
export default function TodoListItem({ task, onRemove, token }) {
	const [title, setTitle] = useState(task.title);
	const [newTitle, setNewTitle] = useState(title);
	const [deleted, setDeleted] = useState(false);
	const id = task.id;

	const [editing, setEditing] = useState(false);
	const editTask = () => {
		/**
		 * @done Complete this function.
		 * @done 1. Update the dom accordingly
		 */
		setEditing(true);
	};

	const deleteTask = async () => {
		/**
		 * @done Complete this function.
		 * @done 1. Send the request to delete the task to the backend server.
		 * @done 2. Remove the task from the dom.
		 */
		axios
			.delete(`todo/${id}/`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			})
			.then(() => {
				setDeleted(true);
			})
			.catch((err) => console.log(err));
	};

	const updateTask = () => {
		/**
		 * @done Complete this function.
		 * @done 1. Send the request to update the task to the backend server.
		 * @done 2. Update the task in the dom.
		 */

		axios
			.patch(
				`todo/${id}/`,
				{
					title: newTitle,
				},
				{
					headers: {
						Authorization: `Token ${token}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then(() => {
				setTitle(newTitle);
				setEditing(false);
			})
			.catch((err) => console.log(err));
	};
	if(deleted)
	return null;
	return (
		<>
			<li  className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
				<input
					id="input-button-1"
					type="text"
					className={`${
						!editing && "hideme"
					} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
					placeholder="Edit The Task"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
				/>
				<div id="done-button-1" className={editing ? "" : "hideme"}>
					<button
						className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
						type="button"
						onClick={() => updateTask()}
					>
						Done
					</button>
				</div>
				<div
					id="task-1"
					className={
						(editing ? " hideme " : "") + "todo-task  text-gray-600"
					}
				>
					{title}
				</div>
				<span id="task-actions-1" className={editing ? "hideme" : ""}>
					<button
						style={{ marginRight: "5px" }}
						type="button"
						onClick={() => editTask()}
						className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"
					>
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
						onClick={() => deleteTask()}
					>
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
