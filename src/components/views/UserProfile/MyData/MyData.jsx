import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "./Validation";
import {
  createShippingAddress,
  getShippingAddressByUserId,
} from "../../../../redux/actions";

const MyData = ({ user }) => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);

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

  useEffect(() => {
    dispatch(getShippingAddressByUserId(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      <div>Registro</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <span>País</span>
              <input
                type="text"
                name="country"
                placeholder="Ingresa tu país"
                value={formAddress.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Estado</span>
              <input
                type="text"
                name="state"
                placeholder="Ingresa tu estado"
                value={formAddress.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Ciudad</span>
              <input
                type="text"
                name="city"
                placeholder="Ingresa tu ciudad"
                value={formAddress.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Dirección</span>
              <input
                type="text"
                name="address"
                placeholder="Ingresa tu dirección"
                value={formAddress.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>Código Postal</span>
              <input
                type="text"
                name="postalCode"
                placeholder="Ingresa tu código postal"
                value={formAddress.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <input type="submit" value="Confirmar" />
          </div>
        </form>

        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default MyData;
