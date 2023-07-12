import axios from 'axios';
import React, {useState, useEffect} from 'react';
//import styles from "./ProductCard.css";
import {useParams} from "react-router-dom"


const ProductCard = () => {
    const [products, setProducts] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products`)
                setProducts(response.data)
            } catch (error) {
                console.log("Error al obterner los datos de los productos", error);
            }
        };
        fetchProducts()
    }, [id]);
    if(!products){
        return <div>Esperando carga del los productos...</div>
    }

    return (
        <div>
        <h1>Soy Tools</h1>
            {products.map(products => {
                return (
                    <div key={products.id}>
                <img src={products.image} alt={products.image} />
                <h1>{products.name}</h1>
                <p>Modelo: {products.model}</p>
                <h3>Marca: {products.brand}</h3>
                <h3>Caracterisicas: {products.feature}</h3>
                <h4>Precio: ${products.price}</h4>
                <button>Detalles</button>
                </div>
                )
                
            })}
        </div>
    );
}

export default ProductCard;
