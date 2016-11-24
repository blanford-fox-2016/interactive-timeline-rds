import {
    ADD_TIMELINE,
    DELETE_TIMELINE,
    DELETE_TIMELINE_SUCCESS,
    DELETE_TIMELINE_FAILURE,
    EDIT_TIMELINE,
    EDIT_TIMELINE_SUCCESS,
    EDIT_TIMELINE_FAILURE,
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
            return action.timeline

        case ADD_TIMELINE:
            console.log("di add>>> ", action.User)
            return [
                {
                    id: action.id,
                    timeline: action.timeline,
                    User: action.User
                },
                ...state
            ]

        case ADD_TIMELINE_SUCCESS:
            console.log("di success>>> ", state)
            let idObject = state.map(function (x) {
                return x.id
            }).indexOf(action.timeline.id)
            if (idObject > -1) {
                return state
            }
            else {
                return [action.timeline, ...state]
            }

        case DELETE_TIMELINE:
            return state.filter((timeline) => timeline.TempTimelineId !== action.id)

        case DELETE_TIMELINE_SUCCESS:
            return state

        case EDIT_TIMELINE:
            return state.map((timeline) => timeline.TempTimelineId === action.id ? Object.assign({}, timeline, {timeline: action.timeline}) : timeline)

        case EDIT_TIMELINE_SUCCESS:
            return state

        case LOAD_TIMELINES_FAILURE:
        case ADD_TIMELINE_FAILURE:
        case DELETE_TIMELINE_FAILURE:
        case EDIT_TIMELINE_FAILURE:
            return state

        default:
            return state
    }
}