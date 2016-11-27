import React, {Component, PropTypes} from 'react'

export default class DataItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            commenting: false,
            content: this.props.data.content || '',
        }
    }
    handleContentChange(e) {
        this.setState({content: e.target.value})
    }
    handleEditClick() {
        this.setState({editing: true})
    }
    handleCancel() {
      this.setState({editing: false, commenting: false})
    }
    handleCommentClick() {
      this.setState({commenting: true})
    }
    handleSaveEdit(e) {
        e.preventDefault()
        let content = this.state.content.trim()
        if (!content) {
            return;
        } else {
            this.props.editPostProcess(this.props.data.id, content)
            this.setState({editing: false})
        }
    }
    render() {
        const {data, deletePostProcess, editPost} = this.props
        if (this.state.editing) {
            return (
                <div className = "container"><div className = "qa-message-list" id = "wallmessages"> <div className="message-item" id="m16">
                <div className="message-inner">
                    <div className="message-head clearfix">
                        <div className="avatar pull-left">
                            <a href={data.User.image_url}>
                                <img src={data.User.image_url}/></a>
                        </div>
                        <div className="user-detail">
                            <h5 className="handle">{data.User.name}</h5>
                            <div className="post-meta">
                                <div className="asker-meta">
                                    <span className="qa-message-what"></span>
                                    <span className="qa-message-when">
                                        <span className="qa-message-when-data">

                                        </span>
                                    </span>
                                    <span className="qa-message-who">
                                        <span className="qa-message-who-pad">
                                        </span>
                                        <span className="qa-message-who-data">
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="qa-message-content">
                      <form onSubmit={this.handleSaveEdit.bind(this)}>
                          <div className="form-group">
                              <label>Edit Post</label>
                              <input type="text" className="form-control" id="form-content" placeholder="Enter New Content" value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
                          </div>
                          <span>
                          <button className="btn btn-success raised btn-space" type="submit">
                              <span className="glyphicon glyphicon-ok"></span>          Confirm Edit</button>
                              <button className="btn btn-default raised" onClick={this.handleCancel.bind(this)}>
                              <span className="glyphicon glyphicon-repeat"></span>          Cancel</button>
                          </span>
                      </form>
                    </div>
                </div>
            </div>
          </div>
  </div>

            )
        } else if (this.state.commenting) {
          return (
            <div className = "container">
              <div className = "qa-message-list" id = "wallmessages">
                <div className="message-item" id="m16">
                  <div className="message-inner">
                    <div className="message-head clearfix">
                      <div className="avatar pull-left">
                        <a href="./index.php?qa=user&qa_1=Oleg+Kolesnichenko">
                          <img src={data.User.image_url}/></a>
                      </div>
                      <div className="user-detail">
                        <h5 className="handle">{data.User.name}</h5>
                          <div className="post-meta">
                            <div className="asker-meta">
                                <span className="qa-message-what"></span>
                                  <span className="qa-message-when">
                                  <span className="qa-message-when-data"></span>
                                  </span>
                                  <span className="qa-message-who">
                                    <span className="qa-message-who-pad"></span>
                                    <span className="qa-message-who-data"></span>
                                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="qa-message-content">
                      <div className="well">
                        {data.content}
                      </div>
                          <form className='well'>
                              <div className="form-group">
                                  <label>Comment to this post:</label>
                                  <input type="text" className="form-control" id="form-content" placeholder="Enter New Content" value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
                              </div>
                              <span>
                              <button className="btn btn-success raised btn-space" type="submit">
                                  <span className="glyphicon glyphicon-ok"></span>          Post Comment</button>
                                  <button className="btn btn-default raised" onClick={this.handleCancel.bind(this)}>
                                  <span className="glyphicon glyphicon-repeat"></span>          Cancel</button>
                              </span>
                          </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }else {
            return (
<div className = "container"><div className = "qa-message-list" id = "wallmessages"> <div className="message-item" id="m16">
                <div className="message-inner">
                    <div className="message-head clearfix">
                        <div className="avatar pull-left">
                            <a href="./index.php?qa=user&qa_1=Oleg+Kolesnichenko">
                                <img src={data.User.image_url}/></a>
                        </div>
                        <div className="user-detail">
                            <h5 className="handle">{data.User.name}</h5>
                            <div className="post-meta">
                                <div className="asker-meta">
                                    <span className="qa-message-what"></span>
                                    <span className="qa-message-when">
                                        <span className="qa-message-when-data">

                                        </span>
                                    </span>
                                    <span className="qa-message-who">
                                        <span className="qa-message-who-pad">
                                        </span>
                                        <span className="qa-message-who-data">
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="qa-message-content">
                      <div className="well">
                        <span>{data.content}    <span className="pull-right"><button className="btn btn-default btn-xs btn-space raised" type="button" onClick={() => this.handleCommentClick(data.id)}>
                      <span className="glyphicon glyphicon-comment"></span>   Comment</button>
                          <button className="btn btn-success btn-xs btn-space raised" type="button" onClick={() => this.handleEditClick(data.id)}>
                      <span className="glyphicon glyphicon-edit"></span>   Edit</button>
                            <button className="btn btn-danger raised btn-xs btn-space" type="button" onClick={() => confirm('Are you sure want to delete this post ?')
                                ? deletePostProcess(data.id)
                                : ''}>
                      <span className="glyphicon glyphicon-trash"></span>   Delete</button></span>
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

DataItem.propTypes = {
  data: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
}
