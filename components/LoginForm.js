import { useState } from "react";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";


export default function RegisterForm() {

	const { setToken } = useAuth();
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [error, setError] = useState("");


	const login=async()=>{
		if(!username || !password){
			setError("please enter username and password");
			return;
		}

        try{
			const response = await axios.post("/login", 
			{ username,
			  password,
			});

		const {token} = response.data;
			setToken(token);
			setUsername("");
			setPassword("");
			setError("");
		}
		catch(error){
			setError('error in username or password');
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
