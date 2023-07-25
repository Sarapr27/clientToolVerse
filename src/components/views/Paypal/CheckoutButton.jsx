import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

//TODO: Implementar las siguientes funcionalidades para ocupar paypal:
// Una vez que agregue el usuario sus productos se muestre el boton de Paypal en CartDetails solo cuando este logueado el usuario.
// Vincular el monto total con el Sandbox.
// Una vez hecha la compra crear la orden de compra POST
//Mostrar alertas visuales en el navegador

export function CheckoutButton({ totalAmount }) {
  const clientId = "AXT2dZe66lvqAQgmw-_4zQ9nnuB7kJBEx4bF9ZZqO1Zpq6C64BkJcwm2Ldfcjv3wWYJAmLkeMcKfMxfK";

  const handleCreateOrder = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log("Orden de compra creada exitosamente:", order);
      // Aquí podrías realizar las operaciones necesarias para completar la compra

    } catch (error) {
      console.log("Error al completar la orden de compra:", error);
    }
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
