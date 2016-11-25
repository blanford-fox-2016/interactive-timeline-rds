import * as types from '../constants/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/api/post'

export function editPost(id, content){
  return {type: types.EDIT_POST, id: id, content: content}
}

export function deletePost(id){
  return {type: types.DELETE_POST, id: id}
}

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
  console.log('fail add');
    return {type: types.ADD_POST_FAILURE}
}

export function addPostSuccess(content) {
  console.log('success add');
    return {type: types.ADD_POST_SUCCESS, content: content}
}

export function addPostProcess(content) {
    let UserId = Date.now().toString()
    console.log('process add');
    console.log('content : ', content);
    return dispatch => {
        dispatch(addPost(content))
        return request.post(SERVER_URL).type('form').send({content: content}).set('Accept', 'application/json').end((err, res) => {
            if (err) {
              console.log('ajax error');
                console.log(err);
                dispatch(addPostFailure())
            } else {
              console.log('res body :', res.body);
                dispatch(addPostSuccess(res.body))
            }
        })
    }
}
