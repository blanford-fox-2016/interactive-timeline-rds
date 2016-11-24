// import {
//     ADD_DATA,
//     DELETE_DATA,
//     EDIT_DATA,
//     LOAD_PHONEBOOKS_SUCCESS,
//     LOAD_PHONEBOOKS_FAILURE,
//     LOAD_DATA,
//     ADD_PHONEBOOK_SUCCES,
//     ADD_PHONEBOOK_FAILURE,
// } from '../constants/ActionTypes'

const initialState = []

export default function data(state = initialState, action) {
    // switch(action.type) {
    //
    //     case LOAD_DATA:
    //         return []
    //
    //     case LOAD_PHONEBOOKS_SUCCESS:
    //         return action.phonebooks
    //
    //     case ADD_DATA:
    //         return [
    //             {
    //                 id: action.id,
    //                 name: action.name,
    //                 phone: action.phone
    //             },
    //             ...state
    //         ]
    //
    //     case ADD_PHONEBOOK_SUCCES:
    //         let idObject = state.map(function (x) {
    //             return x.id
    //         }).indexOf(action.phonebook.id)
    //         if (idObject > -1) {
    //             return state
    //         }
    //         else {
    //             return [action.phonebook, ...state]
    //         }
    //
    //     case DELETE_DATA:
    //         return state.filter(data => data.id !== action.id)
    //
    //     case EDIT_DATA:
    //         return state.map(data => data.id === action.id ? Object.assign({}, data, {name: action.name, phone: action.phone}) : data)
    //
    //     case LOAD_PHONEBOOKS_FAILURE:
    //     case ADD_PHONEBOOK_FAILURE:
    //         return state
    //
    //     default:
    //         return state
    // }
}