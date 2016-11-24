import { ADD_DATA, EDIT_DATA, DELETE_DATA, SEARCH_DATA, LOAD_DATA, LOAD_TIMELINE_SUCCESS, LOAD_TIMELINE_FAILURE, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../constants/ActionTypes'

const initialState = []

export default function data(state = initialState, action) {
    switch (action.type) {
        //LOAD DATA
        case LOAD_DATA:
            return []

        case LOAD_TIMELINE_SUCCESS:
            return action.timeline.reverse()

        case LOAD_TIMELINE_FAILURE:
            return state

        //ADD DATA
        case ADD_DATA:
            return [{
                    id: action.id,
                    name: action.name,
                    post: action.post
                },
                ...state
            ]

        case ADD_POST_SUCCESS:
            let idObjects = state.map(function(x) {
                return x.id
            })
            let idObject = idObjects.indexOf(action.post.id)
            if (idObject > -1) { //kalau ada
                return state
            } else {
                return [action.post, ...state]
            }

        case ADD_POST_FAILURE:
            return state.filter((data) => data.id !== action.id)

        //DELETE DATA
        case DELETE_DATA:
            return state.filter((data) => data.id !== action.id)

        //EDIT DATA
        case EDIT_DATA:
            return state.map((data) => data.id === action.id ? Object.assign({}, data, { name: action.name, post: action.post }) : data)

        default:
            return state
    }
}
