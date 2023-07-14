import { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { toast } from 'react-toastify';

export default function AddTask() {

	const [Thistask , setThistask]=useState('task');
	const {token} = useAuth();

	const addTask = () => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to add the task to the backend server.
		 * @todo 2. Add the task in the dom.
		 */


		const data={
			"title": Thistask
		  }
		  axios
		  .post(
			'todo/create/',
			data,
			{
			  headers:{
				'Authorization': 'Token ' + token,
				'Content-Type': 'application/json',
			  }
			})
			.then(()=>{
			setThistask('');
			toast.success('Task added succesfully!!');
		  }).catch((err)=>{
			toast.error('Some error Occured!')
			console.log(err);
		  })
	};

	return (
		<div className="flex items-center max-w-sm mt-10">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
				value={Thistask}
				onChange={(e)=> setThistask(e.target.value)}
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
