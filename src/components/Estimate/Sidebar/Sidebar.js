import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Modal, Button} from 'react-bootstrap'
import actions from '../../../redux/actions/actions'

import './Sidebar.css'

class Sidebar extends Component {
  constructor(e){
    super(e)
    this.state = {

    }

  }


  render() {
    const {toggleShowModal, show} = this.props

    return (
      <Modal show={show} onHide={toggleShowModal}  className="c-sidebar-modal" >
        <Modal.Header closeButton>
          <div className="c-sidebar-header">Options</div>
        </Modal.Header>
        <Modal.Body>
          <div className="c-sidebar-item">Estimate</div>
          <div className="c-sidebar-item">Duplicate</div>
          <div className="c-sidebar-item">New Quote</div>
          <div className="c-sidebar-item">Work Order</div>
          <div className="c-sidebar-item">Shopping List</div>
          <div className="c-sidebar-item">Email Bid</div>
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
    return {}
  }
)(Sidebar)
