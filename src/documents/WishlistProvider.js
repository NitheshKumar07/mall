import { createContext, useContext, useState } from "react";

const wishlistContext = createContext();
export const useWishlist = () =>  useContext(wishlistContext);


const WishlistProvider = ({ children }) => {
    const [wishlistItems, setwishlistItems] = useState([]);

    const addToWishlist = (product) => {
        console.log(product);
        setwishlistItems( prevItems => [...prevItems, product]);
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