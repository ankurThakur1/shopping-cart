import React, { useEffect, useState } from 'react'
import "./cart.css";
import { useDispatch, useSelector } from 'react-redux';
import CartCard from './CartCard';
import { BsBagFill } from "react-icons/bs"
import Button from './Button';
import { json, useNavigate } from 'react-router-dom';
import { clearCartItem } from '../store/cartSlice';
import { TailSpin } from 'react-loader-spinner';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cartItems, total, subTotal, tax, shipping } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
    const handlePlaceOrder = () => {
      setLoading(true);
      setTimeout(() => {
        navigate("/placeorder");
        dispatch(clearCartItem());
        setLoading(false);
        toast.success("Item Purchased");
      }, 2000);
    }



  return (
    <>
      <div className="cart-head">
        <h1><BsBagFill /> My Cart</h1>
        <span className="cart-length">{cartItems.length > 1 ? "Cart Items:" : "Cart Item:"} {cartItems.length}</span>
      </div>
      <div className="cart">
        <div className="cart-items">
          <div className="headinds">
            <div className="table-item">
              <p>Item</p>
            </div>
            <div className="table-title">
              <p>Title</p>
            </div>
            <div className="table-qty">
              <p>Quantity</p>
            </div>
            <div className="table-price">
              <p>Price</p>
            </div>
          </div>
          {
            cartItems.length > 0 ? (
              cartItems.map((item) => (
              <CartCard cartItem={item} key={item.id} />
            ))
            ) : (
              <div className="no-item">
                <h1>Your Cart is empty!!</h1>
              </div>
            )
          }
        </div>
        <div className="total-items">
          <h3>Total Section</h3>
          <div className="total-section">
            <span className="sub-head">Subtotal: </span>
            <span className="amt">${subTotal}</span>
          </div>
          <div className="total-section">
            <span className="sub-head">Shipping: </span>
            <span className="amt">${shipping}</span>
          </div>
          <div className="total-section">
            <span className="sub-head">Tax: </span>
            <span className="amt">${tax}</span>
          </div>
          <div className="total-section">
            <span className="sub-head">Total: </span>
            <span className="amt">${total}</span>
          </div>
          <Button onClick={handlePlaceOrder} disabled={loading}>{loading ? <TailSpin height={15} width={15} color="white" /> : "Place Order"}</Button>
        </div>
      </div>
    </>
  )
}

export default Cart;