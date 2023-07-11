/***
 * @todo Redirect the user to login page if token is not present.
 */

import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

export default function TodoListItem() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  
  // Redirect to login if token is not present
  if (!isAuthenticated) {
    router.push("/login");
    return null; // Render nothing while redirecting
  }

  
}