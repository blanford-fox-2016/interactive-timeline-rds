import * as types from '../constants/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:8080/api/timeline'

export function editData(id, name, post){
  return {type: types.EDIT_DATA, id, name, post}
}

//LOAD DATAS

export function loadData(){
	return{type: types.LOAD_DATA}
}

export function loadTimelineSuccess(timeline){
	return {type: types.LOAD_TIMELINE_SUCCESS, timeline}
}

export function loadTimelineFailure(){
	return {type: types.LOAD_TIMELINE_FAILURE}
}

export function loadTimeline(){
	return dispatch => {
		dispatch(loadData())
		return request
		.get(SERVER_URL)
		.set('Accept', 'application/json')
		.end((err, res) => {
			if(err) {
				console.error(err)
				dispatch(loadTimelineFailure())
			} else {
				dispatch(loadTimelineSuccess(res.body))
			}
		})
	}
}

//ADD DATA

export function addData(id, name, post){
  return {type: types.ADD_DATA, id, name, post}
}

export function addPostFailure(){
	return {type: types.ADD_POST_FAILURE}
}

export function addPostSuccess(post){
	return {type: types.ADD_POST_SUCCESS, post}
}

export function addPost(name,post){
	let id = Date.now().toString()
	return dispatch => {
		dispatch(addData(id, name, post))
		return request
		.post(SERVER_URL)
		.type('form')
		.send({id: id, name: name, post: post})
		.set('Accept', 'application/json')
		.end((err, res) => {
			if(err) {
				console.error(err)
				dispatch(addPostFailure())
			} else {
				dispatch(addPostSuccess(res.body))
			}
		})
	}
}

//DELETE DATA

export function deleteData(id){
  return {type: types.DELETE_DATA, id}
}

export function deletePostSuccess(post){
	return {type: types.DELETE_POST_SUCCESS, post}
}

export function deletePostFailure(){
	return {type: types.DELETE_POST_FAILURE}
}

export function deletePost(id){
	return dispatch => {
		dispatch(deleteData(id))
		return request
		.delete(SERVER_URL)
		.send({id: id})
		.set('Accept', 'application/json')
		.end((err, res) => {
			if(err) {
				console.error(err)
				dispatch(deletePostFailure())
			} else {
				dispatch(deletePostSuccess(res.body))
			}
		})
	}
}