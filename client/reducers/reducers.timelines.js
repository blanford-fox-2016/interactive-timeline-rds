import {
    ADD_TIMELINE,
    ADD_TIMELINE_SUCCESS,
    ADD_TIMELINE_FAILURE,
    DELETE_TIMELINE,
    DELETE_TIMELINE_SUCCESS,
    DELETE_TIMELINE_FAILURE,
    EDITING_STATUS,
    TIMELINE_CHANGE,
    EDIT_TIMELINE,
    EDIT_TIMELINE_SUCCESS,
    EDIT_TIMELINE_FAILURE,
    LOAD_TIMELINES_SUCCESS,
    LOAD_TIMELINES_FAILURE,
    LOAD_TIMELINES,
    ADD_COMMENT,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

} from '../constant/ActionTypes'

const initialState = []

export default function timeline(state = initialState, action) {
    switch(action.type) {

        case LOAD_TIMELINES:
            return []

        case LOAD_TIMELINES_SUCCESS:
            return action.timeline

        case ADD_TIMELINE:
            return [
                {
                    id: action.id,
                    timeline: action.timeline,
                    User: action.User,
                    fake: true
                },
                ...state
            ]

        case ADD_TIMELINE_SUCCESS:
            console.log("init dari reducers: ", action.timeline)
            let idObjects = state.map(function (x) {
                return x.id
            })
            let idObject = idObjects.indexOf(action.timeline.id)

            if (idObject > -1) {
                return state
            }
            else {
                let newTimelineFilter = state.filter((data) => {

                    return data.fake != true
                })
                return [action.timeline, ...newTimelineFilter]

            }

        case DELETE_TIMELINE:
            return state.filter((timeline) => timeline.TempTimelineId !== action.id)

        case DELETE_TIMELINE_SUCCESS:
            return state

        case EDIT_TIMELINE:
            return state.map((timeline) => timeline.TempTimelineId === action.id ? Object.assign({}, timeline, {timeline: action.timeline}) : timeline)

        case EDIT_TIMELINE_SUCCESS:
            return state

        case ADD_COMMENT:
            // console.log("init state: ", state)
            const timelines = state.filter((data) => {
                // console.log(data.id, "===", action.idtimeline,data.id === action.idtimeline)
                return data.id === action.idtimeline
            })

            // console.log("isi timeline: ", timelines[0])
            timelines[0].Comments.push({
                    id: action.id,
                    comment: action.comment,
                    User: action.User,
                    fake: true
                })
            return state.map((data) => data.id === action.idtimeline ? Object.assign({}, data, timelines[0]) : data)

        case ADD_COMMENT_SUCCESS:

            let comments = state.filter((data) => {
                console.log(data.id, "===", action.idtimeline,data.id === action.idtimeline)
                return data.id === action.idtimeline
            })

            let idObjectComment = comments[0].map(function (x) {
                return x.id
            }).indexOf(action.comment.id)
            if (idObjectComment > -1) {
                return state
            }
            else {
                let newCommentFilter = comments[0].filter((data) => {
                    // console.log("init data: ", data)
                    return data.fake != true
                })
                return [action.comment, ...newCommentFilter]

            }

        case LOAD_TIMELINES_FAILURE:
        case ADD_TIMELINE_FAILURE:
        case ADD_COMMENT_FAILURE:
        case DELETE_TIMELINE_FAILURE:
        case EDIT_TIMELINE_FAILURE:
            return state

        default:
            return state
    }
}