import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators  } from 'redux'
import * as CounterActionCreator from '../actions/counter.js'
import Counter from '../components/Counter'

const mapStateToProps = (state) => {
  return {
    counter: state.get('counter'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CounterActionCreator, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CounterContainer extends Component {
  render() {
    return (
      <Counter {...this.props} />
    )
  }
}
