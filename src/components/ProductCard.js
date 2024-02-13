import React from 'react'
import "./productcard.css";
import Button from './Button';

const ProductCard = ({ product, addProduct }) => {

    const titleLength = 20; // 18 prev
    
    const isTitleLong = product.title.length > titleLength;

    const shortenTitle = isTitleLong ? (`${product.title.substring(0, titleLength)}...`) : (`${product.title}`)

    // let titleHead = product.title.substring(0, 18);
    // console.log(titleHead);
    
    // put this function in home
    
    
  return (
    <div className="card" key={product.id}>
       <div className="image">
        <img src={product.image} alt={product.title} />
       </div>
       {/* <div className="category">
         <span>{product.category}</span>
       </div> */}
       <span className="category">{product.category}</span>
       <div className="details">
        <h3 className="title">{shortenTitle}</h3>
        <span className={`rating ${product.rating.rate > 1 && product.rating.rate <= 2.2 ? "bad" : product.rating.rate > 2.3 && product.rating.rate < 3.5 ? "medium" : "good" }`}>{product.rating.rate}</span>
        <h4 className="price">Price: ${product.price}</h4>
       </div>
       <Button onClick={() => addProduct({...product, quantity: 1})}>Add to Cart</Button>
    </div>
  )
}

export default ProductCard;