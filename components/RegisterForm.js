import React, { useRef, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
	const registerButton = useRef(null);
	const { setToken, successToast, errorToast, setIsLoading } = useAuth();
	const router = useRouter();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [buttonActive, setButtonActive] = useState(false);

	const keyPressHandler = (event) => {
		if (event.key === "Enter") {
			registerButton.current.click();
			setButtonActive(true);
			setTimeout(() => {
				if (registerButton.current !== null) {
					setButtonActive(false);
				}
			}, 2000)
		}
	}

	const registerFieldsAreValid = (firstName, lastName, email, username, password) => {
		if (firstName === "" || lastName === "" || email === "" || username === "" || password === "") {
			errorToast("Fields cannot be empty")
			return false;
		}
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			errorToast("Please enter a valid email address")
			return false;
		}
		return true;
	};

	const register = (e) => {
		e.preventDefault();

		if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
			const dataForApiRequest = {
				name: firstName + " " + lastName,
				email: email,
				username: username,
				password: password,
			};

			setIsLoading(true);
			axios
				.post("auth/register/", dataForApiRequest)
				.then(function ({ data }) {
					setToken(data.token);
					setIsLoading(false);
					successToast("You have been Registered Successfully");
					router.push("/");
				})
				.catch(error => {
					setIsLoading(false);
					if(error.response) {
						const errorArray = error.response.data.email || error.response.data.username
						errorToast(errorArray[0])
					}
					else {
						console.log(error.message)
					}
				});
		}
	};

	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded-xl shadow-2xl text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Register</h1>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputFirstName"
						id="inputFirstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First Name"
						onKeyDown={keyPressHandler}
					/>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputLastName"
						id="inputLastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last Name"
						onKeyDown={keyPressHandler}
					/>

					<input
						type="email"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputEmail"
						id="inputEmail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email Address"
						onKeyDown={keyPressHandler}
					/>

					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputUsername"
						id="inputUsername"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
						onKeyDown={keyPressHandler}
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputPassword"
						id="inputPassword"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						onKeyDown={keyPressHandler}
					/>

					<button
						type="submit"
						className={`w-full text-center py-3 rounded bg-transparent hover:text-white hover:bg-green-500 border hover:border-transparent focus:outline-none my-1 transition-all duration-500 ${buttonActive?"text-white bg-green-500 border-transparent":"bg-transparent text-green-500 border-green-500"}`}
						onClick={register} ref={registerButton}>
						Register
					</button>

					<hr className="relative top-3" />

					<div className="flex justify-center relative top-5 text-sm text-gray-500">
						Already have an account?<span className="text-blue-600"><Link href="/login"> &nbsp; Login</Link></span>
					</div>
				</div>
			</div>
		</div>
	);
}
