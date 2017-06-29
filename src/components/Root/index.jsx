import React, { Component }             from 'react'
import { BrowserRouter as Router }      from 'react-router-dom'
import App                              from '../App'
import { createStore, applyMiddleware } from 'redux'
import thunk                            from 'redux-thunk'
import { Provider }                     from 'react-redux'
import rootReducer                      from '../../reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

class Root extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    )
  }
}

export default Root
