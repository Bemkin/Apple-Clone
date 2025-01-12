import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log('Fetching product details for ID:', id);
    fetch(`http://localhost:3005/api/iphones/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched product details:', data);
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.product_img} alt={product.name} />
      <p><strong>Category:</strong> <a href={product.category} target="_blank" rel="noopener noreferrer">{product.category}</a></p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Brief Description:</strong> {product.product_brief_description}</p>
      <p><strong>Starting Price:</strong> ${product.price}</p>
      <p><strong>Price Range:</strong> {product.price_range}</p>
      <a href={product.product_link} target="_blank" rel="noopener noreferrer">Visit Product Page</a>
    </div>
  );
}

export default ProductDetail;
