import React from 'react'
import PropTypes from 'prop-types'

const Counter = (props) => {
  return (
    <div>
      <div>counter....</div>
      <h1>{props.counter}</h1>

      <button onClick={props.actions.increment}>increment</button>
      <button onClick={props.actions.decrement}>decrement</button>
    </div>
  )
}

Counter.propTypes = {
  actions: PropTypes.object,
  counter: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func
}

export default Counter
