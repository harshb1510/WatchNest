import Home from "./Components/Home"
import MenProduct from "./Pages/MenProducts/MenProduct";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/Login"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import Signup from "./Pages/Signup/Signup";
import Product from "./Pages/Product/Product"
import {ToastContainer} from "react-toastify"
import Cart from "./Components/Cart/Cart";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar/>
        <Outlet />
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        { path: "/men", element: <MenProduct /> },
        {
          path: "/women",
          element: <MenProduct />,
        },
        {
          path: "/product",
          element: <Product />
        }
      ],
     
    },
       {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/signup",
          element: <Signup />
        }
  ]);
  return (
    <div className="App">
      <ToastContainer/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;






