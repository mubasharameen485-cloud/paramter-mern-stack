import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/products';

// 1. QUERY PARAMETER WALI API (?)
export const fetchProducts = async ({ category, sort, page, limit }) => {
  const params = new URLSearchParams();
  
  if (category) params.append('category', category);
  if (sort) params.append('sort', sort);
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit); // Default items per page

  // Request aisi jayegi: /api/products?category=Electronics&sort=-price&page=1
  const response = await axios.get(`${BASE_URL}?${params.toString()}`);
  return response.data; // Isme data, totalPages, currentPage sab aayega
};

// 2. PATH PARAMETER WALI API (:)
export const fetchSingleProduct = async (id) => {
  // Request aisi jayegi: /api/products/64b5f8e3f9...
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data.data;
};