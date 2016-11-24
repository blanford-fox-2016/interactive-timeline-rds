import React, {Component, PropTypes} from 'react'

class DataItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			name: this.props.data.name || '',
			post: this.props.data.post || ''
		}
	}

	handleNameChange(e) {
		this.setState({
			name: e.target.value
		})
	}

	handlePostChange(e) {
		this.setState({
			post: e.target.value
		})
	}

	handleEditClick(e) {
		this.setState({editing: true})
	}

	handleSaveEdit(e) {
		e.preventDefault()
		var name = this.state.name.trim()
		var post = this.state.post.trim()
		if(!name || !post){
			return ;
		}
		this.props.editPost(this.props.data.id, name, post)
		this.setState({editing: false})
	}

	cancelEdit(e){
		e.preventDefault()
		this.setState({
			editing: false
		})
	}

	render() {
		const {data, deletePost, editPost} = this.props
		if(this.state.editing){
			return(
					<div className="well well-lg">
					<div className="row">
						<div className="col-sm-6 col-sm-offset-3">
						<form onSubmit = {this.handleSaveEdit.bind(this)}>
							<input type="text" placeholder="Enter name" className="form-control" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
							<textarea type="text" placeholder="Enter post" className="form-control" value={this.state.post} onChange={this.handlePostChange.bind(this)}></textarea>
							<button type="submit" className="btn btn-block btn-md btn-warning">Edit</button>
							<button onClick={this.cancelEdit.bind(this)} className="btn btn-block btn-md btn-default">Back</button>
						</form>
						</div>
					</div>
					</div>
				)
		}
		else {
			return (
				<div className="well well-lg">
					<h2>{data.name}</h2>
					<h5>{data.post}</h5>
					<div className="btn btn-sm btn-warning" onClick={this.handleEditClick.bind(this)}>Edit</div>
					<div className="btn btn-sm btn-danger" onClick={() => confirm("Yakin?") === true ? deletePost(data.id) : false}>Delete</div>
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

export default DataItem