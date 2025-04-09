import React from "react";
import Accordion from "./Components/Accordion/Accordion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import ToDoApp from "./Pages/TodoApp/ToDoApp";
import PasswordGenerator from "./Components/PasswordGenerator/PasswordGenerator";
import SearchImage from "./Components/OnlinePictureStore/SearchImage";
import AddToCart from "./Components/AddToCart/AddToCart";
import ShoppingCart from "./Pages/AddToCart/ShoppingCart";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element=<h1 className="text-7xl h-screen flex items-center justify-center">Page Not Found (404)</h1> />
          <Route path="/" element={<Landing />} />
          <Route path="/project/to-do-app" element={<ToDoApp />} />
          <Route path="/project/password-generator" element={<PasswordGenerator />} />
          <Route path="/project/online-pic-store" element=<SearchImage /> />
          <Route path="/project/add-to-cart" element=<AddToCart /> />
          <Route path="/add-to-cart/cart" element=<ShoppingCart /> />
        </Routes>
      </BrowserRouter>
      {/* <Accordion /> */}
    </>
  )
}

export default App
