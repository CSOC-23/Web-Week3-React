/***
 * @done Redirect the user to main page if token is present.
 */
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NoAuthReqd() {
	const { token } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (
			(router.pathname === "/login" ||
			router.pathname === "/register") &&
			token
		) {
			router.push("/");
			return null;
		}
	}, [token]);
	return null;
}