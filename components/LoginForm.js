import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";

export default function RegisterForm() {
	const { setToken } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
			  console.log("Please enter username")
			  return
			}
			else if(!password){
				console.log("Please enter password")
				return
			}
	  
			// Send login request to the backend
			const response = await axios.post("/auth/login", {
			  username,
			  password,
			});
	  
			// Extract the token from the response
			const { token } = response.data;
	  
			// Set the token in the context
			setToken(token);
	  
			// Optionally, you can redirect the user to a specific page after successful login
			// router.push("/dashboard");
	  
			console.log("Login successful");
		  } catch (error) {
			// Handle login error
			console.log("Login failed");
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
