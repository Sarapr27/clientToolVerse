import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyShopping.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";

const MyShopping = () => {
  const userId = useSelector((state) => state.login.id)
  console.log('el userId', userId)
  const dispatch = useDispatch();
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios
      .get("/purchaseOrder")
      .then((response) => {
        const todasLasOrders = response.data
        const ordersArr = todasLasOrders.filter((order) => order.userId === userId)

        const obtengoProds = async () => {
          try {
            let datosTotales = []
            // obtengo los purchaseCartId en el array de ordersArr
            for (const order of ordersArr) {
              let purchaseCartId = order.purchaseCartId
              const productos = await dispatch(actions.getProductsInCart(purchaseCartId))

              let prodFinal = productos.map((prod) => {
                let name = prod.product.name
                let quantity = prod.quantity
                let obj = {
                  name,
                  quantity
                }
                return obj
              })

              let orderObj = {
                orderId: order.id,
                productos: prodFinal,
                total: order.total,
                fecha: formatDate(order.createdAt)
              }
              datosTotales.push(orderObj)

            }
            setPurchaseHistory(datosTotales)
          } catch (error) {
            console.log('Error buscando los productos del user', error)
          }
        }
        obtengoProds()
      })
      .catch((error) => {
        console.log("Error al obtener el historial de compras:", error);
      });
  }, []);

  return (
    <div>
      <div className={styles.title}>
        <h1>Historial de Compras</h1>
      </div>
      <div className={styles.purchaseContainer}>
        {purchaseHistory.length > 0 ? (
          purchaseHistory.map((purchase) => (
            <div className={styles.purchaseItem} key={purchase.id}>
              <p><b>Compra ID: </b> {purchase.orderId}</p>
              <p><b>Fecha: </b> {purchase.fecha}</p>
              <p><b>Producto(s): </b></p>
              {
                purchase.productos.map((prod) => {
                  return (
                    <div>
                      <p><b>Producto: </b>{prod.name}</p>
                      <p><b>Cantidad: </b>{prod.quantity}</p>
                    </div>
                  )
                })
              }
              <p><b>Total: </b> {purchase.total}</p>
            </div>
          ))
        ) : (
          <p>No hay compras registradas</p>
        )}
      </div>
    </div>
  );
};

export default MyShopping;