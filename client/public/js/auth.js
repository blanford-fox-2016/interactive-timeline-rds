import jwt_decode from "jwt-decode"
// ---------------------------------------------------------------------------
// AUTHENTICATION
// ---------------------------------------------------------------------------

const Auth = {
    authenticateUser: (data) => {
        if (data.status === 'error')
            console.log('No account:', data)
        Auth.deauthenticateUser()
        localStorage.setItem('token', data)
    },
    isUserAuthenticated: () => {
        return localStorage.getItem('token') !== null
    },
    deauthenticateUser: () => {
        localStorage.removeItem('token')
    },
    getToken: () => {
        return localStorage.getItem('token')
    },
    getUser: () => {
        let token = Auth.getToken()
        if (!token)
            return {}
        else {
            console.log('token : ', token);
            return jwt_decode(token)
        }
    }
}
