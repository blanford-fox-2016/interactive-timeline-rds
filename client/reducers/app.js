import {ADD_DATA, EDIT_DATA, DELETE_DATA, SEARCH_DATA, LOAD_DATA, LOAD_TIMELINE_SUCCESS, LOAD_TIMELINE_FAILURE, ADD_POST_SUCCESS, ADD_POST_FAILURE, DELETE_POST_SUCCESS, DELETE_POST_FAILURE} from '../constants/ActionTypes'

const initialState = []

export default function data(state = initialState, action){
  switch (action.type) {
    case LOAD_DATA:
    return []

    case LOAD_TIMELINE_SUCCESS:
    return action.timeline.reverse()

    case ADD_DATA:
    return [{
      id: action.id,
      name: action.name,
      post: action.post
    },
    ...state
    ]

    case ADD_POST_SUCCESS:
    
    let idObjects = state.map(function(x){
      return x.id
    })

    let idObject = idObjects.indexOf(action.post.id)
    if(idObject > -1){ //kalau ada
      return state
    } else {
      return [action.post, ...state]
    }

    case DELETE_DATA:
    return state.filter((data) => data.id !== action.id)

    case DELETE_POST_SUCCESS:
    return state 

    case EDIT_DATA:
    return state.map((data) => data.id === action.id ? Object.assign({}, data, {name:action.name, post: action.post}): data)

    case LOAD_TIMELINE_FAILURE:
    case ADD_POST_FAILURE:
    case DELETE_POST_FAILURE:
    return state

    default:
    return state
  }
}
