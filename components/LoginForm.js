import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import axios from "../utils/axios";
import Link from "next/link";

export default function RegisterForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { setToken } = useAuth();
	const router = useRouter();
	const login = async (e) => {
		e.preventDefault();
		if (username === "" || password === "") { console.log("Don't leave blank fields");
		return;
		}
		const dataForApiRequest = {username, password};
try {const { data, status } = await axios.post("auth/login/",dataForApiRequest);
			// console.log(data.token);
			setToken(data.token);
			router.push("/");
		} catch (err) {console.log(err,"same email or username is already used");}
	};

	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-pink px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Login</h1>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputUsername"
						id="inputUsername"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputPassword"
						id="inputPassword"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button type="submit" className="w-full text-center py-3 rounded bg-transparent text-yellow-500 hover:text-white hover:bg-yellow-500 border border-yellow-500 hover:border-transparent focus:outline-none my-1" onClick={login}>Login</button>

					<hr className="relative top-3" />

					<div className="flex justify-center relative top-5 text-sm text-gray-500">
						Don&apos;t have an account?<span className="text-blue-600"><Link href="/register"> &nbsp; Register</Link></span>
					</div>
				</div>
			</div>
		</div>
	);
}
