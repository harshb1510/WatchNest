import "./navbar.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../../features/cartSlice";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const user = localStorage.getItem('token');
  const googleUser = JSON.parse(localStorage.getItem("google-token"));
  const [profileOpen, setProfileOpen] = useState(false);
  const {cartTotalQuantity} = useSelector(state=>state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartData());
    }
  }, [dispatch, user]);


  return (
    <>
      <section className="navbarSection" >
        <nav className="navbar navbar-expand-lg bg-dark text-light ">
          <div className="container-fluid">
            <Link to='/' className="navbar-brand text-light brandName">
              <h1 className="brand">
              WatchNest
              </h1>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="/#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
             
               
               <SearchBar/>
              <div className="searchResult">
              </div>
            </div>
            <div className="navbaricons">
              <div className="loginIcon" >
                <FavoriteBorderIcon style={{ fontSize: "35px"}}  />
                <span>Wishlist</span>
              </div>
              <Link to='./cart' style={{textDecoration:"none",color:"white"}}>
              <div className="loginIcon" >
                <ShoppingCartIcon
                  style={{ fontSize: "35px" }}
                  ></ShoppingCartIcon>
                <span className="cartQuantity">{cartTotalQuantity}</span>
                <span>Cart</span>
              </div>
                  </Link>
              {!(user||googleUser) && (
                <div className="loginIcon">
                  <Link to="./login" className="loginLink">
                    <PersonOutlineIcon style={{ fontSize: "35px" }} />
                  </Link>
                  <span>Login</span>
                </div>
              )}
              {(user||googleUser) && (
                <div
                  className="loginIcon"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <PersonOutlineIcon style={{ fontSize: "35px" }} />
                  <span>Profile</span>
                </div>
              )}
            </div>
            {profileOpen&&<Profile/>}
          </div>
        </nav>
                
        <div >
          <nav className="nav navbar-expand-lg bg-dark text-light ">
            <div className="container-fluid ">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="/#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse navHeight "
                id="navbarSupportedContent"
                >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
                  <li className="nav-item mx-auto">
                    <Link to="/men" className="link2">
                      Men
                    </Link>
                  </li>
                  <li className="nav-item mx-4">
                    <Link to="/women" className="link2">
                      Women
                    </Link>
                  </li>
                  <li className="nav-item mx-4">
                    <Link to="/premium" className="link2">
                      Premium Watches
                    </Link>
                  </li>
                  <li className="nav-item mx-4">
                    <Link to="/new-arrivals" className="link2">
                      Women New Arrivals
                    </Link>
                  </li>
                  <li className="nav-item mx-4">
                    <Link to="/smart-watches" className="link2">
                      Smart Watches
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default Navbar;
