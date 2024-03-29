import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ordersFetch } from '../../features/OrderSlice';
import { jwtDecode } from 'jwt-decode';
import './History.css';

const History = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const user = localStorage.getItem('token');
  const decodedUser = user ? jwtDecode(user) : null;
  const id = decodedUser ? decodedUser.userId : null;

  useEffect(() => {
    dispatch(ordersFetch(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2 style={{ textAlign: 'center', padding: '50px' }}>Order History</h2>
      {orders.items && orders.items.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '30px', padding:'130px'}}>No orders in the history.</p>
      ) : (
        <div className="transaction-cards">
          {orders?.items?.map((product, index) => (
            <div key={index} className="transaction-card">
              <h3>Payment_id: {product.razorpayOrderId}</h3>
              <p>Order Total: {product.totalAmount}</p>
              <p>Date: {product.date.split('T')[0]}</p>
              <p>Time: {product.date.split('T')[1].split('.')[0]}</p>
              <div className="transaction-items">
                {product.items.map((item, index) => (
                  <div key={index} className="transaction-item">
                    <div className="transaction-item-details">
                      <h4>{item.product.title}</h4>
                      <img
                        src={item.product.img}
                        alt=""
                        style={{ width: '100px', height: '100px', borderRadius: '10px' }}
                      />
                      <p style={{ textAlign: 'center', padding: '5px' }}>Quantity {item.cartQuantity}</p>
                      <p>Price {item.product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
