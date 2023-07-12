import './home.css';
import carrImg from '../img/carruselTry.png';
import saw from '../img/chainsaw.png';
import pruner from '../img/pruners.png';
import trimmer from '../img/hedgetrimmer.png';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions'

function Home() {
    // de momento no estamos conectados -> se dejan los puertos tendidos para cuando estemos listos
    const dispatch = useDispatch();
    const toolsShown = useSelector(state => state.toolsShown)

    useEffect(() => {
        dispatch(actions.getTools());
    }, [dispatch])


    return (
        <div className='homeDiv'>
            <div className="carrusel">
                <img src={carrImg} alt="carrusel trial" className="carrImg" />
                <h3 className='enunciadoCarrusel'>Espacio designado para el Carrusel</h3>
            </div>
            <div className="highlights">
                <h3>Estos son los productos destacados -- queremos productos detacados? los ponemos arriba en el carrusel? </h3>
                <hr />
                <h3>También podría ir aquí un paginado </h3>
                <hr />
                Esto está hardcodeado a la espera de la creación de las Cards y la Api
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
            {/* aquí termina el div.cards */}
        </div>
    )
}
export default Home;