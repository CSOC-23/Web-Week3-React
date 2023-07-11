/***
 * @todo Redirect the user to main page if token is present.
 */
import { useRouter } from 'next/router';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  // Implement your authentication logic here
  // Return true if the user is authenticated, otherwise return false
};

const NoAuthRequired = ({ children }) => {
  const router = useRouter();

  // Check if the user is authenticated
  const authenticated = isAuthenticated();

  // If the user is authenticated, redirect to the main page
  if (authenticated) {
    router.push('/');
    return null; // Return null to prevent rendering of the unprotected component
  }

  // If the user is not authenticated, allow the request to proceed
  return children;
};

export default NoAuthRequired;