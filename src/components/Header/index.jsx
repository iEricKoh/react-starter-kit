import React, { Component } from 'react'
import CSSModules           from 'react-css-modules'
import { Link }             from 'react-router-dom'
import styles               from './styles.css'

@CSSModules(styles)
export default class Header extends Component {
  render() {
    const { match } = this.props

    return (
      <header styleName='header'>
        <section styleName='inner'>
          <div styleName='brand'>brand</div>
          <div styleName='actions'>
            <Link className='btn' styleName='action' to={`${match.url}/about`}>About</Link>
            <Link className='btn' styleName='action' to={`${match.url}/inbox`}>Inbox</Link>
          </div>
        </section>
      </header>
    )
  }
}
