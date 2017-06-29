import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

const InboxDetails = ({ match }) => {
  return <div>Inbox id: {match.params.id}</div>
}

InboxDetails.propTypes = {
  match: PropTypes.object
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

Inbox.propTypes = {
  match: PropTypes.object
}

export default Inbox
