/***
 * @todo Redirect the user to login page if token is not present.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const Auth_Required = (Component) => {
  return (props) => {
    const router = useRouter();
    const [cookies] = useCookies(['auth']);
    const token = cookies.token;

    useEffect(() => {
      if (!token ) {
        if(router.pathname !== '/login' && router.pathname !== '/register'){
          router.push('/login');
        }

      }
      else{
        router.push("/")
      }
    }, [token, router]);

    return <Component {...props} />;
  };
};

export default Auth_Required;

