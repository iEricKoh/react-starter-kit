import React, {Component}          from 'react'
import CSSModules                  from 'react-css-modules'
import styles                      from './styles.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import About                       from '../About'
import Inbox                       from '../Inbox'
import Login                       from '../Login'
import Home                        from '../Home'
import PropTypes from 'prop-types'

@CSSModules(styles)
class Main extends Component {
  render() {
    const { match } = this.props

    return (
      <main styleName='main'>
        <Switch>
          <Route exact path={match.url} component={Home} />
          <Route path={`${match.url}/about`} component={About} />
          <Route path={`${match.url}/login`} component={Login} />
          <Route path={`${match.url}/inbox`} component={Inbox} />
          <Redirect to="/404"/>
        </Switch>
      </main>
    )
  }
}

Main.propTypes = {
  match: PropTypes.object
}

export default Main
