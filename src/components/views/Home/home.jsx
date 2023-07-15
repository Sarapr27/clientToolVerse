
import style from './home.module.css'
import React from 'react';
import ProductCards from '../ProductCards/ProductCards';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {

    return (
        <div className={style.homeDiv}>
            <Carousel showThumbs={false} autoPlay={true} interval={3000}>
                <img src="https://belltec.com.co/modules/angarslider/views/img/images/79f2d78b09ec9efa0cb71b14a6136ed979781ce7_bannerofertasJULIO%202023%20BELLTEC.jpg" alt="img" />
                <img src="https://belltec.com.co/modules/angarslider/views/img/images/1c2616dc4c86eccdcd219d50eeb50fb9f68ce4ae_bannerinalambricos%202022.jpg" alt="img" />
                <img src="https://belltec.com.co/modules/angarslider/views/img/images/564b42ff1301a72d87cb01b6ad9ab40628597c14_748fe41843339635df928ce00affab834a8b249e_katcher.jpg" alt="img" />

            </Carousel>
            <div className={style.highlights}>
                <h3>Paginado </h3>
                <hr />
            
            </div>

            <div classname='container-filtros'>
            <h5>Filtrar Categoria</h5>
                <select>
                    <option value='Eléctricos'>Eléctricos</option>
                    <option value='Manuales'>Manuales</option>
                    <option value='Inalámbricos'>Inalámbricos</option>
                    <option value='Neumáticos'>Neumáticos</option>
                    <option value='Hogar'>Hogar</option>
                    
                </select>

                <h5>Filtrar por Marca</h5>
                <select >
                     <option value ='MAKITA'>Makita</option>
                     <option value='EINHELL'>Einhell</option>
                     <option value='DEWALT'>Dewalt</option>
                     <option value='TRUPER'>Truper</option>
                     <option value='STANLEY'>Stanley</option>
                     <option value='IRWIN'>Irwin</option>
                     <option value='BOSCH'>Bosh</option>
                </select>
            
                
            </div>
            <ProductCards />
            <hr />

            

            
        </div>
    )
}
export default Home;