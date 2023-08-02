const MyProfileForm = () => {
  return (
    <form onSubmit={()=>console.log("handleSubmit")}>
      <div>
        <div>
          <span>Nombre:</span>
          <input type="text" name="firstName" placeholder="Ingresa tu nombre" value="" onChange={()=>console.log("EL NOMBRE")}/>
        </div>
        <div>
          <span>Apellido:</span>
          <input type="text" name="lastName" placeholder="Ingresa tu apellido" value="" onChange={()=>console.log("EL APELLIDO")}/>
        </div>
        <div>
          <span>Email:</span>
          <input type="email" name="email" placeholder="Ingresa tu correo" value="" onChange={()=>console.log("EL CORREO")}/>
        </div>
        <div>
          <span>Teléfono:</span>
          <input type="text" name="phone" placeholder="Ingresa tu teléfono" value="" onChange={()=>console.log("EL TELEFONO")}/>
        </div>
      </div>
      <div>
        <input type="submit" value="Confirmar" />
      </div>
    </form>
  );
};

export default MyProfileForm;
