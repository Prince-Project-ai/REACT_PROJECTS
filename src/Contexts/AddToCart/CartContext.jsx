import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartContext must use inside a ContextProvider");
  return context;
}

const CartProvider = ({ children }) => {
  const [cartProduct, setCartProduct] = useState([]);

  const contextValue = {
    cartProduct,
    setCartProduct,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;