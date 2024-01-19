import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productReducer, { productsFetch } from './features/productSlice';
import { productsApi } from './features/productsApi';
import cartReducer, { fetchCartData, getTotal } from './features/cartSlice';
import orderReducer from './features/OrderSlice';


const store = configureStore({
  reducer:{
    products:productReducer,
    cart:cartReducer,
    orders:orderReducer,
    [productsApi.reducerPath]:productsApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>{
   return getDefaultMiddleware().concat(productsApi.middleware)
  }
})

store.dispatch(productsFetch())
store.dispatch(fetchCartData());
store.dispatch(getTotal());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  <React.StrictMode>
    <Provider store={store}>
    <App />

    </Provider>
  </React.StrictMode>
  </div>
);
reportWebVitals();
