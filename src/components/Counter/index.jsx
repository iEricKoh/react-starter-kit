import React from 'react'

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

export default Counter
