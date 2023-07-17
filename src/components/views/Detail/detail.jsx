import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";
import { addToCart, getToolById } from "../../../redux/actions";
import { convertirNumero } from "../../utils";

const Detail = () => {
  const products = useSelector((state) => state.toolsDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    try {
      dispatch(getToolById(id));
    } catch (error) {
      console.log("Error al obtener los datos del producto:", error);
    }
  }, [dispatch, id]);

  if (!products) return <div>Esperando carga del producto...</div>;

  return (
    <div className={style.detailContainer}>
      <div>
        <img src={products.image} alt={products.name} />
      </div>
      <div>
        <h1>{products.name}</h1>
        <p>Modelo: {products.model}</p>
        <h3>Marca: {products.brand}</h3>
        <h4>Precio ${convertirNumero(products.price)}</h4>
        <button className={style.addToCart} onClick={() => dispatch(addToCart(products))}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Detail;
