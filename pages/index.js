import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import useAuthProtection from "../middlewares/auth_required";
// import { checkAuthentication } from "../middlewares/auth_required";

export default function Home() {

	useAuthProtection()
	
	const { token } = useAuth();
	const [tasks, setTasks] = useState([]);

	function getTasks() {
		/***
		 * @todo Fetch the tasks created by the user.
		 * @todo Set the tasks state and display them in the using TodoListItem component
		 * The user token can be accessed from the context using useAuth() from /context/auth.js
		 */

			const options={
				headers: {
					'Authorization': 'Token ' + token,
					'Content-Type': 'application/json',
				}
			}
			axios.get("todo/",options).then((e)=>{
				setTasks(e.data)
				console.log(e.data)
			}).catch((err)=>console.log(err))
	
	}


	useEffect(()=>{
		getTasks()
	},[])

	return (
		<div>
			<center>
				<AddTask />
				<ul className="flex-col max-w-xl mt-9 mb-3r">
					<span className="inline-block bg-my-blue py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
						Available Tasks
					</span>
					<TodoListItem tasks={tasks}/>
				</ul>
			</center>
		</div>
	);
}
