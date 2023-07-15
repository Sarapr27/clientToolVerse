export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const phoneRegex = /^[0-9]{10}$/;

export function validateForm(firstName, lastName, email, phone, username, password, confirmPassword) {
  let error = "";

  if (!firstName || !lastName || !email || !phone || !username || !password || !confirmPassword) {
    error = "Todos los campos son obligatorios. Por favor, completa todos los campos.";
  } else if (firstName.length < 2 || firstName.length > 50) {
    error = "El nombre debe tener entre 2 y 50 caracteres.";
  } else if (lastName.length < 2 || lastName.length > 50) {
    error = "El apellido debe tener entre 2 y 50 caracteres.";
  } else if (!emailRegex.test(email)) {
    error = "Ingresa una dirección de correo electrónico válida.";
  } else if (!phoneRegex.test(phone)) {
    error = "Ingresa un número de teléfono válido (10 dígitos sin espacios ni caracteres especiales).";
  } else if (password !== confirmPassword) {
    error = "Las contraseñas no coinciden.";
  } else if (!/(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-z]).{8,}/.test(password)) {
    error = "La contraseña debe contener al menos una mayúscula, un carácter especial y tener una longitud mínima de 8 caracteres.";
  }

  return error;
}
