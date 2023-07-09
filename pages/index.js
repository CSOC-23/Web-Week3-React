import TodoListItem from "../components/TodoListItem";
import AddTask from "../components/AddTask";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { Authrequired } from "../middlewares/auth_required";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
// import router from "next/router";

export default function Home() {
	const { token } = useAuth();
	const [tasks, setTasks] = useState([]);
	const router = useRouter();
	Authrequired();
	

function getTasks() {

	axios
    .get(
      'todo/',
      {
        headers: {
          Authorization: 'Token ' + token,
        }
      })
      .then(({data,status})=>{
        setTasks(data);
      })
      .catch((err)=>{
        console.log(err);
      })

      
  }


  useEffect(()=>{
	if(router.pathname="/" && token){
		toast.success("Login was successful!")
	}
},[])  // StackOverflowed 

  useEffect(()=>{
    getTasks();
  },[tasks])

	
		/***
		 * @todo Fetch the tasks created by the user.
		 * @todo Set the tasks state and display them in the using TodoListItem component
		 * The user token can be accessed from the context using useAuth() from /context/auth.js
		 */



	return (
		<div>
			<center>
			<span className="inline-block bg-pink-500 py-1 mt-20  px-9 text-base text-white font-bold rounded-full ">
						Add Tasks Below ⬇️
					</span>
				<AddTask />
				<ul className="flex-col mt-4 max-w-sm mb-3 ">
					<span className="inline-block bg-pink-500 py-1 mt-5 mb-5 px-9 text-base text-white font-bold rounded-full ">
						Available Tasks [{tasks.length}]
					</span>
					<div>
            {tasks.map((task)=>{
              return <TodoListItem key={task.id} id={task.id} title={task.title}/>
            })}          
          </div>
				</ul>
			</center>
		</div>
	);
}
