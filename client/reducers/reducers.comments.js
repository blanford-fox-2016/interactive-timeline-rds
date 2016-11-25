import {
    ADD_COMMENT,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    DELETE_COMMENT,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    EDIT_COMMENT,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
    LOAD_COMMENTS,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILURE,
} from '../constant/ActionTypes'

const initialState = []

export default function timeline(state = initialState, action) {
    switch(action.type) {

        // case LOAD_COMMENTS:
        //     return []
        //
        // case LOAD_COMMENTS_SUCCESS:
        //     return action.comment

        // case ADD_TIMELINE:
        //     console.log("di add>>> ", action.User)
        //     return [
        //         {
        //             id: action.id,
        //             timeline: action.timeline,
        //             User: action.User
        //         },
        //         ...state
        //     ]
        //
        // case ADD_TIMELINE_SUCCESS:
        //     console.log("di success>>> ", state)
        //     let idObject = state.map(function (x) {
        //         return x.id
        //     }).indexOf(action.timeline.id)
        //     if (idObject > -1) {
        //         return state
        //     }
        //     else {
        //         return [action.timeline, ...state]
        //     }
        //
        // case DELETE_TIMELINE:
        //     return state.filter((timeline) => timeline.TempTimelineId !== action.id)
        //
        // case DELETE_TIMELINE_SUCCESS:
        //     return state
        //
        // case EDIT_TIMELINE:
        //     return state.map((timeline) => timeline.TempTimelineId === action.id ? Object.assign({}, timeline, {timeline: action.timeline}) : timeline)
        //
        // case EDIT_TIMELINE_SUCCESS:
        //     return state

        case LOAD_COMMENTS_FAILURE:
        case ADD_COMMENT_FAILURE:
        case DELETE_COMMENT_FAILURE:
        case EDIT_COMMENT_FAILURE:
            return state

        default:
            return state
    }
}