import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListItem from '../components/ListItem'
import Navbar from '../components/Navbar'
import FormAdd from '../components/FormAdd'

class App extends Component {
    componentDidMount() {
      console.log('components');
      this.props.actions.loadPhoneBooks()
    }
    render() {
        const {data, actions} = this.props
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="well text-center">
                            <h1>Hacktiv8 Phone Book Apps</h1>
                        </div>
                    </div>
                    <FormAdd onSave={actions.addPhoneBook}/>
                    <ListItem data={data} actions={actions}/>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {data: state.data}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
