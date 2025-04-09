import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { useCart } from "../../Contexts/AddToCart/CartContext";
import Product from "./Product";
import axios from "axios";



const AddToCart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response?.data?.products);
    } catch (error) {
      console.log(error.message || error);
    } finally {
      setisLoading(false);
    }
  }, [])

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) { return <p>Product is fetching..</p> }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(AddToCart);
