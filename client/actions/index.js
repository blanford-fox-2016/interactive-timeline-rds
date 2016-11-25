import * as types from '../constants/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/api/post'

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

export function addPost(contentParameter){
  return {type: types.ADD_POST, content: contentParameter}
}

export function addPostFailure() {
    return {type: types.ADD_POST_FAILURE}
}

export function addPostSuccess(content) {
    return {type: types.ADD_POST_SUCCESS, content: content}
}

export function addPostProcess(content) {
    let UserId = Date.now().toString()
    return dispatch => {
        dispatch(addPost(content))
        return request.post(SERVER_URL).type('form').send({content: content}).set('Accept', 'application/json').end((err, res) => {
            if (err) {
                console.log(err);
                dispatch(addPostFailure())
            } else {
                dispatch(addPostSuccess(res.body))
            }
        })
    }
}

export function deletePost(id){
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
    return request.del(SERVER_URL).send({id:id}).end((err, res) => {
      if (err) {
        console.log(err);
        dispatch(deletePostFailure())
      } else {
        dispatch(deletePostSuccess(res.body))
      }
    })
  }
}

export function editPost(id, content){
  return {type: types.EDIT_POST, id: id, content: content}
}

export function editPostFailure() {
    return {type: types.EDIT_POST_FAILURE}
}

export function editPostSuccess(id, content) {
    return {type: types.EDIT_POST_SUCCESS, id: id, content: content}
}

export function editPostProcess(id, content){
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
