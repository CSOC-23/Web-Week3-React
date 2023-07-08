import "../styles/globals.css";
import { AuthProvider, useAuth } from "../context/auth";
import Nav from "../components/Nav";
import { checkAuthentication } from "../middlewares/auth_required";
import { useEffect } from "react";



function MyApp({ Component, pageProps }) {
  
	return (
		<AuthProvider>

			<Nav />
			<Component {...pageProps} />
						
		</AuthProvider>
	);
}

export default MyApp;
