import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

//TODO: Implementar las siguientes funcionalidades para ocupar PayPal:
// Una vez que el usuario agregue sus productos, mostrar el botón de PayPal en CartDetails solo cuando esté logueado el usuario.✓
// Vincular el monto total con el Sandbox. ✓
// Una vez hecha la compra, hacer POST en la ruta payment
// Mostrar alertas visuales en el navegador

export function CheckoutButton({ totalAmount }) {
  const clientId = "AXT2dZe66lvqAQgmw-_4zQ9nnuB7kJBEx4bF9ZZqO1Zpq6C64BkJcwm2Ldfcjv3wWYJAmLkeMcKfMxfK";

  const handleCreateOrder = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log("Orden de compra creada exitosamente:", order);
      // Aquí podrías realizar las operaciones necesarias para completar la compra

      handlePpSuccess(); 
    } catch (error) {
      console.log("Error al completar la orden de compra:", error);
    }
  };

  const handlePpSuccess = () => {
    axios
      .post("http://localhost:3001/payment", {
        //trolley
      })
      .then((res) => {
        console.log("Pago exitoso con PayPal:", res.data);
      })
      .catch((error) => {
        console.log("Error al realizar el pago con PayPal:", error);
      });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <div>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: totalAmount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            handleCreateOrder(data, actions);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

