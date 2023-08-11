import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../../../redux/actions";
import styles from "./Order.module.css";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../../redux/actions";
import { faPersonDotsFromLine } from "@fortawesome/free-solid-svg-icons";

const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  console.log(orders);
  const [allOrders, setAllOrders] = useState()

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(async () => {
    let todasLasOrders = await dispatch(getOrders());
    console.log('todas las ordenes desde las actions', todasLasOrders)
    console.log('todas las ordenes desde el store', orders)

    const obtengoProds = async () => {
      try {
        let datosTotales = []
        // obtengo los purchaseCartId en el array de ordersArr
        for (const order of todasLasOrders) {
          const nameUser = order.user.firstName
          const phoneUser = order.user.phone
          const paymentMethod = order.paymentMethod.name
          const shippingAddress = order.shippingAddress.address
          const country = order.shippingAddress.country

          const purchaseCartId = order.purchaseCartId
          const productos = await dispatch(actions.getProductsInCart(purchaseCartId))

          const prodFinal = productos.map((prod) => {
            const name = prod.product.name
            return name
          })

          const productString = prodFinal.join(', ')
          console.log('el string de productos', productString)

          let orderObj = {
            nameUser: nameUser,
            phoneUser: phoneUser,
            orderId: order.id,
            productos: productString,
            total: order.total,
            paymentMethod: paymentMethod,
            date: formatDate(order.createdAt),
            address: shippingAddress,
            country: country
          }
          datosTotales.push(orderObj)

        }
        setAllOrders(datosTotales)
        console.log('todas las ordenes con sus datos bonitos', allOrders)
      } catch (error) {
        console.log('Error buscando los productos en el dashboard del admin', error)
      }
    }
    obtengoProds()
  }, [dispatch, allOrders]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>N° Orden</th>
            <th>Productos</th>
            <th>Total</th>
            <th>paymentMethod</th>
            <th>Fecha</th>
            <th>Direccion</th>
            <th>Pais</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {allOrders?.map(order => (
            <tr key={order.orderId}>
              <td>{order.nameUser}</td>
              <td>{order.phoneUser}</td>
              <td>{order.orderId}</td>
              <td>{order.productos}</td>
              <td>{order.total}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.date}</td>
              <td>{order.address}</td>
              <td>{order.country}</td>
              <td>
                <>
                  <button onClick={() => handleDeleteOrder(order.id)}>Eliminar</button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
