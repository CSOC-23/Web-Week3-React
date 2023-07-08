/***
 * @todo Redirect the user to login page if token is not present.
 */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth';

const useAuthProtection = () => {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  return token;
};