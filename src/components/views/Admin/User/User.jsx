import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUser } from "../../../../redux/actions";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersCreated); 
  const [editMode, setEditMode] = useState({}); // Estado local para controlar el modo de edición de cada usuario

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleEditUser = (id) => {
    // Cambiar el estado para activar el modo de edición del usuario con el id dado
    setEditMode((prev) => ({ ...prev, [id]: true }));
  };

  const handleSaveUser = (id) => {
    // Aquí puedes implementar la lógica para guardar los cambios del usuario con el id dado
    // Por ejemplo, enviar los datos actualizados al servidor y actualizar el estado global
    console.log("Guardar cambios del usuario con ID:", id);
    // Cambiar el estado para desactivar el modo de edición del usuario con el id dado
    setEditMode((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editMode[user.id] ? (
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => {/* Handle input change */}}
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {editMode[user.id] ? (
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) => {/* Handle input change */}}
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {editMode[user.id] ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) => {/* Handle input change */}}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editMode[user.id] ? (
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => {/* Handle input change */}}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editMode[user.id] ? (
                  <input
                    type="text"
                    value={user.role}
                    onChange={(e) => {/* Handle input change */}}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editMode[user.id] ? (
                  <button onClick={() => handleSaveUser(user.id)}>Guardar</button>
                ) : (
                  <button onClick={() => handleEditUser(user.id)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
