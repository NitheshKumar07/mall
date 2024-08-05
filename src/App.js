import { Login } from "./documents/Login";
import { Signup } from "./documents/Signup";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

function App() {
  const router=createBrowserRouter([
    {path:'',element:<Login/>},
    {path:'signup',element:<Signup/>},
    {path:'login',element:<Login/>}
  ])
  return (
  <>
  <RouterProvider router={router}/>
  </>)
}

export default App;
