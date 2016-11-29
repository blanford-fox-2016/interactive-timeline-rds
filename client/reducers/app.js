import {
  LOAD_POST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  LOGIN_PROCESS,
  LOGIN_PROCESS_SUCCESS,
  LOGIN_PROCESS_FAILURE,
  REGISTER_PROCESS,
  REGISTER_PROCESS_SUCCESS,
  REGISTER_PROCESS_FAILURE,
  LOAD_COMMENT,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  EDIT_COMMENT,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE
} from '../constants/ActionTypes'

const initialState = []

export default function data(state = initialState, objFromUserAction) {
    switch (objFromUserAction.type) {
        case LOAD_POST:
            return []

        case LOAD_POST_SUCCESS:
        console.log('load post reducer :',objFromUserAction);
            return objFromUserAction.fromDatabase

        case ADD_POST:
            return [
                {
                    id: Date.now(),
                    UserId: Date.now(),
                    content: objFromUserAction.content,
                    User: {
                      image_url: Auth.getUser().image_url,
                      name: Auth.getUser().name
                    },
                    fake: true
                },
                ...state
            ]
        case ADD_POST_SUCCESS:
            let idObject = state.map(function(obj) {
                return obj.id
            }).indexOf(objFromUserAction.content.id)


            if (idObject > -1) {
                return state
            } else {
                let newArray = state.filter((data)=> {
                  return data.fake != true
                })
                console.log('add post success obj : ', objFromUserAction);
                console.log('add post success new : ', newArray);

                return [
                  objFromUserAction, ...newArray
                ]
            }
        case EDIT_POST:
            return state.map(cb_result => cb_result.id === objFromUserAction.id
                ? Object.assign({}, cb_result, {content: objFromUserAction.content})
                : cb_result)

        case DELETE_POST:
            return state.filter(cb_result => cb_result.id !== objFromUserAction.id)

        case LOGIN_PROCESS:
          return state

        case LOGIN_PROCESS_SUCCESS:
          return state

        case REGISTER_PROCESS:
          return state

        case REGISTER_PROCESS_SUCCESS:
          return state

        case LOAD_POST_FAILURE:
            return state

        case DELETE_POST_FAILURE:
            return state

        case LOGIN_PROCESS_FAILURE:
            return state

        case REGISTER_PROCESS_FAILURE:
            return state

        case LOAD_COMMENT:
            return []

        case LOAD_COMMENT_SUCCESS:
        console.log('reducer coment :', objFromUserAction);
            return objFromUserAction.fromDatabaseComment

        case LOAD_COMMENT_FAILURE:
            return state

        default:
            return state

    }
}
