import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "./header.css";
import { useSelector } from 'react-redux';

const Header = () => {
    const { cartItems } = useSelector(state => state.cart);
    const [isResponsive, setIsResponsive] = useState(false);
    console.log(isResponsive);
  return (
    <div className="navbar">
       <div className="logo">
            <Link to="/">Cartify</Link>
       </div>
       <nav>
            <ul className={`${isResponsive ? "show-menu" : ""}`}>
                <li>
                    <Link to="/" onClick={() => setIsResponsive(!isResponsive)}>Home</Link>
                </li>
                <li>
                    <Link to="/cart" onClick={() => setIsResponsive(!isResponsive)}>
                        <FaCartArrowDown />
                        {
                            cartItems.length > 0 ? (
                                <span className="count">{cartItems.length}</span>
                            ) : (
                                ""
                            )
                        }
                    </Link>
                </li>
            </ul>
       </nav>
       <div className="menu-icon">
       {
         isResponsive ? (<AiOutlineClose onClick={() => setIsResponsive(!isResponsive)} />) : (
          <AiOutlineMenu onClick={() => setIsResponsive(!isResponsive)} />
         )
       }
       </div>
    </div>
  )
}

export default Header;