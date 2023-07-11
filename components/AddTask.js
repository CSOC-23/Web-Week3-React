export default function AddTask() {
	const addTask = () => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to add the task to the backend server.
		 * @todo 2. Add the task in the dom.
		 */

		const inputField = document.querySelector('.todo-add-task-input');
		const task = inputField.value;

		// Step 1: Send the request to add the task to the backend server
		// Example implementation using fetch API
		fetch('/api/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ task }),
		})
			.then(response => response.json())
			.then(data => {
				// Step 2: Add the task in the DOM
				const taskElement = document.createElement('div');
				taskElement.textContent = data.task;
				document.body.appendChild(taskElement);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	return (
		<div className="flex items-center max-w-sm mt-24">
			<input
				type="text"
				className="todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full"
				placeholder="Enter Task"
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
