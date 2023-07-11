import LoginForm from "../components/LoginForm";
import NoAuthRequired from "../middlewares/no_auth_required"
import styles from "../styles/Login.module.css"

export default function Login() {
	return (
		<div className={styles.loginPage}>
			<LoginForm />
		</div>
	);
}
