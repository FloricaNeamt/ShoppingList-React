// src/ProductList.js
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const loginToken = window.localStorage.getItem("loginToken");
  useEffect(() => {
    // Disable eslint warning for exhaustive-deps for this line
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetch('http://localhost:8080/',
      {
        headers: { Authorization: loginToken }
      })
      // Assuming your server is running on localhost:8080
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => {
        window.localStorage.removeItem('loginToken');
        window.location.reload();
        console.error('Error fetching products:', error)
      });
  }, [loginToken]);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
