import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import actions from '../../../../redux/actions/actions'

import './EstimateWorksheetItem.css'

class EstimateWorksheetItem extends Component {
  constructor(e){
    super(e)
    this.state = {
      focus: false
    }
    this.toggleTextAreaFocus = this.toggleTextAreaFocus.bind(this)
  }

  toggleTextAreaFocus(){
    const {focus} = this.state
    this.setState({
      focus: !focus
    })
  }

  render() {
    const {item} = this.props
    const {focus} = this.state

    return (
      <div className={`c-estimators-worksheet-items ${focus ? 'c-estimators-worksheet-items-focus' : ''}`}>
          <span className="c-estimators-worksheet-list-item c-estimators-worksheet-list-item-no">{item.number}</span>
          <span className="c-estimators-worksheet-list-item c-estimators-worksheet-list-item-code">{item.keycode}</span>
          <span className="c-estimators-worksheet-list-item c-estimators-worksheet-list-item-amt">
            <input type="text" className="c-estimators-worksheet-list-item-amt-input"
              defaultValue={item.quantity}
            />
          </span>
          <span className="c-estimators-worksheet-list-item c-estimators-worksheet-list-item-units">{item.uom}</span>
          <span className="c-estimators-worksheet-list-item c-estimators-worksheet-list-item-desc">
            <textarea
              className="c-estimators-worksheet-list-item-desc-input"
              defaultValue={item.specifications}
              onFocus={this.toggleTextAreaFocus}
              onBlur={this.toggleTextAreaFocus}
            />
          </span>
          <span className="c-estimators-worksheet-list-item c-estimators-worksheet-list-item-mtrl">${parseFloat(item.quantity*item.totalMaterial).toFixed(2)}</span>
          <span className="c-estimators-worksheet-list-item c-estimators-worksheet-list-item-lbr">${parseFloat(item.quantity*item.labor).toFixed(2)}</span>
          <span className="c-estimators-worksheet-list-item c-estimators-worksheet-list-item-x">x</span>
      </div>
    );
  }
}

export default connect(
  (state)=>{
    return {}
  }
)(EstimateWorksheetItem)
