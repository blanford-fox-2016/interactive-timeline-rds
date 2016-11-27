import * as types from '../constants/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/api/post'
const SERVER_URL_LOGIN = 'http://localhost:3000/api/auth/login'
const SERVER_URL_REGISTER = 'http://localhost:3000/api/auth/register'

export function loadPost() {
    return {type: types.LOAD_POST}
}

export function loadPostProcess(content) {
    return dispatch => {
        dispatch(loadPost())
        return request.get(SERVER_URL).set('Accept', 'application/json').end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(loadPostFailure())
            } else {
                dispatch(loadPostSuccess(res.body))
            }
        })
    }
}

export function loadPostSuccess(content) {
    return {type: types.LOAD_POST_SUCCESS, fromDatabase: content}
}

export function loadPostFailure() {
    return {type: types.LOAD_POST_FAILURE}
}

export function addPost(contentParameter) {
  console.log('add post basic content param : ', contentParameter);
    return {type: types.ADD_POST, content: contentParameter}
}

export function addPostFailure() {
  console.log('add fail');
    return {type: types.ADD_POST_FAILURE}
}

export function addPostSuccess(content) {
  console.log('add success : ', content);
    return {type: types.ADD_POST_SUCCESS, content: content}
}

export function addPostProcess(content) {
    return dispatch => {
      console.log('add post process : ', content);
        dispatch(addPost(content))
        return request.post(SERVER_URL).type('form').send({content: content, user_id: Auth.getUser().id}).set('Accept', 'application/json').end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(addPostFailure())
            } else {
              console.log('success add process');
                dispatch(addPostSuccess(res.body))
            }
        })
    }
}

export function deletePost(id) {
    return {type: types.DELETE_POST, id: id}
}

export function deletePostFailure() {
    return {type: types.DELETE_POST_FAILURE}
}

export function deletePostSuccess(id) {
    return {type: types.DELETE_POST_SUCCESS}
}

export function deletePostProcess(id) {
    return dispatch => {
        dispatch(deletePost(id))
        return request.del(SERVER_URL).send({id: id}).end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(deletePostFailure())
            } else {
                dispatch(deletePostSuccess(res.body))
            }
        })
    }
}

export function editPost(id, content) {
    return {type: types.EDIT_POST, id: id, content: content}
}

export function editPostFailure() {
    return {type: types.EDIT_POST_FAILURE}
}

export function editPostSuccess(id, content) {
    return {type: types.EDIT_POST_SUCCESS, id: id, content: content}
}

export function editPostProcess(id, content) {
    return dispatch => {
        dispatch(editPost(id, content))
        return request.put(SERVER_URL).type('form').send({id: id, content: content}).set('Accept', 'application/json').end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(editPostFailure())
            } else {
                dispatch(editPostSuccess(res.body))
            }
        })
    }
}

export function login(usernameLogin, passwordLogin) {
  console.log('login normal :', usernameLogin, passwordLogin);
    return {type: types.LOGIN_PROCESS, username: usernameLogin, password: passwordLogin}
}

export function loginSuccess(userToken) {
    console.log('return after login success');
    console.log('userToken : ', userToken);
    if (userToken) {
        Auth.authenticateUser(userToken)
        return {type: types.LOGIN_PROCESS_SUCCESS}
    } else {}
}

export function loginFailure() {
    return {type: types.LOGIN_PROCESS_FAILURE}
}

export function loginProcess(usernameLogin, passwordLogin) {
    console.log('login process');
    return dispatch => {
        console.log('dispatch');
        dispatch(login(usernameLogin, passwordLogin))
        return request.post(SERVER_URL_LOGIN).type('form').send({username: usernameLogin, password: passwordLogin}).set('Accept', 'application/json').end((err, res) => {
          console.log('res :', res);
            if (err) {
                console.log(err);
                console.log('login error');
                dispatch(loginFailure())
            } else {
                console.log('login success');
                console.log('body :', res.body);
                dispatch(loginSuccess(res.body))
            }
        })
    }
}

export function register(name, usernameRegister, passwordRegister, email, image_url) {
    return {
        type: types.REGISTER_PROCESS,
        name: name,
        username: usernameRegister,
        password: passwordRegister,
        email: email,
        image_url: image_url
    }
}

export function registerSuccess(userToken) {
    if (userToken) {
      Auth.authenticateUser(userToken)
      return {type: types.REGISTER_PROCESS_SUCCESS}
    } else {
      console.log('token not found. registration failed : /actions/index.js > 171');
    }
}

export function registerFailure() {
    return {type: types.REGISTER_PROCESS_FAILURE}
}

export function registerProcess(name, usernameRegister, passwordRegister, email, image_url) {
    console.log('register process');
    return dispatch => {
        console.log('new user : ',{name: name, username: usernameRegister, password: passwordRegister, email: email, image_url: image_url});
        dispatch(register(name, usernameRegister, passwordRegister, email, image_url))
        return request.post(SERVER_URL_REGISTER).type('form').send({name: name, username: usernameRegister, password: passwordRegister, email: email, image_url: image_url}).set('Accept', 'application/json').end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(registerFailure())
            } else {
                console.log('login success');
                dispatch(registerSuccess(res.body))
            }
        })
    }
}
