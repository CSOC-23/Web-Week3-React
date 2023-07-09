/***
 * @todo Redirect the user to login page if token is not present.
 */
import { useEffect } from 'react';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';


const AuthenticProt = () => {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(function() {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  return token;
};

export default AuthenticProt;