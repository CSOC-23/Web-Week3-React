/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/auth";
// import router from "next/router";
import { toast } from 'react-toastify';
import { API_URL } from "../utils/constants";

export default function TodoListItem(props) {

	const [Edit, setEdit] = useState(true);
	const { token } = useAuth();
	const [text, setText] = useState("")

	const editTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Update the dom accordingly
		 */
		setEdit(!Edit);

	};

	const deleteTask = async (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to delete the task to the backend server.
		 * @todo 2. Remove the task from the dom.
		 */

		axios({
			headers: {
				Authorization: "Token " + token,
			},
			url: API_URL + `todo/${id}/`,
			method: "delete",
		})
			.then(() => {
				toast.success('Deletion was successfull!!');
			})
			.catch((err) => {
				console.log(err);
				toast.error("Error encountered during deletion ;((");
			});


	};

	const updateTask = async (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to update the task to the backend server.
		 * @todo 2. Update the task in the dom.
		 */


		setEdit(!Edit);




		axios({
			headers: {
				Authorization: "Token " + token,
			},
			url: API_URL + `todo/${id}/`,
			method: "patch",
			data: { title: text }
		})
			.then(() => {
				setText("");
				toast.success('Item has beeeeeeen updated successfully!')
				// setEdit(false);
			})
			.catch((err) => {
				toast.error("Error updating:(( ");
				console.log(err)
			});



		// axios.put(`todo/${id}/`, { title: text }, {
		// 	headers: {
		// 		'Authorization': 'Token ' + token,
		// 		// 'Content-Type': 'application/json',
		// 	}
		// })
		// 	.then(() => {
		// 		setText("");
		// 		toast.success("Item has beeeeeeen updated successfully!");
		// 	})
		// 	.catch((err) => {
		// 	toast.error("Error updating:(( ");
		// 	console.log(err)});
	};

	return (
		<>
			<li className="border flex flex-col border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
				<div className=" flex flex-row">	<input
					id={`input-button-${props.id}`}
					type="text"
					className={`${Edit ? "hideme " : ""} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input`}
					placeholder="Edit The Task"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
					<div id={`done-button-${props.id}`} className={`${Edit ? "hideme" : ""}`}>
						<button
							className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
							type="button"
							onClick={() => updateTask(props.id)}>
							Done
						</button></div>
				</div>
				<div id={'task-' + props.id} className="todo-task text-xl m-3 text-gray-600 ">
					{props.title}
				</div>
				<span id={'task-actions-' + props.id} className="">
					<button
						style={{ marginRight: "5px" }}
						type="button"
						onClick={() => editTask(props.id)}
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
						onClick={() => deleteTask(props.id)}>
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
