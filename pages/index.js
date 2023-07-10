import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { noTokenPresent } from "../middlewares/auth_required";


export default function Home() {
	const { token, successToast,errorToast, setEditingId, setIsLoading } = useAuth();
	const router = useRouter();
	const [tasks, setTasks] = useState([]);
	const [editingTitle, setEditingTitle] = useState("");

	const getTasks = async () => {
		/***
		 * @todo Fetch the tasks created by the user.
		 * @todo Set the tasks state and display them in the using TodoListItem component
		 * The user token can be accessed from the context using useAuth() from /context/auth.js
		 */
		//TODO 1: Fetching the tasks created by the user
		const response = await axios.get("/todo/", {
			headers: {
				Authorization: "Token " + token
			}
		});

		//TODO 2: Setting the tasks state
		setTasks(response.data)
	}

	const editTask = (info) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Update the dom accordingly
		 */
		//TODO 1: Setting the editing Id to be changed for editing
		setEditingTitle(info.title)
		setEditingId(info.id);
	};

	const deleteTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to delete the task to the backend server.
		 * @todo 2. Remove the task from the dom.
		 */
		//TODO 1: Sending the request to delete the task to the backend server.
		setIsLoading(true);
		axios.delete(`/todo/${id}`, {
			headers: {
				Authorization: "Token " + token
			}
		}).then(async res => {
			//TODO 2: Getting the tasks from backend
			await getTasks();
			setIsLoading(false);
			successToast("Task deleted successfully")
		})
			.catch(err => {
				setIsLoading(false);
				console.log(err.message);
			})
	};

	const updateTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to update the task to the backend server.
		 * @todo 2. Update the task in the dom.
		 */
		const dataForApiRequest = {
			title: editingTitle
		}
		setIsLoading(true);
		//TODO 1: Sending the request to update the task to the backend server.
		axios.patch(`/todo/${id}/`, dataForApiRequest, {
			headers: {
				Authorization: "Token " + token
			}
		})
			.then(async res => {
				//TODO 2: Setting the tasks state
				await getTasks();
				setEditingId("");
				setIsLoading(false);
				successToast("Task updated successfully");
			})
			.catch(err => {
				setIsLoading(false);
				errorToast(err.message);
			})
	};

	useEffect(async () => {
		if(token) {
			setIsLoading(true);
			await getTasks();
			setIsLoading(false);
		}
		else {
			noTokenPresent(router);
		}
	}, [])


	return (
		<div>
			<center>
				<AddTask getTasks={getTasks} />
				<ul className="flex-col mt-9 max-w-sm mb-3">
					<span className="inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full ">
						Available Tasks
					</span>
					{
						tasks.length ? tasks.map(task => {
							return <TodoListItem key={task.id} editingTitle={editingTitle} setEditingTitle={setEditingTitle} task={task} editTask={editTask} updateTask={updateTask} deleteTask={deleteTask} />
						}) : <div></div>
					}
				</ul>
			</center>
		</div>
	);
}
