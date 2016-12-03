export const Auth = {
    authenticateUser: (data) => {
        console.log(data)
        if (data.status === 'error') console.log('No account:', data)
        Auth.deauthenticateUser()
        localStorage.setItem('token', data.token)
    },
    deauthenticateUser: () => {
        localStorage.removeItem('token')
    },
    getToken: () => {
        return localStorage.getItem('token')
    },
    getUser: () => {
        let token = Auth.getToken()
        if (!token) return {}
        else {
            return jwt_decode(token)
        }
    }
}
