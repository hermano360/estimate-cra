import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Modal, Button} from 'react-bootstrap'
import actions from '../../../redux/actions/actions'
import request from 'superagent'

import './Sidebar.css'

class Sidebar extends Component {
  constructor(e){
    super(e)
    this.state = {
      estimateReady: false
    }
    this.handleEstimate = this.handleEstimate.bind(this)
  }
  generateTotal(quote){
    let total = 0
    quote.shoppingCart.forEach((item)=>{
      total += item.quantity *  parseFloat(item.labor.substr(1)) + item.quantity *  parseFloat(item.totalMaterial.substr(1))
    })
    console.log(total)
  }
  handleEstimate(){
    const {estimateReady} = this.state
    const {quotes, quoteNumber} = this.props
    this.setState({
      estimateReady: !estimateReady
    })
    if(estimateReady){

    } else {
      this.generateTotal(quotes[quoteNumber])
      // request
      //   .post('/generateDocument')


    }
  }
  handleDuplicate(){
    console.log('duplicate')
  }
  handleNewQuote(){
    console.log('new quote')
  }
  handleWorkOrder(){
    console.log('work order')
  }
  handleShoppingList(){
    console.log('shopping list')
  }
  handleEmailBid(){
    console.log('email bid')
  }

  render() {
    const {toggleShowModal, show} = this.props
    const {estimateReady} = this.state

    return (
      <Modal show={show} onHide={toggleShowModal}  className="c-sidebar-modal" >
        <Modal.Header closeButton>
          <div className="c-sidebar-header">Options</div>
        </Modal.Header>
        <Modal.Body>
          <div className="c-sidebar-item" onClick={()=>this.handleEstimate()}>{estimateReady ? "Download" : "Estimate"}</div>
          <div className="c-sidebar-item" onClick={()=>this.handleDuplicate()}>Duplicate</div>
          <div className="c-sidebar-item" onClick={()=>this.handleNewQuote()}>New Quote</div>
          <div className="c-sidebar-item" onClick={()=>this.handleWorkOrder()}>Work Order</div>
          <div className="c-sidebar-item" onClick={()=>this.handleShoppingList()}>Shopping List</div>
          <div className="c-sidebar-item" onClick={()=>this.handleEmailBid()}>Email Bid</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="c-sidebar-close" onClick={toggleShowModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  (state)=>{
    return {
      quotes: state.quotes,
      quoteNumber: state.quoteNumber
    }
  }
)(Sidebar)
