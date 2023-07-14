import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import style from './ProductCards.module.css'

const ProductCards = () => {
  const [products, setProducts] = useState([]);

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
  }, []);

  if (products.length === 0) {
    return <div>Esperando carga de los productos...</div>;
  }

  return (
    <div className={style.container}>
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductCards;
