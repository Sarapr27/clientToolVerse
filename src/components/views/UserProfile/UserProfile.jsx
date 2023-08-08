import React, { useEffect, useState } from "react";
import style from "./UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import MyAddress from "./MyAddress/MyAddress";
import MyProfile from "./MyProfile/MyProfile";
import MyReviews from "./MyReviews/MyReviews";
import MyShopping from "./MyShopping/MyShopping";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../redux/actions";

const UserProfile = () => {
  const { id, firstName, lastName } = useSelector((state) => state.login);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const [active, setActive] = useState("MiPerfil");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        await dispatch(getUserById(id));
      } catch (error) {
        console.log("No se puede obtener el usuario", error);
      }
    };

    fetchUserData();
  }, [dispatch, id, isAuthenticated, navigate]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  const handleButtonClick = (activeValue) => {
    setActive(activeValue);
  };

  return (
    <div className={style.userProfileContainer}>
      <div className={style.secondaryContainer}>
        <div>
          <h1>
            Hola {firstName} {lastName}
          </h1>
        </div>
        <div className={style.buttonClass}>
          <button
            className={style.customButton}
            onClick={() => handleButtonClick("MiPerfil")}
          >
            Mi Perfil
          </button>

          <button
            className={style.customButton}
            onClick={() => handleButtonClick("MisDatos")}
          >
            Mis Direcciones
          </button>

          <button
            className={style.customButton}
            onClick={() => handleButtonClick("MisCompras")}
          >
            Mis Compras
          </button>

          <button
            className={style.customButton}
            onClick={() => handleButtonClick("MisReviews")}
          >
            Mis Reviews
          </button>
        </div>
      </div>
      <div className={style.componentContainer}>
        {active === "MiPerfil" && <MyProfile user={user} />}
        {active === "MisDatos" && <MyAddress user={user} />}
        {active === "MisCompras" && <MyShopping />}
        {active === "MisReviews" && <MyReviews user={user} />}
      </div>
    </div>
  );
};

export default UserProfile;
