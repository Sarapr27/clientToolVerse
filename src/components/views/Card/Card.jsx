import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Card.module.css";
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';

const Card = ({ id, image, name, model, brand, feature, price }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleAdd = (id, image, name, model, brand, feature, price) => {
    let product = {
      id, image, name, model, brand, feature, price
    }
    dispatch(actions.addToCart(product))
  }

  return (
    <div className={style.upperDiv} key={id}>
      <div className={style.name} onClick={() => navigate(`/detail/${id}`)}>{name}</div>
      <div className={style.imgCard} >
        <img src={image} alt={image} className={style.image} onClick={() => navigate(`/detail/${id}`)} />
        <div className={style.brandPrice}>
          <h3 className={style.brand}>{brand}</h3>
          <h3 className={style.price}>${price}</h3>
        </div>
        <div className={style.extra}>
          <p className={style.model}> <span className={style.block}>Modelo:  </span> {model}</p>
          <div className={style.description}><span className={style.block}>Características:</span> {feature}</div>
          <div className={style.button}>
            <input type="submit" value="AGREGA AL CARRITO" onClick={() => handleAdd(id, image, name, model, brand, feature, price)} />
          </div>
          {/* <button className={style.addToCart} onClick={() => handleAdd(id, image, name, model, brand, feature, price)}>
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>


  );
}

export default Card;

