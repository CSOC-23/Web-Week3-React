/***
 * @todo Redirect the user to login page if token is not present.
 */


import { useHistory } from 'react-router-dom';

export const noTokenPresent=()=>{
  const history = useHistory();
  history.push('/login');
} 