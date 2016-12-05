import {LOAD_COMMENT,
        LOAD_COMMENTS_SUCCESS,
        LOAD_COMMENTS_FAILURE,
        ADD_COMMENT,
        ADD_COMMENTS_SUCCESS,
        ADD_COMMENTS_FAILURE}
        from '../constants/ActionTypes'

export default function data(state = [], action){
  switch(action.type){
    case LOAD_COMMENT:
      return []

    case LOAD_COMMENTS_SUCCESS:
      return state.concat(action.comments)

    case ADD_COMMENT:
      // id, User temporary
      // var id_array = state.filter((state) => {return state.TimelineId === action.timelineId}).map((selected) => {return selected.id})
      // Math.max.apply(null, id_array)+1
      return [...state, {
        id: state.length === 0 ? 1 : state[state.length-1].id+1,
        UserId: 1,
        TimelineId: action.timelineId,
        User: action.User,
        content: action.content,
        status: "temp"
      }]

    case ADD_COMMENTS_SUCCESS:
      console.log(state);
      index = state.map((x) => {
        return x.id
      }).indexOf(action.comments.id)

      if(index > -1 || state[0]){
        let newData = state.filter((data) => {return data.status != "temp"})
        return [action.comments, ...newData]
      }else{
        return [action.comments, ...state]
      }

    case ADD_COMMENTS_FAILURE:
    case LOAD_COMMENTS_FAILURE:
    default:
    return state
  }
}
