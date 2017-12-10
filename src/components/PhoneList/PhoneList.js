import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../redux/actions/actions'

class PhoneList extends Component {
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
        <h1>PhoneList.js</h1>
        <p>Welcome home!</p>
        <p>{page}</p>
        <p onClick={this.testDispatch}>Test Dispatch</p>
      </div>
    );
  }
}

export default connect(
  (state)=>{
    return {
      page: state.page
    }
  }
)(PhoneList)
