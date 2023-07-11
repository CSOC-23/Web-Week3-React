export default function RegisterForm() {
	const login = () => {
		/***
		 * @todo Complete this function.
		 * @todo 1. Write code for form validation.
		 * @todo 2. Fetch the auth token from backend and login the user.
		 * @todo 3. Set the token in the context (See context/auth.js)
		 */

		const login = () => {
			const inputUsername = document.getElementById('inputUsername');
			const inputPassword = document.getElementById('inputPassword');
	
			// Step 1: Form validation
			if (inputUsername.value.trim() === '') {
				alert('Please enter your username.');
				return;
			}
	
			if (inputPassword.value.trim() === '') {
				alert('Please enter your password.');
				return;
			}
	
			// Step 2: Fetch the auth token from the backend and login the user
			fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: inputUsername.value,
					password: inputPassword.value,
				}),
			})
			.then(response => response.json())
			.then(data => {
				// Step 3: Set the token in the context (assuming you have an AuthContext)
				AuthContext.setToken(data.token);

				// Optional: Perform additional actions after successful login
				// For example, navigate to a different page or update the UI
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};
}

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
					/>

					<input
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
