import * as types from '../constants/ActionTypes'
import request from 'superagent'

const TIMELINES_URL = 'http://localhost:3000/api/timelines/'
const USERS_URL = 'http://localhost:3000/api/users/'


// --------------------------------
// login
// --------------------------------
export function onLoginSuccess(login_user){
  return {type: types.LOGIN_USERS_SUCCESS, login_user}
}

export function onLoginFailure(){
  return {type: types.LOGIN_USERS_FAILURE}
}

export function onLogin(data_login){
  return dispatch => {
    return request
          .post(USERS_URL+'login')
          .set('Accept', 'application/json')
          .type('form')
          .send(data_login)
          .end((err, res) => {
            if(err){
              console.error(err);
              dispatch(onSignUpFailure())
            }else{
              dispatch(onLoginSuccess(res.body))
            }
          })
  }
}

// --------------------------------
// register a user
// --------------------------------
export function onSignUpSuccess(new_user){
  return {type: types.ADD_USERS_SUCCESS, new_user}
}

export function onSignUpFailure(){
  return {type: types.ADD_USERS_FAILURE}
}

export function onSignUp(data_regis){
  return dispatch => {
    return request
          .post(USERS_URL+'signup')
          .set('Accept', 'application/json')
          .type('form')
          .send(data_regis)
          .end((err, res) => {
            if(err){
              console.error(err);
              dispatch(onSignUpFailure())
            }else{
              dispatch(onSignUpSuccess(res.body))
            }
          })
  }
}

// --------------------------------
// add comments
// --------------------------------
export function addStateComment(timelineId, content, User){
  return {type: types.ADD_COMMENT, timelineId, content, User}
}

export function addCommentsSuccess(comment){
  return {type: types.ADD_COMMENTS_SUCCESS, comment}
}

export function addCommentsFailure(){
  return {type: types.ADD_COMMENTS_FAILURE}
}

export function addComment(timelineId, content){
  var User = {
    username: '',
    email: '',
    Comments: {
      User: {
        username: '',
        email: ''
      }
    }
  }
  return dispatch => {
    dispatch(addStateComment(timelineId, content, User))
    return request
          .post(TIMELINES_URL+timelineId+"/comments")
          .set('Accept', 'application/json')
          .type('form')
          .send({
            content: content
          })
          .end((err, res) => {
            if(err){
              console.error(err);
              dispatch(addCommentsFailure())
            }else{
              dispatch(addCommentsSuccess(res.body))
            }
          })
  }
}

// --------------------------------
// addData
// --------------------------------

export function addData(User, content){
  return {type: types.ADD_TIMELINE, User, content}
}

export function addTimelineFailure(){
  return {type: types.ADD_TIMELINES_FAILURE}
}

export function addTimelineSuccess(timeline){
  return {type: types.ADD_TIMELINES_SUCCESS, timeline}
}

export function addTimeline(content){
  //temporary id khusus kalau pake id date now dari awal
  // var id = Date.now().toString()
  //temporary user
  var User = {
    username: '',
    email: ''
  }

  return dispatch => {
    dispatch(addData(User, content))
    return request
          .post(TIMELINES_URL)
          .set('Accept', 'application/json')
          .type('form')
          .send({
            content: content
          })
          .end((err, res) => {
            if(err){
              console.error(err);
              dispatch(addTimelineFailure())
            }else{
              dispatch(addTimelineSuccess(res.body))
            }
          })
  }
}

// --------------------------------
// editData
// --------------------------------

export function editData(id, content){
  return {type: types.EDIT_TIMELINE, id, content}
}

export function editTimelineFailure(){
  return {type: types.EDIT_TIMELINES_FAILURE}
}

export function editTimelineSuccess(timeline){
  return {type: types.EDIT_TIMELINES_SUCCESS, timeline}
}

export function editTimeline(id, content){
  return dispatch => {
    dispatch(editData(id, content))
    return request
          .put(TIMELINES_URL+id)
          .set('Accept', 'application/json')
          .type('form')
          .send({
            content: content
          })
          .end((err, res) => {
            if(err){
              console.error(err);
              dispatch(editTimelineFailure())
            }else{
              dispatch(editTimelineSuccess(res.body))
            }
          })
  }
}

// --------------------------------
// deleteData
// --------------------------------

export function deleteData(id){
  return {type: types.DELETE_TIMELINE, id}
}

export function deleteTimelineFailure(){
  return {type: types.DELETE_TIMELINES_FAILURE}
}

export function deleteTimelineSuccess(timeline){
  return {type: types.DELETE_TIMELINES_SUCCESS, timeline}
}

export function deleteTimeline(id){
  return dispatch => {
    dispatch(deleteData(id))
    return request
          .del(TIMELINES_URL+id)
          .end((err, res) => {
            if(err){
              console.error(err);
              dispatch(deleteTimelineFailure())
            }else{
              dispatch(deleteTimelineSuccess(res.body))
            }
          })
  }
}

// --------------------------------
// loadData
// --------------------------------

export function loadData(){
  return {type: types.LOAD_TIMELINE}
}

export function loadTimelinesSuccess(timelines){
  return {type: types.LOAD_TIMELINES_SUCCESS, timelines}
}

export function loadTimelinesFailure(){
  return {type: types.LOAD_TIMELINES_FAILURE}
}

export function loadTimelines(){
  return dispatch => {
    dispatch(loadData())
    return request
          .get(TIMELINES_URL)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if(err){
              console.error(err);
              dispatch(loadTimelinesFailure())
            }else{
              dispatch(loadTimelinesSuccess(res.body))
            }
          })
  }
}
