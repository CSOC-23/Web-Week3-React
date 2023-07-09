/***
 * @todo Redirect the user to login page if token is not present.
 */

export const noTokenPresent = (router) => {
    //TODO: User is redirected to login page
    router.push('/login')
}
