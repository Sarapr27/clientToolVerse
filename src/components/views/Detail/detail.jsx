import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import styles from "./Detail.css"
const Detail = () => {
  const [products, setProducts] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchProduc = async () => {
      try {
        //`${process.env.API_TOOLS_URL}/${id}`
        const response = await axios.get(`http://localhost:3001/products/5`);
  
        setProducts(response.data);
      } catch (error) {
        console.log("Error al obtener los datos del producto:", error);
      }
    };
  
    fetchProduc();
  }, [id]);
  
  if (!products) return <div>Esperando carga del producto...</div>;

  return (
    <div>
      <img src={products.image} alt={products.name} />
      <h1>{products.name}</h1>
      <p>Modelo: {products.model}</p>
      <h3>Marca: {products.brand}</h3>
      <h4>Precio ${products.price}</h4>
      <button>Add Cart</button>
    </div>
  );
};

export default Detail;



//!En teoria esto tendria que funcionar, con el metodo "find" se busca el producto unitario dentro del un array de productos
/* import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = () => {
  const products = useSelector((state) => state.products);
  const { productId } = useParams();
  const product = products.find((item) => String(item.id) === productId);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>Modelo: {product.model}</p>
      <h3>Marca: {product.brand}</h3>
      <h4>Precio ${product.price}</h4>
      <button>Add Cart</button>
    </div>
  );
};

export default Detail; */
