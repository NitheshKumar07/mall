import AllProducts from "./documents/AllProducts";
import LaptopPage from "./documents/LaptopPage";
import { Login } from "./documents/Login";
import Post from "./documents/Post";
import { Signup } from "./documents/Signup";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

function App() {
  const router=createBrowserRouter([
    {path:'',element:<Post/>},
    {path:'signup',element:<Signup/>},
    {path:'login',element:<Login/>},
    {path:'post',element:<Post/>},
    {path:'category',element:<AllProducts/>},
    {path:'laptopPage',element:<LaptopPage/>}
  ])
  return (
  <>
  <RouterProvider router={router}/>
  </>)
}

export default App;
