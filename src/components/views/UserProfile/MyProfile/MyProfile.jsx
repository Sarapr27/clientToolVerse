import { useState } from "react";
// import { useDispatch } from "react-redux";
import MyProfileForm from "./MyProfileForm";

const MyProfile = ({user}) => {
  // const dispatch = useDispatch()
  const [active, setActive] = useState(true)

const handleModify = () => {
  setActive(false)
}

  return (
    <div>     
      {
        active ? (
          <div>
            <h1>Perfil de Usuario</h1>
            <h2>Id: {user.id}</h2>   
            <h2>Nombre: {user.firstName}</h2>
            <h2>Apellido: {user.lastName}</h2>
            <h2>Teléfono: {user.phone}</h2>
            <h2>Correo: {user.email}</h2>
            <button onClick={handleModify}>Modificar</button>
          </div>
        ) : (
          <MyProfileForm/>
        )
      }
    </div>
  );
};

export default MyProfile;
