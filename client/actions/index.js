import * as types from '../constant/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/api/timelines'
const SERVER_URL_COMMENTS = 'http://localhost:3000/api/comments'
const SERVER_URL_USERS = 'http://localhost:3000/api/users'

import {Auth} from '../public/scripts/token'


export function loadTimeline() {
    return {type: types.LOAD_TIMELINES}
}

export function loadTimelineSuccess(timelines) {
    return {type: types.LOAD_TIMELINES_SUCCESS, timeline: timelines}
}

export function loadTimelineFailure() {
    return {type: types.LOAD_TIMELINES_FAILURE}
}


export function loadTimelines() {
    return dispatch => {
        dispatch(loadTimeline())
        return request
            .get(SERVER_URL)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.error(err)
                    dispatch(loadTimelineFailure())
                }
                else {
                    dispatch(loadTimelineSuccess(res.body))
                }
            })
    }
}

export function addDataTimeline(id, User, timeline) {
    return {type: types.ADD_TIMELINE, id, User, timeline}
}

export function addTimelineFailure() {
    return {type: types.ADD_TIMELINE_FAILURE}
}

export function addTimelineSuccess(timeline) {
    return {type: types.ADD_TIMELINE_SUCCESS, timeline}
}

export function addTimeline(dataUser, timeline) {
    const TempTimelineId = Date.now().toString()
    let User = {
        id: dataUser.id,
        username: dataUser.username
    }
    return dispatch => {
        dispatch(addDataTimeline(TempTimelineId, User, timeline))
        return request
            .post(SERVER_URL)
            .type('form')
            .send({
                TempTimelineId: TempTimelineId,
                timeline: timeline,
                UserId: User.id
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.error(err)
                    dispatch(addTimelineFailure())
                }
                else {
                    dispatch(addTimelineSuccess(res.body))
                }
            })
    }
}

export function deleteData(id){
    return {type: types.DELETE_TIMELINE, id}
}


export function deleteTimelineFailure(){
    return {type: types.DELETE_TIMELINE_FAILURE}
}

export function deleteTimelineSuccess(timeline){
    return {type: types.DELETE_TIMELINE_SUCCESS, timeline}
}

export function deleteTimeline(id){
    return dispatch => {
        dispatch(deleteData(id))
        return request
            .del(SERVER_URL)
            .send({
                TempTimelineId: id
            })
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


export function editDataTimeline(id, timeline){
    return {type: types.EDIT_TIMELINE, id, timeline}
}

export function editTimelineFailure(){
    return {type: types.EDIT_TIMELINE_FAILURE}
}

export function editTimelineSuccess(timeline){
    return {type: types.EDIT_TIMELINE_SUCCESS, timeline}
}

export function editTimeline(id, timeline){
    return dispatch => {
        dispatch(editDataTimeline(id, timeline))
        return request
            .put(SERVER_URL)
            .set('Accept', 'application/json')
            .type('form')
            .send({
                TempTimelineId: id,
                timeline: timeline
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


export function addDataComment(id, idtimeline, User, comment) {
    return {type: types.ADD_COMMENT, id, idtimeline, User, comment}
}

export function addCommentFailure() {
    return {type: types.ADD_COMMENT_FAILURE}
}

export function addCommentSuccess(comment) {
    return {type: types.ADD_COMMENT_SUCCESS, comment}
}

export function createComment(TimelineId, User, comment) {
    // console.log(`${TimelineId}, ${UserId}, ${comment}`)
    const TempCommentId = Date.now().toString()
    // let User = {
    //     id: UserId,
    //     username: Auth.getUser().username
    // }
    // console.log("isi user: ", User)
    return dispatch => {
        dispatch(addDataComment(TempCommentId, TimelineId, User, comment))
        return request
            .post(SERVER_URL_COMMENTS)
            .type('form')
            .send({
                TempCommentId: TempCommentId,
                comment: comment,
                UserId: User.id,
                TimelineId: TimelineId
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.error(err)
                    dispatch(addCommentFailure())
                }
                else {
                    dispatch(addCommentSuccess(res.body))
                }
            })
    }
}


export function deleteDataComment(IdTimeline, IdComment){
    return {type: types.DELETE_COMMENT, IdTimeline, IdComment}
}


export function deleteCommentFailure(){
    return {type: types.DELETE_COMMENT_FAILURE}
}

export function deleteCommentSuccess(comment){
    return {type: types.DELETE_COMMENT_SUCCESS, comment}
}

export function deleteComment(IdTimeline, IdComment){
    return dispatch => {
        dispatch(deleteDataComment(IdTimeline, IdComment))
        return request
            .del(SERVER_URL_COMMENTS)
            .send({
                TempCommentId: IdComment
            })
            .end((err, res) => {
                if(err){
                    console.error(err);
                    dispatch(deleteCommentFailure())
                }else{
                    dispatch(deleteCommentSuccess(res.body))
                }
            })
    }
}



export function editDataComment(IdTimeline, IdComment, comment){
    return {type: types.EDIT_COMMENT, IdTimeline, IdComment, comment}
}


export function editCommentFailure(){
    return {type: types.EDIT_COMMENT_FAILURE}
}

export function editCommentSuccess(comment){
    return {type: types.EDIT_COMMENT_SUCCESS, comment}
}

export function editComment(IdTimeline, IdComment, comment){
    return dispatch => {
        dispatch(editDataComment(IdTimeline, IdComment, comment))
        return request
            .put(SERVER_URL_COMMENTS)
            .send({
                TempCommentId: IdComment,
                comment: comment
            })
            .end((err, res) => {
                if(err){
                    console.error(err);
                    dispatch(editCommentFailure())
                }else{
                    dispatch(editCommentSuccess(res.body))
                }
            })
    }
}

export function registerUserFailure() {
    return {type: types.REGISTER_USER_FAILURE}
}

export function registerUserSuccess(user) {
    return {type: types.REGISTER_USER_SUCCESS, user}
}

export function registerUser(name, email, username, password) {
    let id = Date.now().toString()
    return dispatch => {
        return request
            .post(`${SERVER_URL_USERS}/register`)
            .type('form')
            .send({
                TempUserId: id,
                name: name,
                email: email,
                username: username,
                password: password
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.error(err)
                    dispatch(registerUserFailure())
                }
                else {
                    dispatch(registerUserSuccess(res.body))
                }
            })
    }
}


export function loginUserFailure() {
    return {type: types.LOGIN_USER_FAILURE}
}

export function loginUserSuccess(user) {
    return {type: types.LOGIN_USER_SUCCESS, user: user}
}

export function loginUser(username, password) {
    console.log("mas")
    return dispatch => {
        return request
            .post(`${SERVER_URL_USERS}/login`)
            .type('form')
            .send({
                username: username,
                password: password
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.error(err)
                    dispatch(loginUserFailure())
                }
                else {
                    console.log("ini body: ", res.body)
                    dispatch(loginUserSuccess(res.body))
                }
            })
    }
}