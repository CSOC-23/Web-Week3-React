import LoginForm from "../components/LoginForm";

export default function Login({ toast}) {
	return (
		<div>
			<LoginForm toast={toast}/>
		</div>
	);
}
