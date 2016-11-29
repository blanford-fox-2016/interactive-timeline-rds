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
    DELETE_COMMENT,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    EDIT_COMMENT,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,

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
                    // timeline: action.timeline,
                    timeline: 'temp',
                    User: action.User,
                    fake: true
                },
                ...state
            ]

        case ADD_TIMELINE_SUCCESS:
            console.log("state timeline: ", state)
            console.log("init dari reducers: ", action.timeline)
            let idObjects = state.map(function (x) {
                console.log("isi x object: ", x)
                return x.id
            })

            console.log("isi id object: ", idObjects)

            console.log("isi id action timeline id: ", action.timeline.id)


            let idObject = idObjects.indexOf(action.timeline.id)
            console.log("isi id object seletah: ", idObject)
            if (idObject > -1) {
                return state
            }
            else {
                let newTimelineFilter = state.filter((data) => {

                    return data.fake != true
                })
                console.log("new timeline filter: ", newTimelineFilter)
                return [action.timeline, ...newTimelineFilter]

            }

        case DELETE_TIMELINE:
            console.log("ini state", state)
            return state.filter((timeline) => timeline.TempTimelineId !== action.id)

        case DELETE_TIMELINE_SUCCESS:
            return state

        case EDIT_TIMELINE:
            return state.map((timeline) => timeline.TempTimelineId === action.id ? Object.assign({}, timeline, {timeline: action.timeline}) : timeline)

        case EDIT_TIMELINE_SUCCESS:
            return state

        case ADD_COMMENT:
            console.log("init state di add comment: ", state)
            // console.log("init action: ", action)
            const timelines = state.filter((data) => {
                // console.log("ini data: ", data)
                // console.log(data.id, "===", action.idtimeline,data.id === action.idtimeline)
                return data.id === action.idtimeline
            })

            console.log("isi timeline: ", timelines)
            console.log("isi timeline 0: ", timelines[0])
            timelines[0].Comments.push({
                    id: action.id,
                    // comment: action.comment,
                    comment: 'temp',
                    User: action.User,
                    fake: true
                })

            console.log("isi timeline setelah push: ", timelines[0])
            let dataTimeline = timelines[0]
            return state.map((data) => {
                // console.log("isi data: ", data)
                return data.id === action.idtimeline ? Object.assign({}, dataTimeline) : data
            })

        case ADD_COMMENT_SUCCESS:
            console.log("add commen success")
            console.log("isi state: ", state)
            console.log("init action: ", action)
            // console.log("ini idtimeline: ", action.comment.TimelineId)
            // console.log("isi state: ", state)
            let commentsSuccess = state.filter((data) => {
                console.log("isi data: ", data)
                // console.log(data.id, "===", action.idtimeline,data.id === action.comment.TimelineId)
                return data.id === action.comment.TimelineId
            })

            console.log("ini comment success: ", commentsSuccess)
            console.log("ini comment success 0: ", commentsSuccess[0])

            let idObjectComments = commentsSuccess[0].Comments.map(function (x) {
                console.log("isi x: ", x)
                return x.id
            })
            console.log("ini id object comment: ", idObjectComments)

            let idObjectComment = idObjectComments.indexOf(action.comment.TempCommentId)

            console.log("ini id object comment baru: ", idObjectComment)
            if (idObjectComment > -1) {
                let newData = commentsSuccess[0].Comments.filter((data) => {
                    return data.fake != true
                })
                console.log("new data filter: ", newData)
                newData.push(action.comment)
                console.log("new data seletah dipush: ", newData)
                return state.map((data) => {
                    console.log("isi data state: ", data)
                    // if (data.id === action.comment.TimelineId) {
                    //     data.Comments = action.comment
                    // }

                    let hasil
                    if (data.id === action.comment.TimelineId) {
                        data.Comments = newData.splice(0)
                        hasil = data
                        return Object.assign({}, data)
                    }
                    else {
                        hasil = Object.assign({}, data)
                        return Object.assign({}, data)
                    }

                    console.log("hasil object assing: ", hasil)
                    // return data.id === action.comment.TimelineId ? Object.assign({}, data) : data
                })
            }
            else {
                return state
                // let newCommentFilter = commentsSuccess[0].Comments.filter((data) => {
                //     console.log("ini data: ", data)
                //     return data.fake != true
                // })
                // console.log("newCommentFilter: ", newCommentFilter)
                // // console.log("hasil newCommentFilter: ", [...newCommentFilter, action.comment])
                //
                //
                // newCommentFilter.push(action.comment)
                // console.log("new comment filter baru: ", newCommentFilter)
                // return commentsSuccess[0].Comments.map((data) => {
                //     console.log("isi data terakir: ", data)
                //     return data.id === action.comment.TimelineId ? Object.assign({}, newCommentFilter) : data
                // })
            }

        case DELETE_COMMENT:
            console.log("masuk delete")
            // console.log("ini state: ", state)
            console.log("ini action: ", action.IdComment)

            const objectTimelines = state.map((timeline) => {
                // console.log("ini data: ", data)
                // console.log(data.id, "===", action.IdTimeline,data.id === action.IdTimeline)
                timeline.Comments = timeline.Comments.filter((comment) => {
                    console.log("ini comment filter: ", comment)
                    // if (comment.TempCommentId !== action.IdComment) {
                    //     return true
                    // }
                    return comment.TempCommentId !== action.IdComment
                })
                return timeline
            })

            console.log('ini object timeline: ', objectTimelines)
            return objectTimelines
            // console.log("ini delete comment kosong: ", objectTimeline[0].Comments)
            // console.log("ini delete comment: ", deleteComments)


            // return deleteComments[0].Comments.filter((deleteComments) => deleteComments.TempCommentId !== action.IdComment)
            // return deleteComments[0].Comments.map((data) => data.id === action.idtimeline ? Object.assign({}, data, timelines[0]) : data)

        case DELETE_COMMENT_SUCCESS:
            return state
            // const deleteCommentsSuccess = state.filter((data) => {
            //     // console.log("ini data: ", data)
            //     // console.log(data.id, "===", action.IdTimeline,data.id === action.IdTimeline)
            //     return data.id === action.IdTimeline
            // })
            // return deleteCommentsSuccess

        case EDIT_COMMENT:
            console.log("state di edit comment: ", state)
            console.log("action di edit comment: ", action)

            return state.map((comment) => {
                console.log("ini di edit comment: ", comment)

                if (comment.id === action.IdTimeline) {
                    console.log("masuk")
                    // return comment.id === action.IdTimeline ? Object.assign({}, comment) : comment
                    return Object.assign({}, comment)
                }
                else {
                    return Object.assign({}, comment)
                }
            })

        case EDIT_COMMENT_SUCCESS:
            console.log("ini state di edit comment success: ", state)
            console.log("ini action di edit comment success: ", action)

            const objectTimelinesCommentSuccess = state.map((timeline) => {
                // console.log("ini data: ", data)
                // console.log(data.id, "===", action.IdTimeline,data.id === action.IdTimeline)
                timeline.Comments = timeline.Comments.map((comment) => {
                    // console.log("ini comment filter di edit comment succes: ", comment)
                    console.log("bandingin temp comment id: ", comment.TempCommentId, action.TempCommentId , comment.TempCommentId === action.TempCommentId)
                    if (comment.TempCommentId === action.comment.TempCommentId) {
                        console.log("ini action.comment: ", action.comment)
                        let newComment = action.comment
                        newComment.User = comment.User
                        return newComment
                    }
                    else {
                        return comment
                    }
                })
                return timeline
            })

            console.log('ini object timeline di edit comment succes: ', objectTimelinesCommentSuccess)
            return objectTimelinesCommentSuccess
            // return state

        case LOAD_TIMELINES_FAILURE:
        case ADD_TIMELINE_FAILURE:
        case ADD_COMMENT_FAILURE:
        case DELETE_TIMELINE_FAILURE:
        case DELETE_COMMENT_FAILURE:
        case EDIT_TIMELINE_FAILURE:
        case EDIT_COMMENT_FAILURE:
            return state

        default:
            return state
    }
}