import style from "./cartDetails.module.css";
import empty from "../img/emptyTrolley.gif";
import vaciar from "../img/vaciar.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import MiniProduct from "../MiniProduct/miniProduct";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import React, { useEffect, useState } from "react";

export default function CartDetails() {
  const trolley = useSelector((state) => state.itemCart);
  const cartError = useSelector((state) => state.cartError);
  const actualUser = useSelector((state) => state.actualUser)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [total, setTotal] = useState("");

  // Registrar Salida del Stock. -> NO BORRAR! SERÁ UTILIZADA MÁS ADELANTE EN LA CONFIRMACIÓN DE LA COMPRA


  const calculateTotal = () => {
    let suma = 0;
    trolley.forEach((product) => {
      suma = suma + product.price * product.quantity;
    });
    suma = parseFloat(suma.toFixed(2));
    return setTotal(suma);
  };

  useEffect(() => {
    try {
      calculateTotal();
    } catch (error) {
      console.log("Error al calcular el total", error);
    }
  });

  const deleteTrolley = () => {
    let answer = window.confirm("Esto eliminará TODOS los productos en el carrito. Deseas continuar?")
    if (answer) {
      dispatch(actions.deleteTrolley());
    }
    else return
  }

  const createCart = () => {
    // aquí vamos a crear un Carrito de Compra que esté asociado al userId
    let userId = actualUser.id
    let email = actualUser.email
    let userAddress = actualUser.address
    dispatch(actions.createCart(userId, email, userAddress))
    // y avanzamos para continuar con la compra
    navigate("/purchaseOrder")
  }

  return (
    <div className={style.overallDetail}>
      {trolley.length === 0 ? (
        <div className={style.emptyTrolley}>
          <h3>Parece que aún no has colocado nada en la cesta</h3>
          <img
            src={empty}
            alt="The trolley is empty"
            className={style.emptyTrolleyImg}
          />
          <button
            className={style.goShopping}
            onClick={() => navigate('/home')}
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className={style.trolleyFull}>
          {trolley.map((product) => {
            return (
              <MiniProduct
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                model={product.model}
                brand={product.brand}
                price={product.price}
                feature={product.feature}
                quantity={product.quantity}
              />
            );
          })}
          <div className={style.summingTotal}>
            <button className={style.deleteAll}>
              <img src={vaciar} alt="Vaciar el carrito"
                onClick={() => deleteTrolley()} className={style.emptyTrolley} />
              {/* <p className={style.axnEmpty} > Vaciar el carrito</p> */}
            </button>
            <div className={style.total}> Monto total ${total} </div>
            {
              cartError ? <div> Para avanzar con tu compra, por favor completa tus datos </div>

                : <div className={style.button}>
                  <input
                    type="submit"
                    value="Continúa con tu compra"
                    onClick={() => createCart()}
                  />
                </div>
            }
          </div>
        </div>

      )}
    </div>
  );
}
