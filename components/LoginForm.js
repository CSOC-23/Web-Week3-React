import { useState } from "react";
import {useRouter} from "next/router";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";

export default function RegisterForm() {

	const { setToken } = useAuth();
	const router = useRouter();

	const [username , setusername]=useState("");
	const [password , setpassword]=useState("");

	const inputFieldsAreValid = (username, password) => {
		if (username === "" || password === "") {
			console.log("Please fill all the fields correctly.");
			return false;
		}
		
		return true;
	};

	const login = (e) => {
		/***
		 * @todo Complete this function.
		 * @todo 1. Write code for form validation.
		 * @todo 2. Fetch the auth token from backend and login the user.
		 * @todo 3. Set the token in the context (See context/auth.js)
		 */
		e.preventDefault();

		if (inputFieldsAreValid(username, password)) {
			console.log("Please wait...");

			const dataForApiRequest = {
				username: username,
				password: password,
			};

			axios
				.post("auth/login/", dataForApiRequest)
				.then(({ data,status})=>{
					setToken(data.token)
					router.push("/")
					router.reload()
				})
				.catch(function (err) {
					console.log("Enter Correct Username and Password");
				});
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
						onChange={(e)=>{setusername(e.target.value)}}
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputPassword"
						id="inputPassword"
						placeholder="Password"
						value={password}
						onChange={(e)=>{setpassword(e.target.value)}}
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
