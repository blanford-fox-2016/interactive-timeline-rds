import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListItem from '../components/ListItem'
import Navbar from '../components/Navbar'
import FormAdd from '../components/FormAdd'

class App extends Component {
    render() {
        const {magicDataFromRedux, magicActionFromRedux} = this.props
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="well text-center">
                            <h1>Interactive Timeline with REDUX</h1>
                        </div>
                    </div>
                    <FormAdd onSave={magicActionFromRedux.addPost}/>
                    <ListItem data={magicDataFromRedux} actions={magicActionFromRedux}/>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    magicDataFromRedux: PropTypes.array.isRequired,
    magicActionFromRedux: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {magicDataFromRedux: state.data}
}

function mapDispatchToProps(dispatch) {
    return {
        magicActionFromRedux: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
