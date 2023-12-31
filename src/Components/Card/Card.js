import "./card.css";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <Link className="link" to={`/product`}>
      <div className="card card1">
        <div className="image1">
          {item.isNew &&<span className="season">New Season</span>}
          <img src={item.img} alt="" className="mainImg" />
          <img src={item.img2} alt="" className="secondImg"/>
        </div>
        <h2 style={{fontSize:"1rem"}}>{item.title}</h2>
        <div className="prices">
          <h3>${item.oldPrice}</h3>
          <h3>${item.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
