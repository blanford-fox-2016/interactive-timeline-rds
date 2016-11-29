import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import ListItem from '../components/ListTimeline'
import FormTimeline from '../components/FormTimeline'
import AuthComponent from '../components/AuthComponent'
import {Auth} from '../public/scripts/token'
import { Link, browserHistory } from 'react-router'

class Timeline extends Component {

    componentDidMount() {
        this.props.actions.loadTimelines()
        // this.props.actions.loadComments()
    }

    render() {
        const {timelineReducers, actions} = this.props
        // console.log("Dari timeline: ", commentReducers)

        // return(
        //     <div>
        //         <nav className="navbar navbar-default navbar-fixed-top">
        //             <div className="container-fluid">
        //                 <div className="navbar-header">
        //                     <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        //                         <span className="icon-bar"></span>
        //                         <span className="icon-bar"></span>
        //                         <span className="icon-bar"></span>
        //                     </button>
        //                     <a className="navbar-brand" href="#">WebSiteName</a>
        //                 </div>
        //                 <div className="collapse navbar-collapse" id="myNavbar">
        //                     <ul className="nav navbar-nav">
        //                         <li className="active"><a href="#">Home</a></li>
        //                     </ul>
        //                     <ul className="nav navbar-nav navbar-right">
        //                         <li>
        //                             <Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </nav>
        //
        //         <div className="container" id="container">
        //             <div className="row">
        //                 <div className="col-sm-8 col-sm-offset-2">
        //                     <div className="jumbotron text-center">
        //                         <h3>Interactive Timeline RDS</h3>
        //                     </div>
        //                 </div>
        //             </div>
        //
        //             <div className="row">
        //                 <div className="col-sm-8 col-sm-offset-2">
        //                     <FormTimeline onSave={actions.addTimeline}/>
        //                 </div>
        //             </div>
        //
        //             <div className="row" id="list-item">
        //                 <div className="col-sm-8 col-sm-offset-2">
        //                     <ListItem timelineReducers={timelineReducers} actions={actions}/>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // )

        if (!Auth.getToken()) {
            return(
                <div>
                    <AuthComponent loginUser={actions.loginUser} registerUser={actions.registerUser} />
                </div>
            )
        }
        else {
            return(
                <div className="container">

                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="jumbotron text-center">
                                <h3>Interactive Timeline RDS</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <FormTimeline onSave={actions.addTimeline}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <ListItem timelineReducers={timelineReducers} actions={actions}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}



Timeline.propTypes = {
    timelineReducers: PropTypes.array.isRequired,
    // commentReducers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        timelineReducers: state.timelineReducers,
        // commentReducers: state.commentReducers
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(AppActions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline)

