import {
    ADD_TIMELINE,
    DELETE_TIMELINE,
    EDIT_TIMELINE,
    LOAD_TIMELINES_SUCCESS,
    LOAD_TIMELINES_FAILURE,
    LOAD_TIMELINES,
    ADD_TIMELINE_SUCCESS,
    ADD_TIMELINE_FAILURE,
} from '../constant/ActionTypes'

const initialState = []

export default function timeline(state = initialState, action) {
    switch(action.type) {

        case LOAD_TIMELINES:
            return []

        case LOAD_TIMELINES_SUCCESS:
            // console.log(action.timeline)
            return action.timeline

        // case ADD_TIMELINE:
        //     return [
        //         {
        //             id: action.id,
        //             name: action.name,
        //             phone: action.phone
        //         },
        //         ...state
        //     ]
        //
        // case ADD_PHONEBOOK_SUCCES:
        //     let idObject = state.map(function (x) {
        //         return x.id
        //     }).indexOf(action.phonebook.id)
        //     if (idObject > -1) {
        //         return state
        //     }
        //     else {
        //         return [action.phonebook, ...state]
        //     }
        //
        // case DELETE_TIMELINE:
        //     return state.filter(TIMELINE => TIMELINE.id !== action.id)
        //
        // case EDIT_TIMELINE:
        //     return state.map(TIMELINE => TIMELINE.id === action.id ? Object.assign({}, TIMELINE, {name: action.name, phone: action.phone}) : TIMELINE)
        //
        case LOAD_TIMELINES_FAILURE:
        // case ADD_PHONEBOOK_FAILURE:
            return state

        default:
            return state
    }
}