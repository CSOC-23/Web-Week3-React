import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";

export default function Home() {
	const { token } = useAuth();
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		getTasks();
	}, []);
	async function getTasks() {
		/***
		 * @done Fetch the tasks created by the user.
		 * @done Set the tasks state and display them in the using TodoListItem component
		 * The user token can be accessed from the context using useAuth() from /context/auth.js
		 */
		try {
			let resp = await axios.get("todo/", {
				headers: {
					Authorization: `Token ${token}`,
				},
			});
			setTasks(resp.data);
		} catch (err) {
			return [];
		}
	}
	function removeHandler(task)
	{
		return () => {
			console.log("removing ",task);
			setTasks((tasks) => tasks.filter((k) => k != task));
			console.log(tasks.filter((k) => k != task));
		};
	}
	
	return (
		<div>
			<center>
				<AddTask
					token={token}
					add={getTasks}
				/>
				<ul className="flex-col mt-9 max-w-sm mb-3 ">
					<span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold  ">
						Available Tasks
					</span>
					{tasks.map((task, i) => {
						return <TodoListItem task={task} key={i} onRemove={getTasks} token={token}/>;
					})}
				</ul>
			</center>
		</div>
	);
}
