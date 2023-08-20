import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { useCart } from "../Context/CartContext";

function Products() {
  const [data, setData] = useState([]);
  const { cartItems, setCartItems } = useCart();
  useEffect(() => {
    const fetchProductsData = async () => {
      const result = await axios.get("http://localhost:3006/products");

      console.log(result.data);
      setData(result.data);
    };
    fetchProductsData();
  }, []);
  const addToCart = (product) => {
    if (!cartItems.some((i) => i.id === product.id)) {
      setCartItems((prevItems) => [...prevItems, product]);
      console.log(`Added ${product.name} to cart`);
      console.log(cartItems);
    }
  };

  return (
    <div className="product-grid">
      {data.map((i) => (
        <div key={i.id} className="product-cell">
          <img
            className="product-image"
            src={i.image_url}
            alt={`Product ${i.id}`}
          />
          <h4 className="product-details">{i.name}</h4>
          <p>{i.category}</p>
          <p> ${i.price} 3.5g</p>
          <button onClick={() => addToCart(i)}>add to cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;
