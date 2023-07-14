import './home.css';
import saw from '../img/chainsaw.png';
import pruner from '../img/pruners.png';
import trimmer from '../img/hedgetrimmer.png';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions'
import ProductCards from '../ProductCards/ProductCards';
import  {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Home() {
    // de momento no estamos conectados -> se dejan los puertos tendidos para cuando estemos listos
    const dispatch = useDispatch();
    const toolsShown = useSelector(state => state.toolsShown)

    useEffect(() => {
        dispatch(actions.getTools());
    }, [dispatch])


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
                
            </div>

            {/* La información que viene desde la api va a ser:
             product {
                id : INTEGER
                brand : STRING,
                name : STRING,
                model : STRING,
                detail : STRING,
                price : FLOAT,
                image : STRING
             }


             Entonces deberíamos hacer un map de la info que viene del store ->
                toolsShown.map((p, i) => {
                    return <Card
                        id={p.id}
                        brand={p.brand}
                        name={p.name}
                        model={p.model}
                        detail={p.detal}
                        price={p.price}
                        image={p.image}
                        />
                })

            */}

            <div className="cards">
                <div className="upperDiv">
                    <div className="name">
                        {/* La idea sería que hubieran links para acceder a cada Tool */}
                        <div className='nameTool'>Chainsaw</div>
                    </div>
                    <div className="imgCard">
                        <img src={saw} alt="This is a Tool" className="image" />
                        <div className="divCatDesc">
                            <div className="divCat"> <span className='block'>Category: </span> Garden </div>
                            <div className="divDesc"><span className='block'>Description:  </span> Lots of fun! </div>
                        </div>
                    </div>
                </div>

                <div className="upperDiv">
                    <div className="name">
                        {/* La idea sería que hubieran links para acceder a cada Tool */}
                        <div className='nameTool'>Pruner</div>
                    </div>
                    <div className="imgCard">
                        <img src={pruner} alt="This is a Tool" className="image" />
                        <div className="divCatDesc">
                            <div className="divCat"> <span className='block'>Category: </span> Garden </div>
                            <div className="divDesc"><span className='block'>Description:  </span> Versatile </div>
                        </div>
                    </div>
                </div>

                <div className="upperDiv">
                    <div className="name">
                        {/* La idea sería que hubieran links para acceder a cada Tool */}
                        <div className='nameTool'>Hedge trimmer</div>
                    </div>
                    <div className="imgCard">
                        <img src={trimmer} alt="This is a Tool" className="image" />
                        <div className="divCatDesc">
                            <div className="divCat"> <span className='block'>Category: </span> Garden </div>
                            <div className="divDesc"><span className='block'>Description:  </span> Useful </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <ProductCards/>
            <hr />
                <h3>También podría ir aquí un paginado </h3>
            {/* aquí termina el div.cards */}
        </div>
    )
}
export default Home;