import React, {Component, PropTypes} from 'react'
import DataItem from './DataItem'
import SearchForm from '../components/SearchForm'

export default class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchedName: '',
            searchedPhone: ''
        }
    }
    getSearchedName(e) {
        this.setState({searchedName: e.target.value})
    }
    getSearchedPhone(e) {
        this.setState({searchedPhone: e.target.value})
    }
    render() {
        const {data, actions} = this.props
        let filteredData = data

        if (this.state.searchedName != '' && this.state.searchedPhone != '') {
            filteredData = data.filter((data) => {
                return data.name.toLowerCase().startsWith(this.state.searchedName.toLowerCase()) && data.phone.startsWith(this.state.searchedPhone)
            })
        } else if (this.state.searchedName != '') {
            filteredData = data.filter((data) => {
                return data.name.toLowerCase().startsWith(this.state.searchedName.toLowerCase())
            })
        } else if (this.state.searchedPhone != '') {
            filteredData = data.filter((data) => {
                return data.phone.startsWith(this.state.searchedPhone)
            })
        }
        let dataNodes = filteredData.map(function(item) {
            return (<DataItem key={item.id} data={item} {...actions}/>)
        })
        return (
            <div>
                <div className="container search-form well">
                    <SearchForm atNameChange={this.getSearchedName.bind(this)} valName={this.state.searchedName} atPhoneChange={this.getSearchedPhone.bind(this)} valPhone={this.state.searchedPhone}/>
                </div>
                <ul className="list-group">
                    {dataNodes}
                </ul>
            </div>
        )
    }
}

ListItem.propTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}
