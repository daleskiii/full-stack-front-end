import React, { useEffect, useState } from "react";

import "./Products.css";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { getProducts, addToCartCall } from "../API/API";

function Products() {
  const [data, setData] = useState([]);
  const { cartItems, setCartItems } = useCart();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchProductsData = async () => {
      const result = await getProducts();
      setData(result.data);
    };
    fetchProductsData();
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const addToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      try {
        // const response = await axios.post(
        //   `http://localhost:3006/user/${userId}/orders`,
        //   {
        //     product_id: product.id,
        //     user_id: userId,
        //   }
        // );
        const response = await addToCartCall({
          product_id: product.id,
          user_id: userId,
        });

        if (response.data.message === "product was added") {
          setCartItems((prevItems) => [
            ...prevItems,
            { ...product, quantity: 1 },
          ]);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  return (
    <div className="product-grid">
      {data.map((i) => (
        <div key={i.id} className="product-cell">
          <Link to={`/products/${i.id}`}>
            <img
              className="product-image"
              src={i.image_url}
              alt={`Product ${i.id}`}
            />
            <h4 className="product-details">{i.name}</h4>
          </Link>

          <p> ${i.price} / 3.5g</p>

          <button onClick={() => addToCart(i)}>add to cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;
