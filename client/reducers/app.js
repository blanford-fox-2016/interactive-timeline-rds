import {
    ADD_DATA,
    EDIT_DATA,
    DELETE_DATA,
    LOAD_DATA,
    LOAD_PHONEBOOKS_SUCCESS,
    LOAD_PHONEBOOKS_FAILURE,
    ADD_PHONEBOOKS_SUCCESS,
    ADD_PHONEBOOKS_FAILURE
} from '../constants/ActionTypes'

const initialState = []

export default function data(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return []

        case LOAD_PHONEBOOKS_SUCCESS:
            return action.phonebooks

        case ADD_DATA:
            return [
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone
                },
                ...state
            ]

        case ADD_PHONEBOOKS_SUCCESS:
            let idObject = state.map(function(obj) {
                return obj.id
            }).indexOf(action.phonebook.id)

            if (idObject > -1) {
                return state
            } else {
                return [
                    action.phonebook, ...state
                ]
            }
        case EDIT_DATA:
            return state.map(data => data.id === action.id
                ? Object.assign({}, data, {
                    name: action.name,
                    phone: action.phone
                })
                : data)

        case DELETE_DATA:
            return state.filter(data => data.id !== action.id)

        case LOAD_PHONEBOOKS_FAILURE:
            return state

        case ADD_PHONEBOOKS_FAILURE:
            return state

        default:
            return state

    }
}
