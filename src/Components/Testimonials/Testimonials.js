import "./testimonial.css";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation } from "swiper/modules";
import items from "./Data";

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonialContainer">
        <div className="headingSection">
          <h2 className="testimonialHeading">
            What our customers are saying...
          </h2>
        </div>

        <Swiper
          style={{ width: "1100px" }}
          loop={true}
          slidesPerView={3}
          spaceBetween={40}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={true}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          <SliderButtons />
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="viewCorner">
                <div className="testimonialsLeft">
                  <div className="bubble">
                    <p className="bubbleHeading">{item.heading}</p>
                    {/* <span>{item.review}</span> */}
                  </div>
                  <div className="triangle"></div>
                  <div className="profileInfo">
                    <img
                      src={item.image}
                      alt=""
                      className="testimonialProfile"
                    />
                    <h5
                      style={{ fontSize: "25px", fontWeight: "700" }}
                      className="profileName"
                    >
                      {item.name}
                    </h5>

                    {/* <h6 className="profilePosition">{item.city}</h6> */}
                    <div className="starContainer">
                      {Array.from({ length: item.rating }, (_, index) => (
                        <StarIcon key={index} className="star" />
                      ))}
                      {Array.from({ length: 5 - item.rating }, (_, index) => (
                        <StarIcon key={index} className="star1" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="slideButton">
      <button className="slideButtons" onClick={() => swiper.slidePrev()}>
        &lt;
      </button>
      <button className="slideButtons" onClick={() => swiper.slideNext()}>
        &gt;
      </button>
    </div>
  );
};