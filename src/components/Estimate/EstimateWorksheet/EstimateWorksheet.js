import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import actions from '../../../redux/actions/actions'
import 'react-select/dist/react-select.css';

import EstimateWorksheetItem from './EstimateWorksheetItem/EstimateWorksheetItem'
import './EstimateWorksheet.css'

class EstimateWorksheet extends Component {
  constructor(e){
    super(e)
    this.handleCategorySelect = this.handleCategorySelect.bind(this)
  }

  generateCategorySelect(categories){
    return categories.map((category)=>{
      return {value: category, label: category}
    })
  }
  generateProductSelect(products){
    return products.map((product)=>{
      return {value: product, label: product}
    })
  }
  handleCategorySelect(e){
    console.log(e)
  }
  handleProductSelect(e){
    console.log(e)
  }

  render() {
    const {categories, products} = this.props
    const sampleItem = {
      group: 'Moulding',
      keycode: 'Base1',
      labor: '2.00',
      number: 1,
      quantity: 5,
      sku: '686-985',
      specifications: `Supply Labor And Material For Installation Of Single Piece 3/8" X 2 1/4" Streamline Primed Base Moulding Along Baseboard Area.`,
      supplier: 'Home Depot',
      template: '',
      totalMaterial: '0.55',
      uom: 'ft'
    }
    return (
      <div className="c-estimators-worksheet-body">
        <div className="c-estimators-worksheet-title">Estimators Worksheet</div>
        <span className="c-estimators-worksheet-select-container">
          <Select
            options={this.generateCategorySelect(categories)}
            style={{backgroundColor: 'black'}}
            onChange={(e) => { this.handleCategorySelect(e.value) }}
            placeholder='Choose Template'
            noResultsText='N/A'
            clearable={false}
            className='c-estimators-worksheet-categories-select c-estimators-worksheet-select'
          />
        </span>
        <span className="c-estimators-worksheet-select-container">
          <Select
            options={this.generateProductSelect(products)}
            onChange={(e) => { this.handleProductSelect(e.value) }}
            placeholder='Choose Product'
            noResultsText='N/A'
            clearable={false}
            className='c-estimators-worksheet-products-select c-estimators-worksheet-select'
          />
        </span>
        <div className="c-estimators-worksheet-list">
          <span className="c-estimators-worksheet-list-title">
            <span className="c-estimators-worksheet-list-header c-estimators-worksheet-list-no">#</span>
            <span className="c-estimators-worksheet-list-header c-estimators-worksheet-list-code">Code</span>
            <span className="c-estimators-worksheet-list-header c-estimators-worksheet-list-amt">Amt</span>
            <span className="c-estimators-worksheet-list-header c-estimators-worksheet-list-units">Units</span>
            <span className="c-estimators-worksheet-list-header c-estimators-worksheet-list-desc">Description</span>
            <span className="c-estimators-worksheet-list-header c-estimators-worksheet-list-mtrl">Mtrl</span>
            <span className="c-estimators-worksheet-list-header c-estimators-worksheet-list-lbr">Lbr</span>
            <span className="c-estimators-worksheet-list-header c-estimators-worksheet-list-x">x</span>
          </span>
          <EstimateWorksheetItem item={sampleItem}/>
          <EstimateWorksheetItem item={sampleItem}/>
        </div>


      </div>
    );
  }
}

export default connect(
  (state)=>{
    return {
      categories: state.categories,
      products: state.products
    }
  }
)(EstimateWorksheet)
