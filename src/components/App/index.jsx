import React             from 'react'
import { Route, Switch } from 'react-router-dom'
import Home              from '../Home'
import Login             from '../Login'
import PrivateRoute      from '../PrivateRoute'
import NoMatch           from '../NoMatch'
import Dashboard         from '../Dashboard'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />

    <PrivateRoute path='/dashboard' component={Dashboard} />

    <Route exact path='/404' component={NoMatch} />
    <Route component={NoMatch} />
  </Switch>
)

export default App
