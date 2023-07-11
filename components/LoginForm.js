import React, { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";


export default function RegisterForm() {
	const { setToken } = useAuth();
	const router = useRouter();

	const [uname, setUname] = useState("");
	const [pass, setPass] = useState("");

	const login = () => {
		/***
		 * @todo Complete this function.
		 * @todo 1. Write code for form validation.
		 * @todo 2. Fetch the auth token from backend and login the user.
		 * @todo 3. Set the token in the context (See context/auth.js)
		 */

		const login_validations = (username, password) => {
			if (username === "" || password === "") {
				console.log("Please fill all the fields correctly.");
				return false;
			}
			return true;
		};

		if (login_validations(uname, pass)) {
			console.log("Please wait...");

			const login_credentials = {
				username: uname,
				password: pass,
			};

			axios
				.post("/auth/login/", login_credentials)
				.then(function ({ data, status }) {
					const token = data.token;
					setToken(token);
					router.push("/").then(() => {
						window.location.reload();
					});
					// router.push("/");
					// window.location.reload();
				})
				.catch(function (err) {
					console.log("An error occurred :", err);
				});
		}


	};

	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full" style={{ width: "" }}>
					<h1 className="mb-8 text-3xl text-center">Login</h1>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputUsername"
						id="inputUsername"
						value={uname}
						onChange={(e) => setUname(e.target.value)}
						placeholder="Username"
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputPassword"
						id="inputPassword"
						value={pass}
						onChange={(e) => setPass(e.target.value)}
						placeholder="Password"
					/>

					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1"
						onClick={login}>
						Login
					</button>
					<div className="mt-3 text-center text-sm">
						Not registered yet, <Link href="/register"><span className="text-lg font-semibold underline text-blue-500">Register</span></Link> here
					</div>
				</div>
			</div>
		</div>
	);
}
