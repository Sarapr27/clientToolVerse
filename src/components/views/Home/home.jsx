import style from './home.module.css'
import carrImg from '../img/carruselTry.png';
import React from 'react';
import ProductCards from '../ProductCards/ProductCards';

function Home() {

    return (
        <div className={style.homeDiv}>
            <div className={style.carrusel}>
                <img src={carrImg} alt='carrusel trial' className={style.carrImg} />
                <h3 className={style.enunciadoCarrusel}>Espacio designado para el Carrusel</h3>
            </div>
            <div className={style.highlights}>
                <h3>Estos son los productos destacados -- queremos productos detacados? los ponemos arriba en el carrusel? </h3>
                <hr />
                <h3>También podría ir aquí un paginado </h3>
                <hr />
            </div>
            <ProductCards />
        </div>
    )
}
export default Home;