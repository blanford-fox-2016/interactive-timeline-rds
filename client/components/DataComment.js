import React, {Component, PropTypes} from 'react'

class DataComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            comment: this.props.commentReducers.comment || '',
        }
    }

    clickDeleteComment() {
        if (confirm("are you sure want to delete")) {
            // console.log("ini coment reducers: ", this.props.commentReducers)
            this.props.deleteComment(this.props.commentReducers.TimelineId, this.props.commentReducers.TempCommentId)
        }
    }

    clickEditComment() {
        this.setState({
            editing: true
        })
    }

    cancelEditComment() {
        this.setState({
            editing: false
        })
    }

    handleCommentChange(e) {
        this.setState({
            comment: e.target.value
        })
    }

    handleSaveEditComment(e) {
        e.preventDefault()
        let comment = this.state.comment.trim()
        if (!comment) {
            return
        }
        this.props.editComment(this.props.commentReducers.TimelineId, this.props.commentReducers.TempCommentId, comment)
        this.setState({
            editing: false
        })
    }


    render() {
        const {commentReducers} = this.props
        // console.log("dari datacomment: ", commentReducers)

        if (this.state.editing) {
            return(
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <button onClick={this.clickDeleteComment.bind(this)} className="btn btn-danger">Delete</button>
                        <button onClick={this.clickEditComment.bind(this)} className="btn btn-warning">Edit</button>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleSaveEditComment.bind(this)}>
                            <input className="form-control" type="text" placeholder="Comment" value={this.state.comment} onChange={this.handleCommentChange.bind(this)} />
                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-warning" onClick={this.cancelEditComment.bind(this)}>Candel</button>
                        </form>
                    </div>
                </div>
            )
        }
        else {

            if (commentReducers.User.id == Auth.getUser().id) {
                return (
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <button onClick={this.clickDeleteComment.bind(this)} className="btn btn-danger">Delete</button>
                            <button onClick={this.clickEditComment.bind(this)} className="btn btn-warning">Edit</button>
                        </div>
                        <div className="panel-body">
                            <h4>{commentReducers.User.username}</h4>
                            <p>{commentReducers.comment}</p>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="panel panel-default">
                        <div className="panel-heading">

                        </div>
                        <div className="panel-body">
                            <h4>{commentReducers.User.username}</h4>
                            <p>{commentReducers.comment}</p>
                        </div>
                    </div>
                )
            }
        }
    }
}

DataComment.propTypes = {
    commentReducers: PropTypes.array.isRequired
}

export default DataComment