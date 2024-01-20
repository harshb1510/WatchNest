import "./card.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { addToCartOnBackend } from "../../features/cartSlice";
import { toast } from "react-toastify";

const Card = ({ item }) => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (!token) {
      toast.error('Login first',{
        position:"top-center"
    })
    dispatch(addToCartOnBackend(item));
  };
}
  return (
    
      <div className="card card1">
        <div className="image1">
        <Link className="link" to={`/product/${item._id}`}>
          {item.isNew &&<span className="season">New Season</span>}
          <img src={item.img} alt="" className="mainImg" />
          <img src={item.img2} alt="" className="secondImg"/>
    </Link>
        </div>
        <h2 style={{fontSize:"1rem"}}>{item.title}</h2>
        <div className="prices">
          <h3>${item.oldPrice}</h3>
          <h3>${item.price}</h3>
        </div>
        <Button variant="dark" onClick={() => handleAddToCart(item)}>Add to cart</Button>
      </div>
  );
};

export default Card;
