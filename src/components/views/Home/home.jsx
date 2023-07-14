
import style from './home.module.css'
import carrImg from '../img/carruselTry.png';
import React from 'react';
import ProductCards from '../ProductCards/ProductCards';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions'
import  {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Home() {

    return (
        <div className='homeDiv'>
            <Carousel showThumbs={false} autoPlay={true} interval={3000}>
                <img src="https://belltec.com.co/modules/angarslider/views/img/images/79f2d78b09ec9efa0cb71b14a6136ed979781ce7_bannerofertasJULIO%202023%20BELLTEC.jpg" alt="img" />
                <img src="https://belltec.com.co/modules/angarslider/views/img/images/1c2616dc4c86eccdcd219d50eeb50fb9f68ce4ae_bannerinalambricos%202022.jpg" alt="img" />
                <img src="https://belltec.com.co/modules/angarslider/views/img/images/564b42ff1301a72d87cb01b6ad9ab40628597c14_748fe41843339635df928ce00affab834a8b249e_katcher.jpg" alt="img" />
                    
            </Carousel>
            <div className="highlights">
                <h3>Estos son los productos destacados -- queremos productos detacados? los ponemos arriba en el carrusel? </h3>
                
                <hr />

                <h3>También podría ir aquí un paginado </h3>
                <hr />
            </div>
            <ProductCards/>
            <hr />
        </div>
    )
}
export default Home;