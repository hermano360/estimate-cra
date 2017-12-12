import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import {PageReducer, TaxReducer, LaborReducer, ExtraWorkReducer , EstimatorReducer, CategoriesReducer, ProductsReducer, QuotesReducer, QuoteNumberReducer} from './reducers/reducers'

export const history = createHistory()


export const configure = (initialState = {}) => {
  const reducer = combineReducers({
    page: PageReducer,
    tax: TaxReducer,
    labor: LaborReducer,
    extraWork: ExtraWorkReducer,
    estimator: EstimatorReducer,
    categories: CategoriesReducer,
    products: ProductsReducer,
    quotes: QuotesReducer,
    quoteNumber: QuoteNumberReducer
  })
  initialState = {
    page: 'Start',
    labor: 30,
    extraWork: 40,
    tax: 9.5,
    estimator: "",
    categories: ['one', 'two'],
    products: ['one', 'two'],
    quotes: {
      1 : {
      address: "1629 Second Street",
      city: "Duarte",
      customerFirstName: "Herminio",
      customerLastName: "Garcia",
      date: '10-Dec-17',
      email: "hermano360@gmail.com",
      phone: "7655436533",
      scopeOfWork: "This is going to be an awesome project",
      quoteNumber: 1,
      estimator: "Arnold Corona",
      shoppingCart: [],
      state: "CA",
      zipcode: "91010"
    },
    2 : {
    address: "1639 Second Street",
    city: "Duarte",
    customerFirstName: "Herminio",
    customerLastName: "Garcia",
    date: '10-Dec-17',
    email: "hermano360@gmail.com",
    phone: "7655436533",
    scopeOfWork: "This is going to be an awesome project",
    quoteNumber: 2,
    estimator: "Arnold Corona",
    shoppingCart: [],
    state: "CA",
    zipcode: "91010"
  }
   },
    quoteNumber: 1
  }
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk,routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  return store
}
