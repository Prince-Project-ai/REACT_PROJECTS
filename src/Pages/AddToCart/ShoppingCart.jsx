import React, { useCallback, useReducer, useEffect } from 'react';
import { useCart } from '../../Contexts/AddToCart/CartContext';
import { NavLink } from 'react-router-dom';

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {

    case 'INCREMENT':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case 'DECREMENT':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

    case 'REMOVE':
      return state.filter(item => item.id !== action.payload.id);

    case 'REPLACE_CART':
      return action.payload.cart;

    default:
      return state;
  }
}

const ShoppingCart = () => {
  const { cartProduct, setCartProduct } = useCart();

  // Initialize reducer with cart products
  const [cartItems, dispatch] = useReducer(cartReducer, cartProduct || []);


  // Sync with context when it changes
  useEffect(() => {
    if (cartProduct) {
      dispatch({ type: 'REPLACE_CART', payload: { cart: cartProduct } });
    }
  }, [cartProduct]);

  useEffect(() => {
    if (JSON.stringify(cartProduct) !== JSON.stringify(cartItems)) {
      setCartProduct(cartItems);
    }
  }, [cartItems, cartProduct, setCartProduct]);

  // Memoized handlers
  const handleIncrement = useCallback((id) => {
    dispatch({ type: 'INCREMENT', payload: { id } });
  }, []);

  const handleDecrement = useCallback((id) => {
    dispatch({ type: 'DECREMENT', payload: { id } });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', payload: { id } });
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen py-6 sm:py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-4">Your cart is empty</p>
          <NavLink
            to="/project/add-to-cart"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 relative min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Shopping Cart ({cartItems.length})
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="hidden md:grid md:grid-cols-12 p-4 sm:p-6 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="md:col-span-6 flex flex-wrap items-center gap-4">
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.images}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiMdcbkHLfQNSliDmfFZFMSRCM-A9i3o6k2A&s';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 break-words">{item.title}</h3>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 text-sm mt-1 hover:text-red-800 transition-colors"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex md:justify-center items-center mt-4 md:mt-0">
                    <span className="md:hidden font-medium mr-2 text-gray-700">Price:</span>
                    <span className="text-gray-900">₹{item.price.toFixed(2)}</span>
                  </div>

                  <div className="md:col-span-2 flex md:justify-center items-center mt-4 md:mt-0">
                    <span className="md:hidden font-medium mr-2 text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="outline-none px-3 py-1.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="outline-none px-3 py-1.5 bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex md:justify-end items-center mt-4 md:mt-0">
                    <span className="md:hidden font-medium mr-2 text-gray-700">Total:</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 flex flex-col sticky top-0 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4 border-gray-200">
                  <div className="flex justify-between text-base font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  alert('Proceeding to checkout');
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;