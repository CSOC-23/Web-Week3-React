import React, { useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

export default function Register() {
	const { setToken } = useAuth();
	const router = useRouter();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const registerFieldsAreValid = (firstName, lastName, email, username, password) => {
		if (firstName === "" || lastName === "" || email === "" || username === "" || password === "") {
			console.log("fill all the fields correctly.");
			return false;
		}
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			console.log("Please enter a valid email address.");
			return false;
		}
		return true;
	};

	const register = (e) => {
		e.preventDefault();

		if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
			console.log("Please wait...");

			const dataForApiRequest = {
				name: firstName + " " + lastName,
				email: email,
				username: username,
				password: password,
			};

			axios
				.post("auth/register/", dataForApiRequest)
				.then(function ({ data, status }) {
					console.log(data.token)
					setToken(data.token);
					router.push("/");
				})
				.catch(function (err) {
					console.log("An account with same username/email is already created");
				});
		}
	};

	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Register</h1>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputFirstName"
						id="inputFirstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First Name"
					/>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputLastName"
						id="inputLastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last Name"
					/>

					<input
						type="email"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputEmail"
						id="inputEmail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email Address"
					/>

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
						className="w-full text-center py-3 rounded bg-transparent text-yellow-500 hover:text-white hover:bg-yellow-500 border border-yellow-500 hover:border-transparent focus:outline-none my-1"
						onClick={register}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}



