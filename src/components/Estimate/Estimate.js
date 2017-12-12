import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TiArrowLeftOutline from 'react-icons/lib/ti/arrow-left-outline'
import TiArrowRightOutline from 'react-icons/lib/ti/arrow-right-outline'
import MdMenu from 'react-icons/lib/md/menu'
import ToggleButton from 'react-toggle'
import moment from 'moment'
import request from 'superagent'


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
      showSidebar: false,
      availableQuoteNumbers: []
    }
    this.toggleShowModal = this.toggleShowModal.bind(this)
    this.incrementQuoteNumber = this.incrementQuoteNumber.bind(this)
    this.decrementQuoteNumber = this.decrementQuoteNumber.bind(this)
  }

  toggleShowModal(){
    const {showSidebar} = this.state
    this.setState({
      showSidebar: !showSidebar
    })
  }

  retrieveExternalCategories(){
    const {dispatch} = this.props
    const currentTime = new Date().getTime()
    const timeCategoriesLastAccessed = localStorage.getItem('categoriesAccessDate')
    const oneDay = 86400000

    if(currentTime - timeCategoriesLastAccessed < oneDay && localStorage.getItem('categories')){
      dispatch(actions.loadCategories(JSON.parse(localStorage.getItem('categories'))))
    } else {
      request.get(`/categories`)
        .then((res) => {
          localStorage.setItem('categories', JSON.stringify(res.body))
          localStorage.setItem('categoriesAccessDate',new Date().getTime())
          dispatch(actions.loadCategories(res.body))
        }).catch((err) => { console.log(err) })
    }
  }

  retrieveExternalProducts(){
    const {dispatch} = this.props
    const currentTime = new Date().getTime()
    const timeProductsLastAccessed = localStorage.getItem('productsAccessDate')
    const oneDay = 86400000
    if(currentTime - timeProductsLastAccessed > oneDay || localStorage.getItem('products')===undefined){
      request.get(`/products`)
        .then((res) => {
          localStorage.setItem('products', JSON.stringify(res.body))
          localStorage.setItem('productsAccessDate',new Date().getTime())
          dispatch(actions.loadCategories(res.body))
        }).catch((err) => { console.log(err) })
    } else {
      dispatch(actions.loadProducts(JSON.parse(localStorage.getItem('products'))))
    }
  }
  retrieveAvailableQuoteNumbers(){
    const {dispatch} = this.props
    const currentTime = new Date().getTime()
    const timeQuoteNumbersLastAccessed = localStorage.getItem('quoteNumbersAccessDate')
    const oneDay = 86400000
    if(currentTime - timeQuoteNumbersLastAccessed > oneDay || localStorage.getItem('quoteNumbers')===undefined){
      request.get(`/availableQuoteNumbers`)
        .then((res) => {
          localStorage.setItem('quoteNumbers', JSON.stringify(res.body))
          localStorage.setItem('quoteNumbersAccessDate',new Date().getTime())
        }).catch((err) => { console.log(err) })
    } else {
      dispatch(actions.loadProducts(JSON.parse(localStorage.getItem('products'))))
    }
  }

  findAvailableQuoteNumbers(quotes){
    this.setState({
      availableQuoteNumbers: Object.keys(quotes).sort()
    })
  }

  findNextAvailableQuoteNumber(quotes){
    const availableQuoteNumbers = Object.keys(quotes).sort()
    return Number(availableQuoteNumbers[availableQuoteNumbers.length-1]) + 1
  }

  incrementQuoteNumber(){
    const {availableQuoteNumbers} = this.state
    const {quoteNumber, dispatch} = this.props
    const currentQuoteNumberPosition = availableQuoteNumbers.indexOf(quoteNumber.toString())
    if(currentQuoteNumberPosition !== -1 && currentQuoteNumberPosition + 1 < availableQuoteNumbers.length){
      dispatch(actions.setQuoteNumber(Number(availableQuoteNumbers[currentQuoteNumberPosition + 1])))
    }

  }
  decrementQuoteNumber(){
    const {availableQuoteNumbers} = this.state
    const {quoteNumber, dispatch} = this.props
    const currentQuoteNumberPosition = availableQuoteNumbers.indexOf(quoteNumber.toString())

    if(currentQuoteNumberPosition !== -1 && currentQuoteNumberPosition > 0){
      dispatch(actions.setQuoteNumber(Number(availableQuoteNumbers[currentQuoteNumberPosition - 1])))
    }
  }

  componentWillMount(){
    const {quotes} = this.props

    this.retrieveExternalCategories()
    this.retrieveExternalProducts()
    this.findAvailableQuoteNumbers(quotes)
  }

  renderCurrentQuote(quotes, quoteNumber){
    // What if the cached quotes do not have a product with the requested quoteNumber?
    // A: Create a new quote
    return quotes[quoteNumber]
  }

  render() {
    const {dispatch, estimator, quotes, quoteNumber} = this.props
    const {showTotal, showSidebar} = this.state

    const currentDate = moment().format('D-MMM-YY')
    const currentQuote = this.renderCurrentQuote(quotes, quoteNumber)

    return (
      <div className="c-estimate-body">
        <Sidebar show={showSidebar} toggleShowModal={this.toggleShowModal}/>
        <div className="c-estimate-action-button c-estimate-sidebar"
          onClick={this.toggleShowModal}>
          <MdMenu/>
        </div>
        <div className="c-estimate-header">
          <div className="c-estimate-next-quote">
            <TiArrowLeftOutline onClick={this.decrementQuoteNumber} />
            <div className="c-estimate-next-quote-page">#{quoteNumber}</div>
            <TiArrowRightOutline onClick={this.incrementQuoteNumber}/>
          </div>
          <div className="c-estimate-logo-container">
            <img src={logo} alt='Estimate Logo' className="c-estimate-logo"/>
          </div>
          <ToggleButton className="c-estimate-show-total" checked={showTotal}
            icons={{checked: null, unchecked: null}}
            onChange={() => this.setState({showTotal: !showTotal})} />
        </div>
        <div className="c-estimate-input-body">
          <input type="text" className="c-estimate-input c-estimate-input-half"
            placeholder="First Name" value={currentQuote.customerFirstName}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'customerFirstName', e.target.value))}/>
          <input type="text" className="c-estimate-input c-estimate-input-half"
            placeholder="Last Name" value={currentQuote.customerLastName}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'customerLastName', e.target.value))}/>
          <input type="text" className="c-estimate-input c-estimate-input-full"
            placeholder="Street Address" value={currentQuote.address}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'address', e.target.value))}/>
          <input type="text" className="c-estimate-input c-estimate-input-third"
            placeholder="City" value={currentQuote.city}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'city', e.target.value))}/>
          <input type="text" className="c-estimate-input c-estimate-input-third"
            placeholder="State" value={currentQuote.state}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'state', e.target.value))}/>
          <input type="text" className="c-estimate-input c-estimate-input-third"
            placeholder="ZIP" value={currentQuote.zipcode}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'zipcode', e.target.value))}/>
          <input type="text" className="c-estimate-input c-estimate-input-half"
            placeholder="Phone" value={currentQuote.phone}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'phone', e.target.value))}/>
          <input type="text" className="c-estimate-input c-estimate-input-half"
            placeholder="Email" value={currentQuote.email}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'email', e.target.value))}/>
          <select className='c-estimate-estimator c-estimate-input c-estimate-input-half'
            value={currentQuote.estimator} onChange={(e)=>{dispatch(actions.changeEstimator(e.target.value))}}>
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
          <input type="text" className="c-estimate-input c-estimate-input-half"
            defaultValue={currentQuote.date}/>
          <textarea className="c-estimate-input c-estimate-input-textarea"
            placeholder="Scope of Work" value={currentQuote.scopeOfWork}
            onChange={(e)=>dispatch(actions.editQuoteAttribute(quoteNumber,'scopeOfWork', e.target.value))}/>
        </div>
        <EstimateWorksheet shoppingCart={currentQuote.shoppingCart}/>
        <Link to="/">
          <div className="c-estimate-action-button c-estimate-back">Back</div>
        </Link>
        <div className="c-estimate-action-button c-estimate-save"
          onClick={()=>console.log('save to database')}
        >Save</div>
        <div className={`c-estimate-action-button c-estimate-total ${showTotal ? '' : 'hidden'}`} >Total</div>
      </div>
    );
  }
}

export default connect(
  (state)=>{
    return {
      estimator: state.estimator,
      quotes: state.quotes,
      quoteNumber: state.quoteNumber
    }
  }
)(Estimate)
