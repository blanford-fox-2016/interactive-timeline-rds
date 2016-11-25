import {ADD_POST, EDIT_POST, DELETE_POST} from '../constants/ActionTypes'

const initialState = [{
  id: Date.now(),
  content: 'Dummy Content'
}]

export default function data(state = initialState, objFromUserAction){
  switch (objFromUserAction.type) {
    case ADD_POST:
    return [{
      id: Date.now(),
      content: objFromUserAction.content
    },
    ...state
  ]
    case EDIT_POST:
    console.log('edit post :', objFromUserAction);
    return state.map(cb_result => cb_result.id === objFromUserAction.id ? Object.assign({}, cb_result, {content: objFromUserAction.content}): cb_result)

    case DELETE_POST:
    return state.filter(cb_result => cb_result.id !== objFromUserAction.id)

    default:
    return state

  }
}
