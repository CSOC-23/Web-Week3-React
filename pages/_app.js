import "../styles/globals.css";
import { AuthProvider, useAuth } from "../context/auth";
import Nav from "../components/Nav";
import AuthReqd from "../middlewares/auth_required";
import NoAuthReqd from "../middlewares/no_auth_required";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider toast={toast}>
			<AuthReqd />
			<NoAuthReqd />
			<Nav />
			<ToastContainer />
			<Component {...pageProps} toast={toast}/>
		</AuthProvider>
	);
}

export default MyApp;
