import Addbanner from "./Addbanner/Addbanner";
import Carousel from "./Carousel/Carousel";
import Categories from "./Categories/Categories";
import Quality from "./Quality/Quality";
import Testimonials from "./Testimonials/Testimonials";
import Trending from "./Trending/Trending";

const Home = () => {
  
  return (
    <>
      
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
