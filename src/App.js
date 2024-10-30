import AllProducts from "./documents/AllProducts";
import LaptopPage from "./documents/LaptopPage";
import { Login } from "./documents/Login";
import PhonePage from "./documents/PhonePage";
import Post from "./documents/Post";
import { Signup } from "./documents/Signup";
import { createBrowserRouter, RouterProvider, useLocation, ScrollRestoration } from 'react-router-dom';
import WatchPage from "./documents/WatchPage";
import HandbagPage from "./documents/HandbagPage";
import ChudidarPage from "./documents/ChudidarPage";
import JeansPage from "./documents/JeansPage";
import SareePage from "./documents/SareePage";
import SuitPage from "./documents/SuitPage";
import TvPage from "./documents/TvPage";
import FridgePage from "./documents/FridgePage";
import ACPage from "./documents/ACPage";
import ShoePage from "./documents/ShoePage";
import GamePage from "./documents/GamePage";
import SoloLaptop from "./documents/SoloLaptop";
import SoloShoe from "./documents/SoloShoe";
import SoloHandbag from "./documents/SoloHandbag";
import SoloSuit from "./documents/SoloSuit";
import SoloSaree from "./documents/SoloSaree";
import SoloTV from "./documents/SoloTV";
import SoloAC from "./documents/SoloAC";
import SoloChudidar from "./documents/SoloChudidar";
import SoloPhone from "./documents/SoloPhone";
import SoloGame from "./documents/SoloGame";
import SoloFridge from "./documents/SoloFridge";
import SoloJeans from "./documents/SoloJeans";
import SoloWatch from "./documents/SoloWatch";
import Layout from "./documents/Layout";
import UpdateProduct from "./documents/UpdateProduct";
import CartProvider from "./documents/CartProvider";
import SeeCart from "./documents/SeeCart";
import SmallLoader from "./documents/SmallLoader";
import Wishlist from "./documents/Wishlist";
import WishlistProvider from "./documents/WishlistProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '', element: <AllProducts /> },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'post', element: <Post /> },
        { path: 'category', element: <AllProducts /> },
        { path: 'laptopPage', element: <LaptopPage /> },
        { path: 'phonePage', element: <PhonePage /> },
        { path: 'watchpage', element: <WatchPage /> },
        { path: 'handbagpage', element: <HandbagPage /> },
        { path: 'chudidarpage', element: <ChudidarPage /> },
        { path: 'jeanspage', element: <JeansPage /> },
        { path: 'sareepage', element: <SareePage /> },
        { path: 'suitpage', element: <SuitPage /> },
        { path: 'tvpage', element: <TvPage /> },
        { path: 'fridgepage', element: <FridgePage /> },
        { path: 'acpage', element: <ACPage /> },
        { path: 'shoepage', element: <ShoePage /> },
        { path: 'gamepage', element: <GamePage /> },
        { path: 'sololaptop/:id', element: <SoloLaptop /> },
        { path: 'soloshoe/:id', element: <SoloShoe /> },
        { path: 'solohandbag/:id', element: <SoloHandbag /> },
        { path: 'solosuit/:id', element: <SoloSuit /> },
        { path: 'solosaree/:id', element: <SoloSaree /> },
        { path: 'solotv/:id', element: <SoloTV /> },
        { path: 'soloac/:id', element: <SoloAC /> },
        { path: 'solochudidar/:id', element: <SoloChudidar /> },
        { path: 'solophone/:id', element: <SoloPhone /> },
        { path: 'sologame/:id', element: <SoloGame /> },
        { path: 'solofridge/:id', element: <SoloFridge /> },
        { path: 'solojeans/:id', element: <SoloJeans /> },
        { path: 'solowatch/:id', element: <SoloWatch /> },
        { path: 'updateproduct/:id', element: <UpdateProduct />},
        { path: 'seecart', element: <SeeCart /> },
        { path: 'wishlist', element: <Wishlist /> },
        {path: 'smallloader', element: <SmallLoader />}
      ],
    },
  ]);

  return (
    <>
    <WishlistProvider>
    <CartProvider>
    <RouterProvider router={router}/>
    </CartProvider>
    </WishlistProvider>
    </>
  );
}

export default App;
