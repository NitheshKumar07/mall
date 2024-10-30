import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
      setCartItems(prevItems =>{
        const existingItem = prevItems.find(item => item._id === product._id);

        if(existingItem){
          return prevItems.map(item =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1} : item
          );
        }else {
          return [...prevItems, {...product, quantity: 1}];
        }
      })
    }
    const updateQuantity = (id, increment = true) => {
      setCartItems(prevItems => prevItems.map(item =>
        item._id === id ? {...item, quantity: increment ? item.quantity + 1
          : Math.max(1, item.quantity - 1) //quantity never goes to negative
        }
        : item
      ))
    }
  
    const clearCart = () => {
      setCartItems([]);
    }

    const removeItem = (id) => {
      setCartItems(prev => prev.filter(item => item._id !== id));
    }

  return (<>
  <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeItem, updateQuantity}}>
    {children}
  </CartContext.Provider>
  </>)
}

export default CartProvider;
