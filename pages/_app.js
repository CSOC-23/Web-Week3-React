import "../styles/globals.css";
import { AuthProvider } from "../context/auth";
import Nav from "../components/Nav";
import Auth_Required from "../middlewares/auth_required";


function MyApp({ Component, pageProps }) {
	const AuthComponent = Auth_Required(Component)
	return (
		<AuthProvider>
			<Nav />
			<AuthComponent {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
