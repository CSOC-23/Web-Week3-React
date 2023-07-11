import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import { useEffect } from "react";

export default function AuthReqd() {
	const { token } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if(router.pathname !== "/login" &&router.pathname !== "/register" &&!token) {router.push("/login");
			return null;
		}
	}, [token]);
	return null;
}

