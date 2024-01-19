import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ordersFetch } from '../../features/OrderSlice';
import { jwtDecode } from 'jwt-decode';
import "./History.css";
import ProductModal from './ProductModal';

const History = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const user = localStorage.getItem("token");
  const decodedUser =  user? jwtDecode(user):null;
  const id = decodedUser? decodedUser.userId:null;

  useEffect(() => {
    dispatch(ordersFetch(id));
  }, [])
  return (
    <div>
    <h2>Order History</h2>
    <div className="transaction-cards">
    {orders?.items?.map((product, index) => (
        <div key={index} className="transaction-card">
          <h3>Payment_id: {product.razorpayOrderId}</h3>
          <p>Order Total: {product.totalAmount}</p>
          <p>Date: {product.date.split("T")[0]}</p>
          <p>Time:{ product.date.split("T")[1].split(".")[0]}</p>
          <div className="transaction-items">
            {product.items.map((item, index) => (
              <div key={index} className="transaction-item">
                <div className="transaction-item-details">
                  <h4>{item.product.title}</h4>
                  <img src={item.product.img} alt="" className='' style={{width:"100px",height:"100px"}} />
                  <p>Quantity: {item.cartQuantity}</p>
                  <p>Price: {item.product.price}</p>
                </div>
              </div>
            ))}
            </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default History
