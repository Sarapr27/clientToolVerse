import React from 'react';
import { Link } from 'react-router-dom';
import style from "./Card.module.css";

const Card = ({ id, image, name, model, brand, feature, price }) => {
  return (
    <div className={style.cardContainer}>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <p>Modelo: {model}</p>
      <h3>Marca: {brand}</h3>
      <h3>Características: {feature}</h3>
      <h4>Precio: ${price}</h4>
      <Link to={`/detail/${id}`}>
        <button>Detalles</button>
      </Link>
    </div>
  );
}

export default Card;

