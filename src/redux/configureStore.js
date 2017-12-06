import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import {PageReducer} from './reducers/reducers'

export const history = createHistory()


export const configure = (initialState = {}) => {
  const reducer = combineReducers({
    page: PageReducer
  })
  initialState = {
    page: 'Start'
  }
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk,routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  return store
}
