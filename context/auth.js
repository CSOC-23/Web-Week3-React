import { useEffect, useState, useContext, createContext } from "react";
import { useCookies } from "react-cookie";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { tokenPresent } from "../middlewares/no_auth_required";
import { noTokenPresent } from "../middlewares/auth_required";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [profileName, setProfileName] = useState("");
	const [avatarImage, setAvatarImage] = useState("");
	const [cookies, setCookies, removeCookies] = useCookies(["auth"]);
	const [token, setVarToken] = useState(cookies.token);
	const [editingId, setEditingId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const deleteToken = () => removeCookies("token");


	//* UI: Success and error toasts from react-toastify
	const successToast = (message) => {
		toast.success(message ,{
			position: toast.POSITION.TOP_CENTER
		});
	}

	const errorToast = (message) => {
		toast.error(message ,{
			position: toast.POSITION.TOP_CENTER
		});
	}

	const logout = () => {
		deleteToken();
		setVarToken("");
		successToast("You have been logged out")
		router.push("/login");
	};

	const setToken = (newToken) => {
		setCookies("token", newToken, { path: "/" });
		setVarToken(newToken);
	}

	useEffect(() => {
		if (token) {
			if(!avatarImage) {
				setIsLoading(true);
				axios
				.get("auth/profile/", {
					headers: {
						Authorization: "Token " + token,
					},
				})
				.then((response) => {
					setAvatarImage(
						"https://ui-avatars.com/api/?name=" +
							response.data.name +
							"&background=fff&size=33&color=007bff"
					);
					setProfileName(response.data.name);
					setIsLoading(false);
				})
				.catch((error) => {
					setIsLoading(false);
					errorToast(error.message)
				});
			}
			tokenPresent(router)
		}
		else {
			noTokenPresent(router)
		}
	}, [setAvatarImage, setProfileName, token, editingId]);

	return (
		<AuthContext.Provider
			value={{
				token,
				logout,
				setToken,
				profileName,
				setProfileName,
				avatarImage,
				setAvatarImage,
				successToast,
				errorToast,
				editingId,
				setEditingId,
				isLoading,
				setIsLoading
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
