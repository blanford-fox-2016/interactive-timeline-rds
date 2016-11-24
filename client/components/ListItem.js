import React, {Component, PropTypes} from 'react'
import DataItem from './DataItem'

class ListItem extends Component{
	constructor(props) {
		super(props);
		this.state= {
			searchedName: '',
			searchedPost: ''
		}
	}
	getSearchedName(e){
		this.setState({
			searchedName: e.target.value
		})
	}
	getSearchedPost(e){
		this.setState({
			searchedPost: e.target.value
		})
	}
	render() {
		const {data, actions} = this.props
		let filteredData = data

		if(this.state.searchedName != '' && this.state.searchedPost != ''){
			filteredData = data.filter((data) => {
				return data.name.toLowerCase().startsWith(this.state.searchedName.toLowerCase()) && data.post.startsWith(this.state.searchedPost)
			})
		}

		else if(this.state.searchedName != ''){
			filteredData = data.filter((data) => {
				return data.name.toLowerCase().startsWith(this.state.searchedName.toLowerCase())
			})
		}

		else if(this.state.searchedPost != ''){
			filteredData = data.filter((data) => {
				return data.post.startsWith(this.state.searchedPost)
			})
		}

		let dataNodes = filteredData.map(function(item){
			return(
				<DataItem key={item.id} data={item} deletePost={actions.deletePost} editPost={actions.editPost}/>
				//...actions sama dengan deleteData={actions.deleteData} editData={actions.editData}.
			)
		})
		return(
			<div>
				<div className="row">
					<form>
						<div className="col-sm-6">
							<input className="form-control" type="text" placeholder="Search Name" value={this.state.searchedName} onChange={this.getSearchedName.bind(this)}/>
						</div>
						<div className="col-sm-6">
							<input className="form-control" type="text" placeholder="Search Post" value={this.state.searchedPost} onChange={this.getSearchedPost.bind(this)}/>
						</div>
					</form>
				</div>
				<br/>
				<div>{dataNodes}</div>
			</div>
		)
	}
}

ListItem.propTypes = {
	data: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
}

export default ListItem