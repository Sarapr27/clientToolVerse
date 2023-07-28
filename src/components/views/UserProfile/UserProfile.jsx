import React from "react";
import style from "./UserProfile.module.css"
import { useSelector } from "react-redux";

const UserProfile = () => {
const login = useSelector(state=>state.login)

  const handleMiPerfilClick = () => {
    console.log("Mostrar Mi Perfil");
  };

  const handleMisDatosClick = () => {
    console.log("Mostrar Mis Datos");
  };

  const handleMisComprasClick = () => {
    console.log("Mostrar Mis Compras");
  };

  const handleMisReviewsClick = () => {
    console.log("Mostrar Mis Reviews");
  };

  return (
    <div className={style.userProfileContainer}>
      <h1>Hola {login.firstName} {login.lastName}</h1>
      <button className={style.customButton} onClick={handleMiPerfilClick}>
        Mi Perfil
      </button>
      <button className={style.customButton} onClick={handleMisDatosClick}>
        Mis Datos
      </button>
      <button className={style.customButton} onClick={handleMisComprasClick}>
        Mis Compras
      </button>
      <button className={style.customButton} onClick={handleMisReviewsClick}>
        Mis Reviews
      </button>
    </div>
  );
};

export default UserProfile;
