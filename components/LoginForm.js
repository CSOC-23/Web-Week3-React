import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function RegisterForm() {
	const { setToken } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter()

	const login = async() => {
		/***
		 * @todo Complete this function.
		 * @todo 1. Write code for form validation.
		 * @todo 2. Fetch the auth token from backend and login the user.
		 * @todo 3. Set the token in the context (See context/auth.js)
		 */
		try {
			// Form validation
			if (!username) {
			  toast.error("Please enter username!")
			  return
			}
			else if(!password){
				toast.error("Please enter password!")
				return
			}
	  
			// Send login request to the backend
			const response = await axios.post("auth/login/", {
			  username: username,
			  password: password,
			});
	  
			// Extract the token from the response
			const { token } = response.data;
	  
			// Set the token in the context
			setToken(token)
			
			//Note that I am not using router.push because it does not cause the page to refresh. I want to fetch data from the backend so, I am using window.location.href for it
			window.location.href = "/"
	  
		  } catch (error) {
			// Handle login error
			toast.error("Password or Username is incorrect!")
		  }
		
	};

	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Login</h1>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputUsername"
						id="inputUsername"
						placeholder="Username"
						value={username}
						onChange={(e)=>setUsername(e.target.value)}
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputPassword"
						id="inputPassword"
						placeholder="Password"
						value={password}
						onChange={(e)=>setPassword(e.target.value)}
					/>

					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
						onClick={login}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}
