const MyProfile = ({user}) => {
const handleModify = () => {
  console.log("abre un form para editar datos y va a la ruta put /user/:id");
}

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <h2>Id:{user.id}</h2>   
      <h2>Nombre:{user.firstName}</h2>
      <h2>Apellido:{user.lastName}</h2>
      <h2>Teléfono:{user.phone}</h2>
      <h2>Correo:{user.email}</h2>
      <button onClick={handleModify}>Modificar</button>
    </div>
  );
};

export default MyProfile;
