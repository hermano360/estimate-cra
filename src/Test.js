import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from './redux/actions/actions'

class Test extends Component {
  constructor(e){
    super(e)
    this.testDispatch = this.testDispatch.bind(this)
  }
  testDispatch () {
    const {dispatch} = this.props
    dispatch(actions.changePage('Test Succeeds!'))
  }
  render() {
    const {page} = this.props
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome home!</p>
        <p>{page}</p>
        <p onClick={this.testDispatch}>Test Dispatch</p>
      </div>
    );
  }
}





// importing the above object into the properties of the component
export default connect(
  (state)=>{
    return {
      page: state.page
    }
  }
)(Test)
