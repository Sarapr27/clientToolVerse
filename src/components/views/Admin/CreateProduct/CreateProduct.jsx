import React, { useRef, useEffect, useState } from "react";
import styles from "./CreateProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getTools } from "../../../../redux/actions";
import axios from "axios";
import CloudinaryUploadWidget from "../../CloudinaryUploadWidget/CloudinaryUploadWidget";
//!aqui se toco para cloudinary para subir cambios(eliminar comentario antes de subir)
const CreateProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory(),
    getTools())
  }, [dispatch]);

  const categoria = useSelector((state) => state.category);
  const imageRef = useRef()

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

  //!punto de arranque para la sengunda modificacion, si no funciona deshacer hasta aca
  const handlerProduct = (e) => {

    if(e.target.name !== "image"){
      let inputsAux = {...product, [e.target.name]: e.target.value}
      setProduct(inputsAux);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    alert("Enviando. . . . .");
    // Si product.image es un objeto, utiliza product.image.url, que es la URL de la imagen desde Cloudinary.
    const imageUrl = typeof product.image === 'object' ? product.image.url : product.image;
    // Crea una copia del producto con el campo 'image' reemplazado por la URL de la imagen.
    const productDataToSend = { ...product, image: imageUrl };
  
    axios
      .post(`/products`, productDataToSend)
      .then((res) => {
        console.log(axios
          .post(`/products`, productDataToSend))
        alert("Producto Creado Correctamente");
        // Limpia los campos del formulario después de enviar.
        setProduct({
          brand: "",
          name: "",
          model: "",
          feature: "",
          detail: "",
          price: "",
          image: "", // Cambiar a null para que no haya datos residuales en el campo de la imagen.
          category: [],
          stock: "",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("Bad Request: Invalid Product Data");
        } else {
          alert("Error" + error.message);
        }
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
    return buscaCategory ? buscaCategory.name : ""
  };
  const categoryMap = product.category?.map((e) => buscaId(e)) || [];

  //ya no creo que me sirva
  /* const handleImageUrl = (imageUrl) => {
    setProduct({...product, image: imageUrl})
  } */
  
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
              value={product.price?.toLocaleString("en-US", {
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
           

          //!lo unico que he movido para implementar cloudinary(junto con la carpeta de CloudinaryUploadWidget)(eliminar comentario antes de subir)
          <div style={{ display: 'flex', flexDirection: 'column'}}>
          <label htmlFor="image">Image:</label>
          <input type="text" id="image" name="image" onChange={handlerProduct} value={product.image} hidden />
          
          <CloudinaryUploadWidget imageUrl={setProduct} inputs={product}/>
          <img id="uploadedimage" src="" ref={imageRef}></img>
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
              {categoria.map((e)=> (
                <option key={e.id} value={e.id}>{e.name}</option>
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
