import React, { useCallback } from "react";
import { useCart } from "../../Contexts/AddToCart/CartContext";

const Product = ({ product }) => {
  const { setCartProduct, cartProduct } = useCart();

  const isProductInCart = cartProduct.some((item) => item?.id === product?.id);

  const addToCart = useCallback(() => {
    setCartProduct((prevCart) => {
      const isCartedPro = prevCart.some((item) => item?.id === product?.id);
      if (isCartedPro) {
        console.log("product already in cart");
        return prevCart;
      }
      return [...prevCart, { ...product, quantity: 1, maxQuantity: 10 }];
    });
  }, [setCartProduct, product]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={product?.images[1] || product?.images}
        alt={product?.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">{product?.title}</h2>
        </div>

        <div className="mt-2">
          <span className="text-xl font-bold text-gray-900">₹{product?.price}</span>
        </div>

        <div className="mt-2 flex-grow">
          <p className="text-gray-600 text-sm">{product?.description}</p>
        </div>

        <button
          onClick={addToCart}
          className={`mt-4  w-full py-2 rounded font-medium ${isProductInCart
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 cursor-pointer hover:bg-blue-700"
            } text-white`}
          disabled={isProductInCart}
        >
          {isProductInCart ? "Already in Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Product);