import { Auth } from '../public/js/Auth'

export default (nextState, replace) => {
  !Auth.getToken()
  ?
  replace({
    pathname: '/',
    // state: { nextPathname: nextState.location.pathname }
  })
  :
  Auth.deauthenticateUser()
    replace({
      pathname: '/',
      // state: { nextPathname: nextState.location.pathname }
    })
}
