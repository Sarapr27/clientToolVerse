import React, {useState, useEffect} from 'react';
//import styles from "./ProductsList.module.css";
import axios from "axios";

const ProductsList = () => {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:3001/products`)
        .then((response) => {
            setProductsData(response.data);
        })
        .catch((error) => {
            console.log("No se recibieron productos:", error);
        })
        
    }, []);

    return (
        <div>
            <h1>LISTADO DE PRODUCTOS</h1>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {productsData.length === 0 ? (
                        <tr>
                            <td>No hay productos para mostrar</td>
                        </tr>
                    ) : (
                        productsData.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.model}</td>
                                <td>{product.brand}</td>
                                <td>{product.price}</td>
                                <td>{product.detail}</td>
                                
                            </tr>
                        )
                        )
                    ) 
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ProductsList;
