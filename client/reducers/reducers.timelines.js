import {ADD_TIMELINE,
        EDIT_TIMELINE,
        DELETE_TIMELINE,
        LOAD_TIMELINE,
        LOAD_TIMELINES_SUCCESS,
        LOAD_TIMELINES_FAILURE,
        ADD_TIMELINES_SUCCESS,
        ADD_TIMELINES_FAILURE,
        EDIT_TIMELINES_SUCCESS,
        EDIT_TIMELINES_FAILURE,
        DELETE_TIMELINES_FAILURE,
        DELETE_TIMELINES_SUCCESS,
        LOAD_COMMENT,
        LOAD_COMMENTS_SUCCESS,
        LOAD_COMMENTS_FAILURE,
        ADD_COMMENT,
        ADD_COMMENTS_SUCCESS,
        ADD_COMMENTS_FAILURE,
        ADD_USERS_SUCCESS,
        ADD_USERS_FAILURE,
        LOGIN_USERS_SUCCESS,
        LOGIN_USERS_FAILURE}
        from '../constants/ActionTypes'

const initialState = []
let index = 0

export default function data(state = initialState, action){
  switch (action.type) {
    case LOGIN_USERS_SUCCESS:
      // localStorage.setItem('token', action.login_user.token)
      // action.props.router.replace('dashboard')
      // action.callback()
      return state

    case ADD_USERS_SUCCESS:
      return state

    case ADD_COMMENT:
      // ini buat comment yang dipisah
      // id, User temporary
      // var id_array = state.filter((state) => {return state.TimelineId === action.timelineId}).map((selected) => {return selected.id})
      // Math.max.apply(null, id_array)+1
      // console.log([...state, {
      //   id: state.length === 0 ? 1 : state[state.length-1].id+1,
      //   UserId: 1,
      //   TimelineId: action.timelineId,
      //   User: action.User,
      //   content: action.content,
      //   status: "temp"
      // }]);
      index = state.map(timeline => {
        return timeline.id
      }).indexOf(action.timelineId)

      let thisComment = state[index].Comments
      let commentLength = thisComment.length
      // console.log(thisComment[commentLength-1].id);

      thisComment.push({
        id: Date.now(),
        content: action.content,
        User: action.User,
        status: "temp"
      })
      // console.log(thisComment);
      // console.log(state);
      // return state
      return state.map(timeline => {return timeline})

    case ADD_COMMENTS_SUCCESS:
      index = state.map((timeline) => {
        return timeline.id
      }).indexOf(action.comment.TimelineId)

      if(index > -1){
        let newDataComments = state[index].Comments.filter((comment) => {return comment.status != "temp"})
        // console.log([...newDataComments, action.comment]);
        state[index].Comments = [...newDataComments, action.comment]
        // console.log(state);
        let newDataTimelines = state.filter((timeline, i) => {return i != index })
        // console.log(newDataTimelines);
        // console.log([newDataTimelines, state[index]]);
        // newDataTimelines.push(state[index])
        // return newDataTimelines
        return state.map(timeline => {return timeline})
      }else{
        state[index].Comments = [...newDataComments, action.comment]
        return state
      }
      return state

    case LOAD_TIMELINE:
      return []

    case LOAD_TIMELINES_SUCCESS:
      return action.timelines

    case ADD_TIMELINE:
      // id, User temporary
      return [{
        id: state.length === 0 ? 1 : state[0].id+1,
        User: action.User,
        Comments: [],
        status: "temp"
      },
      ...state
      ]

    case ADD_TIMELINES_SUCCESS:
      let timelines = state
      index = timelines.map(function(x){
        return x.id
      }).indexOf(action.timeline.id)

      if(index > -1 || timelines[0]){
        let newData = timelines.filter((data) => {return data.status != "temp"})
        return [action.timeline, ...newData]
      }else{
        return [action.timeline, ...state]
      }

      // ini untuk pake id default dari db
      // alternative :
      // return state.map(data => (data.id === action.timeline.id || state[0]) ? Object.assign({}, data, {User: action.timeline.User}): data)

    case EDIT_TIMELINE:
      return state.map(data => data.id === action.id ? Object.assign({}, data, {content: action.content}): data)

    case EDIT_TIMELINES_SUCCESS:
      index = state.map(function(data){
        return data.content
      }).indexOf(action.timeline.content)

      if(index === -1){
        return state.map(data => data.id === index ? Object.assign({}, data, {content: action.content}): data)
      }else{
        return state
      }

    case DELETE_TIMELINE:
      return state.filter(data => data.id !== action.id)

    case DELETE_TIMELINES_SUCCESS:
      index = state.map((data) => {return data.id}).indexOf(action.timeline.id)
      return index === -1 ? state : state.filter(data => data.id !== action.id)

    default:
    case LOGIN_USERS_FAILURE:
    case ADD_USERS_FAILURE:
    case ADD_COMMENTS_FAILURE:
    case DELETE_TIMELINES_FAILURE:
    case EDIT_TIMELINES_FAILURE:
    case ADD_TIMELINES_FAILURE:
    case LOAD_TIMELINES_FAILURE:
      return state

  }
}
