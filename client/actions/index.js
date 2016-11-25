import * as types from '../constant/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/api/timelines'
const SERVER_UR_COMMENTS = 'http://localhost:3000/api/comments'


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

export function addTimeline(UserId, timeline) {
    const TempTimelineId = Date.now().toString()
    let User = {
        id: UserId,
        username: ''
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

export function createComment(id, comment) {
    const TempCommentId = Date.now().toString()
    let User = {
        id: UserId,
        username: 'admin'
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