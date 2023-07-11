import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";

export default function Home() {
	const { token } = useAuth();
	const [tasks, setTasks] = useState([]);

	function getTasks() {
		/***
		 * @todo Fetch the tasks created by the user.
		 * @todo Set the tasks state and display them in the using TodoListItem component
		 * The user token can be accessed from the context using useAuth() from /context/auth.js
		 */

		// Fetch the tasks created by the user
		axios
		.get("/api/tasks", {
		  headers: {
			Authorization: `Bearer ${token}`,
		  },
		})
		.then((response) => {
		  // Set the tasks state
		  setTasks(response.data.tasks);
		})
		.catch((error) => {
		  console.error("Error:", error);
		});
	}
	// Call the getTasks function when the component mounts
	useEffect(() => {
		getTasks();
	  }, []);
	

	return (
		<div>
			<center>
				<AddTask />
				<ul className="flex-col mt-9 max-w-sm mb-3 ">
					<span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
						Available Tasks
					</span>
					{tasks.map((task) => (
            <TodoListItem key={task.id} task={task} />
          ))}
				</ul>
			</center>
		</div>
	);
}
