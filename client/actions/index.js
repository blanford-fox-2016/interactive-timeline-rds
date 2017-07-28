export const LOAD_POST = 'LOAD_POST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export const ADD_POST = 'ADD_POST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const EDIT_POST = 'EDIT_POST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'

export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'

export const LOGIN_PROCESS = 'LOGIN_PROCESS'
export const LOGIN_PROCESS_SUCCESS = 'LOGIN_PROCESS_SUCCESS'
export const LOGIN_PROCESS_FAILURE = 'LOGIN_PROCESS_FAILURE'

export const REGISTER_PROCESS = 'REGISTER_PROCESS'
export const REGISTER_PROCESS_SUCCESS = 'REGISTER_PROCESS_SUCCESS'
export const REGISTER_PROCESS_FAILURE = 'REGISTER_PROCESS_FAILURE'

export const LOAD_COMMENT = 'LOAD_COMMENT'
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS'
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE'

export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const EDIT_COMMENT = 'EDIT_COMMENT'
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS'
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE'

export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'

import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/api/post'
const SERVER_URL_COMMENT = 'http://localhost:3000/api/comment'
const SERVER_URL_LOGIN = 'http://localhost:3000/api/auth/login'
const SERVER_URL_REGISTER = 'http://localhost:3000/api/auth/register'

export function loadPost() {
    return {type: LOAD_POST}
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
    return {type: LOAD_POST_SUCCESS, fromDatabase: content}
}

export function loadPostFailure() {
    return {type: LOAD_POST_FAILURE}
}

export function addPost(contentParameter) {
  console.log('add post basic content param : ', contentParameter);
    return {type: ADD_POST, content: contentParameter}
}

export function addPostFailure() {
  console.log('add fail');
    return {type: ADD_POST_FAILURE}
}

export function addPostSuccess(content) {
  console.log('add success : ', content);
    return {type: ADD_POST_SUCCESS, content: content}
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

export function addCommentProcess(content, post, user_comment) {
    return dispatch => {
        dispatch(addComment(content, post, user_comment))
        return request.post(SERVER_URL_COMMENT).type('form').send({content: content, UserId: user_comment.id, PostId: post.id}).set('Accept', 'application/json').end((err, res) => {
            if (err) {
              console.log('process error');
                console.log(err);
                dispatch(addCommentFailure())
            } else {
              console.log('process success');
              console.log('success add process comment : ', res.body);
                dispatch(addCommentSuccess(res.body))
            }
        })
    }
}

export function addComment(contentParameter, post, user_comment) {
    return {type: ADD_COMMENT, comment: contentParameter, post: post, user_comment: user_comment}
}

export function addCommentFailure() {
  console.log('add fail');
    return {type: ADD_COMMENT_FAILURE}
}

export function addCommentSuccess(content) {
  console.log('add success : ', content);
    return {type: ADD_COMMENT_SUCCESS, content: content}
}



export function deletePost(id) {
    return {type: DELETE_POST, id: id}
}

export function deletePostFailure() {
    return {type: DELETE_POST_FAILURE}
}

export function deletePostSuccess(id) {
    return {type: DELETE_POST_SUCCESS}
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

export function deleteComment(id) {
    return {type: DELETE_COMMENT, id: id, }
}

export function deleteCommentFailure() {
    return {type: DELETE_COMMENT_FAILURE}
}

export function deleteCommentSuccess(id) {
    return {type: DELETE_COMMENT_SUCCESS}
}

export function deleteCommentProcess(id) {
  console.log('id : ', id);
    return dispatch => {
        dispatch(deleteComment(id))
        return request.del(SERVER_URL_COMMENT).send({id: id}).end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(deleteCommentFailure())
            } else {
                dispatch(deleteCommentSuccess(res.body))
            }
        })
    }
}


export function editPost(id, content) {
    return {type: EDIT_POST, id: id, content: content}
}

export function editPostFailure() {
    return {type: EDIT_POST_FAILURE}
}

export function editPostSuccess(id, content) {
    return {type: EDIT_POST_SUCCESS, id: id, content: content}
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

export function editComment(post_id, comment_id, content, user) {
    return {type: EDIT_COMMENT, PostId: post_id, CommentId: comment_id, content: content, id: comment_id, User: user}
}

export function editCommentFailure() {
    return {type: EDIT_COMMENT_FAILURE}
}

export function editCommentSuccess(id, content) {
    return {type: EDIT_COMMENT_SUCCESS, id: id, content: content}
}

export function editCommentProcess(post_id, comment_id, content, user) {
    return dispatch => {
        dispatch(editComment(post_id, comment_id, content, user))
        return request.put(SERVER_URL_COMMENT).type('form').send({id: comment_id, content: content}).set('Accept', 'application/json').end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(editCommentFailure())
            } else {
                dispatch(editCommentSuccess(res.body))
            }
        })
    }
}


export function login(usernameLogin, passwordLogin) {
  console.log('login normal :', usernameLogin, passwordLogin);
    return {type: LOGIN_PROCESS, username: usernameLogin, password: passwordLogin}
}

export function loginSuccess(userToken) {
    console.log('return after login success');
    console.log('userToken : ', userToken);
    if (userToken) {
        Auth.authenticateUser(userToken)
        return {type: LOGIN_PROCESS_SUCCESS}
    } else {}
}

export function loginFailure() {
    return {type: LOGIN_PROCESS_FAILURE}
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
        type: REGISTER_PROCESS,
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
      return {type: REGISTER_PROCESS_SUCCESS}
    } else {
      console.log('token not found. registration failed : /actions/index.js > 171');
    }
}

export function registerFailure() {
    return {type: REGISTER_PROCESS_FAILURE}
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

export function loadComment() {
    return {type: LOAD_COMMENT}
}

export function loadCommentProcess(content) {
    return dispatch => {
        dispatch(loadComment())
        return request.get(SERVER_URL_COMMENT).set('Accept', 'application/json').end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(loadCommentFailure())
            } else {
                dispatch(loadCommentSuccess(res.body))
            }
        })
    }
}

export function loadCommentSuccess(content) {
  console.log('ajax :', content);
    return {type: LOAD_COMMENT_SUCCESS, fromDatabaseComment: content}
}

export function loadCommentFailure() {
    return {type: LOAD_COMMENT_FAILURE}
}
