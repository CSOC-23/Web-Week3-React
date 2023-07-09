import { useRef, useState } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import axios from "../utils/axios";
import Link from "next/link";

export default function LoginForm() {
	const loginButton = useRef(null);
	const { setToken , successToast, errorToast, setIsLoading} = useAuth();
	const router = useRouter();
	const {} = useAuth();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [buttonActive, setButtonActive] = useState(false);


	const keyPressHandler = (event) => {
		if (event.key === "Enter") {
			loginButton.current.click();
			setButtonActive(true);
			setTimeout(() => {
				if (loginButton.current  !== null) {
					setButtonActive(false);
				}
			}, 2000)
		}
	}

	//TODO 1: Function for form validation
	const loginFieldsAreValid = (username, password) => {
		if (username === "" || password === "") {
			errorToast("Fields cannot be empty")
			return false;
		}
		return true;
	}

	const login = (e) => {
		/***
		 * @todo Complete this function.
		 * @todo 1. Write code for form validation.
		 * @todo 2. Fetch the auth token from backend and login the user.
		 * @todo 3. Set the token in the context (See context/auth.js)
		 */
		e.preventDefault();
		if (loginFieldsAreValid(username, password)) {
			const dataForApiRequest = {
				username,
				password,
			};

			//TODO 2: Fetching the auth token
			setIsLoading(true);
			axios
				.post("auth/login/", dataForApiRequest)
				.then(function ({ data }) {
					//TODO 3: Setting the auth token in the context
					setToken(data.token);
					setIsLoading(false);
					successToast("Logged In Successfully");
					router.push("/");
				})
				.catch(error => {
					setIsLoading(false);
					if(error.response) {
						errorToast(error.response.data.non_field_errors[0])
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
					<h1 className="mb-8 text-3xl text-center">Login</h1>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputUsername"
						id="inputUsername"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						onKeyDown={keyPressHandler}
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputPassword"
						id="inputPassword"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={keyPressHandler}
					/>

					<button
						type="submit"
						className={`w-full text-center py-3 rounded border hover:text-white hover:bg-green-500 hover:border-transparent focus:outline-none my-1 transition-all duration-500 ${buttonActive?"text-white bg-green-500 border-transparent":"bg-transparent text-green-500 border-green-500"}`}
						onClick={login} ref={loginButton}>
						Login
					</button>

					<hr className="relative top-3" />

					<div className="flex justify-center relative top-5 text-sm text-gray-500">
						Don't have an account?<span className="text-blue-600"><Link href="/register"> &nbsp; Register</Link></span>
					</div>
				</div>
			</div>
		</div>
	);
}
