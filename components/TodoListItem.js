/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function TodoListItem() {
	const editTask = (id) => {
	const input = document.getElementById('input-{id}');
    const doneButton = document.getElementById('done-{id}');
    const task = document.getElementById('task-{id}');
    const taskActions = document.getElementById('task-actions-{id}');

	input.classList.remove('hideme');
    task.classList.add('hideme');

    doneButton.classList.remove('hideme');
    taskActions.classList.add('hideme');
	};

	const deleteTask = (id) => {
		fetch('/api/tasks/${id}', {
			method: 'DELETE',
		  })

		  .then((response)=>{
			if(response.ok){
				const taskElement = document.getElementById('task-${id}');
          if (taskElement) {
            taskElement.remove();
          }
        } 
		else {
			console.log('Failed to delete task');
		  }
		})
		.catch((error)=>{
			console.log('An error occurred:', error);
		  });
	};

	const updateTask = (id) => {
		const inputElement = document.getElementById('input-button-${id}');
        const doneButtonElement = document.getElementById('done-button-${id}');
        const taskElement = document.getElementById('task-${id}');

	    const updatedTaskText = inputElement.value;
		fetch('/api/tasks/${id}', {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: updatedTaskText }),
		  })
		  .then((response) => {
			if (response.ok) {
		    taskElement.textContent = updatedTaskText;
			inputElement.classList.add('hideme');
			doneButtonElement.classList.add('hideme');
		  } 
		  else{
			console.log('Error in Updating task');
		  }
		})
		.catch((error)=>{
			console.log('Error', error);
		});
	};

	return (
		<>
			<li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
				<input
					id="input-button-1"
					type="text"
					className="hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
					placeholder="Edit The Task"
				/>
				<div id="done-button-1" className="hideme">
					<button
						className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
						type="button"
						onClick={updateTask(1)}>
						Done
					</button>
				</div>
				<div id="task-1" className="todo-task  text-gray-600">
					Sample Task 1
				</div>
				<span id="task-actions-1" className="">
					<button
						style={{ marginRight: "5px" }}
						type="button"
						onClick={editTask(1)}
						className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2">
						<img
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
							width="18px"
							height="20px"
							alt="Edit"
						/>
					</button>
					<button
						type="button"
						className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
						onClick={deleteTask(1)}>
						<img
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
							width="18px"
							height="22px"
							alt="Delete"
						/>
					</button>
				</span>
			</li>
		</>
	);
}
