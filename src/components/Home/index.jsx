import React from 'react'
import CounterContainer from '../../containers/Counter'
import CSSModules                  from 'react-css-modules'
import styles                      from './styles.css'

const Home = () => (
  <div styleName='home'>
    <h3>Home</h3>
    <CounterContainer />
  </div>
)

export default CSSModules(Home, styles)
