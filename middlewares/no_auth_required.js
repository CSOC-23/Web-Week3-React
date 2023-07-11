/***
 * @todo Redirect the user to main page if token is present.
 */

import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

export default function TodoListItem() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  
  // Redirect to main page if token is present
  if (isAuthenticated) {
    router.push("/");
    return null; // Render nothing while redirecting
  }
}
