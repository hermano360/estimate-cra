import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Modal, Button} from 'react-bootstrap'
import NumericInput from 'react-numeric-input'

import actions from '../../../redux/actions/actions'
import './Settings.css'



class Settings extends Component {
  render() {
    const {labor, tax, extraWork, showModal, estimator, toggleSettingsModal, dispatch} = this.props

    return (
      <Modal show={showModal} onHide={toggleSettingsModal}>
        <Modal.Header closeButton>
          <div className='c-settings-title'>Settings</div>
        </Modal.Header>
        <Modal.Body>
          <div className='c-settings-label'>Estimator</div>
          <select className='c-settings-estimator' value={estimator} onChange={(e)=>{dispatch(actions.changeEstimator(e.target.value))}}>
            <option value="">-Select-</option>
            <option value="Arnold Corona">Arnold Corona</option>
            <option value="Gary Banks">Gary Banks</option>
            <option value="John Chavez">John Chavez</option>
            <option value="John Gutierrez">John Gutierrez</option>
            <option value="Bob Leon">Bob Leon</option>
            <option value="Ricardo Rivera">Ricardo Rivera</option>
            <option value="Mike Rogers">Mike Rogers</option>
            <option value="Cameron Sterling">Cameron Sterling</option>
          </select>
          <div className='c-settings-label'>Labor %</div>
          <NumericInput min={0} max={100} value={labor} step={5}  mobile onChange={e => dispatch(actions.changeLabor(e))} />
          <div className='c-settings-label'>Extra Work %</div>
          <NumericInput min={0} max={100} value={extraWork} step={5}  mobile onChange={e => dispatch(actions.changeExtraWork(e))} />
          <div className='c-settings-label'>Tax %</div>
          <NumericInput min={7} max={15} value={tax} step={0.1} mobile onChange={e => dispatch(actions.changeTax(e))} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleSettingsModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  (state)=>{
    return {
      labor: state.labor,
      tax: state.tax,
      extraWork: state.extraWork,
      estimator: state.estimator
    }
  }
)(Settings)
