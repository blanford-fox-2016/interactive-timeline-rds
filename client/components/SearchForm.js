import React, {Component, PropTypes} from 'react'

class SearchForm extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label className="inline">Name</label>
                    <input type="text" className="form-control" id="form-search-name" value={this.props.valName} onChange={this.props.atNameChange} placeholder="Search Name"/>
                </div>
                <div className="form-group">
                    <label className="inline">Phone</label>
                    <input type="text" className="form-control" id="form-search-phone" value={this.props.valPhone} onChange={this.props.atPhoneChange} placeholder="Search Phone"/>
                </div>
            </form>
        )
    }
}

export default SearchForm
