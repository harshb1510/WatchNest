import "./product.css";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavouroteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";

const Product = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const images = [
    "https://images.pexels.com/photos/1697218/pexels-photo-1697218.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3121275/pexels-photo-3121275.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ];
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
        <h1>Title</h1>
        <span className="price1">$199</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis
          ducimus quasi, itaque tenetur quas officiis fuga, sequi dolores, ipsam
          et reprehenderit omnis similique suscipit amet odio recusandae
          deserunt repellat.
        </p>
        <div className="quantity">
          <button
            onClick={() => setQuantity((prev) => (prev === 0 ? 0 : prev - 1))}
          >
            -
          </button>
          {quantity}
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button className="add">
          <AddShoppingCartIcon />
          ADD TO CART
        </button>
        <div className="link1">
          <div className="item4">
            <FavouroteBorderIcon /> ADD TO WISHLIST
          </div>
          <div className="item4">
            <BalanceIcon /> ADD TO COMPARE
          </div>
        </div>
        <div className="info">
          <span>Vendor:Polo</span>
          <span>Product Type:T-Shirt</span>
          <span>Tag:T-Shirt,Women,Top</span>
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
