import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TiArrowLeftOutline from 'react-icons/lib/ti/arrow-left-outline'
import TiArrowRightOutline from 'react-icons/lib/ti/arrow-right-outline'
import MdMenu from 'react-icons/lib/md/menu'
import ToggleButton from 'react-toggle'
import moment from 'moment'

import EstimateWorksheet from './EstimateWorksheet/EstimateWorksheet'
import Sidebar from './Sidebar/Sidebar'

import logo from '../../assets/images/ezestimator_logo.png'
import actions from '../../redux/actions/actions'

import "react-toggle/style.css"
import './Estimate.css'

class Estimate extends Component {
  constructor(props){
    super(props)
    this.state = {
      showTotal: false,
      showSidebar: false
    }
    this.toggleShowModal = this.toggleShowModal.bind(this)
  }

  toggleShowModal(){
    const {showSidebar} = this.state

    this.setState({
      showSidebar: !showSidebar
    })
  }

  render() {
    const {dispatch, estimator} = this.props
    const {showTotal, showSidebar} = this.state
    const currentDate = moment().format('D-MMM-YY')

    return (
      <div className="c-estimate-body">
        <Sidebar show={showSidebar} toggleShowModal={this.toggleShowModal}/>
        <div className="c-estimate-action-button c-estimate-sidebar"
          onClick={this.toggleShowModal}>
          <MdMenu/>
        </div>
        <div className="c-estimate-header">
          <div className="c-estimate-next-quote">
            <TiArrowLeftOutline/>
            <div className="c-estimate-next-quote-page">#6</div>
            <TiArrowRightOutline/>
          </div>
          <div className="c-estimate-logo-container">
            <img src={logo} alt='Estimate Logo' className="c-estimate-logo"/>
          </div>
          <ToggleButton className="c-estimate-show-total" checked={showTotal}
            icons={{checked: null, unchecked: null}}
            onChange={() => this.setState({showTotal: !showTotal})} />
        </div>
        <div className="c-estimate-input-body">
          <input type="text" className="c-estimate-input c-estimate-input-half" placeholder="First Name"/>
          <input type="text" className="c-estimate-input c-estimate-input-half" placeholder="Last Name"/>
          <input type="text" className="c-estimate-input c-estimate-input-full" placeholder="Street Address"/>
          <input type="text" className="c-estimate-input c-estimate-input-third" placeholder="City"/>
          <input type="text" className="c-estimate-input c-estimate-input-third" placeholder="State"/>
          <input type="text" className="c-estimate-input c-estimate-input-third" placeholder="ZIP"/>
          <input type="text" className="c-estimate-input c-estimate-input-half" placeholder="Phone"/>
          <input type="text" className="c-estimate-input c-estimate-input-half" placeholder="Email"/>
          <select className='c-estimate-estimator c-estimate-input c-estimate-input-half' value={estimator} onChange={(e)=>{dispatch(actions.changeEstimator(e.target.value))}}>
            <option value="">-Estimator-</option>
            <option value="Arnold Corona">Arnold Corona</option>
            <option value="Gary Banks">Gary Banks</option>
            <option value="John Chavez">John Chavez</option>
            <option value="John Gutierrez">John Gutierrez</option>
            <option value="Bob Leon">Bob Leon</option>
            <option value="Ricardo Rivera">Ricardo Rivera</option>
            <option value="Mike Rogers">Mike Rogers</option>
            <option value="Cameron Sterling">Cameron Sterling</option>
          </select>
          <input type="text" className="c-estimate-input c-estimate-input-half" defaultValue={currentDate}/>
          <textarea className="c-estimate-input c-estimate-input-textarea" placeholder="Scope of Work"/>
        </div>
        <EstimateWorksheet />
        <Link to="/">
          <div className="c-estimate-action-button c-estimate-back">Back</div>
        </Link>
        <div className={`c-estimate-action-button c-estimate-total ${showTotal ? '' : 'hidden'}`} >Total</div>
      </div>
    );
  }
}

export default connect(
  (state)=>{
    return {
      estimator: state.estimator
    }
  }
)(Estimate)
