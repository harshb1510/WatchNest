import { productsApi, useGetAllProductsQuery } from "../features/productsApi";
import Addbanner from "./Addbanner/Addbanner";
import Carousel from "./Carousel/Carousel";
import Categories from "./Categories/Categories";
import Quality from "./Quality/Quality";
import Testimonials from "./Testimonials/Testimonials";
import Trending from "./Trending/Trending";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (
    <>
      {/* <div className="home-container">
        {isLoading ? (
          <p>loading...</p>
        ) : error ? (
          <p>An error occured</p>
        ) : (
          <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data.products?.map(product=> <div key={product.id} className="product">
              <h3>{productsApi.title}</h3>
              <img src={product.img} alt={product.title}/>
              <div className="details">
                <span>
                  {product.title}
                </span>
                <span className="price">
                  ${product.price}
                </span>
              </div>
              <button>Add to Cart</button>
            </div>)}            
          </div>
          </>
        )}
      </div> */}
      <div>
        <Carousel />
      </div>
      <div>
        <Trending />
      </div>
      <div>
        <Addbanner />
      </div>
      <div>
        <Categories />
      </div>
      <div>
        <Quality />
      </div>
      <div>
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
