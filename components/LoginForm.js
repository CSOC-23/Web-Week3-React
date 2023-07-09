import React, {useState} from "react";
import {useAuth}  from "../context/auth";
import {AuthProvider} from "../context/auth";
import axios from  "../utils/axios";
import axiosInstance from "../utils/axios";







export default function RegisterForm() {
	const {setToken}=useAuth();
	const login = () => {
		/***
		 * @todo Complete this function.
		 * @todo 1. Write code for form validation.
		 * @todo 2. Fetch the auth token from backend and login the user.
		 * @todo 3. Set the token in the context (See context/auth.js)
		 * 
		 */
		

	const username = document.getElementById("inputUsername").value;
    const password = document.getElementById("inputPassword").value;

    
    axiosInstance
      .post("auth/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        
        const token = response.data.token;

        
        setToken(token);

       
        document.getElementById("inputUsername").value = "";
        document.getElementById("inputPassword").value = "";

        
      })
      .catch((error) => {
        
        console.log("Authentication failed");
      });

		
		
	};

	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Login</h1>
					<input
					onChange={handlechange}
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputUsername"
						id="inputUsername"
						placeholder="Username"
					/>

					<input
					onChange={phandlechange}
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="inputPassword"
						id="inputPassword"
						placeholder="Password"
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
