import "../styles/globals.css";
import { AuthProvider, useAuth } from "../context/auth";
import Nav from "../components/Nav";
import AuthReqd from "../middlewares/auth_required";
import NoAuthReqd from "../middlewares/no_auth_required";
function MyApp({ Component, pageProps }) {
	
	return (
		<AuthProvider>
			<AuthReqd/>
			<NoAuthReqd/>
			<Nav />
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
