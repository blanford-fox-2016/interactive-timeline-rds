import * as types from '../constants/ActionTypes'

export const addPost = text => ({type: types.ADD_POST, text})
export const addComment = text => ({type: types.ADD_COMMENT, text})
export const editPost = (id, text) => ({type: types.EDIT_POST, id, text})
export const editComment = (id, text) => ({type: types.EDIT_COMMENT, id, text})
export const deletePost = () => ({type: types.DELETE_POST})
export const deleteComment = () => ({type: types.DELETE_COMMENT})
