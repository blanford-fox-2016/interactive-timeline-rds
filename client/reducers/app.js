import * as types from '../constants/ActionTypes'

const initialState = []

export default function data(state = initialState, action){
  switch(action.type){
    case types.ADD_DATA:
      return [
        {
          id: action.id,
          name: action.name,
          phone: action.phone
        },
        ...state // it can spread array and object
      ]
    case types.DELETE_DATA:
      return state.filter(data => data.id !== action.id)
    case types.EDIT_DATA:
      return state.map(data => data.id === action.id ? Object.assign({}, data, {name: action.name, phone: action.phone}) : data)
    case types.LOAD_DATA:
      return []
    case types.LOAD_PHONEBOOKS_SUCCESS:
      return action.phonebooks
    case types.LOAD_PHONEBOOKS_FAILURE:
      return state
    case types.ADD_PHONEBOOKS_SUCCESS:
      console.log(state)
      let phonebooks = state
      let idObject = phonebooks.map(x => x.id).indexOf(action.phonebook.id)
      if(idObject > -1) {
        return state
      } else {
        return [action.phonebook, ...state]
      }
    case types.ADD_PHONEBOOKS_FAILURE:
      return state
    default:
      return state
  }
}
