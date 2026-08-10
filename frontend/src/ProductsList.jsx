import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from './api';

export default function ProductsList() {
  // UI States (Inko change karne se API dobara call hogi)
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('-createdAt'); // Default sort
  const [page, setPage] = useState(1);
  const limit = 4; // Ek page par 4 items dikhayenge taake pagination jaldi test ho sake

  // TANSTACK QUERY MAGIC: queryKey me states daali hain.
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', category, sort, page], 
    queryFn: () => fetchProducts({ category, sort, page, limit }),
    keepPreviousData: true, // Naya page load hone tak purana data dikhata rahega
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Shop (Pagination, Filter, Sort)</h1>

      {/* ================= CONTROLS SECTION (FILTER & SORT) ================= */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', background: '#f4f4f4', padding: '15px' }}>
        
        {/* CATEGORY FILTER */}
        <div>
          <label><strong>Filter by Category: </strong></label>
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
          </select>
        </div>

        {/* SORTING */}
        <div>
          <label><strong>Sort By: </strong></label>
          <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
            <option value="-createdAt">Newest First</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* ================= PRODUCTS LIST SECTION ================= */}
      {isLoading ? <h2>Loading products...</h2> : isError ? <h2>Error loading data!</h2> : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {data?.data?.length === 0 ? <p>No products found!</p> : null}
            
            {data?.data?.map((product) => (
              <div key={product._id} style={{ border: '1px solid black', padding: '15px', width: '200px' }}>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: <strong>${product.price}</strong></p>
                
                {/* 🔗 PATH PARAMETER LINK: Single Product ke URL par bhejega */}
                <Link to={`/product/${product._id}`} style={{ display: 'block', background: 'blue', color: 'white', textAlign: 'center', padding: '5px', textDecoration: 'none' }}>
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* ================= PAGINATION SECTION ================= */}
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button 
              onClick={() => setPage(old => Math.max(old - 1, 1))} 
              disabled={page === 1}
              style={{ padding: '10px' }}
            >
              ⬅️ Previous
            </button>
            
            <span>Page <strong>{data?.currentPage}</strong> of <strong>{data?.totalPages}</strong></span>
            
            <button 
              onClick={() => setPage(old => (data?.currentPage < data?.totalPages ? old + 1 : old))} 
              disabled={data?.currentPage === data?.totalPages || data?.totalPages === 0}
              style={{ padding: '10px' }}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
}