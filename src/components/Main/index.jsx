import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles.css'

@CSSModules(styles)
export default class Main extends Component {
  render() {
    return (
      <main styleName='main'>
        {this.props.children}
      </main>
    )
  }
}
