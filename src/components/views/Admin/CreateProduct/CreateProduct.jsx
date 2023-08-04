import React, { useEffect, useState } from "react";
import styles from "./CreateProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getTools } from "../../../../redux/actions";
import axios from "axios";

const CreateProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory(), getTools());
  }, [dispatch]);

  const categoria = useSelector((state) => state.category);

  const [product, setProduct] = useState({
    brand: "",
    name: "",
    model: "",
    feature: "",
    detail: "",
    price: "",
    image: "",
    category: [],
    stock: "",
  });
  const [error, setError] = useState({
    brand: "",
    name: "",
    model: "",
    feature: "",
    detail: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });
  const handlerProduct = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
    // setError(Validacion) Falta CREAR VALIDACIONES
  };

  const handlerSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    alert("Enviando. . . . .");
    axios
      .post(`/products`, product)
      .then((res) => alert("Producto Creado Correctamente"))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("Bad Request: Invalid Product Data");
        } else {
          alert("Error" + error.message);
        }
      });
    setProduct({
      brand: "",
      name: "",
      model: "",
      feature: "",
      detail: "",
      price: "",
      image: "",
      category: [],
      stock: "",
    });
  };
  const handlerSelect = (e) => {
    const { options } = e.target;
    const selectedCategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(parseInt(options[i].value));
      }
    }
    setProduct({ ...product, category: selectedCategories });
  };
  const buscaId = (id) => {
    const buscaCategory = categoria.find((busca) => busca.id === id);
    return buscaCategory ? buscaCategory.name : "";
  };
  const categoryMap = product.category.map((e) => buscaId(e));
  //revision --------------------------->
  // const [imageOptions, setImageOptions] = useState([]); // Estado para almacenar las opciones de imágenes disponibles
  // useEffect(() => {
  //   // Realiza una llamada a la API para obtener las opciones de imágenes disponibles
  //   axios
  //     .get("URL_DE_LA_API_DE_CLOUDINARY")
  //     .then((response) => {
  //       setImageOptions(response.data); // Actualiza el estado con las opciones de imágenes disponibles
  //     })
  //     .catch((error) => {
  //       console.error("Error al obtener las opciones de imágenes:", error);
  //     });
  // }, []);
  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.value; // Obtiene la URL de la imagen seleccionada
  //   setProduct({
  //     ...product,
  //     image: selectedImage, // Actualiza el estado con la URL de la imagen seleccionada
  //   });
  // }
  //revision <-------------------------------------

  return (
    <div className={styles.listContainer}>
      <div>
        <form onSubmit={handlerSubmit}>
          <hr />
          <h1>Agrega los Datos del Producto</h1>
          <div>
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              id="name"
              value={product.name}
              onChange={handlerProduct}
              name="name"
              placeholder="Nombre del producto"
              required
            />
          </div>
          <span>{error.name ? error.name : " "}</span>
          <div>
            <label htmlFor="brand">Marca: </label>
            <select
              name="brand"
              id="brand"
              onChange={handlerProduct}
              placeholder="Seleccion de Marca"
            >
              <option value="">Selección de Marca</option>
              <option value="Makita">Makita</option>
              <option value="Einhell">Einhell</option>
              <option value="Dewalt">Dewalt</option>
              <option value="Truper">Truper</option>
              <option value="Stanley">Stanley</option>
              <option value="Irwin">Irwin</option>
              <option value="Bosh">Bosh</option>
            </select>
            <span>{error.brand}</span>
          </div>
          <div>
            <label htmlFor="model">Modelo: </label>
            <input
              type="text"
              id="model"
              value={product.model}
              onChange={handlerProduct}
              name="model"
              placeholder="Nombre del Modelo"
              required
            />
          </div>
          <span>{error.model}</span>
          <div>
            <label htmlFor="feature">Características: </label>
            <textarea
              id="feature"
              value={product.feature}
              onChange={handlerProduct}
              name="feature"
              placeholder="Características"
              rows={2}
              cols={25}
            />
          </div>
          <span>{error.feature}</span>
          <div>
            <label htmlFor="detail">Detalle: </label>
            <input
              type="text"
              id="detail"
              value={product.detail}
              onChange={handlerProduct}
              name="detail"
              placeholder="Detalles"
            />
          </div>
          <span>{error.detail}</span>
          <div>
            <label htmlFor="price">Precio: </label>
            <input
              className={styles.simbolo}
              type="number"
              id="price"
              value={product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
              onChange={handlerProduct}
              name="price"
              placeholder="Precio"
            />
            <span>$</span>
          </div>
          <span>{error.price}</span>
          <img
            src="https://www.bosch-professional.com/ar/es/ocsmedia/60785-54/product-image/265x265/taladro-gbm-10-re-060113e5h0.png"
            alt="Taladro GBM 10 RE"
          />
          {/* <div>
            <label htmlFor="image">Imagen del producto:</label>
            <select
              name="image"
              id="image"
              
              value={product.image}
            >
              <option value="">Selecciona una imagen</option>
              {imageOptions.map((option) => (
                <option key={option.id} value={option.url}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <span>{error.image}</span>  */}
          <div>
            <label htmlFor="image">Imagen: </label>
            <input
              type="text"
              id="image"
              value={product.image}
              onChange={handlerProduct}
              name="image"
              placeholder="Nombre del imagen"
              required
            />
          </div>

          <div>
            <label htmlFor="category">Categoría:</label>
            <input
              type="text"
              id="categoryInput"
              value={categoryMap.join(", ")}
              onChange={handlerProduct}
              placeholder="Selecciona Categoria"
            />
            <select
              id="category"
              name="category"
              multiple={true}
              value={product.category}
              onChange={handlerSelect}
            >
              {categoria.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <span>{error.category}</span>
          </div>
          <div>
            <label htmlFor="stock">Stock Inicial: </label>
            <input
              className={styles.simbolo}
              type="number"
              id="stock"
              value={product.stock}
              onChange={handlerProduct}
              name="stock"
              placeholder="Stock Inicial"
            />
          </div>
          <span>{error.stock}</span>
          <button type="submit">Crear Producto</button>
          <hr />
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
