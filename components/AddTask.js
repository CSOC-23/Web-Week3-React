import { useRef, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";

export default function AddTask({getTasks}) {
	const addTaskButton = useRef(null);
	const {token, successToast, errorToast, setIsLoading} = useAuth();
	const [title,setTitle] = useState("");
	const [buttonActive, setButtonActive] = useState(false);

	const keyPressHandler = (event) => {
		if (event.key === "Enter") {
			addTaskButton.current.click();
			setButtonActive(true);
			setTimeout(() => {
				if (addTaskButton.current !== null) {
					setButtonActive(false);
				}
			}, 2000)
		}
	}

	const addTask = () => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to add the task to the backend server.
		 * @todo 2. Add the task in the dom.
		 */
		//TODO 1: Sending the request to add the task to the backend server.
		if(title.trim().length) {
			const dataForApiRequest = {
				title: title.trim()
			}
			setIsLoading(true);
			axios
			.post('/todo/create/',dataForApiRequest,{
				headers: {
					Authorization: "Token " + token
				}
			})
			.then(async data => {
				setTitle("")
				//TODO 2: Getting the tasks and setting in the tasks array
				await getTasks();
				setIsLoading(false);
				successToast("Task added successfully")
			})
			.catch(err => {
				setIsLoading(false);
				errorToast(err.message);
			});
		}
		else {
			errorToast("Task can't be empty");
		}
	};

	return (
		<div className="flex items-center max-w-sm mt-24">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				onKeyDown={keyPressHandler}
			/>
			<button
				type="button"
				className={`transition-all duration-700 todo-add-task hover:bg-green-500 text-sm hover:text-white px-3 py-2 hover:border-transparent rounded ${buttonActive? "bg-green-500 text-white":"bg-transparent text-green-700 border border-green-500 "}`}
				onClick={addTask} ref={addTaskButton}>
				Add Task
			</button>
		</div>
	);
}
