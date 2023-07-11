import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";


export default function NoAuthReqd() {
	const { token } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if ((router.pathname === "/login" ||router.pathname === "/register") &&token) {router.push("/");
			return null;
		}
	}, [token]);
	return null;
}
