import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
//import styles from "./Detail.css"

const Detail = () => {
  const [productData, setProductData] = useState(null);
  const {id} = useParams

  useEffect(() => {
    const fetchProduc = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/2`);

        setProductData(response.data);
      } catch (error) {
        console.log("Error al obtener los datos del producto:", error);
      }
    };

    fetchProduc();
  }, [id]);

  if (!productData) return <div>Esperando carga del producto...</div>;
  return (
    <div>
      <img src={productData.image} alt={productData.image} />
      <h1>{productData.name}</h1>
      <p>Modelo: {productData.model}</p>
      <h3>Marca: {productData.brand}</h3>
      <h4>Precio ${productData.price}</h4>
      <button>Add Cart</button>
    </div>
  );
};

export default Detail;
