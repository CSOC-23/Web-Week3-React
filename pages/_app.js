import "../styles/globals.css";
import { AuthProvider, useAuth } from "../context/auth";
import Nav from "../components/Nav";
import AuthReqd from "../middlewares/auth_required";
import NoAuthReqd from "../middlewares/no_auth_required";
import React, { useState } from 'react';

function MyApp({ Component, pageProps }) {
	// const[mode, setMode] = useState('dark');
	const removeBodyClasses=()=>{
		document.body.classList.remove('bg-light')
		document.body.classList.remove('bg-dark')
		document.body.classList.remove('bg-warning')
		document.body.classList.remove('bg-danger')
		document.body.classList.remove('bg-success')
	  }
	  const toggleMode=(cls)=>{
		removeBodyClasses();
		console.log(cls)
		document.body.classList.add('bg-'+ cls)
		// if(mode === 'light'){
		//   setMode('dark');
		//   document.body.style.backgroundColor='white';
		//   showAlert("Dark mode has been enabled", "success");
		  
		// }else{
		//   setMode('light');
		//   document.body.style.backgroundColor='white';
		//   showAlert("Light mode has been enabled", "success");
		  
		// }
	  }
	  const handleColorChange = (color) => {
		document.body.style.backgroundColor = color;
	  };
	return (
		<AuthProvider>
			<AuthReqd/>
			<NoAuthReqd/>
			{/* <Nav mode={mode} handleColorChange={handleColorChange}/> */}
			<Nav  handleColorChange={handleColorChange}/>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
