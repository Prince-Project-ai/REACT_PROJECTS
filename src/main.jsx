import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThemeProvider from './Contexts/TodoAppContext/ThemeContext.jsx';
import TodoProvider from './Contexts/TodoAppContext/TodoContext.jsx';
import CartProvider from './Contexts/AddToCart/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </TodoProvider>
    </ThemeProvider>
  </StrictMode>,
)
