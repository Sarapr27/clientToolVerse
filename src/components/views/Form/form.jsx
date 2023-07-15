import React, { useState } from "react";
import styles from "../Form/form.module.css";
import { validateForm } from "./validation";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = validateForm(firstName, lastName, email, phone, username, password, confirmPassword);
    setError(validationError);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Registro</div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-details"]}>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Nombre</span>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Apellido</span>
              <input
                type="text"
                placeholder="Ingresa tu apellido"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Email</span>
              <input
                type="text"
                placeholder="Ingresa tu email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Número de Teléfono</span>
              <input
                type="number"
                placeholder="Ingresa tu número de teléfono"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Nombre de Usuario</span>
              <input
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Contraseña</span>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Confirmar Contraseña</span>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>

          <div className={styles.button}>
            <input type="submit" value="Registrate" />
          </div>
        </form>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}

export default Form;
