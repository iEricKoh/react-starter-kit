import React, { Component } from 'react'
import { Link }             from 'react-router-dom'
import './styles.css'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'

@withRouter
class Header extends Component {
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

Header.propTypes = {
  match: PropTypes.object
}

export default Header
