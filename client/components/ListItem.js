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
    render() {
        const {data, actions} = this.props
        let filteredData = data
        let dataNodes = filteredData.map(function(item) {
            return (<DataItem key={item.id} data={item} {...actions}/>)
        })
        return (
            <div className="container datalist">
                {dataNodes}
            </div>
        )
    }
}

ListItem.propTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}
