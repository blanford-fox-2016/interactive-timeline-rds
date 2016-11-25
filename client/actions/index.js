import * as types from '../constants/ActionTypes'

export function addPost(contentParameter){
  console.log('folder action: ',contentParameter);
  return {type: types.ADD_POST, content: contentParameter}
}

export function editPost(id, content){
  return {type: types.EDIT_POST, id: id, content: content}
}

export function deletePost(id){
  return {type: types.DELETE_POST, id: id}
}
