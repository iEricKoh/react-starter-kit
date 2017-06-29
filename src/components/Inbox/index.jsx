import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

const InboxDetails = ({ match }) => {
  return <div>Inbox id: {match.params.id}</div>
}

const Inbox = ({ match }) => (
  <div>
    <h2>Inbox</h2>
    <Switch>
      <Route exact path={match.url} render={() => <div>Welcome to your Inbox</div>} />
      <Route path={`${match.url}/:id`} component={InboxDetails} />
    </Switch>
  </div>
)

export default Inbox
