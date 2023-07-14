import { useRouter } from 'next/router'
// import { useEffect } from 'react'
import { useAuth } from '../context/auth'
import { useState } from 'react';
import axios from 'axios';
import { NoAuthrequired } from '../middlewares/no_auth_required';
import { toast } from 'react-toastify';
import Link from "next/link";


export default function RegisterForm() {
	NoAuthrequired();

	const { setToken } = useAuth();
	const router = useRouter();

	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const registerFieldsAreValid = (username, password) => {
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
		Stackoverflow
		
	1.)idea of using Toast
	2.)axios format and other info  
		
		*/

		e.preventDefault();

		if (registerFieldsAreValid(username, password)) {
			console.log("Please wait...");

			const dataForApiRequest = {
				username: username,
				password: password,
			};

			axios
				.post("auth/login/", dataForApiRequest)
				.then(() => {
					setToken(data.token);
					toast.sucess('Login was successful!!')
					router.push('/');
					router.reload();
				})
				.catch(function (err) {
					toast.error('Try Checking the Credentials if they are Right or were You Rick-Rolled!');
					console.log(err);
				});
		}
	};



	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-xl text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Login</h1>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputUsername"
						id="inputUsername"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputPassword"
						id="inputPassword"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>

					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
						onClick={login}>
						Login
					</button>
					<h6 className="m-8 text-xs text-center font-extralight">No account yet ? No Worries!<span className='font-bold'> <Link href="/register" >Register Here!</Link> </span></h6>
				</div>
			</div>
		</div>
	);
}
