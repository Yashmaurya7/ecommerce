import React from 'react'
import { useDispatch } from 'react-redux'

const About = () => {
  const value = 20;
  const dispatch = useDispatch();

  const addBtn = () => {
    dispatch({
      type:"ALL_PRODUCT_SUCCESS"
    })
  }
  const subBtn = () => {

  }
  return (
    <div>
      <h2>{value}</h2>
      <button onClick={addBtn}>Increment</button>
      <button onClick={subBtn}>Decrement</button>
    </div>
  )
}

export default About