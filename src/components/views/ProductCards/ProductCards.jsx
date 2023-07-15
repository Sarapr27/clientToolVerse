import React, { useEffect } from 'react';
import Card from '../Card/Card';
import style from './ProductCards.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getTools } from '../../../redux/actions';

const ProductCards = () => {
  const products = useSelector((state)=>state.toolsShown);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getTools())
    } catch (error) {
      console.log('Error al obtener los datos de los productos', error);
    }
  }, [dispatch]);

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
