import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    LOAD_POST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE
} from '../constants/ActionTypes'

const initialState = []

export default function data(state = initialState, objFromUserAction) {
    switch (objFromUserAction.type) {
        case LOAD_POST:
            return []

        case LOAD_POST_SUCCESS:
            console.log('reducer load post');
            console.log('object loaded :', objFromUserAction);
            return objFromUserAction.fromDatabase

        case ADD_POST:
            return [
                {
                    id: Date.now(),
                    content: objFromUserAction.content,
                    fake: true
                },
                ...state
            ]
        case ADD_POST_SUCCESS:
            console.log('reducer add success');
            console.log('obj add success :', objFromUserAction);
            let idObject = state.map(function(obj) {
                return obj.id
            }).indexOf(objFromUserAction.content.id)

            console.log('idObject :', idObject);

            if (idObject > -1) {
                console.log('a');
                return state
            } else {
                console.log('b');
                let newArray = state.filter((data)=> {
                  return data.fake != true
                })

                return [
                    objFromUserAction.content, ...newArray
                ]
            }
        case EDIT_POST:
            console.log('edit post :', objFromUserAction);
            return state.map(cb_result => cb_result.id === objFromUserAction.id
                ? Object.assign({}, cb_result, {content: objFromUserAction.content})
                : cb_result)

        case DELETE_POST:
            return state.filter(cb_result => cb_result.id !== objFromUserAction.id)

        case LOAD_POST_FAILURE:
            return state

        default:
            return state

    }
}
