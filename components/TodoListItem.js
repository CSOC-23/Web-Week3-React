/* eslint-disable @next/next/no-img-element */
import { useAuth } from "../context/auth";
import { useState , useEffect } from "react";
import { API_URL } from "../utils/constants";
import axios from "../utils/axios";

export default function TodoListItem(props) {

	const { token } = useAuth();
	const [editedTask,setEditedTask] = useState(props.title);
	const [edit,setEdit] = useState(false)

	const editTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Update the dom accordingly
		 */
		setEdit(true)
	};

	const deleteTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to delete the task to the backend server.
		 * @todo 2. Remove the task from the dom.
		 */
		axios({
			headers:{
				Authorization : 'Token '+ token
			},
			url : API_URL + 'todo/'+id+'/',
			method:'DELETE'
		}).then(({data,status})=>{
			console.log("Task successfully deleted");
		}).catch((err)=>{
			console.log("Some error occured while deleting your Task !")
		})
	};

	const updateTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to update the task to the backend server.
		 * @todo 2. Update the task in the dom.
		 */
		axios({
			headers:{
				Authorization : 'Token '+token
			},
			url:API_URL+'todo/'+id+'/',
			method:'PATCH',
			data:{
				title:editedTask
			}
		}).then(({data,status})=>{
			console.log("Task Updated!");
		}).catch((err)=>{
			console.log('Some error occured while editing your Task !')
		})

		setEdit(false)
	};

	return (
		<>
			<li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
				<input
					id={`input-button-${props.id}`}
					type="text"
					className={`${edit?"appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input":'hideme'}`}
					placeholder="Edit The Task"
					value={editedTask}
					onChange={(e)=>{setEditedTask(e.target.value)}}
				/>
				<div id={`done-button-${props.id}`} className={`${edit?'':"hideme"}`}>
					<button
						className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
						type="button"
						onClick={()=>updateTask(props.id)}>
						Done
					</button>
				</div>
				<div id={`task-${props.id}`} className={`${edit?'hideme':"todo-task  text-gray-600"}`}>
					{props.title}
				</div>
				<span id={`task-actions-${props.id}`} className="">
					<button
						style={{ marginRight: "5px" }}
						type="button"
						onClick={()=>editTask(props.id)}
						className={`${edit?'hideme':"bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2"}`}>
						<img
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
							width="18px"
							height="20px"
							alt="Edit"
						/>
					</button>
					<button
						type="button"
						className={`${edit?"bg-transparent hover:bg-red-500  hover:text-white border border-red-500 hover:border-transparent rounded mx-2 px-2 py-2":'hideme'}`}
						onClick={()=>deleteTask(props.id)}>
						<img
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
							width="30px"
							height="22px"
							alt="Delete"
						/>
					</button>
				</span>
			</li>
		</>
	);
}
