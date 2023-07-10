/* eslint-disable @next/next/no-img-element */

import { useAuth } from "../context/auth";

export default function TodoListItem({task, editTask, updateTask, deleteTask, editingTitle, setEditingTitle }) {
	const { editingId} = useAuth();
	
	return (
		<div>
			<li id={`${task.id}`} className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
				{/* If Editing Id is task.id, show the input tag, otherwise the task */}
				{
					(editingId === task.id) ?
						<>
							<input
								id={`input-${task.id}`}
								type="text"
								value={editingTitle}
								className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
								placeholder="Edit The Task"
								onChange={e => setEditingTitle(e.target.value)}
								autoFocus
							/>
							<div id={`done-${task.id}`} >
								<button
									className="transition-all duration-700 bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
									type="button"
									onClick={() => updateTask(task.id)}>
									Done
								</button>
							</div>
						</> :
						<>
							<div id={`input-${task.id}`} className="todo-task text-gray-600 overflow-hidden">
								{task.title}
							</div>
							<span id={`task-actions-${task.id}`} className="">
								<button
									style={{ marginRight: "5px" }}
									type="button"
									onClick={() => editTask(task)}
									className="bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2 transition-all duration-700">
									<img
										src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
										width="18px"
										height="20px"
										alt="Edit"
									/>
								</button>
								<button
									type="button"
									className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2 transition-all duration-700"
									onClick={() => deleteTask(task.id)}>
									<img
										src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
										width="18px"
										height="22px"
										alt="Delete"
									/>
								</button>
							</span>
						</>

				}



			</li>
		</div>
	);
}
