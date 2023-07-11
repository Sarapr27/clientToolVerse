import React, {useEffect, useState} from 'react';
import axios from "axios";



const Detail = (props) => {

    const {id, name, model, brand, price, image} = props;
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/products/1`)
        .then(response => {
            setProductData(response.data);
        })
        .catch(error => {
            console.log("Error al obtener los datos del producto:", error);
        })
    }, [id]);

  if(!productData)
  return <div>Esperando carga del producto...</div>
    return (
        <div>
            <img src={productData.image} alt={name}/>
            <h1>{productData.name}</h1>
            <h2>Modelo: {productData.model}</h2>
            <h3>Marca: {productData.brand}</h3>
            <h4>Precio {productData.price}</h4>
            <button>Comprar</button>
            
        </div>
    );
}

export default Detail;
