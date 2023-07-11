/***
 * @todo Redirect the user to main page if token is present.
 */

import { useHistory } from 'react-router-dom';

export const tokenPresent=()=>{
  const history = useHistory();
  history.push('/main');
}
