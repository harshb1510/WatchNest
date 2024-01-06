import React from 'react';
import "./trending.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useGetAllProductsQuery } from '../../features/productsApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { addToCartOnBackend } from '../../features/cartSlice';

export default function Trending() {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();

  const handleAddToCart = async (product) => {
    dispatch(addToCartOnBackend(product));
  };

  return (
    <section className='trending'>
      <h3 className='trendingHeading'>TRENDING PRODUCTS</h3>
      <div className="d-flex">
        {data?.map((product, index) => (
          <Card key={index} className='flex card'>
            <Card.Img variant="top" src={product.img} className='cardImage' />
            <Card.Body className='cardproduct'>
              <Card.Title style={{ fontWeight: "600" }}>{product.title}</Card.Title>
              <Card.Text>
                ${product.price}
              </Card.Text>
            </Card.Body>
            <Button variant="dark" onClick={() => handleAddToCart(product)}>Add to cart</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
