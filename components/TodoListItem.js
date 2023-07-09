/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAuth } from "../context/auth";
import { useState } from "react";
import axiosInstance from "../utils/axios";

export default function TodoListItem() {
	
	const { token } = useAuth();
	const [task, setTask] = useState("");
	const [editMode, setEditMode] = useState(false);
	const editTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Update the dom accordingly
		 */
	};

	const deleteTask = (id) => {
		axiosInstance
      .delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("Task deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete task", error);
      });
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to delete the task to the backend server.
		 * @todo 2. Remove the task from the dom.
		 */
	};

	const updateTask = (id) => {
		/**
		 * @todo Complete this function.
		 * @todo 1. Send the request to update the task to the backend server.
		 * @todo 2. Update the task in the dom.
		 */
		axiosInstance
      .put(
        `/tasks/${id}`,
        { task: updatedTask },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Task updated successfully");
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Failed to update task", error);
      });
	};
	const handleEditClick = () => {
		setEditMode(true);
	  };
	
	  const handleUpdateClick = (id) => {
		updateTask(id, task);
	  };
	
	  const handleCancelClick = () => {
		setEditMode(false);
	  };
	
	  useEffect(() => {
		if (token) {
		  
		}
	  }, [token]);
	return (
		<>
			<li className="border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2">
				{editMode?(<input
					id="input-button-1"
					type="text"
					onChange={(e) => setTask(e.target.value)}
					className="hideme appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input"
					placeholder="Edit The Task"
				/>):(
          <div className="todo-task text-gray-600">{task}</div>
        )}
				
				
				
				<span>
          {editMode ? (
            <>
              <button
                className="bg-transparent hover:bg-gray-500 text-gray-700 text-sm hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task"
                type="button"
                onClick={() => handleUpdateClick(1)}
              >
                Done
              </button>
              <button
                className="bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2"
                type="button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
					<button
						style={{ marginRight: "5px" }}
						type="button"
						onClick={handleEditClick}
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
						onClick={()=>deleteTask(1)}>
						<img
							src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
							width="18px"
							height="22px"
							alt="Delete"
						/>
					</button>
					</>
		  )}
		  </span>
			</li>
		</>
	);
}
