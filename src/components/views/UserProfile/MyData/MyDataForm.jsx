const MyDataForm = ({ handleSubmit, handleChange, formAddress, error }) => {
  return (
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
  );
};

export default MyDataForm;
