import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleProduct } from './api';

export default function ProductDetail() {
  // 🔗 PATH PARAMETER PAKARNE KA TARIQA
  const { id } = useParams(); 

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id], // id change hogi toh query dobara chalegi
    queryFn: () => fetchSingleProduct(id),
  });

  if (isLoading) return <h2 style={{ padding: '20px' }}>Loading Product Details...</h2>;
  if (isError) return <h2 style={{ padding: '20px', color: 'red' }}>Error: Product not found!</h2>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}>⬅️ Back to Shop</Link>
      
      <div style={{ marginTop: '20px', padding: '20px', border: '2px solid green', display: 'inline-block' }}>
        <h1>{product.name}</h1>
        <p style={{ fontSize: '20px' }}>Category: <strong>{product.category}</strong></p>
        <p style={{ fontSize: '24px', color: 'darkgreen' }}>Price: <strong>${product.price}</strong></p>
        <p>Rating: ⭐ {product.rating} / 5</p>
        <p>Product ID: <small>{product._id}</small></p>
      </div>
    </div>
  );
}