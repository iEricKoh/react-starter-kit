import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles.css'

@CSSModules(styles)
export default class Footer extends Component {
  render() {
    return (
      <footer styleName='footer'>
        <section styleName='inner'>
          footer
        </section>
      </footer>
    )
  }
}
