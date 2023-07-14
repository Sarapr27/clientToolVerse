import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Card.module.css";

const Card = ({ id, image, name, model, brand, feature, price }) => {
  const navigate = useNavigate()

  return (
    <div className={style.upperDiv} key={id}>
      <div className={style.name} onClick={() => navigate(`/detail/${id}`)}>{name}</div>
      <div className={style.imgCard} onClick={() => navigate(`/detail/${id}`)}>
        <img src={image} alt={image} className={style.image} />
        <div className={style.brandPrice}>
          <h3 className={style.brand}>{brand}</h3>
          <h3 className={style.price}>${price}</h3>
        </div>
        <div className={style.extra}>
          <p className={style.model}> <span className={style.block}>Modelo:  </span> {model}</p>
          <div className={style.description}><span className={style.block}>Características:</span> {feature}</div>
          <hr />
          <button className={style.addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>


  );
}

export default Card;

