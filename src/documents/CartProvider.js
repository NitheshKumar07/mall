import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart items from localStorage
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Save cart items to localStorage whenever they change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);

            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id, increment = true) => {
              setCartItems(prevItems => prevItems.map(item =>
                item._id === id ? {...item, quantity: increment ? item.quantity + 1
                  : Math.max(1, item.quantity - 1) //quantity never goes to negative
                }
                : item
              ))
            }
          

const updateCartItem = (id, updatedSizes) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item._id === id ? { ...item, ...updatedSizes } : item
    )
  );
};


    const clearCart = () => {
        setCartItems([]);
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeItem, updateQuantity, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
