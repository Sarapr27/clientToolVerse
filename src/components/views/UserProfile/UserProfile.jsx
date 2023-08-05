import React, { useState } from "react";
import style from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import MyData from "./MyData/MyData";
import MyProfile from "./MyProfile/MyProfile";
import MyReviews from "./MyReviews/MyReviews";
import MyShopping from "./MyShopping/MyShopping";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const login = useSelector((state) => state.login);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const handleMiPerfilClick = () => {
    setActive("MiPerfil");
  };

  const handleMisDatosClick = () => {
    setActive("MisDatos");
  };

  const handleMisComprasClick = () => {
    setActive("MisCompras");
  };

  const handleMisReviewsClick = () => {
    setActive("MisReviews");
  };

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    navigate("/login");
    return null;
  }

  return (
    <div className={style.userProfileContainer}>
      <div className={style.secondaryContainer}>
        <div>
          <h1>
            Hola {login.firstName} {login.lastName}
          </h1>
        </div>
        <div className={style.buttonClass}>
          <div>
            <button
              className={style.customButton}
              onClick={handleMiPerfilClick}
            >
              Mi Perfil
            </button>
          </div>

          <div>
            <button
              className={style.customButton}
              onClick={handleMisDatosClick}
            >
              Mis Datos
            </button>
          </div>

          <div>
            <button
              className={style.customButton}
              onClick={handleMisComprasClick}
            >
              Mis Compras
            </button>
          </div>

          <div>
            <button
              className={style.customButton}
              onClick={handleMisReviewsClick}
            >
              Mis Reviews
            </button>
          </div>
        </div>
      </div>
      <div className={style.componentContainer}>
        {active === "MiPerfil" && <MyProfile user={login} />}
        {active === "MisDatos" && <MyData user={login} />}
        {active === "MisCompras" && <MyShopping />}
        {active === "MisReviews" && <MyReviews />}
      </div>
    </div>
  );
};

export default UserProfile;
