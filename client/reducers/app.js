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
                    Comments: [],
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

        case ADD_COMMENT:
        // console.log("init state di add comment: ", state)
        // console.log('obj user : ', objFromUserAction);
            // console.log("init action: ", action)
            const timelines = state.filter((data) => {
                // console.log("ini data: ", data)
                // console.log(data.id, "===", action.idtimeline,data.id === action.idtimeline)
                return data.id === objFromUserAction.post.id
            })

            // console.log("isi timeline: ", timelines)
            // console.log("isi timeline 0: ", timelines[0])
            var arrTemp = {
                    id: Date.now(),
                    content: objFromUserAction.comment,
                    User: objFromUserAction.user_comment,
                    fake: true
                }
            // console.log('arrTemp : ', arrTemp);
            timelines[0].Comments.push(arrTemp)

            // console.log("isi timeline setelah push: ", timelines[0])
            let dataTimeline = timelines[0]
            return state.map((data) => {
                return data.id === objFromUserAction.post.id ? Object.assign({}, dataTimeline) : data
})

          case ADD_COMMENT_SUCCESS:
          console.log('comment success');
          console.log('object action success: ', objFromUserAction);

              let obj_id = state.map(function(obj) {
                  return obj.id
              }).indexOf(objFromUserAction.content.id)


              if (obj_id > -1) {
                  return state
              } else {
                  let newArray = state.filter((data)=> {
                    return data.fake != true
                  })
                  console.log('add comment success obj : ', objFromUserAction);
                  console.log('add comment success new : ', newArray);

                  return [
                    objFromUserAction, ...newArray
                  ]
              }

        case EDIT_POST:
            return state.map(cb_result => cb_result.id === objFromUserAction.id
                ? Object.assign({}, cb_result, {content: objFromUserAction.content})
                : cb_result)

        case EDIT_COMMENT:
        console.log('action obj : ', objFromUserAction);
        console.log('state : ', state);
        console.log("state di edit comment: ", state)
            console.log("action di edit comment: ", objFromUserAction)

            return state.map((comment) => {
                console.log("ini di edit comment: ", comment)

                if (comment.id === objFromUserAction.PostId) {
                    console.log("masuk")
                    // return comment.id === action.IdTimeline ? Object.assign({}, comment) : comment
                    return Object.assign({}, comment)
                }
                else {
                    return Object.assign({}, comment)
                }
})
// return state.map((comment) => {
//     if (comment.id === objFromUserAction.PostId) {
//         comment.Comments.map((data) => {
//           if (data.id === objFromUserAction.CommentId) {
//             console.log("masuk")
//             console.log('comment :', data);
//             // Object.assign({}, data)//todo
//             Object.assign({}, comment)
//           } else {
//
//           }
//         })
//         // return comment.id === action.IdTimeline ? Object.assign({}, comment) : comment
//
//     }
//     else {
//         return Object.assign({}, comment)
//     }
// })

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
