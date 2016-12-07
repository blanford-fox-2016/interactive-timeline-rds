import React, {Component, PropTypes} from 'react'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
          editing: false,
          comment: this.props.data.content || ''
        }
    }
    handleEditClick() {
      console.log('handle edit');
      this.setState({editing: true})
    }
    handleCommentChange(e) {
      this.setState({comment: e.target.value})
    }
    handleCancel() {
      this.setState({editing: false, comment: this.props.data.content})
    }
    handleSaveEdit(e) {
        e.preventDefault()
        let comment = this.state.comment.trim()
        if (!comment) {
            return;
        } else {
          console.log('postData : ', this.props.postData);
            this.props.editCommentProcess(this.props.postData.id, this.props.data.id, comment, Auth.getUser())
            this.setState({editing: false})
        }
    }
    render() {
        const {data, deleteCommentProcess} = this.props
        if (this.state.editing) {
          return (
              <div className="container">
                  <div className="row">
                      <div className="col-sm-1">
                          <div className="thumbnail">
                              <img className="img-responsive user-photo" src={data.User.image_url}/></div>
                      </div>
                      <div className="col-sm-5">
                          <div className="panel panel-default">
                              <div className="panel-heading">
                                  <strong>{data.User.name}</strong>
                                  <span className="text-muted pull-right">{moment(data.createdAt).fromNow()}</span>
                              </div>
                              <div className="panel-body">
                                  <div className="well">
                                    <form onSubmit={this.handleSaveEdit.bind(this)}>
                                        <div className="form-group">
                                            <label>Edit Comment</label>
                                            <input type="text" className="form-control" id="form-comment" placeholder="Enter New Content" value={this.state.comment} onChange={this.handleCommentChange.bind(this)}/>
                                        </div>
                                        <span>
                                        <button className="btn btn-success raised btn-space" type="submit">
                                            <span className="glyphicon glyphicon-ok"></span>          Confirm Edit Comment</button>
                                            <button className="btn btn-default raised" onClick={this.handleCancel.bind(this)}>
                                            <span className="glyphicon glyphicon-repeat"></span>          Cancel</button>
                                        </span>
                                    </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )
        } else {
            if (data.User.name == Auth.getUser().name) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-1">
                                <div className="thumbnail">
                                    <img className="img-responsive user-photo" src={data.User.image_url}/></div>
                            </div>
                            <div className="col-sm-5">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <strong>{data.User.name}</strong>
                                        <span className="text-muted pull-right">{moment(data.createdAt).fromNow()}</span>
                                    </div>
                                    <div className="panel-body">
                                        <div className="well">
                                            <span>{data.content}
                                                <span className="pull-right">
                                                    <button className="btn btn-success btn-xs btn-space raised" type="button" onClick={() => this.handleEditClick()}>
                                                        <span className="glyphicon glyphicon-edit"></span>     Edit Comment</button>
                                                    <button className="btn btn-danger raised btn-xs btn-space" type="button" onClick={() => confirm('Are you sure want to delete this post ?')
                                                        ? deleteCommentProcess(data.id)
                                                        : ''}>
                                                        <span className="glyphicon glyphicon-trash"></span>
                                                        Delete</button>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-1">
                                <div className="thumbnail">
                                    <img className="img-responsive user-photo" src={data.User.image_url}/></div>
                            </div>
                            <div className="col-sm-5">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <strong>{data.User.name}</strong>
                                        <span className="text-muted pull-right">{moment(data.createdAt).fromNow()}</span>
                                    </div>
                                    <div className="panel-body">
                                        <div className="well">
                                            <span>{data.content}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}
