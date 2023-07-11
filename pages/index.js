import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import AuthRequired from "../middlewares/auth_required";

function Home() {
	const backendUrl = "https://todo-api-s7vj.onrender.com"
	const { token } = useAuth();
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		getTasks();
	}, []);

	async function getTasks() {
		/***
		 * @todo Fetch the tasks created by the user.
		 * @todo Set the tasks state and display them in the using TodoListItem component
		 * The user token can be accessed from the context using useAuth() from /context/auth.js
		 */

		try {
			const response = await axios.get(`${backendUrl}/todo/`, {
				headers: {
					Authorization: `Token ${token}`, // Set the Authorization header with the token
				},
			});

			console.log("We have got the tsaks :", response.data)
			// Extracting id, title from the each dictionary of response.data and storing it in a list using map()
			const titles = response.data.map((dict) => [dict.id, dict.title]);
			setTasks(titles)
		}
		catch (error) {
			console.error("Error retrieving tasks:", error);
		}
	}


	return (
		<AuthRequired>
			<div>
				<center>
					<div className="inline-block bg-blue-600 py-1 mb-2 px-9 text-md text-white font-bold mt-14">
						New Task
					</div>
					{/* We are sending callback function "updateTasks" to addTask */}
					<AddTask updateTasks={getTasks}/>

					<ul className="flex-col mt-28 max-w-sm mb-3">
						<span className="inline-block bg-blue-600 py-1 mb-4 px-9 text-sm text-white font-bold rounded-full ">
							Available Tasks
						</span>
						{tasks.map((task, index) => (
							<TodoListItem title={task[1]} id={task[0]} updateTasks={getTasks} />
						))}
					</ul>
				</center>
			</div>
		</AuthRequired>
	);
}

export default Home;