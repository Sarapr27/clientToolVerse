import style from "./cartDetails.module.css";
import empty from "../img/emptyTrolley.gif";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import MiniProduct from "../MiniProduct/miniProduct";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import React, { useEffect, useState } from "react";

//TODO: Implementar las siguientes funcionalidades para ocupar paypal:
// Una vez que agregue el usuario sus productos se muestre el boton de Paypal en CartDetails solo cuando este logueado el usuario.
// Vincular el monto total con el Sandbox.
// Una vez hecha la compra crear la orden de compra POST
//Mostrar alertas visuales en el navegador

export default function CartDetails() {
  const trolley = useSelector((state) => state.itemCart);
  const cartError = useSelector((state) => state.cartError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [total, setTotal] = useState("");

  // Registrar Salida del Stock. -> NO BORRAR! SERÁ UTILIZADA MÁS ADELANTE EN LA CONFIRMACIÓN DE LA COMPRA
  const exitStock = () => {
    trolley.forEach((product) => {
      const productId = product.id;
      const quantity = product.quantity;
      dispatch(actions.registerStockExit(productId, quantity)); // Registramos la salida del stock
      const newStock = product.stock - quantity; // Calculamos el nuevo stock después de la compra
      dispatch(actions.updateProductStock(productId, newStock)); // Actualizamos el stock en el estado global
    });
    navigate("/purchaseOrder")
  };

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
            <div className={style.total}> Monto total ${total} </div>
            {
              cartError ? <div> Para avanzar con tu compra, por favor completa tus datos </div>

                : <div className={style.button}>
                  <input
                    type="submit"
                    value="Confirma tu compra"
                    onClick={() => exitStock()}
                  />
                </div>
            }
          </div>
        </div>

      )}
    </div>
  );
}
