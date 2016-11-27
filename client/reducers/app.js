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
        DELETE_TIMELINES_SUCCESS}
        from '../constants/ActionTypes'

const initialState = []
let index = 0

export default function data(state = initialState, action){
  switch (action.type) {
    case LOAD_TIMELINE:
      return []

    case LOAD_TIMELINES_SUCCESS:
      return action.timelines.reverse()

    case ADD_TIMELINE:
      // id, User temporary
      return [{
        id: state.length === 0 ? 1 : state[0].id+1,
        User: action.User,
        content: action.content,
        status: "temp"
      },
      ...state
      ]

    case ADD_TIMELINES_SUCCESS:
      let timelines = state
      indexx = timelines.map(function(x){
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
      console.log(index);
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
    case DELETE_TIMELINES_FAILURE:
    case EDIT_TIMELINES_FAILURE:
    case ADD_TIMELINES_FAILURE:
    case LOAD_TIMELINES_FAILURE:
      return state

  }
}
