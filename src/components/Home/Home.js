import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/ezestimator_logo.png'
import GoGear from 'react-icons/lib/go/gear'
import Settings from './Settings/Settings'

import './Home.css'

import { Button } from 'react-bootstrap'

class Home extends Component {
  constructor(e){
    super(e)
    this.state={
      showModal: false
    }
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this)
  }

  toggleSettingsModal(){
    const {showModal} = this.state
    this.setState({
      showModal: !showModal
    })
  }
  render() {
    const {showModal} = this.state
    return (
      <div className="c-home-body">
        <Settings showModal={showModal} toggleSettingsModal={this.toggleSettingsModal}/>
        <div className="c-home-gear" onClick={this.toggleSettingsModal}>
          <div className="c-home-gear-icon"><GoGear/></div>
          <div className="c-home-gear-text">Settings</div>
        </div>
        <img src={logo} alt='Estimate Logo' className="c-home-logo"/>
        <div className="c-home-button-group">
          <Link to="/estimate" onClick={this.toggleSettingsModal}>
            <Button bsSize="large" className="c-home-button c-home-button-top">Estimate</Button>
          </Link>
          <Link to="/products" onClick={this.toggleSettingsModal}>
            <Button bsSize="large" className="c-home-button c-home-button-bottom">Products</Button>
          </Link>
          <Link to="/phone" onClick={this.toggleSettingsModal}>
            <Button bsSize="large" className="c-home-button c-home-button-bottom">Phone</Button>
          </Link>
        </div>
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
)(Home)
