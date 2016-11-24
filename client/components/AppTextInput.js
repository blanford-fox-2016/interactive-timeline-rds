import React, {Component, PropTypes} from 'react'

class AppTextInput extends Component{
	constructor(props){
		super(props)
		this.state = {
			name: this.props.name || '',
			post: this.props.post || ''
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

	handleSubmit(e) {
		e.preventDefault()
		let name = this.state.name.trim()
		let post = this.state.post.trim()

		if(!name || !post){
			return;
		}

		this.props.onSave(name,post)
		this.setState({name:'', post:''})
	}

	render(){
		return(
			<div className="row">
				<div className="col-sm-8 col-sm-offset-2">
				<form onSubmit = {this.handleSubmit.bind(this)}>
					<input type="text" placeholder="Enter name" className="form-control" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
					<textarea type="text" placeholder="Enter post" className="form-control" value={this.state.post} onChange={this.handlePostChange.bind(this)}></textarea>
					<button type="submit" className="btn btn-block btn-md btn-primary">Save</button>
				</form>
			</div>
			</div>
			)
	}
}

AppTextInput.propTypes = {
	name: PropTypes.string,
	post: PropTypes.string,
	onSave: PropTypes.func.isRequired
}

export default AppTextInput