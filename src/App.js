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
import Checkout from "./Pages/Checkout/Checkout";
import History from "./Pages/History/History";

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
          path: "/premium",
          element: <MenProduct />,
        },
        {
          path: "/new-arrivals",
          element: <MenProduct />,
        },
        {
          path: "/smart-watches",
          element: <MenProduct />,
        },
        {
          path: "/product/:id",
          element: <Product />
        }
        ,
        {
          path: "/shoppingHistory",
          element: <History/>
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
     
    },
       {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/checkout",
          element: <Checkout/>
        }
  ]);
  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        // hideProgressBar={true}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;






