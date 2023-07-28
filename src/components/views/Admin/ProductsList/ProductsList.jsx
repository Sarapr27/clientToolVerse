import React, { useEffect} from 'react';
import styles from "./ProductsList.module.css";
import { getTools } from '../../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from "../../../Pagination/Pagination"
import SearchBar from '../SearchBarAdmin/searchBar';
import Filters from '../../../Filters/Filters';

const ProductsList = () => {
 const allProducts = useSelector((state) => state.toolsShown );
 const currentPage = useSelector((state) => state.currentPage);
const dispatch = useDispatch()
const itemsPerPage = 12;

    useEffect(() => {
        try {
            dispatch(getTools())
        } catch (error) {
            console.log("Error al obtener los productos:", error);
        }
        
    }, [dispatch]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const toolsShown = allProducts.slice(startIndex, endIndex);


    return (
        <div>
            <h1 className={styles.title}>LISTADO DE PRODUCTOS</h1>
            <SearchBar/>
            <Filters/>
            <table className={styles.table}>
                <thead>
                    <tr>
                    <th>SKU</th>
                    <th>Producto</th>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {toolsShown.length === 0 ? (
                        <tr>
                            <td>No hay productos para mostrar</td>
                        </tr>
                    ) : (
                        toolsShown.map((product) => (
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
            <Pagination/>
        </div>
    );
}

export default ProductsList;
