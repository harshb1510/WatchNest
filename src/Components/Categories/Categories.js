import "./categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div >

      <h1 className="categoryHeading">Categories</h1><br/>
      </div>
    
      
      <div className="col">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
          />
          <button>
            <Link className="link" to="/products/1">
              Sale
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/1097089/pexels-photo-1097089.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
          />
          <button>
            <Link className="link" to="/products/1">
              Women
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/1578531/pexels-photo-1578531.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
          />
          <button>
            <Link className="link" to="/products/1">
              Men
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/35666/cooking-baby-only-kitchen.jpg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
              />
              <button>
                <Link className="link" to="/products/1">
                  Children
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/6022627/pexels-photo-6022627.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
              />
              <button>
                <Link className="link" to="/products/1">
                  New Season
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/716658/pexels-photo-716658.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
          />
          <button>
            <Link className="link" to="/products/1">
              Old Ones
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
