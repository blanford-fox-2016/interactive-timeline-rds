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

export default function data(state = initialState, action){
  switch (action.type) {
    case LOAD_TIMELINE:
      return []

    case LOAD_TIMELINES_SUCCESS:
      return action.timelines.reverse()

    case ADD_TIMELINE:
      return [{
        id: action.id,
        User: action.User,
        content: action.content
      },
      ...state
      ]

    case ADD_TIMELINES_SUCCESS:
    let timelines = state
    let idObject = timelines.map(function(x){
      return x.id
    }).indexOf(action.timeline.id)
    console.log(state);
    if(idObject > -1){
      return state
    }else{
      return [action.timeline, ...state]
    }

    case EDIT_TIMELINE:
      return state.map(data => data.id === action.id ? Object.assign({}, data, {content: action.content}): data)

    case EDIT_TIMELINES_SUCCESS:
      return state

    case DELETE_TIMELINE:
      return state.filter(data => data.id !== action.id)

    case DELETE_TIMELINES_SUCCESS:
      return state

    default:
    case DELETE_TIMELINES_FAILURE:
    case EDIT_TIMELINES_FAILURE:
    case ADD_TIMELINES_FAILURE:
    case LOAD_TIMELINES_FAILURE:
      return state

  }
}
