import React, { Component }        from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import App                         from '../App'
import { Provider }                from 'react-redux'
import createStore                 from './createStore'

class Root extends Component {
  render() {
    return (
      <Router>
        <Provider store={createStore()}>
          <App />
        </Provider>
      </Router>
    )
  }
}

export default Root
