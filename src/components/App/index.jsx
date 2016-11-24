import React, { Component } from 'react'
import styles from './App.css'
import Header from '../Header'
import Footer from '../Footer'
import Main from '../Main'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main>
          {this.props.children}
        </Main>
        <Footer />
      </div>
    )
  }
}

export default App
