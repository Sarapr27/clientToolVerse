import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products`); //`${process.env.API_TOOLS_URL}/${id}`
        setProducts(response.data);
      } catch (error) {
        console.log('Error al obtener los datos de los productos', error);
      }
    };

    fetchProducts();
  }, [id]);

  if (products.length === 0) {
    return <div>Esperando carga de los productos...</div>;
  }

  return (
    <div>
      <h1>Soy ProductCards</h1>
      {products.map((product) => (
        <Card key={product.id} info={product} />
      ))}
    </div>
  );
};

export default ProductCards;
