import React, {Component, PropTypes} from 'react'
import DataItem from './DataItem'


export default class ListItem extends Component{
  constructor(props) {
    super(props)
    this.state = {
      searchedName: '',
      searchedPhone: ''
    }
  }

  getSearchedName(e) {
    this.setState({
        searchedName: e.target.value
    })
  }

  getSearchedPhone(e) {
    this.setState({
      searchedPhone: e.target.value
    })
  }


  render() {
    const {data, actions} = this.props
    let tempData = data
    if(this.state.searchedName != '') {
      tempData = tempData.filter((data) => data.name.toLowerCase().startsWith(this.state.searchedName.toLowerCase()))
    } else if (this.state.searchedPhone != '') {
      tempData = tempData.filter((data) => data.phone.startsWith(this.state.searchedPhone))
    }
    let dataNodes = tempData.map(item => (<DataItem key={item.id} data={item} {...actions} />) ) // it's the same as the all the data
    return (
      <div className="container">
				<div className="row">
					<form>
						<div className="col-sm-6">
							<input className="form-control" type="text" placeholder="Search Name" value={this.state.searchedName} onChange={this.getSearchedName.bind(this)}/>
						</div>
						<div className="col-sm-6">
							<input className="form-control" type="text" placeholder="Search Phone No" value={this.state.searchedPhone} onChange={this.getSearchedPhone.bind(this)}/>
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
