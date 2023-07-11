import "../styles/globals.css";
import { AuthProvider } from "../context/auth";
import Nav from "../components/Nav";


function MyApp({ Component, pageProps }) {
	// Check if the current page is Login or Register
	const isLoginPage = Component.name === "Login";
	const isRegisterPage = Component.name === "Register";
  
	return (
	  <AuthProvider>
		{!isLoginPage && !isRegisterPage && <Nav />}
		<Component {...pageProps} />
	  </AuthProvider>
	);
  }


export default MyApp;
