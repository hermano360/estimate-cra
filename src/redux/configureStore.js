import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import {PageReducer, TaxReducer, LaborReducer, ExtraWorkReducer , EstimatorReducer, CategoriesReducer, ProductsReducer} from './reducers/reducers'

export const history = createHistory()


export const configure = (initialState = {}) => {
  const reducer = combineReducers({
    page: PageReducer,
    tax: TaxReducer,
    labor: LaborReducer,
    extraWork: ExtraWorkReducer,
    estimator: EstimatorReducer,
    categories: CategoriesReducer,
    products: ProductsReducer
  })
  initialState = {
    page: 'Start',
    labor: 30,
    extraWork: 40,
    tax: 9.5,
    estimator: "",
    categories: ['one', 'two'],
    products: ['one', 'two']
  }
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk,routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  return store
}
