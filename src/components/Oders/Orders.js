import React, { useEffect, useState } from "react";

import "./Orders.css";
import { getOrderByUser, deleteOder } from "../API/API";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";

function Orders() {
  const [data, setData] = useState([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const { setCartQuant, cartQuant } = useCart();
  const { userId } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          // const response = await axios.get(
          //   `http://localhost:3006/user/orders/${userId}`
          // );

          const response = await getOrderByUser(userId);
          console.log(response.data);
          setData(response.data);
          // console.log(response.data);
          // const quantity = response.data.order_quantity;
          // console.log(quantity);

          const quantity = response.data.map((i) => i.order_quantity);
          // console.log(quantity);
          const calaculatedQuantity = quantity.reduce(
            (acc, order) => order + acc,
            0
          );
          // console.log(calaculatedQuantity);

          setCartQuant(calaculatedQuantity);
          // console.log(cartQuant);
        }
      } catch (error) {
        console.error("Error fetching orders:");
      }
    };

    fetchData();
  }, [userId, setCartQuant, cartQuant]);
  // get the current total

  useEffect(() => {
    const calculatedTotal = data.reduce(
      (acc, order) => acc + order.product_price * order.order_quantity,
      0
    );
    setCurrentTotal(calculatedTotal);
  }, [data]);

  const removeFromCart = async (orderId) => {
    try {
      // await axios.delete(`http://localhost:3006/user/orders/${orderId}`);
      await deleteOder(orderId);
      const updatedData = data.filter((order) => order.order_id !== orderId);
      setData(updatedData);
    } catch (e) {
      console.log(e);
    }
  };
  // checking product quantities
  // const countQuantity = (data, productName) => {
  //   const quantity = data.filter((order) => order.product_name === productName);
  //   return quantity.length;
  // };

  return (
    <div className="cart-grid">
      <div>
        <h1>Orders</h1>
      </div>

      {data.map((order) => (
        <div key={order.order_id} className="cart-item">
          <p>Product: {order.product_name}</p>
          <p>Quantity:{order.order_quantity} </p>
          <p>Price: $ {order.product_price}</p>
          <img
            className="product-image"
            src={order.image_url}
            alt={order.product_name}
          />
          <button onClick={() => removeFromCart(order.order_id)}>
            Remove item from cart
          </button>
        </div>
      ))}
      <div className="total">
        <p>Total: ${currentTotal}</p>
      </div>
    </div>
  );
}

export default Orders;
