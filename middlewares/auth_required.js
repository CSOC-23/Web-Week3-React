/***
 * @todo Redirect the user to login page if token is not present.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const Auth_Required = (Component) => {
  // console.log("render")
  return (props) => {
    const router = useRouter();
    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    useEffect(() => {
      //yha garbad hai
      if (!token ) {
        if(router.pathname !== '/login' && router.pathname !== '/register'){
          router.push('/login');
          return
        }

      }
      else{
        router.push("/")
        return
      }
    }, [cookies]);

    return <Component {...props} />;
  };
};

export default Auth_Required;

