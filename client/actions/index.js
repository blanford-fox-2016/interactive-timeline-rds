import * as types from '../constants/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:8000/api/phonebooks'

export function addData(id, name, phone) {
  return {type: types.ADD_DATA, name, phone}
}

export function deleteData(id) {
  return {type: types.DELETE_DATA, id}
}

export function editData(id, name, phone) {
  return {type: types.EDIT_DATA, id, name, phone}
}

export function loadData() {
  return {type: types.LOAD_DATA}
}

export function loadPhoneBooksSuccess(phonebooks) {
  return {type: types.LOAD_PHONEBOOKS_SUCCESS, phonebooks}
}

export function loadPhoneBooksFailure() {
  return {type: types.LOAD_PHONEBOOKS_FAILURE}
}

export function loadPhoneBooks() {
  return dispatch => {
    dispatch(loadData())
    return request
      .get(SERVER_URL)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) {
          console.error(err)
          dispatch(loadPhoneBooksFailure)
        } else {
          console.log(res.body)
          dispatch(loadPhoneBooksSuccess(res.body))
        }
      })
    }
  }

export function addPhoneBookFailure() {
  return {type: types.ADD_PHONEBOOKS_FAILURE}
}

export function addPhoneBookSuccess(phonebook) {
  return {type: types.ADD_PHONEBOOKS_SUCCESS, phonebook}
}

export function addPhoneBook(name, phone) {
  let id = Date.now().toString()
  return dispatch => {
    dispatch(addData(id, name, phone))
    return request
      .post(SERVER_URL)
      .type('form')
      .send({id: id, name: name, phone: phone})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) {
          console.error(err)
          dispatch(addPhoneBookFailure())
        } else {
          console.log(res.body)
          dispatch(addPhoneBookSuccess(res.body))
        }
      })
    }
}
