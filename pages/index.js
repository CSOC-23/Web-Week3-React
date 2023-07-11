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

	async function getTasks (){
     try{
		const response=await fetch('/api/tasks', {
			headers: {
				Authorization:'Token ' + token,
			},
		});

		if(response.ok){
			const data=await response.json();
			setTasks(data);
		}else{
			console.error("Error fetching tasks:", response.status);
		}
	 }catch (error) {
		console.error("there is some error fetching the task", error);
	}

	
}

	return (
		<div>
			<center>
				<AddTask />
				<ul className="flex-col mt-9 max-w-sm mb-3 ">
					<span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
						Available Tasks
					</span>
					{tasks.map((task) => (
					<TodoListItem key={task.id} task={task}/>
					))}
				</ul>
			</center>
		</div>
	);
	
}
