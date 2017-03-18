import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
}                           from 'react-router-dom'
import Home                 from '../Home'
import About                from '../About'
import App                  from '../App'
import Inbox                from '../Inbox'

class Root extends Component {
  render() {
    return (
      <Router>
        <App>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/inbox" component={Inbox} />
        </App>
      </Router>
    )
  }
}

export default Root
