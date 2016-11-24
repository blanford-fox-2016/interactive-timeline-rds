import * as types from '../constant/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/api/timelines'


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

// export function addData(id, name, phone) {
//     return {type: types.ADD_DATA, id, name, phone}
// }
//
// export function deleteData(id) {
//     return {type: types.DELETE_DATA, id}
// }
//
// export function editData(id, name, phone) {
//     return {type: types.EDIT_DATA, id, name, phone}
// }

// export function addPhoneBookFailure() {
//     return {type: types.ADD_PHONEBOOKS_FAILURE}
// }
//
// export function addPhoneBookSuccess(phonebook) {
//     return {type: types.ADD_PHONEBOOKS_SUCCESS, phonebook}
// }
//
// export function addPhoneBook(name, phone) {
//     let id = Date.now().toString()
//     return dispatch => {
//         dispatch(addData(id, name, phone))
//         return request
//             .post(SERVER_URL)
//             .type('form')
//             .send({
//                 id: id,
//                 name: name,
//                 phone: phone
//             })
//             .set('Accept', 'application/json')
//             .end((err, res) => {
//                 if (err) {
//                     console.error(err)
//                     dispatch(addPhoneBookFailure())
//                 }
//                 else {
//                     dispatch(addPhoneBookSuccess(res.body))
//                 }
//             })
//     }
// }