import React from 'react'
import {UseState,UseEffect} from 'react'
import axios from './utils/axios'


	const addTask = () => {
		
		const [task, setTask] = UseState('');
        const [token, setToken] = UseState('');

        UseEffect(()=> {
			const authUser=async()=>{
				try{
					const response=await axios.post('/api/auth', {
						username: "username",
						password: "password",
					  });

					  const authToken=response.data.token;
					  setToken(authToken);
				}
				catch (error) {
					console.error('There is an authentication error ', error);
				  }
			};
			authUser();
		} ,[getTasks]);

		const AddTask =async()=>{
         try{
			const response=await axios.post('/api/tasks', { task }, {
				headers: {
				  Authorization: 'Token ' + token
				}
			  });

		     addTaskToDOM(response.data.task);
	        } 
			 catch (error) {
			  console.error('Error adding task:', error);
			}
	};

	const addTaskToDOM = (task) => {
		const taskList = document.getElementById('task-list');
		const taskElement = document.createElement('list');
		taskElement.textContent = task;
		taskList.appendChild(taskElement);
	  };

	return (
		<div className="flex items-center max-w-sm mt-24">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
				value={task}
                 onChange={(e) => setTask(e.target.value)}
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
