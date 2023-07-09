import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import AuthenticProt from "../middlewares/auth_required";
import { useRouter } from "next/router";

export default function Home() {
	const { token } = useAuth();
	const [tasks, setTasks] = useState([]);
	const router=useRouter();

	function getTasks() {
		axios
		.get("/tasks", {
		  headers: {
			Authorization: `Token ${token}`,
		  },
		})
		.then((response) => {
		  setTasks(response.data.tasks);
		})
		.catch((error) => {
		  console.error("Failed to fetch tasks", error);
		});
	}
	
		/***
		 * @todo Fetch the tasks created by the user.
		 * @todo Set the tasks state and display them in the using TodoListItem component
		 * The user token can be accessed from the context using useAuth() from /context/auth.js
		 */
	
	useEffect(()=>{
		getTasks()
	},[tasks])

	return (
		<div>
			<center>
				<AddTask />
				<ul className="flex-col mt-9 max-w-sm mb-3 ">
					<span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
						Available Tasks
					</span>
					<TodoListItem tasks={tasks}/>
				</ul>
			</center>
		</div>
	);
}
