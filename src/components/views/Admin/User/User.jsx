import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions";
import styles from "./User.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersCreated);
  
  const [editMode, setEditMode] = useState({});
  const [editedUsers, setEditedUsers] = useState({});

  useEffect(() => {
    try {
      dispatch(getAllUsers());
    } catch (error) {
      console.log("Error al obtener los usuarios:", error);
    }
  }, [dispatch]);

  const handleEditUser = (id, firstName, active) => {
    setEditMode((prev) => ({ ...prev, [id]: { firstName, active } }));
  };

  const handleInputChange = (id, field, value) => {
    setEditedUsers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSaveUser = async (id) => {
    try {
      const editedUser = editMode[id];
      console.log("Editing User ID:", id, editedUser);
      if (editedUser) {
        const { firstName, active } = editedUser;
        console.log("Sending PUT request to update user:", id);
        await axios.put(`/user/${id}`, {
          firstName,
          active,
        });
        setEditedUsers((prev) => ({
          ...prev,
          [id]: false,
        }));
        await dispatch(getAllUsers());
        console.log("User data after dispatch:", users);

        setEditMode((prevEditData) => {
          const updatedEditData = { ...prevEditData };
          delete updatedEditData[id];
          return updatedEditData;
        });
      }
      console.log(`PUT request http://localhost:3001/user/${id}`);
      return new Swal({
        title: "Success",
        text: "Edicion exitosa",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log("Error updating", error);
    }
  };

  const handleCancel = (id) => {
    setEditMode((prevEditData) => {
      const updatedEditData = { ...prevEditData };
      delete updatedEditData[id];
      return updatedEditData;
    });
  };

  return (
    <div>
      {users.length === 0 ? (
        <p>No se tienen usuarios registrados.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Activo</th>
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
                      value={editedUsers[user.id]?.firstName || user.firstName}
                      onChange={(e) =>
                        handleInputChange(user.id, "firstName", e.target.value)
                      }
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  {editMode[user.id] ? (
                    <input
                      type="checkbox"
                      checked={editedUsers[user.id]?.active || user.active}
                      onChange={(e) =>
                        handleInputChange(user.id, "active", e.target.checked)
                      }
                    />
                  ) : (
                    user.active ? "Si" : "No"
                  )}
                </td>
                <td>
                  {editMode[user.id] ? (
                    <>
                      <button onClick={() => handleSaveUser(user.id)}>
                        Guardar
                      </button>
                      <button onClick={() => handleCancel(user.id)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEditUser(user.id, user.firstName, user.active)}>
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;





