// MenProduct.js
import { useParams } from "react-router-dom";
import List from "../../Components/List/List";
import "./menproducts.css";
import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../../features/productsApi";

const MenProduct = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const { data, error, isLoading } = useGetAllProductsQuery();
  
  const filterProductsByPrice = (products) => {
    return products.filter((product) => product.price <= maxPrice);
  };

  const getFilteredProducts = () => {
    if (isLoading || error) {
      return [];
    }

    const allProducts = data || [];
    const filteredProducts = filterProductsByPrice(allProducts);

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();
  
  return (
    <div className="products">
      <div className="left3">
        <div className="filterItem">
          <h2>Product Categories</h2>
          <div className="inputItem">
            <input type="checkbox" id="1" value={1} />
            <label htmlFor="1">Mens</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="2" value={2}  />
            <label htmlFor="2">Boys</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="3" value={1} />
            <label htmlFor="3">Children</label>
          </div>
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="range"
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort By</h2>
          <div className="inputItem">
            <input type="radio" id="asc" value="asc" name="price" onChange={(e)=>setSort("asc")} />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>
          <div className="inputItem">
            <input type="radio" id="desc" value="desc" name="price" onChange={(e)=>setSort("desc")} />
            <label htmlFor="desc">Price (Highest First)</label>
          </div>
        </div>
      </div>
      <div className="right3">
        
        <div className="right3">
        <List products={filteredProducts} />
      </div>
      </div>
    </div>
  )
}

export default MenProduct
