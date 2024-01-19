import "./Cart.css";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeCartItem,decreaseCartQuantity, addToCart, clearCart, getTotal, increaseQuantityOnBackend } from "../../features/cartSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchCartData,removeFromCartOnBackend,decreaseQuantityOnBackend,addToCartOnBackend,clearCartOnBackend,fetchCartTotal } from "../../features/cartSlice";
import axios from "axios";



const Cart = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    // dispatch(fetchCartData());
    dispatch(fetchCartTotal());
  }, [dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    // dispatch(removeCartItem(cartItem));
    dispatch(removeFromCartOnBackend(cartItem));
  };
  
  const handleAddToCart = async (cartItem) => {
    await dispatch(addToCartOnBackend(cartItem.product));
    await dispatch(fetchCartData());
    await dispatch(fetchCartTotal());
  };
  
  const decreaseQuantity = async (cartItem) => {
    await dispatch(decreaseQuantityOnBackend(cartItem));
    await dispatch(fetchCartData());
    await dispatch(fetchCartTotal());
  };
  
  const handleClearCart = () => {
    // dispatch(clearCart());
    dispatch(clearCartOnBackend()); // Assuming id is the user's ID
  };
  
  
  return (
    <div className="cart-container">
    <h2>Shopping Cart</h2>
    {cart?.cartItems.length === 0 ? (
      <div className="cart-empty">
        <p>Your cart is currently empty</p>
        <div className="start-shopping">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <div className="titles">
          <h3 className="product-title">Product</h3>
          <h3 className="price">Price</h3>
          <h3 className="quantity">Quantity</h3>
          <h3 className="total">Total</h3>
        </div>
        <div className="cart-items">
          {cart.cartItems &&
            cart.cartItems.map((cartItem,index) => (
              <div className="cart-item" key={index}>
                <div className="cart-product">
                  <img src={cartItem.product?.img} alt={cartItem.product?.name} />
                  <div>
                    <h3>{cartItem.product?.title}</h3>
                    <button onClick={()=>handleRemoveFromCart(cartItem)} >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.product?.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={()=>decreaseQuantity(cartItem)} >
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={()=>handleAddToCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.product?.price * cartItem?.cartQuantity}
                </div>
              </div>
            ))}
        </div>
        <div className="cart-summary">
          <button className="clear-btn" onClick={()=>handleClearCart()} >
            Clear Cart
          </button>
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Subtotal</span>
              <span className="amount">{cart?.cartTotalAmount.toString()}</span>
            </div>
            <p>Taxes and shipping calculated at checkout</p>
           <Link to='/checkout'> <button>Check out</button></Link>
            <div className="continue-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Cart;
      
