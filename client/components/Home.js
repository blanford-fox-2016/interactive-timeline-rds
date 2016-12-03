// import React from 'react'
// import { connect } from 'react-redux'
//
// export default () => <div>HOME VIEW</div>
//
// export default connect()(Home)
//
// import React from 'react'
// import { connect } from 'react-redux'
// // import { increase, decrease } from '../actions/count'
//
// export default function () {
//   return (
//     <div>
//       Some state changes:
//       {/* {number}
//       <button onClick={() => increase(1)}>Increase</button>
//       <button onClick={() => decrease(1)}>Decrease</button> */}
//     </div>
//   )
// }
//
// // export default connect(
//   // state => ({ number: state.count.number }),
//   // { increase, decrease }
// // )(Home)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Auth } from '../public/js/Auth'

class Home extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    !Auth.getToken()
    ?
    this.props.router.replace('/')
    :
    this.props.router.replace('/dashboard')
  }
  render(){
    return(
      <div>HOME VIEW</div>
    )
  }
}

export default connect()(Home)
