import React      from 'react'
import CSSModules from 'react-css-modules'
import styles     from './styles.css'

const Footer = () => (
  <footer styleName='footer'>
    <section styleName='inner'>
      footer
    </section>
  </footer>
)

export default CSSModules(Footer, styles)
