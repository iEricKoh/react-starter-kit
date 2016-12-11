import React, { Component }       from 'react'
import { Router, browserHistory } from 'react-router'
import routes                     from '../../routes'

class Root extends Component {
  render() {
    if (!this.routes) this.routes = routes

    return (
      <Router history={browserHistory} routes={this.routes} />
    )
  }
}

export default Root
