import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Query Parameters wala page (List) */}
          <Route path="/" element={<ProductsList />} />
          
          {/* Path Parameter wala page (:id) */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}