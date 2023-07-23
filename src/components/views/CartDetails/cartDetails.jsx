import style from "./cartDetails.module.css";
import empty from "../img/emptyTrolley.gif";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import MiniProduct from "../MiniProduct/miniProduct";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CartDetails() {
  const trolley = useSelector((state) => state.itemCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [total, setTotal] = useState("");
  // const [compra, setCompra] = useState("")

  // Registrar Salida del Stock. -> NO BORRAR! SERÁ UTILIZADA MÁS ADELANTE EN LA CONFIRMACIÓN DE LA COMPRA
  const exitStock = () => {
    trolley.forEach((product) => {
      const productId = product.id;
      const quantity = product.quantity;
      dispatch(actions.registerStockExit(productId, quantity)); // Registramos la salida del stock
      const newStock = product.stock - quantity; // Calculamos el nuevo stock después de la compra
      dispatch(actions.updateProductStock(productId, newStock)); // Actualizamos el stock en el estado global
    });

    console.log('esta es la compra:', trolley)
    navigate("/purchaseOrder")
//
    
//       axios.post('http://localhost:3001/payment', trolley.map((e)=>e)).then((res)=>window.location.href = res.data.response.body.init_point)
    
//   };

//   const handleDelete = (id) => {
//     dispatch(actions.removeFromCart(id));


  const calculateTotal = () => {
    let suma = 0;
    trolley.forEach((product) => {
      suma = suma + product.price * product.quantity;
    });
    // En este código, usamos toFixed(2) para limitar "suma" a dos dígitos después de la coma decimal. Luego, utilizamos parseFloat() para convertir la cadena resultante nuevamente en un número de punto flotante con dos dígitos después de la coma.
    // Con esta modificación, "suma" tendrá siempre dos dígitos después de la coma decimal al calcular el total en la función calculateTotal().
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
            onClick={() => navigate('/home') }
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
        </div>
      )}
      <div>
        <div className={style.summingTotal}>
          <div className={style.total}> Monto total ${total} </div>
          {/* <div className={style.button}>
            <input
              type="submit"
              value="Confirma la Compra"
              // debe habilitar el botón para elegir el metodo de pago
              // muestra la compra
              onClick={exitStock}
            />
          </div> */}
          <div className={style.button}>
            <input
              type="submit"
              value="Confirma tu compra"
              // onClick={() => navigate("/purchaseOrder")}
              onClick={() => exitStock()}
            />
          </div>
          {/* {
            compra && <div>{compra} </div>
          } */}
        </div>
      </div>
    </div>
  );
}
