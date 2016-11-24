import * as types from '../constants/ActionTypes'
import request from 'superagent'

const TIMELINES_URL = 'http://localhost:3000/api/timelines/'

// --------------------------------
// addData
// --------------------------------

export function addData(content, User){
  return {type: types.ADD_TIMELINE, content, User}
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
    username: 'temp',
    email: 'temp@temp.com'
  }
  return dispatch => {
    dispatch(addData(content, User))
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
