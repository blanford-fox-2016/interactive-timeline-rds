
import {Router, Route, Link, browserHistory} from 'react-router'

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE

} from '../constant/ActionTypes'
import {Auth} from '../public/scripts/token'
const initialState = []

export default function timeline(state = initialState, action) {
    switch(action.type) {

        case LOGIN_USER_SUCCESS:
            console.log("ini action: ", action)
            Auth.authenticateUser(action.user)
            window.location = '/'
            return state

        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
            console.log("gagal")
            return state

        default:
            return state
    }
}