import React, { useState, useEffect } from 'react';
import "./trending.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useGetAllProductsQuery } from '../../features/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart, addToCartOnBackend } from '../../features/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Trending() {
  const token = localStorage.getItem('token');
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const getRandomProducts = (count) => {
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, count);
  };

  useEffect(() => {
    if (data) {
      const uniqueTrendingProducts = [];
      while (uniqueTrendingProducts.length < 4) {
        const randomProduct = getRandomProducts(1)[0];
        if (!uniqueTrendingProducts.some((product) => product._id === randomProduct._id)) {
          uniqueTrendingProducts.push(randomProduct);
        }
      }
      setTrendingProducts(uniqueTrendingProducts);
    }
  }, [data]);

  const handleAddToCart = (product) => {
    if (!token) {
      toast.error('Login first',{
        position:"top-center"
    })
    }
    dispatch(addToCartOnBackend(product));
  };

  return (
    <section className='trending'>
      <h3 className='trendingHeading'>TRENDING PRODUCTS</h3>
     <div className="d-flex ">
        {trendingProducts?.map((product, index) => (
          <Card key={index} className='flex card'>
            <Link to={`/product/${product._id}`}>
            <Card.Img variant="top" src={product?.img} className='cardImage' />
        </Link> 
            <Card.Body className='cardproduct'>
              <Card.Title style={{ fontWeight: "600" }}>{product?.title}</Card.Title>
              <p style={{textDecoration:"line-through"}}>${product.oldPrice}</p>
              <Card.Text>
                ${product?.price}
              </Card.Text>
            </Card.Body>
            <Button variant="dark" onClick={() => handleAddToCart(product)}>Add to cart</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
