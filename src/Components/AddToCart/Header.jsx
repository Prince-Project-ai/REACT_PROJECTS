import { ShoppingCart } from "lucide-react";
import React from "react";
import { useCart } from "../../Contexts/AddToCart/CartContext";
import { NavLink } from "react-router-dom";

const Header = () => {
    const { cartProduct } = useCart();
    return (
        <header className="bg-yellow-500 py-3 fixed top-0 left-0 right-0">
            <div className="container lg:max-w-7xl mx-auto lg:px-4 flex justify-between items-center">
                <div className="logo"><h2 className="text-2xl">Add-To-cart System</h2></div>
                <div className="relative">
                    <span className="absolute -top-1 -right-1 bg-white size-6 inline-flex justify-center items-center rounded-full">{cartProduct?.length}</span>

                    <NavLink className="text-3xl outline-none cursor-pointer" to="/add-to-cart/cart"><ShoppingCart size={40} /></NavLink>
                </div>
            </div>
        </header>
    );
};

export default React.memo(Header);