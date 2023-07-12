import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { API_URL } from '../utils/constants';

export default function Home() {

	const { token } = useAuth();
	const [tasks, setTasks] = useState([]);
	const router = useRouter()

	function getTasks() {
		/***
		 * @todo Fetch the tasks created by the user.
		 * @todo Set the tasks state and display them in the using TodoListItem component
		 * The user token can be accessed from the context using useAuth() from /context/auth.js
		 */

		axios({
			headers:{
				Authorization : 'Token '+token
			},
			url:API_URL + 'todo/',
			method:'GET'
		}).then(({data,status})=>{
			setTasks(data)
		}).catch((err)=>{
			console.log("An error occured while fetching your tasks");
		})
	}

	useEffect(()=>{
		getTasks()
	},[tasks])

	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500">
			<center>
				<AddTask />
				<ul className="flex-col mt-9 max-w-sm mb-3 ">
					<span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
						Available Tasks ({tasks.length})
					</span>
					{tasks.map((e)=>{
						return <TodoListItem key ={e.id} id={e.id} title={e.title} />
					})}
				</ul>
			</center>
		</div>
	);
}
