import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./MPFeedback.module.css"

const MPFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate()
  
  const queryParams = new URLSearchParams(location.search);

  return (
    <div className={style.containerFeedback}>
      <h1>Detalle del pago</h1>
      <ul>
        <li>ID de pago: {queryParams.get("payment_id")}</li>
        <li>Forma de pago: {queryParams.get("payment_type")}</li>
        <li>Estado: {queryParams.get("status")}</li>
        <li>Numero de orden: {queryParams.get("merchant_order_id")}</li>
        
      </ul>
      <button className={style.backHome} onClick={()=>navigate("/home")}>Volver al Home</button>
    </div>
  );
};

export default MPFeedback;
