import style from "./cartDetails.module.css";
// import empty from "../img/emptyTrolley.gif";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import { useNavigate } from "react-router-dom";
import MiniProduct from "../MiniProduct/miniProduct";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import React, { useEffect, useState } from "react";

export default function CartDetails() {
  const trolley = useSelector((state) => state.itemCart);
//   const navigate = useNavigate();
  const dispatch = useDispatch();

  // QUIERO:
  // generar un estado local de donde renderizar la info que viene desde el store -> con un id para cada uno?
  // armar una fción que produzca un array para renderizar
  // Dicho array:
  // Determina la cantidad items de cada producto
  // El botón para eliminar borra uno de cada item

  // una función que cuente los elementos y muestre renderizada la cantidad -> que luego el botón elimine uno de esos elementos

  const [total, setTotal] = useState("");
  // const [elements, setElements] = useState();

  // const contador = (trolley) => {
  //     let carrito = trolley.map((product) => {
  //         return {
  //             id: product.id,
  //             name: product.name,
  //             image: product.image,
  //             model: product.model,
  //             brand: product.brand,
  //             price: product.price
  //         }
  //     })
  // }

  // Registrar Salida del Stock.
  const exitStock = () => {
    trolley.forEach((product) => {
      const productId = product.id;
      const quantity = 1;
      dispatch(actions.registerStockExit(productId, quantity));
    });
  };

  const handleDelete = (id) => {
    dispatch(actions.removeFromCart(id));
  };

  const calculateTotal = () => {
    let suma = 0;
    trolley.forEach((product) => {
      suma = suma + product.price;
    });
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
    <div>
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
              stock={product.stock}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
      <div className={style.summingTotal}>
        <div className={style.total}> Monto total ${total} </div>
        <div className={style.button}>
          <input
            type="submit"
            value="Elige tu Método de Pago"
            onClick={exitStock}
          />
        </div>
      </div>
    </div>
  );
}
