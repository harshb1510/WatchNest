import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, clearCartOnBackend, fetchCartData } from "../features/cartSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const user = localStorage.getItem("token");
  const decodedUser = user ? jwtDecode(user) : null;
  const id = decodedUser ? decodedUser.userId : null;
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, [dispatch]);


  const initPayment = (order) => {
    
    const options = {
      key:  "rzp_test_rrpFDSyVYUuEE4",
      amount: order.data.data.amount,
      currency: order.data.data.currency,
      order_id: order.data.data.id,
      handler: async (response) => {
        try {
          // Send the necessary information for payment verification
          const verifyUrl = `${process.env.URL}/user/${id}/verify`;
          
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
           await axios.post(verifyUrl, verifyData);
           const orderData = order.data.orderDetails;
           const saveOrderInfo = await axios.post(`${process.env.URL}/user/${id}/saveOrder`,orderData);
           toast.info(`Order placed`,{
            position:"top-center",
        })
           dispatch(clearCartOnBackend());
           navigate('/');           
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  const handlePayment = async () => {
    try {
      
      const order = await axios.post(
        `${process.env.URL}/user/${id}/orders`,
        cart
      );
      initPayment(order);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Checkout;