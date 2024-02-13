import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
    const navigate = useNavigate();

    const goHome = () => {
      navigate("/");
    }

  return (
    <div className="greet">
      <h1>Thank you for shopping with us!!!</h1>
      <Button onClick={goHome}>Go to homepage</Button>
    </div>
  )
}

export default PlaceOrder;