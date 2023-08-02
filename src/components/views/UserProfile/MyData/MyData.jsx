import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "./Validation";
import {
  createShippingAddress,
  getShippingAddressByUserId,
} from "../../../../redux/actions";
import MyDataForm from "./MyDataForm";

const MyData = ({ user }) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);

  const [active, setActive] = useState(true);

  const [formAddress, setFormAddress] = useState({
    country: address.length ? address[0].country : "",
    state: address.length ? address[0].state : "",
    city: address.length ? address[0].city : "",
    address: address.length ? address[0].address : "",
    postalCode: address.length ? address[0].postalCode : "",
    userId: user.id,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm(
      formAddress.country,
      formAddress.state,
      formAddress.city,
      formAddress.address,
      formAddress.postalCode
    );
    setError(validationError);

    if (!validationError) {
      dispatch(createShippingAddress(formAddress))
        .then(() => {
          console.log("Registro exitoso");
          setFormAddress({
            country: "",
            state: "",
            city: "",
            address: "",
            postalCode: "",
            userId: user.id,
          });
          setError("");
          alert("¡Registro exitoso!");
        })
        .catch(() => {
          console.log("Error en el registro");
          setError("Error en el registro. Inténtalo nuevamente.");
        });
    }
  };
  const handleChange = (e) => {
    setFormAddress({ ...formAddress, [e.target.name]: e.target.value });
  };
  const handleModify = () => {
    setActive(false);
  };

  useEffect(() => {
    dispatch(getShippingAddressByUserId(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      {!address.length ? (
        <div>
          <span>No tienes direcciones cargadas</span>
          <button>Cargar dirección</button>
        </div>
      ) : active ? (
        <div>
          <h1>Mis Direcciones</h1>
          <h2>Pais: {address[0].country}</h2>
          <h2>Estado: {address[0].state}</h2>
          <h2>Ciudad: {address[0].city}</h2>
          <h2>Dirección: {address[0].address}</h2>
          <h2>Código: {address[0].postalCode}</h2>
          <button onClick={handleModify}>Modificar</button>
        </div>
      ) : (
        <MyDataForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formAddress={formAddress}
          error={error}
        />
      )}
    </div>
  );
};

export default MyData;
