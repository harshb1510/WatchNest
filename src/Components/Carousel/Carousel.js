import React, { useRef,  useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "./carousel.css";

const Carousel = () => {
  const slideRef = useRef(null);
  const [loadingProgress] = useState(0);

  const handleClickNext = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
  };

  const handleClickPrev = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  const data = [
    {
      id: 1,
      imgUrl: "https://cdn.anscommerce.com/catalog/brandstore/johnson/17_7_20/Sale.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
    {
      id: 2,
      imgUrl:
        "https://staticimg.titan.co.in/Titan/Catalog/90148KD03_1.jpg?impolicy=pqmed&imwidth=640",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
    {
      id: 3,
      imgUrl:
        "https://img.etimg.com/thumb/width-1200,height-900,imgsize-33064,resizemode-75,msid-93059674/top-trending-products/lifestyle/luxury-watches-for-men-that-symbolizes-success.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
    {
      id: 4,
      imgUrl: "https://montredo.com/wp-content/uploads/2020/12/TAG-1-586x470.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
    {
      id: 5,
      imgUrl:
        "https://www.fashionbeans.com/wp-content/uploads/2022/07/lucalbert_BestDigitalWatches.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
  ];

  return (
    <section className="carousel">

    <div className="container">
      <div className="loadbar" style={{ width: `${loadingProgress}%` }}></div>
      <div id="slide" ref={slideRef}>
        {data.map((item) => (
            <div
            key={item.id}
            className="item"
            style={{ backgroundImage: `url(${item.imgUrl})` }}
            >
            <div className="content">
              {/* <div className="name">{item.name}</div>
              <div className="des">{item.desc}</div> */}
              {/* <button>See more</button> */}
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button id="prev" onClick={handleClickPrev}>
          <ChevronLeftIcon />
        </button>
        <button id="next" onClick={handleClickNext}>
          <ChevronRightIcon/>
        </button>
      </div>
    </div>
        </section>
  );
};

export default Carousel;