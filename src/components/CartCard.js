import React from 'react'
import { AiFillDelete } from "react-icons/ai";
import "./cartCard.css";
import { addToCart, calculatePrice, decreaseCartItem, deleteCartItem } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

const CartCard = ({ cartItem }) => {
    // console.log(cartItem);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteCartItem(id));
        dispatch(calculatePrice());
    }

    const handleIncrease = (product) => {
        dispatch(addToCart(product));
        dispatch(calculatePrice());
    }

    const handleDecrease = (product) => {
        dispatch(decreaseCartItem(product));
        dispatch(calculatePrice());
    }
    

  return (
    <>
        <div className="cart-card" key={cartItem.id}>
           <div className="cart-img">
            <img src={cartItem.image} alt={cartItem.title} />
           </div>
           <div className="cart-detail">
            <h3 className="cart-title">{cartItem.title}</h3>
           </div>
           <div className="cart-quantity">
            <button className="plus" onClick={() => handleIncrease(cartItem)}>+</button>
            <span className="qty">{cartItem.quantity}</span>
            <button className="minus" onClick={() => handleDecrease(cartItem)}>-</button>
           </div>
           <div className="cart-price">
            <h4>${cartItem.price}</h4>
           </div>
           <AiFillDelete onClick={() => handleDelete(cartItem.id)}  />
        </div>
    </>
  )
}

export default CartCard;