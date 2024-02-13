import React from 'react'
import "./button.css";

const Button = ({ children, onClick, disabled }) => {
  return (
    <>
        <button onClick={onClick} disabled={disabled} className="cart-btn">{children}</button>
    </>
  )
}

export default Button;