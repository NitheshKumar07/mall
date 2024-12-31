import { createContext, useContext, useEffect, useState } from "react";

const wishlistContext = createContext();
export const useWishlist = () =>  useContext(wishlistContext);


const WishlistProvider = ({ children }) => {
    const [wishlistItems, setwishlistItems] = useState(() => {;
    // load wishlist items from local storage
    const savedWish = localStorage.getItem('wishlistItems');
    return savedWish ? JSON.parse(savedWish) : [];
    });

    useEffect(() => {
        // load wishlist whenever it changes
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems])

    const addToWishlist = (product) => {
        setwishlistItems(prevItems => {
            const existingItems = prevItems.find(item => item._id === product._id);

            if( existingItems ) {
                return prevItems.map(item => 
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item 
                );
            } else {
                return [ ...prevItems, {...product, quantity: 1}];
            }
        })
    }
    
    const clearWish = () => {
        setwishlistItems([]);
    }

    const removeWish = (id) => {
        setwishlistItems(prev => prev.filter(item => item._id !== id));
    }

    return (<>
    <wishlistContext.Provider value={{wishlistItems, addToWishlist, clearWish, removeWish}}>
        {children}
    </wishlistContext.Provider>

    </>)
}
export default WishlistProvider;