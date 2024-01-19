import "./product.css";
import { useState, useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavouroteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from "../../features/productsApi";
import { addToCartOnBackend } from '../../features/cartSlice';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Product = () => {
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [product, setProduct] = useState(null);
  const [coupon,setCoupon] = useState('');
  const [discount,setDiscount] = useState('');
  const user = localStorage.getItem("token");
  const decodedUser =  user? jwtDecode(user):null;
  const _id = decodedUser? decodedUser.userId:null;
  
  useEffect(()=>{
    if(data){
      const product = data?.find((product)=>product._id === id);
      setProduct(product);
    }
  },[data,id])

  const images = [
    product?.img,
    product?.img2
  ];
  

  const handleAddToCart = () => {
    // Send the product and quantity to addToCartOnBackend thunk
    dispatch(addToCartOnBackend({ product}));
  };

  const handleCouponSubmit = async (e)=>{
    e.preventDefault();
    if(coupon){
    const sendCoupon = await axios.post(`${process.env.URL}/user/${_id}/coupon`,{coupon});
    const discount = sendCoupon.data.discount;
    setDiscount(discount);
    }else{
      alert("Enter coupon Code");
    }

}


  const handleInputChange = (e) => {
    setCoupon(e.target.value);
  };


  return (
    <div className="product">
      <div className="left4">
        <div className="images1">
          <img src={images[0]} alt="" onClick={(e) => setSelectedImg(0)} />
          <img src={images[1]} alt="" onClick={(e) => setSelectedImg(1)} />
        </div>
        <div className="mainImg">
          <img src={images[selectedImg]} alt="" />
        </div>
      </div>
      <div className="right4">
        <h1>{product?.title}</h1>
        <span className="price1">${product?.price}</span>
        <p>{product?.description}</p>
        <div className="quantity">
        <button onClick={() => setQuantity((prev) => (prev === 0 ? 0 : prev - 1))}>
          -
        </button>
        {quantity}
        <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
      </div>
      <button className="add" onClick={handleAddToCart}>
        <AddShoppingCartIcon />
        ADD TO CART
      </button>
      <form onSubmit={handleCouponSubmit}>
      <input type="text" placeholder="Apply Coupon" value={coupon}
      className="input1" onChange={handleInputChange}/>
      <button className="coupon" type="submit">Apply Coupon</button>
      </form>
        <div className="link1">
          <div className="item4">
            <FavouroteBorderIcon /> ADD TO WISHLIST
          </div>
          <div className="item4">
            <BalanceIcon /> ADD TO COMPARE
          </div>
        </div>
        <div className="info">
          <span>Vendor: </span>
          <span>Product Type: </span>
          <span>Tag: </span>
        </div>
        <hr />
        <div className="details">
          <span>DESCRIPTION</span>
          <hr />
          <span>ADDITINAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
