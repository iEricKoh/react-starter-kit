import React                      from 'react'
import ReactDOM                   from 'react-dom'
import { AppContainer }           from 'react-hot-loader'
import { Router, browserHistory } from 'react-router'
import routes                     from './routes'

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={browserHistory} routes={routes} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

if (module.hot) {
  module.hot.accept('./components/App', render)
}
