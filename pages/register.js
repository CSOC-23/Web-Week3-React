import RegisterForm from "../components/RegisterForm";
import NoAuthRequired from "../middlewares/no_auth_required"
import styles from "../styles/Register.module.css"

export default function Register() {
	return (
		<div className={styles.registerPage}>
			<RegisterForm />
		</div>
	);
}
