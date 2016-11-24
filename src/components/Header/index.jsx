import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './styles.css'

@CSSModules(styles)
export default class Header extends Component {
  render() {
    return (
      <header styleName='header'>
        <section styleName='inner'>
          <div styleName='brand'>brand</div>
          <div styleName='actions'>
            <Link className='btn' styleName='action' to="/about">About</Link>
            <Link className='btn' styleName='action' to="/inbox">Inbox</Link>
          </div>
        </section>
      </header>
    )
  }
}
