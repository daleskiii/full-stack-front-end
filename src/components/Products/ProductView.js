import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import "./ProductView.css";

function ProductView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { cartItems, setCartItems } = useCart();
  const { userId } = useAuth();
  useEffect(() => {
    const fetchProductsData = async () => {
      const result = await axios.get(`http://localhost:3006/products/${id}`);
      setData(result.data);
    };
    fetchProductsData();
  }, [id]);
  const addToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      try {
        const response = await axios.post(
          `http://localhost:3006/user/${userId}/orders`,
          {
            product_id: product.id,
            user_id: userId,
          }
        );

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
    <div className="product-view-container">
      <div className="product-details">
        <h1 className="product-name">{data.name}</h1>
        <img
          className="product-image"
          src={data.image_url}
          alt={`Product ${data.id}`}
        />
      </div>
      <div className="product-description">
        <p>{data.description}</p>
        <p> THC%: {data.thc_content}</p>
        <p>CBD: {data.cbd_content ? "true" : "false"}</p>
      </div>

      <button onClick={() => addToCart(data)} className="add-to-cart-button">
        ADD TO CART ${data.price}
      </button>
    </div>
  );
}

export default ProductView;
