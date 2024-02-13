import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';
import ProductCard from './ProductCard';
import Errors from './Error';
import "./home.css";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart, calculatePrice } from '../store/cartSlice';
import { HiOutlineSearch } from "react-icons/hi"

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [sortClass, setSortClass] = useState(false);

    const dispatch = useDispatch();

    const btns = []

    let API_URL = "https://fakestoreapi.com/products";

    const fetchProducts = async() => {
      try {
        const response = await fetch(API_URL);
        console.log(response);
        if(!response.ok){
          throw new Error(`Something went wrong, Error code: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        // console.log(error.status);
        setError(error);
      }
    }

    useEffect(() => {
      fetchProducts();
    }, []);

    if(error) return <Errors err={error} />

    const addProduct = (product) => {
      dispatch(addToCart(product));
      dispatch(calculatePrice());
      toast.success("Item added in your cart");
    }


    const sortByLow = () => {
      let sortCopy = [...products];
      let sortPrice = sortCopy.sort((a, b) => {
        return a.price - b.price;
      });
      setProducts(sortPrice);
      setSortClass(true);
    }

    const sortByHigh = () => {
      let sortCopy = [...products];
      let sortPrice = sortCopy.sort((a, b) => {
        return b.price - a.price;
      });
      setProducts(sortPrice);
      setSortClass(true);
    }

  return (
    <div className="home">
      <div className="row">
        {
          loading ? (
            <div className="loader">
              <Bars color="#3e038b" />
            </div>
          ) : (
            <>
              <div className="upper">
                <div className="search">
                  <input type="text" placeholder="Search products by name and category..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <HiOutlineSearch />
                  {/* <button>Search</button> */}
                </div>
                <div className="sort-section">
                  <span className="filter">Filters by price:</span>
                  <div className="sort-btn">
                    <button className={sortClass} onClick={sortByLow}>Price - Low to High</button>
                    <button className={sortClass} onClick={sortByHigh}>Price - High to Low</button>
                    <button className={sortClass } onClick={fetchProducts}>Fetch Prev</button>
                  </div>
                </div>
              </div>
              <div className='card-row'>
                {
                  products && 
                  products.filter((prod) => (
                    prod.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
                    prod.category.toLowerCase().includes(search.toLocaleLowerCase())
                  ))
                  .map((prod) => (
                    <ProductCard product={prod} addProduct={addProduct} />
                  ))
                }
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Home;