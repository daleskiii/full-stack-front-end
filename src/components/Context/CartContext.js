import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartQuant, setCartQuant] = useState(0);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, setCartQuant, cartQuant }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
